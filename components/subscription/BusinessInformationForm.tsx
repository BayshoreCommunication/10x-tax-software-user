import React from "react";
import { BsCreditCard } from "react-icons/bs";
import { LiaStripe } from "react-icons/lia";
import { BsBank } from "react-icons/bs";
import { FaCcPaypal } from "react-icons/fa6";
import { SlPaypal } from "react-icons/sl";
import { TbEditCircle } from "react-icons/tb";
import Image from "next/image";
import ColorPicker from "../shared/ui/ColorPicker";

const BusinessInformationForm = () => {
  return (
    <div className="py-10 flex items-center justify-center">
      <div className="bg-white  p-12 w-[65%]">
        <h2 className="text-3xl font-bold text-[#11142D] text-left py-4">
          Business Information
        </h2>
        <div className="p-14">
          <div className="">
            <div className="relative w-[150px] h-[150px]">
              <Image
                src="/assets/admin-image/user-image.png"
                alt="User Picture"
                width={150}
                height={150}
                className="absolute inset-0 rounded-full"
              />
              <div className="bg-secondary hover:bg-yellow-500 p-1 flex items-center justify-center w-8 h-8 border border-white rounded-full absolute bottom-6 right-6 translate-x-1/2 translate-y-1/2 cursor-pointer">
                <TbEditCircle className="text-white text-xl" />
              </div>
            </div>
            <h2 className="text-2xl font-medium text-[#11142D] mt-6">
              Choose your logo
            </h2>
          </div>

          <div className="mt-10">
            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Business Website
              </label>

              <input
                autoComplete="off"
                type="email"
                id="email"
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="https://www.exampleurl.com"
              />
            </div>
          </div>

          <div className="flex items-center justify-between space-x-5 py-3">
            <div className="w-full">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Name
              </label>

              <input
                autoComplete="off"
                type="text"
                id="name"
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="Carlos Rosario"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Email
              </label>

              <input
                autoComplete="off"
                type="email"
                id="name"
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="carlosrosario@gmail.com"
              />
            </div>
          </div>

          <div className="flex items-center justify-between space-x-5 py-3">
            <div className="w-full">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Phone Number
              </label>

              <input
                autoComplete="off"
                type="text"
                id="name"
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="+1 353 6789"
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Website
              </label>

              <input
                autoComplete="off"
                type="email"
                id="name"
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder=""
              />
            </div>
          </div>

          <div className="py-3">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-xl font-normal text-gray-900"
            >
              Business Address
            </label>

            <input
              autoComplete="off"
              type="email"
              id="email"
              className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder=""
            />
          </div>

          <div className="py-3">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-xl font-normal text-gray-900"
            >
              Choose Your Brand Color
            </label>
            <ColorPicker />
          </div>

          <div className="py-8 flex justify-center items-center mx-0">
            <button
              type="submit"
              className="text-white bg-primary hover:bg-[#be9837] font-medium rounded-lg text-lg px-5 py-3 w-[50%] "
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInformationForm;
