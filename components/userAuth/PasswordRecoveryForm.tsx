"use client";
import { userForgetPasswordRecovery } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeOff, LuLock } from "react-icons/lu";
import { toast } from "react-toastify";

type UserForgotPasswordInfo = {
  email?: string;
} | null;

type Props = {
  userForgotPasswordInfo: UserForgotPasswordInfo;
};

const PasswordRecoveryForm = ({ userForgotPasswordInfo }: Props) => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleVisibility = (type: "password" | "confirmPassword"): void => {
    if (type === "password") {
      setPasswordVisibility((prev) => !prev);
    } else {
      setConfirmPasswordVisibility((prev) => !prev);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userForgotPasswordInfo?.email) {
      setError("Email is required for password recovery.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("email", userForgotPasswordInfo?.email);
      formData.append("newPassword", newPassword);

      const response = await userForgetPasswordRecovery(formData);

      if (!response.ok) {
        setError(response.error || "An unexpected error occurred.");
      } else {
        router.push("/sign-in");
        toast.success("Successfully Password Recovery", {
          position: "top-center",
        });
      }
    } catch (e) {
      console.error("Error during password recovery:", e);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-3xl text-primary mb-6">
        Password Recovery
      </h2>

      <form onSubmit={handleSubmit}>
        {/* New Password Input */}
        <div className="py-3">
          <label
            htmlFor="new-password-input"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            New Password<span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LuLock className="text-primary text-lg" />
            </div>
            <input
              type={passwordVisibility ? "text" : "password"}
              id="new-password-input"
              className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 py-3 placeholder-gray-400 outline-none"
              placeholder="*********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => toggleVisibility("password")}
            >
              {passwordVisibility ? (
                <LuEye className="text-primary text-lg" />
              ) : (
                <LuEyeOff className="text-primary text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="py-3">
          <label
            htmlFor="confirm-password-input"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            Confirm Password<span className="text-primary">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LuLock className="text-primary text-lg" />
            </div>
            <input
              type={confirmPasswordVisibility ? "text" : "password"}
              id="confirm-password-input"
              className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 py-3 placeholder-gray-400 outline-none"
              placeholder="*********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => toggleVisibility("confirmPassword")}
            >
              {confirmPasswordVisibility ? (
                <LuEye className="text-primary text-lg" />
              ) : (
                <LuEyeOff className="text-primary text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Submit Button */}
        <div className="py-3">
          <button
            type="submit"
            disabled={loading}
            className={`text-white font-medium rounded-lg text-lg px-5 py-3 w-full bg-primary hover:bg-hoverColor`}
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
                <p>Resetting Password...</p>
              </div>
            ) : (
              <p>Reset Password</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordRecoveryForm;
