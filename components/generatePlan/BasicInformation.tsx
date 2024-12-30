"use client";
import Link from "next/link";
import { useState } from "react";

const BasicInformation = () => {
  const [marriedStatusDropdown, setIsMarriedStatusDropdown] = useState(false);

  return (
    <div>
      <form className="">
        <div className="flex items-center space-x-6 py-3">
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Full Name<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="Carlos Rosario"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Mobile Number<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="(555) 555-1234"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Email<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="Carlos Rosario"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Profession<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="Software Engineer"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Annual Gross Income<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Date of Birth<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="08/12/1984"
            />
          </div>
        </div>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Marital Status<span className="text-primary">*</span>
            </label>
            <div className="relative inline-block text-left w-full">
              <button
                id="dropdownDefaultButton"
                onClick={() =>
                  setIsMarriedStatusDropdown(!marriedStatusDropdown)
                }
                className="text-gray-600 bg-[#eeeeee] hover:bg-[#eeeeee]focus:ring-4 focus:outline-none  rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center justify-between w-full border border-gray-300"
                type="button"
              >
                <p> Married</p>
                <div className="">
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
              </button>

              {marriedStatusDropdown && (
                <div
                  id="dropdown"
                  className="absolute left-0 z-10 mt-2 bg-[#eeeeee] divide-y divide-gray-100 rounded-lg shadow w-full border border-gray-300"
                >
                  <ul className="py-2 text-lg text-gray-700 dark:text-gray-200">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Married
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Single
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Divorced
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Address<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="Concrete, Washington"
            />
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            Spouse Details
          </label>
          <div className="bg-[#eeeeee] p-5">
            <div className="flex items-center space-x-6 py-3">
              <div className="w-full">
                <input
                  autoComplete="off"
                  type="text"
                  id="email-address-icon"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="Name"
                />
              </div>
              <div className="w-full">
                <input
                  autoComplete="off"
                  type="text"
                  id="email-address-icon"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="Profession"
                />
              </div>
            </div>
            <div className="flex items-center space-x-6 py-5">
              <div className="w-full">
                <input
                  autoComplete="off"
                  type="text"
                  id="email-address-icon"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="Income"
                />
              </div>
              <div className="w-full">
                <input
                  autoComplete="off"
                  type="text"
                  id="email-address-icon"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="Date of Birth"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center  justify-center mt-10 space-x-6">
          <Link
            href={"/"}
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-secondary hover:bg-[#0d121c] hover:text-white w-[120px] text-center"
          >
            Next
          </Link>
          <Link
            href={"/"}
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[120px] text-center"
          >
            Save
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BasicInformation;
