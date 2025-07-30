import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const statuses = ["pending", "accepted", "completed", "rejected"];

  useEffect(() => {
    fetch("https://web-production-1b3894.up.railway.app/orders/")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setFilteredOrders(data);
      });
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at || a.id);
      const dateB = new Date(b.created_at || b.id);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [statusFilter, sortOrder, orders]);

  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="max-w-7xl mx-auto p-4">
     <h1 className="text-3xl font-light mb-8 text-purple-700 tracking-wide">
        Orders
      </h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="font-medium mr-2">Filter by status:</label>
          <select
            className="border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium mr-2">Sort by date:</label>
          <select
            className="border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="hidden md:grid grid-cols-6 gap-4 bg-purple-100 p-3 font-semibold text-purple-800 rounded-t-md">
        <div>Order ID</div>
        <div>Customer</div>
        <div>Email</div>
        <div>Total</div>
        <div>Status</div>
        <div>Actions</div>
      </div>

      {currentOrders.map((order, idx) => (
        <div
          key={order.id}
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 items-center p-4 border-b ${
            idx % 2 === 0 ? "bg-white" : "bg-purple-50"
          }`}
        >
          <div>
            <span className="md:hidden font-semibold">Order ID: </span>
            {order.id}
          </div>
          <div>
            <span className="md:hidden font-semibold">Customer: </span>
            {order.name}
          </div>
          <div className="truncate">
            <span className="md:hidden font-semibold">Email: </span>
            {order.email}
          </div>
          <div>
            <span className="md:hidden font-semibold">Total: </span>${order.total_price.toFixed(2)}
          </div>
          <div>
            <span className="md:hidden font-semibold">Status: </span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${getStatusStyle(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>
          <div className="flex gap-3">
            <Link
              to={`/admin/orders/${order.id}`}
              className="text-purple-600 hover:underline text-sm"
            >
              View
            </Link>
            <button className="text-red-600 hover:underline text-sm">
              Delete
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-center mt-6 gap-2 flex-wrap">
        <button
          className="px-3 py-1 border border-purple-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-purple-600 text-white"
                : "border-purple-300 text-purple-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-3 py-1 border border-purple-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function getStatusStyle(status) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "accepted":
      return "bg-purple-200 text-purple-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
}
