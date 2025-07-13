import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ roles, children }) => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <div>Unauthorized</div>;
  }

  return children;
};

export default ProtectedRoute;
