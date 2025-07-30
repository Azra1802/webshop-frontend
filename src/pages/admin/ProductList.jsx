import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`https://web-production-1b3894.up.railway.app/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Ukloni iz local state
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    fetch("https://web-production-1b3894.up.railway.app/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let data = [...products];

    if (search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "date-desc") {
      data.sort((a, b) => new Date(b.publish_date) - new Date(a.publish_date));
    } else if (sort === "date-asc") {
      data.sort((a, b) => new Date(a.publish_date) - new Date(b.publish_date));
    } else if (sort === "name-asc") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name-desc") {
      data.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFiltered(data);
    setCurrentPage(1);
  }, [search, sort, products]);

  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-4">
<h1 className="text-3xl font-light mb-8 text-purple-700 tracking-wide">
       Product List
      </h1>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-purple-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
        </select>
      </div>

      <div className="hidden md:grid grid-cols-[80px_1fr_100px_160px_100px_120px] bg-purple-100 px-4 py-2 font-semibold text-purple-800 rounded-t-lg select-none">
        <div>Image</div>
        <div>Name</div>
        <div className="text-center">Qty</div>
        <div className="text-center">Published</div>
        <div className="text-center">Price</div>
        <div className="text-center">Actions</div>
      </div>

      {paginated.map((p) => (
        <div
          key={p.id}
          className="grid grid-cols-1 md:grid-cols-[80px_1fr_100px_160px_100px_120px] items-center border-b px-4 py-3 bg-white hover:shadow-sm transition-shadow gap-2 md:gap-4"
        >
          <div className="flex justify-center md:justify-start">
            <img
              src={p.image_url}
              alt={p.name}
              className="w-12 h-12 object-cover rounded"
            />
          </div>
          <div className="font-medium text-gray-900">{p.name}</div>
          <div className="text-center text-gray-700">{p.quantity}</div>
          <div className="text-center text-gray-500 text-sm">
            {formatDate(p.publish_date)}
          </div>

          <div className="text-center font-semibold">${p.price.toFixed(2)}</div>

          <div className="flex justify-center md:justify-center gap-4 text-sm">
            <Link
              to={`/admin/edit/${p.id}`}
              className="text-purple-600 hover:text-purple-800 transition"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-600 hover:text-red-800 transition"
            >
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
