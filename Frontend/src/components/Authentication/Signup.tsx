
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

interface FormElements {
  username: string
  password: string
  email: string
}

const BaseURL = import.meta.env.VITE_BASE_URL

const Signup = () => {

    const navigate = useNavigate()
    const [input, setInput] = useState<FormElements>({
        username: "",
        password: "",
        email: ""
    })

    const signupUser = async(data: FormElements)=>{
        const response = await axios.post(`${BaseURL}/auth/signup`, data)
        return response.data
    }

    const mutation = useMutation({
        mutationFn: signupUser,
        onSuccess:()=> { 
            console.log("Successfully Signed Up") 
            navigate("/login")},
        onError: (error) => {
            console.error(error)
  }
    })

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setInput((prev)=>({
            ...prev,
            [name]:value
        }))
    }

    const handleSubmit =(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        mutation.mutate(input)
    }   

  return (
    <div>
        <h1>Register Your Account</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input value={input.username} onChange={handleChange} name="username" type="text" placeholder="draco" className="border" required/>

             <label htmlFor="email">Email</label>
            <input value={input.email} onChange={handleChange} name="email" type="text" placeholder="dracom@gmail.com" className="border" required/>

             <label htmlFor="password">Password</label>
            <input value={input.password} onChange={handleChange} name="password" type="text" placeholder="***" className="border" required/>

            <button type="submit"> Submit</button>
        </form>

    </div>
  )
}

export default Signup