import { Navigate, Outlet } from "react-router-dom";

import logger from "../utils/logger";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  console.log("User data: ", userData);
  console.log("User: ", user);
  if (user) {
    return <Navigate to="/login" />; // If not authenticated, redirect to login
  }

  // Check the user's role and redirect accordingly
  if (userData?.role === "victim") {
    return <Navigate to="/victim-portal" />;
  } else if (userData?.role === "rescuer") {
    return <Navigate to="/rescue-portal" />;
  }

  return <Outlet />; // Render the protected route's children if authentication and role are valid
};

export default PrivateRoute;
