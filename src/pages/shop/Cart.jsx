import React from "react";
import { useCart } from "../../context/CartContext.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-light text-gray-800 mb-6">Your cart is empty</h2>
        <Link
          to="/shop"
          className="text-sm uppercase tracking-wide text-black border border-black px-6 py-2 rounded-full hover:bg-black hover:text-white transition-all"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-light text-gray-900 mb-10 tracking-wide">
        Your Shopping Cart
      </h1>

      <ul className="space-y-8">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex flex-col md:flex-row md:items-center gap-6 border-b pb-8"
          >
            <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-full object-contain p-4"
              />
            </div>

            <div className="flex-1 space-y-2">
              <h2 className="text-lg font-medium text-gray-900">{item.name}</h2>
              <p className="text-sm text-gray-500">€{item.price.toFixed(2)}</p>
              <div className="flex items-center gap-4 pt-2">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="w-20 border border-gray-300 px-3 py-2 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 hover:underline uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h3 className="text-2xl font-light text-gray-900">
          Total: <span className="font-medium">€{totalPrice.toFixed(2)}</span>
        </h3>
        <Link
          to="/checkout"
          className="uppercase tracking-wide bg-black text-white px-8 py-3 rounded-full text-sm hover:bg-neutral-800 transition"
        >
          Go to Checkout
        </Link>
      </div>
    </div>
  );
}
