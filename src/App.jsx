import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./features/auth/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProjectsPage from "./features/projects/ProjectsPage";
import TasksPage from "./features/tasks/TasksPage";
import UsersPage from "./features/users/UsersPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignupPage from "./features/auth/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["Admin", "Manager", "Employee"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <ProjectsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute roles={["Admin", "Manager", "Employee"]}>
              <TasksPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute roles={["Admin"]}>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute roles={["Admin", "Manager"]}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute roles={["Admin", "Manager", "Employee"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
