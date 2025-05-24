"use client";

import {
  calculateAge,
  calculateDateOfBirth,
} from "@/components/shared/ageCalculater/ageToDateAndDateToAge";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GoQuestion } from "react-icons/go";

const CalculateValueLeftSide = ({
  clientInfoForm,
  setClientInfoForm,
  taxDetails,
}: any) => {
  const [maxHomeOfficeAlert, setMaxHomeOfficeAlert] = useState(false);
  const [minMaxAgeAlert, setMinMaxAgeAlert] = useState(false);

  const [clientAge, setClientAge] = useState<Number | String | null>(
    calculateAge(clientInfoForm?.basicInformation?.dateOfBirth) || ""
  );

  const [marriedStatusDropdown, setIsMarriedStatusDropdown] = useState(false);

  const [standardDeductionFlag, setStandardDeductionFlag] = useState(
    clientInfoForm?.deduction || false
  );

  const [showAdvancedFlag, setShowAdvancedFlag] = useState(false);

  // Handler for marital status

  const toCamelCase = (str: any) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word: any, index: any) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  };

  const camelCaseToSpaced = (str: any) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (match: any) => match.toUpperCase())
      .trim();
  };

  const onMarriedStatusHandler = (value: string) => {
    setIsMarriedStatusDropdown(false);

    setClientInfoForm((prevState: any) => ({
      ...prevState,
      fillingStatus: toCamelCase(value),
    }));
  };

  // Handler for deduction

  useEffect(() => {
    setClientInfoForm((prevState: any) => ({
      ...prevState,
      deduction: standardDeductionFlag,
    }));
  }, [standardDeductionFlag]);

  useEffect(() => {
    setClientInfoForm((prevState: any) => ({
      ...prevState,
      basicInformation: {
        ...prevState.basicInformation,
        dateOfBirth: calculateDateOfBirth(Number(clientAge)),
      },
    }));
  }, [clientAge]);

  // Input onChange handler

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const keys = name.split(/[\[\]\.]+/).filter(Boolean);

    setClientInfoForm((prevState: any) => {
      const updatedState = { ...prevState };
      let current: any = updatedState;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        if (!current[key]) current[key] = isNaN(Number(keys[i + 1])) ? {} : [];
        current = current[key];
      }

      const finalKey = keys[keys.length - 1];
      current[finalKey] = isNaN(Number(value)) ? value : Number(value);

      return updatedState;
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white text-left mb-3 2xl:mb-5">
        Tax Generator
      </h2>
      <div className="flex flex-col space-y-3 2xl:space-y-5">
        {/* Tax Filling Status */}
        <div className="w-full">
          <label
            htmlFor="marital-status-dropdown"
            className="block mb-2 text-lg font-normal text-white"
          >
            Tax Filling Status
          </label>
          <div className="relative inline-block w-full bg-[#383E54]">
            <button
              id="marital-status-dropdown"
              onClick={() => setIsMarriedStatusDropdown(!marriedStatusDropdown)}
              className="focus:outline-none focus:ring-none flex  items-center justify-between  bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary  w-full px-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white capitalize"
              type="button"
              aria-haspopup="true"
              aria-expanded={marriedStatusDropdown}
            >
              <span>
                {camelCaseToSpaced(clientInfoForm?.fillingStatus) ||
                  "Select Status"}
              </span>
              <svg
                className="w-2.5 h-2.5 ml-3"
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
            </button>

            {marriedStatusDropdown && (
              <motion.div
                className="z-10 w-full mt-2   border border-gray-900 rounded-lg shadow-md overflow-hidden"
                role="menu"
                aria-labelledby="marital-status-dropdown"
                initial={{ height: 0, opacity: 0 }}
                animate={
                  marriedStatusDropdown
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <ul className="divide-y divide-gray-900">
                  {[
                    "Single",
                    "Married filing jointly",
                    "Married filing separately",
                    "Head of household",
                  ].map((status) => (
                    <li key={status}>
                      <button
                        onClick={() => onMarriedStatusHandler(status)}
                        className="block w-full px-4 py-2 text-left text-lg text-white hover:bg-[#474f6b]"
                        role="menuitem"
                      >
                        {status}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>
        </div>

        {/* Home Office */}
        <div className="w-full">
          <div className="mb-2 flex items-center space-x-1 relative">
            <label className="block text-lg font-normal text-white">
              Home Office
            </label>

            <span className="group text-primary hover:text-hoverColor text-lg cursor-pointer relative">
              <GoQuestion />

              <div className="absolute left-1/2 top-full mt-1 hidden w-max -translate-x-1/2 rounded bg-gray-500 p-2 text-sm text-white group-hover:block z-10">
                Note: Additional text to be added later <br />
                as per client's request.
              </div>
            </span>
          </div>
          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
            placeholder="$"
            name="strategy.homeOffice"
            value={clientInfoForm.strategy.homeOffice || ""}
            onChange={handleChange}
          />
        </div>

        {/* Depreciation */}
        <div className="w-full">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-white"
          >
            Depreciation
          </label>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
            placeholder="$"
            name="strategy.depreciation"
            value={clientInfoForm.strategy.depreciation || ""}
            onChange={handleChange}
          />
        </div>

        {/* Travel */}
        <div className="w-full">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-white"
          >
            Travel
          </label>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
            placeholder="$"
            name="strategy.travel"
            value={clientInfoForm.strategy.travel || ""}
            onChange={handleChange}
          />
        </div>

        {/* Meals */}
        <div className="w-full">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-white"
          >
            Meals
          </label>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
            placeholder="$"
            name="strategy.meals"
            value={clientInfoForm.strategy.meals || ""}
            onChange={handleChange}
          />
        </div>

        {/* Hiring Children */}
        <div className="w-full">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-white"
          >
            Hiring Children
          </label>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
            placeholder="$"
            name="strategy.hiringChildren"
            value={clientInfoForm.strategy.hiringChildren || ""}
            onChange={handleChange}
          />
        </div>

        {/* Annual gross income */}
        <div className="w-full">
          <div className="mb-2 flex items-center space-x-1 relative">
            <label className="block text-lg font-normal text-white">
              Annual gross income
            </label>

            <span className="group text-primary hover:text-hoverColor text-lg cursor-pointer relative">
              <GoQuestion />

              <div className="absolute left-1/2 top-full mt-1 hidden w-max -translate-x-1/2 rounded bg-gray-500 p-2 text-sm text-white group-hover:block z-10">
                Note: Additional text to be added later <br />
                as per client's request.
              </div>
            </span>
          </div>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
            placeholder="$100,000"
            name="basicInformation.annualGrossIncome"
            value={clientInfoForm.basicInformation.annualGrossIncome ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CalculateValueLeftSide;
