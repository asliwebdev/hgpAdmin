"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema } from "./validations";

const baseUrl = "https://amused-bison-equipped.ngrok-free.app"

export async function login(prevState: {errorMessage: string} | undefined, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    login: formData.get('login'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errorMessage: "Missing fields. Failed to login.",
    };
  }

    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedFields.data),
      });
  
      if (!response.ok) {
        return { errorMessage: "Failed to login user! Please check your credentials" };
      }
      const responseData = await response.json();
  
      const cookieStore = cookies();
      cookieStore.set({
        name: "hgpAdminToken",
        value: responseData?.token,
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
    } catch (error) {
      return { errorMessage: "Failed to login user! Please check your credentials" };
    }
    redirect("/dashboard")
  }