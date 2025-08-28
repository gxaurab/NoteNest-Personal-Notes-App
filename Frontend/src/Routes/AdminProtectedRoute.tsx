import { useNavigate } from "react-router"

const AdminProtectedRoute = () => {

    const navigate = useNavigate()
    const accessToken = localStorage.getItem("accessToken")
    if(!accessToken){
        return navigate('/login')
    }



}

export default AdminProtectedRoute