import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/authStore";

const AdminProtectedRoute = () => {
  const { role } = useAuthStore();

  if (role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />; 
};

export default AdminProtectedRoute;
