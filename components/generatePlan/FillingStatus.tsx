"use client";
import Link from "next/link";
import { useState } from "react";

const FillingStatus = () => {
  const [marriedStatusDropdown, setIsMarriedStatusDropdown] = useState(false);

  return (
    <div>
      <div className="flex items-center space-x-6 pb-3">
        <div className="w-full">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            Married Filing Jointly<span className="text-primary">*</span>
          </label>
          <div className="relative inline-block text-left w-full">
            <button
              id="dropdownDefaultButton"
              onClick={() => setIsMarriedStatusDropdown(!marriedStatusDropdown)}
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
                className=" mt-2 bg-[#eeeeee] divide-y divide-gray-100 rounded-lg shadow w-full border border-gray-300"
              >
                <ul className="py-2 text-lg text-gray-700 dark:text-gray-200 divide">
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
                      Married Filing Jointly
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Married Filing separately
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Head of household
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex items-center  justify-center mt-10 space-x-6">
        <Link
          href={"/"}
          className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[120px] text-center"
        >
          Back
        </Link>
        <Link
          href={"/"}
          className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[120px] text-center"
        >
          Next
        </Link>
        <Link
          href={"/"}
          className="px-4 py-2  text-white rounded-md font-medium text-lg bg-secondary hover:bg-[#0d121c] hover:text-white w-[120px] text-center"
        >
          Save
        </Link>
      </div>
    </div>
  );
};

export default FillingStatus;
