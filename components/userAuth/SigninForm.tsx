"use client";
import React, { useState } from "react";
import { LuUsers2, LuLock, LuEyeOff, LuEye } from "react-icons/lu";
import { Checkbox } from "@nextui-org/react";
import Link from "next/link";

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div>
      <h2 className="font-semibold text-3xl text-primary mb-6">
        Sign in to you account
      </h2>

      <form className="">
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
              <LuUsers2 className="text-primary text-lg" />
            </div>
            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 py-3 placeholder-gray-400  active:border-primary outline-none"
              placeholder="carlosrosario@gmail.com"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="py-3">
          <label
            htmlFor="password-input"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            Password<span className="text-primary">*</span>
          </label>
          <div className="relative">
            {/* Lock Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <LuLock className="text-primary text-lg" />
            </div>
            {/* Password Input */}
            <input
              type={showPassword ? "text" : "password"}
              id="password-input"
              className="bg-white border border-gray-300 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 py-3 placeholder-gray-400  active:border-primary outline-none"
              placeholder="*********"
            />
            {/* Eye Icon */}
            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <LuEye className="text-primary text-lg" />
              ) : (
                <LuEyeOff className="text-primary text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between mt-3 mb-8">
          <div className="">
            <h3 className="text-lg font-normal text-gray-900">
              Don’t have an account? <Link href={"/sign-up"}>Signup</Link>
            </h3>
          </div>
          <div className="">
            <Link href={"/"} className="text-lg font-normal text-primary">
              Forget your password?
            </Link>
          </div>
        </div>

        {/* Submit Button */}
        <div className="py-3">
          <button
            type="submit"
            className="text-white bg-primary hover:bg-[#be9837] font-medium rounded-lg text-lg px-5 py-3 w-full"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
