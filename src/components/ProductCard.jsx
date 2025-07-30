import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col group">
      
      <div className="relative aspect-[4/5] w-full">
        <img
          src={product.image_url || "/placeholder.jpg"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-base font-light text-gray-800 tracking-wide mb-1 line-clamp-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 italic mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mt-auto">
          <span className="text-base font-medium text-purple-600">{product.price}€</span>
          <Link
            to={`/product/${product.id}`}
            className="text-sm text-purple-600 hover:underline hover:text-purple-700 font-normal transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
