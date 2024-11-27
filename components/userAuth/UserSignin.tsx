"use client";
import React from "react";
import Image from "next/image";
import SigninForm from "./SigninForm";
import UserSideBar from "./UserSideBar";

const UserSignin = () => {
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="w-[90%] xl:w-[80%] 2xl:w-[70%]">
        <div className="grid grid-cols-3 justify-center items-stretch">
          {/* Left Section */}
          <UserSideBar title={"Welcome Back!"} />

          {/* Right Section */}
          <div className="bg-white p-10 col-span-2 rounded-e-xl flex items-center justify-center">
            <div className="w-full">
              <SigninForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSignin;
