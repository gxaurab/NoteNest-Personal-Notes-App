import { useState } from "react"
import api from "../../config/axios.config"

const Logout = () => {

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)


    const logmeout =async()=>{
        setError(null)
        setLoading(true)
        try {
            await api.post("/auth/logout")
            localStorage.removeItem("accessToken")
        } catch (error) {
            setError("Error Logging Out")
        }finally{
            setLoading(false)
        }
    }

    if(error){ return <p> {error}</p>}

  return (
    <button 
    onClick={logmeout}
    className="bg-red-500 tex-xl p-2">
        {loading? "Logging Out" : "Logout" }
    </button>
  )
}

export default Logout