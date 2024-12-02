"use client";

import { credentialLogin } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeOff, LuLock, LuUsers2 } from "react-icons/lu";

const SigninForm = ({ setUserSignInOtpFlag, setUserSignInInfo }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const router = useRouter();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null); // Reset error on new attempt

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await credentialLogin(formData);

      if (response.error) {
        setError(response.error.message || "Invalid login credentials.");
      } else {
        setUserSignInOtpFlag(true);
        setUserSignInInfo(response);
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again later.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-semibold text-3xl text-primary mb-6">
        Sign in to your account
      </h2>

      {/* Error Display */}
      {error && (
        <div className="text-xl text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={onSubmit}>
        {/* Email Input */}
        <div className="py-3">
          <label
            htmlFor="email"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            Email<span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LuUsers2 className="text-primary text-lg" />
            </div>
            <input
              autoComplete="off"
              type="email"
              id="email"
              name="email"
              className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 py-2 placeholder-gray-400 outline-none"
              placeholder="example@gmail.com"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="py-3">
          <label
            htmlFor="password"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            Password<span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LuLock className="text-primary text-lg" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 py-2 placeholder-gray-400 outline-none"
              placeholder="*********"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <LuEye className="text-primary text-lg" />
              ) : (
                <LuEyeOff className="text-primary text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Links */}
        <div className="flex items-center justify-between mt-3 mb-8">
          <div>
            <h3 className="text-lg font-normal text-gray-900">
              Don’t have an account?{" "}
              <Link href="/sign-up" className="text-primary">
                Signup
              </Link>
            </h3>
          </div>
          <div>
            <Link href="/" className="text-lg font-normal text-primary">
              Forget your password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="py-3">
          <button
            type="submit"
            disabled={loading}
            className={`text-white font-medium rounded-lg text-lg px-5 py-3 w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-[#be9837]"
            }`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
