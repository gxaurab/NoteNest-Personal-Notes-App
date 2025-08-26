import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useNavigate } from "react-router"
import api from "../../config/axios.config"

interface LoginInput {
    username: string
    password: string
}

interface LoginResponse {
    accessToken: string
    // user: { id: string; username: string }
}

const loginUser = async (input: LoginInput): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", input)
    return response.data
}

const Login = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState<LoginInput>({ username: "", password: "" })

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {

            localStorage.setItem("accessToken", data.accessToken)
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
