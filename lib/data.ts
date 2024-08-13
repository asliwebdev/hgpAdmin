import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { baseUrl } from "./utils";

export async function getUsers() {
  const token = cookies().get("hgpAdminToken")?.value;
  if (!token) {
    redirect('/');
  }
    try {
      const response = await fetch(`${baseUrl}/api/admin/user/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["users"] },
      });
  
      if (!response.ok) {
        return { errorMessage: "Failed to fetch users" };
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return { errorMessage: "Failed to fetch users" };
    }
  }

  export async function getStatistics() {
    const token = cookies().get("hgpAdminToken")?.value;
    if (!token) {
      redirect('/');
    }
      try {
        const response = await fetch(`${baseUrl}/api/admin/user-statis`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          next: { tags: ["statistics"] },
        });
    
        if (!response.ok) {
          return { errorMessage: "Failed to fetch statistics" };
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return { errorMessage: "Failed to fetch statistics" };
      }
  }