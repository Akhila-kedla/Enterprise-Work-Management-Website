import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const navLinkClass =
    "block px-4 py-2 rounded hover:bg-blue-600 hover:text-white";

  return (
    <aside className="w-64 h-screen bg-gray-200 dark:bg-gray-800 p-4 fixed">
      <h2 className="text-xl font-bold mb-6 text-center">Work Manager</h2>

      <nav className="space-y-2">
        <NavLink to="/" className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/projects" className={navLinkClass}>
          Projects
        </NavLink>
        <NavLink to="/tasks" className={navLinkClass}>
          Tasks
        </NavLink>
        <NavLink to="/users" className={navLinkClass}>
          Users
        </NavLink>
        <NavLink to="/reports" className={navLinkClass}>
          Reports
        </NavLink>
        <NavLink to="/settings" className={navLinkClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
