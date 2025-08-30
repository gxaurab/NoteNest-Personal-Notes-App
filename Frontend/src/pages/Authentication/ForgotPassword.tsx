import { useMutation } from "@tanstack/react-query"
import api from "../../config/Axios/axios.config"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { forgotPassword, type forgotPasswordType } from "../../config/zod/schema"
import { useNavigate } from "react-router"

const BASE_URL = import.meta.env.VITE_BASE_URL

const ForgotPassword = () => {
  const navigate = useNavigate()

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(forgotPassword),
    mode: "onBlur"
  })

  const sendEmail = async (data: forgotPasswordType) => {
    const response = await api.post(`${BASE_URL}/auth/forgot-password`, data)
    return response.data
  }

  const mutation = useMutation({
    mutationFn: sendEmail,
  })

  const onSubmit = (data: forgotPasswordType) => {
    mutation.mutate(data)
  }

  return (
    <div className="flex flex-col justify-center m-10 items-center gap-4">
      <h2 className="text-xl font-semibold">Forgot Password</h2>

      <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Your Existing Email:</label>
        <input
          type="text"
          {...register("email", { required: "Required" })}
          className="border p-1 rounded"
        />

        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

        <button
          type="submit"
          className="rounded bg-blue-600 text-white p-1 hover:bg-blue-950"
        >
          {mutation.isPending ? "Submitting..." : "Submit"}
        </button>
        {errors.root && <span className="text-red-500">{errors.root.message}</span>}
      </form>

      {/* Modal  */}
      {mutation.isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h3 className="text-lg font-medium mb-4">Check your email</h3>
            <p className="mb-6">We’ve sent you a password reset link.</p>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
