"use client";

import { updateUserEmailOtpVerify } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface OtpType {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
  digit5: string;
  digit6: string;
}

interface EmailChangeOtpVerifyFormProps {
  otpVerifyFlag: boolean;
  setOtpVerifyFlag: (value: boolean) => void;
  email: string;
}

const EmailChangeOtpVerifyForm: React.FC<EmailChangeOtpVerifyFormProps> = ({
  otpVerifyFlag,
  setOtpVerifyFlag,
  email,
}) => {
  const [otp, setOtp] = useState<OtpType>({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const toggleModal = () => setOtpVerifyFlag(!otpVerifyFlag);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Mask email for display
  const maskEmail = useCallback((email: string | undefined): string => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    return `${localPart[0]}***${localPart.slice(-2)}@${domain}`;
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (value.length > 1) {
      const otpArray = value.slice(0, 6).split("");
      const updatedOtp = otpArray.reduce((acc, digit, idx) => {
        acc[`digit${idx + 1}` as keyof OtpType] = digit;
        return acc;
      }, {} as OtpType);

      setOtp(updatedOtp);
      inputRefs.current[otpArray.length - 1]?.focus();
      return;
    }

    setOtp((prev) => ({
      ...prev,
      [`digit${index + 1}`]: value,
    }));

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[`digit${index + 1}` as keyof OtpType]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = Object.values(otp).join("");

    try {
      setLoading(true);
      setError(null);

      const response = await updateUserEmailOtpVerify({
        fullOtp,
        email,
      } as any);

      if (!response?.ok) {
        setError(response.error || "Invalid OTP. Please try again.");
      } else {
        toast.success("Email successfully updated.");
        setOtpVerifyFlag(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData("Text");
    if (pastedValue.length === 6) {
      const otpArray = pastedValue.split("");
      const updatedOtp = otpArray.reduce((acc, digit, idx) => {
        acc[`digit${idx + 1}` as keyof OtpType] = digit;
        return acc;
      }, {} as OtpType);

      setOtp(updatedOtp);
      inputRefs.current[5]?.focus();
    }
  };

  return (
    otpVerifyFlag && (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-3 rounded-lg shadow-lg w-full max-w-2xl max-h-full">
          <div className="flex justify-end">
            <button
              onClick={() => setOtpVerifyFlag(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <h2 className="text-3xl font-semibold text-primary mb-4 text-center mt-8 ">
            OTP Verification
          </h2>
          <p className="text-gray-600 mb-2 text-center text-lg">
            We have sent an OTP to:
          </p>
          <p className="text-black font-medium mb-4 text-center">
            {maskEmail(email)}
          </p>

          <h3 className="text-green-500 font-medium text-xl mb-4 text-center">
            {formatTime(timeLeft)}
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="flex space-x-6 my-10 text-black justify-center ">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-12 h-12 text-center border-b-2 border-gray-400 focus:outline-none focus:border-primary text-xl"
                  placeholder="*"
                  maxLength={1}
                  value={otp[`digit${index + 1}` as keyof OtpType]}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  ref={(el: any) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-lg mb-4 text-center">{error}</p>
            )}

            <div className="flex justify-center mb-8">
              <button
                type="submit"
                className="w-[50%] py-2 text-white bg-primary hover:bg-hoverColor rounded-lg text-lg"
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default EmailChangeOtpVerifyForm;
