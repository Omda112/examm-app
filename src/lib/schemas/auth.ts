// lib/schemas/auth.ts
import { z } from "zod"

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).nonempty( "Email is required."),
  password: z.string("Password is required.").nonempty("Password is required."),
})

export type LoginValues = z.infer<typeof loginSchema>


export const forgotPasswordSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email({ message: "Please enter a valid email." }),
  })
  
  export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>