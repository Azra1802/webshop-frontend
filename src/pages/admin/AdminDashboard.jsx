import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [revenueToday, setRevenueToday] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await fetch("http://localhost:8000/products");
        const productsData = await productsRes.json();
        setTotalProducts(productsData.length);

        const ordersRes = await fetch("http://localhost:8000/orders");
        const ordersData = await ordersRes.json();

        const pending = ordersData.filter((o) => o.status === "pending").length;
        setPendingOrders(pending);

        const today = new Date().toISOString().slice(0, 10);
        const revenue = ordersData
          .filter((o) => o.created_at.slice(0, 10) === today)
          .reduce((sum, o) => sum + o.total_price, 0);
        setRevenueToday(revenue.toFixed(2));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-12 text-center text-gray-400 font-light text-lg">
        Loading dashboard...
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-10 bg-white rounded-md shadow-sm">
      <h1 className="text-3xl font-light mb-8 text-purple-700 tracking-wide">
        Admin Dashboard
      </h1>
      <p className="text-gray-600 mb-12 text-base max-w-xl">
        Welcome back! Here’s a quick overview of your webshop:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[
          { label: "Total Products", value: totalProducts },
          { label: "Pending Orders", value: pendingOrders },
          { label: "Revenue Today", value: `$${revenueToday}` },
        ].map(({ label, value }, idx) => (
          <div
            key={idx}
            className="bg-purple-50 text-purple-700 p-6 rounded-md shadow-sm flex flex-col items-center cursor-default"
          >
            <h2 className="text-4xl font-light">{value}</h2>
            <p className="mt-3 text-lg font-light tracking-wide">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
