import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const statuses = ["pending", "accepted", "completed", "rejected"];

  useEffect(() => {
    fetch(`https://web-production-1b3894.up.railway.app/orders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then((data) => {
        setOrder(data);
        setStatus(data.status);
      })
      .catch((err) => console.error("Error fetching order:", err));
  }, [id]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setMessage("");

    try {
      await axios.put(`https://web-production-1b3894.up.railway.app/orders/${id}/status`, null, {
        params: { new_status: newStatus },
      });
      setMessage("Status updated successfully");
      setOrder((prev) => ({ ...prev, status: newStatus }));
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage("Failed to update status");
    }
  };

  if (!order) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-light mb-8 text-purple-700 tracking-wide">
        Order <span className="text-purple-600">#{order.id}</span>
      </h1>
      <div className="bg-purple-50 shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-purple-800 mb-4">
          Customer Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Name:</strong> {order.name}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p className="sm:col-span-2">
            <strong>Address:</strong> {order.address}
          </p>
          <p className="flex items-center gap-2">
            <strong>Status:</strong>
            <select
              value={status}
              onChange={handleStatusChange}
              className="border border-purple-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Total:</strong> ${order.total_price.toFixed(2)}
          </p>
        </div>

        {message && (
          <p
            className={`mt-4 text-sm ${
              message.includes("Failed")
                ? "text-red-600"
                : "text-green-600 font-medium"
            }`}
          >
            {message}
          </p>
        )}
      </div>
      <div className="bg-white shadow rounded-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold text-purple-800 mb-4">Items</h2>
        <table className="w-full text-sm min-w-[500px]">
          <thead>
            <tr className="bg-purple-100 text-purple-900 text-left">
              <th className="p-2 font-medium">Product</th>
              <th className="p-2 font-medium">Quantity</th>
              <th className="p-2 font-medium">Price</th>
              <th className="p-2 font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-t hover:bg-purple-50">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Link
          to="/admin/orders"
          className="text-purple-600 hover:underline text-sm"
        >
          &larr; Back to Orders
        </Link>
      </div>
    </div>
  );
}
