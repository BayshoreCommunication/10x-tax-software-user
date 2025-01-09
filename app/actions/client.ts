"use server";

import { auth } from "@/auth";

interface UserDataResponse {
  error?: string;
  ok: boolean;
  data?: any;
}

// Get all client data

export async function getAllClientData(
  search: string = "",
  page: number = 1,
  limit: number = 10000
): Promise<UserDataResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
    };
  }

  try {
    const query = new URLSearchParams({
      search,
      page: page.toString(),
      limit: limit.toString(),
    }).toString();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/all-client-details?${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.accessToken}`,
        },
        // next: { tags: ["clientDataCreate"], revalidate: 360 },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch user data:", errorData);
      return {
        error: errorData?.message || "Failed to fetch user data.",
        ok: false,
        data: null,
      };
    }

    const data = await response.json();

    return {
      ok: true,
      data: data?.payload || null,
    };
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return {
      error:
        error?.message ||
        "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}

export async function createClientData(
  formData: FormData
): Promise<{ error: string; ok: boolean }> {
  const session = await auth();



  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/client-details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(formData),
      }
    );

    // revalidateTag("clientDataCreate");

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Failed to create client data.",
        ok: false,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error("Error create client data.", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
    };
  }
}
