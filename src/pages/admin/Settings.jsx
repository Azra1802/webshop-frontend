import { useState } from "react";

export default function Settings() {
  const adminInfo = {
    username: "admin",
    email: "admin@example.com",
    role: "Administrator",
  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://web-production-1b3894.up.railway.app/admin/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: adminInfo.username,
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || "Error changing password");
      }

      setMessage({ type: "success", text: "Password changed successfully." });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-light mb-6 text-purple-700">Admin Settings</h2>

      <section className="mb-8">
        <h3 className="text-lg font-medium mb-2 text-purple-800">Profile Information</h3>
        <p><strong>Username:</strong> {adminInfo.username}</p>
        <p><strong>Email:</strong> {adminInfo.email}</p>
        <p><strong>Role:</strong> {adminInfo.role}</p>
      </section>

      <section>
        <h3 className="text-lg font-medium mb-4 text-purple-800">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-purple-700 font-light mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-purple-300 rounded-sm px-3 py-2 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-purple-700 font-light mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-purple-300 rounded-sm px-3 py-2 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-purple-700 font-light mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-purple-300 rounded-sm px-3 py-2 text-purple-900 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
              disabled={loading}
            />
          </div>

          {message && (
            <p
              className={`${
                message.type === "error" ? "text-red-600" : "text-green-600"
              } font-light`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-light py-2 px-4 rounded-sm transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </section>
    </div>
  );
}
