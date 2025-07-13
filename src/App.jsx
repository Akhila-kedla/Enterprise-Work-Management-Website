import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./features/projects/ProjectsPage";
import TasksPage from "./features/tasks/TasksPage";
import UsersPage from "./features/users/UsersPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import Unauthorized from "./pages/Unauthorized";
import PrivateRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={["Admin", "Manager", "Employee"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute allowedRoles={["Admin", "Manager"]}>
              <ProjectsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute allowedRoles={["Admin", "Manager", "Employee"]}>
              <TasksPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <UsersPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <PrivateRoute allowedRoles={["Admin", "Manager"]}>
              <ReportsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute allowedRoles={["Admin", "Manager", "Employee"]}>
              <SettingsPage />
            </PrivateRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
