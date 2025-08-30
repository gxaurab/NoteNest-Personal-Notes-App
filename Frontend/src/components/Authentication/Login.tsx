import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import api from "../../config/Axios/axios.config"
import { useForm } from "react-hook-form"
import { loginFormSchema, type loginFormElements } from "../../config/zod/schema"
import { zodResolver } from "@hookform/resolvers/zod"

// interface LoginInput {
//     username: string
//     password: string
// }

interface LoginResponse {
    accessToken: string
    // user: { id: string; username: string }
}

const loginUser = async (input: loginFormElements): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", input)
    return response.data
}

const Login = () => {
    const navigate = useNavigate()
    const [backendError, setBackendError] = useState<string>("")

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(loginFormSchema),
        mode: "onBlur" //this will show dynamic error like after going out of that input field yk
    })

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {

            localStorage.setItem("accessToken", data.accessToken)
            console.log("Successfully logged in")
            navigate("/dashboard")
        },
        onError: (error:any) => {
            setBackendError(error.response?.data?.message || "Login failed")
            // console.error("Error Encountered", error)
        },
    })

    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     loginMutation.mutate(input)
    // }

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target
    //     setInput({ ...input, [name]: value })
    // }
    const onSubmit =(data:loginFormElements)=>{
        setBackendError("")
        loginMutation.mutate(data)
    }


    return (
        <div className="flex flex-col items-center mt-5 gap-3">
            Login Here
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 w-fit">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    {...register("username", {required:true})}
                    // name="username"
                    // value={input.username}
                    // onChange={handleChange}
                    className="border p-1"
                    placeholder="coolboii"
                    // required
                />

                {errors.username && <span className="text-red-500"> {errors.username?.message}</span>}

                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    {...register("password", {required:true})}
                    // name="password"
                    // value={input.password}
                    // onChange={handleChange}
                    className="border p-1"
                    placeholder="********"
                    // required
                />
                {errors.password && <span className="text-red-500"> {errors.password?.message}</span>}

                <button type="submit" className="bg-blue-500 mx-auto p-2 text-white hover:bg-blue-800" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Logging in..." : "Submit"}
                </button>

                <Link to="/forgot-password" className="text-blue-700 text-sm">Forgot Password ?</Link>

                {errors.root && <span className="text-red-500"> {errors.root?.message} </span>}
                {backendError && <span className="text-red-600"> {backendError}</span>}

            </form>
        </div>
    )
}

export default Login
