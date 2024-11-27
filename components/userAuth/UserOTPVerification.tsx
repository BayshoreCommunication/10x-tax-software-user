import React from "react";
import OTPVerificationForm from "./OTPVerificationForm";
import UserSideBar from "./UserSideBar";

const UserOTPVerification = () => {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-[90%] xl:w-[80%] 2xl:w-[70%]">
        <div className="grid grid-cols-3 justify-center items-stretch">
          {/* Left Section */}
          <UserSideBar title={"OTP Verification"} />

          {/* Right Section */}
          <div className="bg-white p-10 col-span-2 rounded-e-xl flex items-center justify-center">
            <div className="w-full max-w-md">
              <OTPVerificationForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserOTPVerification;
