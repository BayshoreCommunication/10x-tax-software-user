import React from "react";
import { BsCreditCard } from "react-icons/bs";
import { LiaStripe } from "react-icons/lia";
import { BsBank } from "react-icons/bs";
import { FaCcPaypal } from "react-icons/fa6";
import { SlPaypal } from "react-icons/sl";

const SubscriptionPaymentForm = () => {
  return (
    <div className="py-10 flex items-center justify-center">
      <div className="bg-white  p-12 w-[65%]">
        <h2 className="text-3xl font-bold text-[#11142D] text-left py-4">
          Choose Your Payment Method
        </h2>
        <div className="p-14">
          <div className="mb-5">
            <h4 className="text-2xl font-medium text-[#11142D] text-left py-2">
              Contact Info
            </h4>

            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Email
              </label>

              <input
                autoComplete="off"
                type="email"
                id="email"
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-2xl font-medium text-[#11142D] text-left py-2">
              Shipping
            </h4>

            <div className="py-3">
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
                placeholder="Enter name"
              />
            </div>

            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Country / region
              </label>

              <input
                autoComplete="off"
                type="text"
                id="name"
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="United States"
              />
            </div>

            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Address
              </label>

              <input
                autoComplete="off"
                type="text"
                id="name"
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder="210 Tempo st."
              />
            </div>
          </div>
          <div className="mb-5">
            <h4 className="text-2xl font-medium text-[#11142D] text-left py-2">
              Payment Method
            </h4>
            <div className="py-3 flex items-center justify-between space-x-8 w-full">
              <div className="border  px-5 py-8 w-full rounded border-primary">
                <div className="flex justify-center items-center">
                  <BsCreditCard className="text-primary size-10" />
                </div>
                <p className="text-xl font-medium text-gray-900 mt-3 text-center">
                  Card
                </p>
              </div>
              <div className="border  px-5 py-8 w-full ">
                <div className="flex justify-center items-center">
                  <SlPaypal className="text-primary size-10" />
                </div>
                <p className="text-xl font-medium text-gray-900 mt-3 text-center">
                  Paypal
                </p>
              </div>
              <div className="border  px-5 py-8 w-full ">
                <div className="flex justify-center items-center">
                  <BsBank className="text-primary size-9" />
                </div>
                <p className="text-xl font-medium text-gray-900 mt-3 text-center">
                  Bank
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between space-x-8 py-3">
              <div className="w-[45%]">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-xl font-normal text-gray-900"
                >
                  Card Number
                </label>

                <input
                  autoComplete="off"
                  type="email"
                  id="email"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="1264 1234 1234 1234"
                />
              </div>

              <div className="w-[25%]">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-xl font-normal text-gray-900"
                >
                  CSV
                </label>

                <input
                  autoComplete="off"
                  type="email"
                  id="email"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="1264"
                />
              </div>

              <div className="w-[30%]">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-xl font-normal text-gray-900"
                >
                  Expire date
                </label>

                <input
                  autoComplete="off"
                  type="email"
                  id="email"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="12 / 10 / 24"
                />
              </div>
            </div>
          </div>
          <div className="py-8 flex justify-center items-center mx-0">
            <button
              type="submit"
              className="text-white bg-primary hover:bg-[#be9837] font-medium rounded-lg text-lg px-5 py-3 w-[50%] "
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPaymentForm;
