import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BellIcon } from "@heroicons/react/24/outline";
import "./Dashboard.css";

function Dashboard() {
  const [metrics, setMetrics] = useState([
    { name: "Projects", value: 12 },
    { name: "Tasks", value: 48 },
    { name: "Completed", value: 30 },
    { name: "Pending", value: 18 },
  ]);

  const [activities, setActivities] = useState([
    "Project Alpha created by Manager",
    "Task 'Fix login bug' marked completed",
    "New user 'John Doe' added",
    "Project Beta deleted by Admin",
  ]);

  const [notifications, setNotifications] = useState([
    "Initial notification at " + new Date().toLocaleTimeString(),
  ]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value: m.value + Math.floor(Math.random() * 5 - 2),
        }))
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = `New task created at ${new Date().toLocaleTimeString()}`;
      setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = `New Project added at ${new Date().toLocaleTimeString()}`;
      setActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = `🔔 New notification at ${new Date().toLocaleTimeString()}`;
      setNotifications((prev) => [newNotification, ...prev.slice(0, 4)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container relative">
      <aside className="sidebar">
        <h2 className="sidebar-title">Enterprise</h2>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <div className="flex justify-between items-center mb-4">
          <h1 className="dashboard-header">Dashboard Overview</h1>

          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)}>
              <p> ......</p>
              <BellIcon className="h-8 w-8 text-gray-700" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 right-1 bg-red-600 text-white rounded-full text-xs px-1.5">
                  {notifications.length}
                </span>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded z-10">
                <ul className="p-2">
                  {notifications.map((note, idx) => (
                    <li key={idx} className="py-1 border-b last:border-none">
                      {note}
                    </li>
                  ))}
                  {notifications.length === 0 && (
                    <li className="text-gray-500">No notifications yet.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        <section className="metrics grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric) => (
            <div
              key={metric.name}
              className="metric-card p-4 bg-white rounded shadow"
            >
              <h3 className="text-lg font-semibold">{metric.name}</h3>
              <p className="text-2xl">{metric.value}</p>
            </div>
          ))}
        </section>

        <section className="chart-section mb-6">
          <h2 className="text-xl font-semibold mb-2">Project Metrics Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={metrics}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </section>

        <section className="activity-section mb-6">
          <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
          <ul className="bg-white p-4 rounded shadow">
            {activities.map((activity, idx) => (
              <li key={idx} className="py-1 border-b last:border-none">
                {activity}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
