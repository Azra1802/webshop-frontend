import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/api";
import { useCart } from "../../context/CartContext";
import Notification from "../../components/Notification";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    getProductById(id)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotification(true);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading product details...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-white">
      <div className="grid md:grid-cols-2 gap-20 items-start">
        <div className="w-full h-[480px] rounded-xl overflow-hidden shadow-sm border border-gray-100">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain p-6 bg-gray-50"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-light tracking-wide text-gray-900">{product.name}</h1>
          <p className="text-base text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="pt-4">
            <p className="text-2xl font-medium text-gray-900 mb-1">
              €{product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">In stock: {product.quantity}</p>
          </div>

          <button
            onClick={() => handleAddToCart(product)}
            className="mt-6 bg-black text-white tracking-wide uppercase text-sm px-8 py-3 rounded-full hover:bg-neutral-800 transition-all duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {showNotification && (
        <Notification
          message="Product added to cart!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}
