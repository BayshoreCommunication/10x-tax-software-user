"use client";

import { credentialLoginOtpCheck } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type OtpType = {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
  digit5: string;
  digit6: string;
};

type UserSignInInfoType = {
  email: string;
  password: string;
  userOtp: string | undefined;
} | null;

type Props = {
  userSignInOtpFlag: boolean;
  userSignInInfo: UserSignInInfoType;
};

const OTPVerificationForm = ({ userSignInOtpFlag, userSignInInfo }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const [otp, setOtp] = useState<OtpType>({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (value.length === 6) {
      const otpArray = value.split("");
      const updatedOtp: OtpType = {
        digit1: otpArray[0],
        digit2: otpArray[1],
        digit3: otpArray[2],
        digit4: otpArray[3],
        digit5: otpArray[4],
        digit6: otpArray[5],
      };
      setOtp(updatedOtp);

      inputRefs.current[5]?.focus();
      return;
    }

    setOtp((prevOtp) => ({
      ...prevOtp,
      [`digit${index + 1}`]: value,
    }));

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[`digit${index + 1}` as keyof OtpType]) {
      inputRefs.current?.[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullOtp = `${otp.digit1}${otp.digit2}${otp.digit3}${otp.digit4}${otp.digit5}${otp.digit6}`;

    try {
      setLoading(true);

      if (fullOtp === userSignInInfo?.userOtp) {
        // Constructing FormData
        const formData = new FormData();
        formData.append("email", userSignInInfo.email);
        formData.append("password", userSignInInfo.password);

        const response = await credentialLoginOtpCheck(formData);

        if (!response) {
          setError("Invalid login OTP.");
        } else {
          router.push("/");
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Error during login:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="font-semibold text-3xl text-primary mb-6">
        OTP Verification
      </h2>

      <p className="font-light text-lg text-gray-600">
        We have sent an OTP to this email
      </p>
      <p className="font-normal text-lg text-black">s***78@gmail.com</p>

      <h3 className="text-green-400 font-medium text-2xl my-3">
        {formatTime(timeLeft)}
      </h3>

      <form className="" onSubmit={handleSubmit}>
        <div className="flex space-x-6 my-5 text-black">
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
              ref={(el: any) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>

        {/* Error Display */}
        {error && (
          <div className="text-lg text-red-400 my-4">
            <p>{error}</p>
          </div>
        )}

        <div className="py-3">
          <button
            type="submit"
            className="text-white bg-primary hover:bg-[#be9837] font-medium rounded-lg text-lg px-5 py-3 w-[70%]"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5 text-gray-300 animate-spin fill-white"
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
              <p>Submit</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerificationForm;
