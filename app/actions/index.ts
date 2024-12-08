"use server";

import { signIn, signOut } from "@/auth";

export async function socialAuthLogin(formData: FormData): Promise<void> {
  const action = formData.get("action") as string | null;

  if (!action) {
    throw new Error("Action is required for social login.");
  }

  await signIn(action, { redirectTo: "/" });
}

export async function userLogOut(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
export async function credentialLogin(formData: FormData): Promise<{
  error?: string;
  ok: boolean;
  email?: string;
  userOtp?: string;
}> {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // Validate inputs
  if (!email || !password) {
    return { error: "Email and password are required.", ok: false };
  }

  // Check API URL
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined in environment variables.");
    return {
      error: "Internal server error. Please try again later.",
      ok: false,
    };
  }

  try {
    // Use POST method to send credentials
    const response = await fetch(`${apiUrl}/api/user/login`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Send data in the body
    });

    // Check if response is successful
    if (!response.ok) {
      const errorData = await response.json();
      return {
        error: errorData?.message || "Authentication failed.",
        ok: false,
      };
    }

    const data = await response.json();

    return {
      ok: true,
      email: data.email,
      userOtp: data.userOtp,
    };
  } catch (err) {
    console.error("Error during credential login:", err);
    return {
      error: "An unexpected error occurred. Please try again.",
      ok: false,
    };
  }
}

export async function credentialLoginOtpCheck(
  formData: FormData
): Promise<{ error?: string; ok: boolean; url?: string }> {
  console.log("FormData Entries:", Object.fromEntries(formData.entries())); // Debugging

  const email = formData.get("email") as string | null;
  const otp = formData.get("otp") as string | null;

  // Validate input
  if (!email || !otp) {
    return { error: "Email and otp are required.", ok: false };
  }

  try {
    // Call NextAuth signIn with credentials
    const response = await signIn("credentials", {
      email,
      otp,
      redirect: false, // Prevent automatic redirection
    });

    // Ensure a valid response is returned
    if (!response) {
      return {
        error: "Unexpected error: No response from signIn.",
        ok: false,
      };
    }

    if (!response.ok) {
      return {
        error: response.error || "Invalid login credentials.",
        ok: false,
      };
    }

    // Successful login
    return {
      ok: true,
      url: response.url, // Redirect URL if provided
    };
  } catch (err) {
    console.error("Error during credential login:", err);
    return {
      error: "An unexpected error occurred during login.",
      ok: false,
    };
  }
}
