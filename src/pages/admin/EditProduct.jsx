import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/products/${id}`, product)
      .then(() => {
        setMessage("Product updated successfully!");
        setTimeout(() => setMessage(""), 4000);
        navigate("/admin/products");
      })
      .catch((err) => {
        console.error("Error updating product:", err);
        setMessage("Failed to update product.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!product)
    return <div className="p-4 text-red-600">Product not found</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-xl rounded-xl border border-purple-200 p-6">
     <h1 className="text-3xl font-light mb-8 text-purple-700 tracking-wide">
       Edit Product
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3 flex justify-center">
          <img
            src={product.image_url || "https://via.placeholder.com/250x250?text=No+Image"}
            alt={product.name}
            className="rounded-xl border-4 border-purple-300 shadow-lg object-cover max-h-72 w-full"
          />
        </div>
        <form onSubmit={handleSubmit} className="md:w-2/3 space-y-6">
          <div>
            <label className="block font-semibold mb-1 text-purple-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-purple-700">
              Description
            </label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-1 text-purple-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-purple-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-purple-700">
              Image URL
            </label>
            <input
              type="text"
              name="image_url"
              value={product.image_url}
              onChange={handleChange}
              className="w-full border rounded p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white py-3 px-6 rounded hover:bg-purple-700 w-full transition duration-200"
          >
            Save Changes
          </button>

          {message && (
            <p
              className={`mt-4 text-center font-medium text-sm ${
                message.includes("Failed") ? "text-red-600" : "text-green-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
