"use client";

import { userForgetPasswordProcess } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuUsers } from "react-icons/lu";

interface UserForgotPasswordInfo {
  email: string;
}

interface UserForgotPasswordInfoProps {
  setUserForgotPasswordFlag: (flag: boolean) => void;
  setUserForgotPasswordInfo: (info: UserForgotPasswordInfo) => void;
}

const ForgotPasswordForm: React.FC<UserForgotPasswordInfoProps> = ({
  setUserForgotPasswordFlag,
  setUserForgotPasswordInfo,
}) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous error
    setError(null);

    // Validate email
    if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      // Prepare form data
      const formData = new FormData();
      formData.append("email", userEmail);

      const response = await userForgetPasswordProcess(formData);

      if (response.ok) {
        // Update parent state with email information
        setUserForgotPasswordInfo({
          email: userEmail,
        });
        setUserForgotPasswordFlag(true);
      } else {
        setError(response.error || "Failed to process your request.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Error during password recovery:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-3xl text-primary mb-6">
        Forget Password
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="py-3">
          <label
            htmlFor="email-address-icon"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            Email<span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LuUsers className="text-primary text-lg" />
            </div>
            <input
              autoComplete="off"
              type="email"
              id="email-address-icon"
              className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 py-2 placeholder-gray-400 active:border-primary outline-none"
              placeholder="carlosrosario@gmail.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Submit Button */}
        <div className="py-3">
          <button
            type="submit"
            disabled={loading}
            className={`text-white bg-primary hover:bg-hoverColor font-medium rounded-lg text-lg px-5 py-3 w-full ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-300 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
                <p>Loading</p>
              </div>
            ) : (
              <p>Get Code</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
