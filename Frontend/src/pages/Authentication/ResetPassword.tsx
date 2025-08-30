import { useMutation } from "@tanstack/react-query"
import api from "../../config/Axios/axios.config"
import { useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPass } from "../../config/zod/schema";

interface DataParams {
  token: string
  password: string
}

const resetPasswordFn = async ({ token, password }: DataParams) => {
  const response = await api.post(`/auth/reset-password/${token}`, { password })
  return response.data
}

const ResetPassword = () => {
  const navigate = useNavigate()
  const { token } = useParams()

  const {handleSubmit, register, formState: {errors}} = useForm({
    resolver: zodResolver(resetPass)
  })

  const mutation = useMutation({
    mutationFn: resetPasswordFn,
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login")
      }, 1000)
    },
    onError: (err: any) => {
      console.error(err)
      alert("Password reset failed. Try again.")
    },
  })

  const onSubmit = (data: {password: string}) => {
    mutation.mutate({ token: token!, password: data.password })
  }

  return (
    <div className="flex flex-col gap-3 items-center m-10">
      <h1 className="text-blue-600 text-2xl">Reset Password</h1>

      <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password">New Password:</label>
        <input type="password" 
          {...register("password", {
            required: "Required"
          })} className="border" />

        {errors.password && <span className="text-red-500"> {errors.password.message}</span>}

        <button className="text-white bg-blue-600 hover:bg-blue-800 p-1 rounded" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Resetting & Redirecting" : "Reset"}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
