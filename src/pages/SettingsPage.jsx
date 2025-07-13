import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

function SettingsPage() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("✅ Profile updated successfully (mock).");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      alert("❌ New passwords do not match.");
      return;
    }
    alert("✅ Password changed successfully (mock).");
    setPassword({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="page-container">
      <h1 className="page-header">⚙️ Settings</h1>

      <div className="card animate-fadeInUp mb-8">
        <h2 className="section-title">Appearance</h2>
        <button
          onClick={toggleTheme}
          className="btn bg-blue-600 hover:bg-blue-700 transition"
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form
          onSubmit={handleProfileUpdate}
          className="card animate-fadeInUp space-y-4"
        >
          <h2 className="section-title">Edit Profile</h2>

          <div className="form-group">
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="input-field"
            />
          </div>

          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 transition"
          >
            Update Profile
          </button>
        </form>

        <form
          onSubmit={handleChangePassword}
          className="card animate-fadeInUp space-y-4 delay-200"
        >
          <h2 className="section-title">Change Password</h2>

          <div className="form-group">
            <label className="block font-semibold mb-1">Current Password</label>
            <input
              type="password"
              value={password.current}
              onChange={(e) =>
                setPassword({ ...password, current: e.target.value })
              }
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="block font-semibold mb-1">New Password</label>
            <input
              type="password"
              value={password.new}
              onChange={(e) =>
                setPassword({ ...password, new: e.target.value })
              }
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label className="block font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={password.confirm}
              onChange={(e) =>
                setPassword({ ...password, confirm: e.target.value })
              }
              className="input-field"
            />
          </div>

          <button
            type="submit"
            className="btn bg-purple-600 hover:bg-purple-700 transition"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
