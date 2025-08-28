import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import api from "../../config/Axios/axios.config"
import { useForm } from "react-hook-form"
import { signupFormSchema, type userFormElements } from "../../config/zod/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

const Signup = () => {
  const navigate = useNavigate()
  const [backendError, setBackendError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<userFormElements>({
    resolver: zodResolver(signupFormSchema),
    mode:"onBlur"  //onChange and other properties are there explore it more
  })

  const signupUser = async (data: userFormElements) => {
    const response = await api.post("/auth/signup", data)
    return response.data
  }

  const mutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      console.log("Successfully Signed Up")
      navigate("/login")
    },
    onError: (error: any) => {
      setBackendError(error.response?.data?.message || "Signup failed")
    }
  })

  const onSubmit = (data: userFormElements) => {
    setBackendError(null) 
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col gap-3 mt-10">
      <h1 className="text-center text-xl text-green-700">Register Your Account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mx-auto gap-1">
        
        <label htmlFor="username">Username</label>
        <input 
          {...register("username")} 
          type="text" 
          placeholder="draco" 
          className="border" 
          required
        />
        {errors.username && <span className="text-red-500">{errors.username.message}</span>}

        <label htmlFor="email">Email</label>
        <input 
          {...register("email")} 
          type="text" 
          placeholder="dracom@gmail.com" 
          className="border" 
          required
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

        <label htmlFor="password">Password</label>
        <input 
          {...register("password")} 
          type="password" 
          placeholder="***" 
          className="border" 
          required
        />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}

        {/* Backend error */}
        {backendError && <p className="text-red-600">{backendError}</p>}

        <button 
          type="submit" 
          className="bg-blue-400 mx-auto p-1 text-white hover:bg-blue-800"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default Signup
