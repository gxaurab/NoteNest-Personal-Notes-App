import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../store/authStore"



const ReverseProtection = () => {
    
    const {username} = useAuthStore()
    const token = localStorage.getItem("accessToken")

    if(username && token){
        return <Navigate to="/dashboard" replace/>
    }
  
    return <Outlet/>
}

export default ReverseProtection