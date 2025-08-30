import { useNavigate } from "react-router";
import DashboardGetItems from "../../components/Admin/DashboardGetItems"
import { useAuthStore } from "../../store/authStore"

const AdminDashboard = () => {
    
  const navigate = useNavigate();
  const {logout, username} = useAuthStore()
  
  const handleLogout = () => {
      logout(); 
      navigate("/login"); 
  };
  
    return (
    <div> 
      <div className="flex justify-around">
        <h1>Welcome {username}</h1>
        <button
        className="bg-red-600 text-white p-1 hover:bg-red-800 rounded-md"
        onClick={handleLogout}
      >
        LogOut
      </button>

      </div>
        <p className="text-blue-600 mt-5 "> Below is the list of all User's Notes. You can choose to keep them </p>
        <DashboardGetItems/>

    </div>
  )
}

export default AdminDashboard