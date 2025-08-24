import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

interface LoginInput {
    username: string
    password: string
}

interface LoginResponse {
    token: string
    // user: { id: string; username: string }
}

const BaseURL = import.meta.env.VITE_BASE_URL

const loginUser = async (input: LoginInput): Promise<LoginResponse> => {
    const response = await axios.post(`${BaseURL}/auth/login`, input)
    return response.data
}

const Login = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState<LoginInput>({ username: "", password: "" })

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {

            localStorage.setItem("token", data.token)
            console.log("Successfully logged in")
            navigate("/dashboard")
        },
        onError: (error) => {
            console.error("Error Encountered", error)
        },
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginMutation.mutate(input)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={input.username}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    name="password"
                    value={input.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loginMutation.isPending}>
                    {loginMutation.isPending ? "Logging in..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

export default Login
