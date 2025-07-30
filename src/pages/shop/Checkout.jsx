import React, { useState } from "react";
import { useCart } from "../../context/CartContext.jsx";

export default function Checkout() {
  const { cartItems, totalPrice } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const orderPayload = {
      name: form.name,
      email: form.email,
      address: `${form.address}, ${form.city}, ${form.postalCode}`,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image_url: item.image_url,
      })),
      total_price: totalPrice,
    };

    try {
      console.log("URL za fetch:", `${import.meta.env.VITE_BACKEND_URL}/orders`);

      const response = await fetch("https://web-production-1b3894.up.railway.app/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to submit order");
      }

      setSubmitted(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center">
        <h2 className="text-3xl font-light text-gray-800 mb-4">Thank you for your order!</h2>
        {/*<p className="text-gray-500 text-sm">
          You’ll receive a confirmation email shortly.
        </p>*/}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-light text-gray-900 mb-12 tracking-wide">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-600 font-medium">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />

          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black"
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={form.postalCode}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          

          <div className="flex justify-between items-center pt-6">
            <p className="text-lg font-light">Total: <span className="font-medium">€{totalPrice.toFixed(2)}</span></p>
            <button
              type="submit"
              className="uppercase tracking-wide bg-black text-white px-8 py-3 rounded-full text-sm hover:bg-neutral-800 transition"
            >
              Submit Order
            </button>
          </div>
        </form>

        <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-medium mb-6 text-gray-800 tracking-wide">Your Order</h2>

          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg bg-white p-2 border"
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-xs text-gray-500">€{item.price.toFixed(2)} each</p>
                </div>
                <p className="font-semibold text-sm text-gray-800">
                  €{(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <hr className="my-6" />

          <div className="text-right text-lg font-semibold text-gray-900">
            Total: €{totalPrice.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
