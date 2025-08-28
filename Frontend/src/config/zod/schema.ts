import * as z from "zod"

export const signupFormSchema = z.object({
  username: z.string()
    .max(10, { message: "Max of 10 characters" })
    .min(4, { message: "Minimum length of 4 characters" }),
  email: z.string().email("Invalid email"),
  password: z.string()
    .min(5, { message: "Minimum length of 5" })
    .max(20, { message: "Maximum length of 20" })
})

export type userFormElements = z.infer<typeof signupFormSchema>


//------------------- login below--------------------

export const loginFormSchema = z.object({
    username: z.string().min(4, {message:"Min of 4 characters"}).max(15, {message: "maximum of 15 characters"}),
    password: z.string()
})

export type loginFormElements = z.infer<typeof loginFormSchema>