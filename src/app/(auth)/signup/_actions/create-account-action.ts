"use server";

import { registerSchema, RegisterValues } from "@/lib/schemas/auth";
import { redirect } from "next/navigation";
import callApi from "../../services/auth";


export async function createAccountAction(values: RegisterValues) {
  // Validate form values using Zod schema
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, message: "Validation failed", errors: parsed.error };
  }

  // Prepare request payload
  const payload = {
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
    email: values.email,
    phone: `${values.phone}`,
    password: values.password,
    rePassword: values.confirmPassword,
  };

  // Send signup request to backend API
  const res = await callApi("/auth/signup", "POST", payload);
  console.log(res);
  // Redirect user to login page on success
  // if (res.ok) {
  //   redirect("/login");
  // }

  // Return API response (errors or data)
  return res;
}
