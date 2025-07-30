import { Link, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      <aside className="w-full md:w-64 bg-purple-900 text-white p-8 flex flex-col justify-between shadow-lg">
        <div>
          <h2 className="text-4xl font-extrabold mb-10 tracking-wide text-purple-300 drop-shadow-lg">
            Admin Panel
          </h2>
          <nav className="flex flex-col space-y-5 text-lg font-medium">
            <Link
              to="/admin"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/admin/products"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Product List
            </Link>
            <Link
              to="/admin/add"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Add Product
            </Link>
            <Link
              to="/admin/orders"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Orders
            </Link>
            <Link
              to="/admin/settings"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Settings
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-12 w-full bg-red-600 hover:bg-red-700 transition-colors duration-300 rounded py-3 font-semibold shadow-md"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-white rounded-tl-3xl shadow-xl">
        <Outlet />
      </main>
    </div>
  );
}
