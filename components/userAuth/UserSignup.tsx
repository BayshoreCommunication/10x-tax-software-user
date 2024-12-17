"use client";

import { useState } from "react";
import SignupForm from "./SignupForm";
import SignupOtpVerification from "./SignupOtpVerification";
import UserSideBar from "./UserSideBar";

interface UserSignUpInfo {
  email: string | undefined;
  otp: string | undefined;
}

const UserSignup = () => {
  const [userSignUpOtpFlag, setUserSignUpOtpFlag] = useState<boolean>(false);
  const [userSignUpInfo, setUserSignUpInfo] = useState<UserSignUpInfo | null>(
    null
  );

  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-[90%] xl:w-[80%] 2xl:w-[70%]">
        <div className="grid grid-cols-3 justify-center items-stretch">
          {/* Left Section */}
          <UserSideBar title={"Sign Up"} />

          {/* Right Section */}
          <div className="bg-white p-10 col-span-2 rounded-e-xl flex items-center justify-center">
            <div className="w-full">
              {userSignUpOtpFlag ? (
                <SignupOtpVerification
                  userSignUpInfo={userSignUpInfo}
                  userSignUpOtpFlag={userSignUpOtpFlag}
                />
              ) : (
                <SignupForm
                  setUserSignUpOtpFlag={setUserSignUpOtpFlag}
                  setUserSignUpInfo={setUserSignUpInfo}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSignup;
