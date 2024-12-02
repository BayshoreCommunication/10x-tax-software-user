"use client";
import { credentialLoginOtpCheck } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const OTPVerificationForm = ({ userSignInOtpFlag, userSignInInfo }: any) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const [otp, setOtp] = useState({
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
      const updatedOtp = {
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
    if (e.key === "Backspace" && !otp[`digit${index + 1}`]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullOtp = `${otp.digit1}${otp.digit2}${otp.digit3}${otp.digit4}${otp.digit5}${otp.digit6}`;

    try {
      setLoading(true);

      if (fullOtp === userSignInInfo.userOtp) {
        // Constructing FormData
        const formData = new FormData();
        formData.append("email", userSignInInfo.email);
        formData.append("password", userSignInInfo.password);

        const response = await credentialLoginOtpCheck(formData);

        if (!response) {
          setError(response.error || "Invalid login OTP.");
        } else if (response) {
          router.push("/");
        } else {
          setError("Login failed. Please try again.");
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
              maxLength={6}
              ref={(el) => (inputRefs.current[index] = el)}
              value={otp[`digit${index + 1}`]}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPVerificationForm;
