import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://web-production-1b3894.up.railway.app/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 px-6">
      <div className="bg-white rounded-md shadow-md p-10 max-w-sm w-full">
        <h1 className="text-3xl font-light mb-8 text-center text-purple-700 tracking-wide">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-purple-700 font-light mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              className="w-full border border-purple-300 rounded-sm px-4 py-2 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-purple-700 font-light mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full border border-purple-300 rounded-sm px-4 py-2 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
          </div>

          {error && (
            <p className="text-red-600 font-light text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-light py-3 rounded-sm transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
