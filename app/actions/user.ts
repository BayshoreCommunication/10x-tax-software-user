"use server";

import { auth } from "@/auth";

interface UserDataResponse {
  error?: string;
  ok: boolean;
  data?: any;
}

export async function getUserData(): Promise<UserDataResponse> {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${session?.user?.accessToken || ""}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Failed to fetch user data.",
        ok: false,
      };
    }

    const data = await response.json();
    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
      ok: false,
    };
  }
}

export async function updateUserData(
  formData: FormData
): Promise<{ message: string; status: number }> {
  const file = formData.get("image");
  // Retrieve the user session to check if authenticated
  const session = await auth();

  // Check for authentication and access token
  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
    };
  }

  // console.log("check this data value 63", session);

  // if (!file || typeof file === "string") {
  //   return { message: "Invalid file", status: 400 };
  // }

  try {
    // Make the API request to update user data
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/update-user`,
      {
        method: "PUT",
        headers: {
          // "Content-Type": "application/json",
          Authorization: ` ${session.user.accessToken}`,
        },
        body: formData,
      }
    );

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

export async function userImageUpload(
  formData: FormData
): Promise<{ message: string; status: number }> {
  const file = formData.get("image");

  const session = await auth();

  // Check for authentication and access token
  if (!session?.user?.accessToken) {
    return {
      error: "User is not authenticated.",
      ok: false,
    };
  }

  if (!file || typeof file === "string") {
    return { message: "Invalid file", status: 400 };
  }

  const response = await fetch("http://localhost:8000/api/update-user", {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    return { message: "Failed to upload image", status: response.status };
  }

  return { message: "Image uploaded successfully", status: 200 };
}