"use client";

import { updateUserEmail } from "@/app/actions/user";
import { memo, useCallback, useState } from "react";
import { TbEditCircle } from "react-icons/tb";
import EmailChangeOtpVerifyForm from "./EmailChangeOtpVerifyForm";

interface Props {
  userData: { email?: string };
  userEmailUpdateFlag: boolean;
  setUserInfoUpdateFlag: (val: boolean) => void;
  setUserEmailUpdateFlag: (val: boolean) => void;
  setUserPasswordUpdateFlag: (val: boolean) => void;
}

const EmailUpdateForm = memo(
  ({
    userData,
    userEmailUpdateFlag,
    setUserInfoUpdateFlag,
    setUserEmailUpdateFlag,
    setUserPasswordUpdateFlag,
  }: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [otpVerifyFlag, setOtpVerifyFlag] = useState(false);

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
          setError("Email is required.");
          return;
        }

        try {
          setLoading(true);
          setError(null);

          const response = await updateUserEmail({ email });

          if (!response.ok) {
            setError(response.error || "Invalid Email. Please try again.");
          } else {
            setOtpVerifyFlag(true);
            setUserEmailUpdateFlag(false);
          }
        } catch (err) {
          console.error("Error in handleSubmit:", err);
          setError("An unexpected error occurred. Please try again later.");
        } finally {
          setLoading(false);
        }
      },
      [email, setUserEmailUpdateFlag]
    );

    const inputClasses =
      "bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400 active:border-primary outline-none";
    const buttonClasses =
      "px-4 py-2 border-2 text-white rounded-md font-medium text-base bg-primary hover:bg-hoverColor hover:text-white w-[140px]";

    return (
      <div>
        <div className="pt-10 pb-4 flex items-center px-6 space-x-3">
          <h2 className="text-2xl font-medium text-[#000000]">
            Change Your Email
          </h2>
          <button onClick={() => setUserEmailUpdateFlag(true)}>
            <TbEditCircle className="text-edit text-2xl hover:text-hoverColor cursor-pointer" />
          </button>
        </div>

        <div className="relative overflow-x-auto max-w-[780px]">
          <table className="w-full text-left rtl:text-right text-xl font-medium">
            <tbody>
              <tr className="bg-white">
                <td className="px-6 py-3 text-[#666666] w-[30%]">Email</td>
                <td className="px-6 py-3 text-[#11142D]">
                  {userEmailUpdateFlag ? (
                    <input
                      autoComplete="off"
                      type="email"
                      className={inputClasses}
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                    />
                  ) : (
                    <input
                      autoComplete="off"
                      type="text"
                      readOnly
                      className={inputClasses}
                      value={userData?.email || ""}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          {error && <p className="text-red-500 text-lg mt-2 px-6">{error}</p>}

          {userEmailUpdateFlag && (
            <div className="mx-6 mt-6 space-x-4 flex items-center">
              <button
                onClick={() => setUserEmailUpdateFlag(false)}
                className={buttonClasses}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className={buttonClasses}
                disabled={loading}
              >
                {loading ? <LoadingSpinner /> : "Update"}
              </button>
            </div>
          )}
        </div>

        <EmailChangeOtpVerifyForm
          otpVerifyFlag={otpVerifyFlag}
          setOtpVerifyFlag={setOtpVerifyFlag}
          email={email}
        />
      </div>
    );
  }
);

const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center space-x-2">
    <svg
      aria-hidden="true"
      className="w-4 h-4 text-gray-300 animate-spin fill-white"
      viewBox="0 0 100 101"
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
    <p>Updating...</p>
  </div>
));

export default EmailUpdateForm;
