import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-serif font-light tracking-widest text-purple-700 hover:text-purple-900 transition-colors duration-300 cursor-pointer">
          <Link to="/">WEBSHOP</Link>
        </h1>

        <nav className="flex items-center space-x-10 text-sm font-medium text-gray-700 uppercase tracking-wider">
          <Link
            to="/"
            className="relative group hover:text-purple-600 transition-colors"
          >
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1.5px] bg-purple-600 mt-1 rounded"></span>
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center hover:text-purple-600 transition-colors"
            aria-label="View cart"
          >
            <ShoppingCart className="w-5 h-5 mr-1" />
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-purple-600 text-white text-[11px] px-2 py-0.5 rounded-full font-semibold">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
