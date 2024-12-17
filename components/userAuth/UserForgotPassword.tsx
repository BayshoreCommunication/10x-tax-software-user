"use client";

import { useState } from "react";
import ForgetPasswordOtpVerificationForm from "./ForgetPasswordOtpVerificationForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import UserSideBar from "./UserSideBar";

interface UserForgotPassword {
  email: string;
}

const UserForgotPassword = () => {
  const [userForgotPasswordOtpFlag, setUserForgotPasswordFlag] =
    useState<boolean>(false);

  const [userForgotPasswordRecovery, setUserForgotPasswordRecovery] =
    useState<boolean>(false);

  const [userForgotPasswordInfo, setUserForgotPasswordInfo] =
    useState<UserForgotPassword | null>(null);

  console.log(
    "check otp password",
    userForgotPasswordOtpFlag,
    userForgotPasswordRecovery,
    userForgotPasswordInfo
  );

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-[90%] xl:w-[80%] 2xl:w-[70%]">
        <div className="grid grid-cols-3 justify-center items-stretch">
          {/* Left Section */}
          <UserSideBar
            title={
              userForgotPasswordOtpFlag
                ? "OTP Verification"
                : userForgotPasswordRecovery
                  ? "Password Recovery"
                  : "Forgot Password"
            }
          />

          {/* Right Section */}
          <div className="bg-white p-10 col-span-2 rounded-e-xl flex items-center justify-center">
            <div className="w-full">
              {userForgotPasswordOtpFlag ? (
                <ForgetPasswordOtpVerificationForm
                  setUserForgotPasswordRecovery={setUserForgotPasswordRecovery}
                  setUserForgotPasswordFlag={setUserForgotPasswordFlag}
                  userForgotPasswordInfo={userForgotPasswordInfo}
                />
              ) : userForgotPasswordRecovery ? (
                <PasswordRecoveryForm
                  userForgotPasswordInfo={userForgotPasswordInfo}
                />
              ) : (
                <ForgotPasswordForm
                  setUserForgotPasswordFlag={setUserForgotPasswordFlag}
                  setUserForgotPasswordInfo={setUserForgotPasswordInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserForgotPassword;
