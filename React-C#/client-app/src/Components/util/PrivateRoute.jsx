import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  const id = localStorage.getItem("userId");

  // If the role or id is missing or invalid, redirect to the login page
  if (!role || !id) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the children (protected component)
  return children;
};

export default PrivateRoute;
