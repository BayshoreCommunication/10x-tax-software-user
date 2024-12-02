import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "./config/users";

export const { auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const user = getUserByEmail(credentials?.email);
          if (user) {
            const isMatch = user?.password === credentials.password;

            if (isMatch) {
              // Redirect to OTP verification if password is correct
              return { ...user, otpRequired: true };
            } else {
              throw new Error("Email or Password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          throw new Error(
            error.message || "An error occurred during authorization."
          );
        }
      },
    }),
  ],
});
