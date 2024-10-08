"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginSchema } from "./validations";
import { baseUrl } from "./utils";
import {revalidatePath, revalidateTag} from "next/cache";

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
  export async function userAction({userId, enabled}: UserActionProps) {
    const token = cookies().get("hgpAdminToken")?.value;
      if (!token) {
        redirect('/');
      }
    try {
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

  export async function addAdmin(formData: FormData) {
    const validatedFields = LoginSchema.safeParse({
      login: formData.get('login'),
      password: formData.get('password'),
    });
  
    if (!validatedFields.success) {
      return {
        errorMessage: "Missing fields. Failed to add admin.",
      };
    }

    const token = cookies().get("hgpAdminToken")?.value;
      if (!token) {
        redirect('/');
      }

    try {
      const response = await fetch(`${baseUrl}/api/admin/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validatedFields.data),
      });
  
      if (!response.ok) {
        return { errorMessage: "Failed to add admin." };
      }
      return {message: "Admin added successfully"}
    } catch (error) {
      return { errorMessage: "Failed to add admin." };
    }
  }

  export async function makeDelivered(userId: number) {
    const token = cookies().get("hgpAdminToken")?.value;
      if (!token) {
        redirect('/');
      }
    try {
      const response = await fetch(`${baseUrl}/api/delivered?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return { errorMessage: "Failed to perform action" };
      }
    } catch (error) {
      return { errorMessage: "Failed to perform action" };
    }
    revalidateTag("orders");
  }

  export async function makeMessageRead(userId: number, id: number) {
    const token = cookies().get("hgpAdminToken")?.value;
      if (!token) {
        redirect('/');
      }
    try {
      const response = await fetch(`${baseUrl}/api/contact/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId, messageId: id}),
      });

      if (!response.ok) {
        return { errorMessage: "Failed to make message read" };
      }
    } catch (error) {
      return { errorMessage: "Failed to make message read" };
    }
    revalidatePath("/dashboard/messages");
  }