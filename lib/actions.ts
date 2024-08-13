"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema } from "./validations";
import { baseUrl } from "./utils";
import { revalidatePath } from "next/cache";

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
      cookieStore.set({
        name: "hgpAdminRole",
        value: responseData?.role,
        path: "/",
        httpOnly: true,
        sameSite: "strict",
      });
    } catch (error) {
      return { errorMessage: "Failed to login user! Please check your credentials" };
    }
    redirect("/dashboard")
  }

  export async function deleteCookie() {
    try {
      cookies().delete("hgpAdminToken");
      return { message: "You are logging out..." };
    } catch (error) {
      return { error: "Something went wrong" };
    }
  }

type UserActionProps = { 
  userId: number;
  enabled: boolean;
}
  export async function UserAction({userId, enabled}: UserActionProps) {
    try {
      const token = cookies().get("hgpAdminToken")?.value;
      if (!token) {
        redirect('/');
      }
      const response = await fetch(`${baseUrl}/api/admin/enable-disable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId, enabled}),
      });
  
      if (!response.ok) {
        return { errorMessage: "Failed to perform action" };
      }
    } catch (error) {
      return { errorMessage: "Failed to perform action" };
    }
    revalidatePath("/dashboard/users");
  }