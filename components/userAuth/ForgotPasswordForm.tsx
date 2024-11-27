"use client";
import React, { useState } from "react";
import { LuUsers2, LuLock, LuEyeOff, LuEye } from "react-icons/lu";
import { Checkbox } from "@nextui-org/react";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div>
      <h2 className="font-semibold text-3xl text-primary mb-6">
        Forget Password
      </h2>

      <form className="max-w-2xl mx-auto">
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

        {/* Submit Button */}
        <div className="py-3">
          <button
            type="submit"
            className="text-white bg-primary hover:bg-[#be9837] font-medium rounded-lg text-lg px-5 py-3 w-full"
          >
            Get Code
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
