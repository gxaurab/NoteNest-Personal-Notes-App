import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { username, role, logout } = useAuthStore();

  const handleLogout = () => {
    logout(); 
    navigate("/login"); 
  };

  return (
    <div className="flex justify-around m-2">
      <h1 className="text-blue-600 text-md sm:text-2xl">Hello {username}</h1>
      {role === "ADMIN" && (
        <Link className="hover:underline text-md sm:text-xl" to="/admin">
          Go To Admin Dashboard
        </Link>
      )}
      <button
        className="bg-red-600 text-white p-1 hover:bg-red-800 rounded-md"
        onClick={handleLogout}
      >
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
