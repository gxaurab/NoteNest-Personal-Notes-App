import { Navigate, Outlet } from "react-router";

const UserProtectedRoute = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
};

export default UserProtectedRoute;
