"use server";
import { auth } from "@/auth";
import { revalidateTag } from "next/cache";

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
      search: search,
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
        next: {
          tags: ["clientDataCreate", "clientDataDelete", "clientDataUpdate"],
        },
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

    revalidateTag("clientDataCreate");

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

export async function updateClientData(
  id: string,
  formData: FormData
): Promise<{ error: string; ok: boolean }> {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/client-details${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${session?.user?.accessToken}`,
        },
        body: JSON.stringify(formData),
      }
    );

    revalidateTag("clientDataUpdate");

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

export async function clientDeletedById(id: string): Promise<UserDataResponse> {
  const session = await auth();

  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
      data: null,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/client-details/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session.user.accessToken}`,
        },
      }
    );
    revalidateTag("clientDataDelete");

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete client:", errorData);
      return {
        error: errorData?.message || "Failed to delete client.",
        ok: false,
        data: null,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      data: data?.payload || null,
    };
  } catch (error) {
    console.error("Error deleting client:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
      data: null,
    };
  }
}

export async function taxProposalSend(
  formData: FormData
): Promise<{ error: string; ok: boolean }> {
  const file = formData.get("image");
  // Retrieve the user session to check if authenticated
  const session = await auth();

  // Check for authentication and access token

  // if (!file || typeof file === "string") {
  //   return { message: "Invalid file", status: 400 };
  // }

  try {
    // Make the API request to update user data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tax-proposal`,
      {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: ` ${session?.user?.accessToken}`,
        },
        body: formData,
      }
    );

    revalidateTag("userDataUpdate");

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Failed to update user data.",
        ok: false,
      };
    }

    // Parse the response data if the update is successful
    const data = await response.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    // Log unexpected errors
    console.error("Error updating user data:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
    };
  }
}
