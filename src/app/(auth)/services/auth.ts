"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ForgotPasswordValues,
  registerSchema,
  RegisterValues,
} from "@/lib/schemas/auth";

const API_BASE = "https://exam.elevateegy.com/api/v1";

export default async function callApi(
  path: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH",
  body?: any
) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data?.message || "Request failed";
      return { ok: false, message: msg };
    }
    return { ok: true, data };
  } catch (e: any) {
    return { ok: false, message: e?.message || "Network error" };
  }
}


export async function forgetPasswordAction(values: ForgotPasswordValues) {
  const email = String(values.email || "").trim();
  const payload = { email };

  const res = await callApi("/auth/forgotPassword", "POST", payload);

  if (res.ok) {
    cookies().set("reset_email", email, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    redirect("/otp");
  }
  return res;
}

export async function verifyResetCodeAction(formData: FormData) {
  const fromInputs = ["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"]
    .map((n) => String(formData.get(n) ?? ""))
    .join("");

  const raw = String(
    formData.get("code") || formData.get("resetCode") || fromInputs || ""
  ).replace(/\D/g, "");

  if (raw.length !== 6) {
    return { ok: false, message: "Invalid or missing 6-digit code" };
  }

  const payload = { resetCode: raw };
  const res = await callApi("/auth/verifyResetCode", "POST", payload);
  if (res.ok) {
    redirect("/reset-password");
  }
  return res;
}

export async function resendCodeAction() {

  const cookieStore = cookies();
  const email = cookieStore.get("reset_email")?.value?.trim() || "";

  if (!email) {
    return { ok: false, message: "Reset email not found. Please start again." };
  }

  const payload = { email };

  const res = await callApi("/auth/forgotPassword", "POST", payload);

  return res;
}
