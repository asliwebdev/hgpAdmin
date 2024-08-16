"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { baseUrl } from "./utils";
import { unstable_noStore as noStore } from 'next/cache';

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

  export async function getUserStatistics() {
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

  export async function getOrders() {
    const token = cookies().get("hgpAdminToken")?.value;
    if (!token) {
      redirect('/');
    }
      try {
        const response = await fetch(`${baseUrl}/api/order/list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          next: { tags: ["orders"] },
        });

        if (!response.ok) {
          return { errorMessage: "Failed to fetch orders" };
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return { errorMessage: "Failed to fetch orders" };
      }
  }

  export async function getOrderStatistics(year: number) {
  const token = cookies().get("hgpAdminToken")?.value;
    if (!token) {
      redirect('/');
    }
      try {
        const response = await fetch(`${baseUrl}/api/order-statis?year=${year}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          next: { tags: ["orderStatistics"] },
        });

        if (!response.ok) {
          return { errorMessage: "Failed to fetch order statistics" };
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return { errorMessage: "Failed to fetch order statistics" };
      }
}

  export async function getMessages() {
    noStore();
    const token = cookies().get("hgpAdminToken")?.value;
    if (!token) {
      redirect('/');
    }
      try {
        const response = await fetch(`${baseUrl}/api/contact/get/messages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          next: { tags: ["messages"] },
        });

        if (!response.ok) {
          return { errorMessage: "Failed to fetch messages" };
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return { errorMessage: "Failed to fetch messages" };
      }
  }

  export async function getMessagesCount() {
    noStore();
    const token = cookies().get("hgpAdminToken")?.value;
    if (!token) {
      redirect('/');
    }
      try {
        const response = await fetch(`${baseUrl}/api/contact/count`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          return { errorMessage: "Failed to fetch messages count" };
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        return { errorMessage: "Failed to fetch messages count" };
      }
  }