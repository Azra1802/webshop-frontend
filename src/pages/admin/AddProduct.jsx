import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    quantity: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        image_url: product.image_url,
        quantity: parseInt(product.quantity, 10),
      };

      await axios.post("http://localhost:8000/products", payload);
      setMessage("Product added successfully!");
      setProduct({
        name: "",
        description: "",
        price: "",
        image_url: "",
        quantity: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage(" Failed to add product. Please check input data.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 sm:p-10 bg-white rounded-xl shadow-md">
<h1 className="text-3xl font-light mb-8 text-purple-700 tracking-wide">
        Add New Product
      </h1>
      {message && (
        <div className="mb-4 text-sm px-4 py-2 rounded bg-purple-100 text-purple-800 border border-purple-200">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="col-span-1 sm:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="name">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="price">
            Price (€)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={product.quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor="image_url">
            Image URL
          </label>
          <input
            id="image_url"
            name="image_url"
            type="text"
            value={product.image_url}
            onChange={handleChange}
            placeholder="/img/sample.jpg"
            required
            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 rounded-md transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
