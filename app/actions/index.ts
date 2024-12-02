"use server";

import { signIn, signOut } from "@/auth";
import { getUserByEmail } from "@/config/users";

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

export async function credentialLogin(formData: FormData): Promise<
  | {
      error?: string;
      ok: boolean;
      email?: string;
      password?: string;
      userOtp?: string;
    }
  | undefined
> {
  console.log("formData", formData);

  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return { error: "Email and password are required.", ok: false };
  }

  try {
    const user = await getUserByEmail(email);

    if (user) {
      const isMatch = user.password === password;

      if (isMatch) {
        return {
          email: user.email,
          password: user.password,
          userOtp: "123456",
          ok: true,
        };
      } else {
        return { error: "Incorrect password.", ok: false };
      }
    } else {
      return { error: "User not found.", ok: false };
    }
  } catch (err) {
    console.error("Error during credential login:", err);
    return { error: "An unexpected error occurred.", ok: false };
  }
}

export async function credentialLoginOtpCheck(
  formData: FormData
): Promise<{ error?: string; ok: boolean; url?: string } | undefined> {
  console.log("formData", Object.fromEntries(formData.entries())); // Debugging

  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return response;
  } catch (err) {
    console.error("Error during credential login:", err);
    throw new Error("Failed to login. Please check your credentials.");
  }
}
