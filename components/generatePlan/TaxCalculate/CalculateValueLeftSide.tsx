"use client";

import {
  calculateAge,
  calculateDateOfBirth,
} from "@/components/shared/ageCalculater/ageToDateAndDateToAge";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GoQuestion } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

const CalculateValueLeftSide = ({ clientInfoForm, setClientInfoForm }: any) => {
  const [clientAge, setClientAge] = useState<Number | String | null>(
    calculateAge(clientInfoForm?.basicInformation?.dateOfBirth) || ""
  );

  const [marriedStatusDropdown, setIsMarriedStatusDropdown] = useState(false);

  const [standardDeductionFlag, setStandardDeductionFlag] = useState(
    clientInfoForm?.deduction || false
  );

  const [showAdvancedFlag, setShowAdvancedFlag] = useState(false);

  // Handler for marital status

  const onMarriedStatusHandler = (value: string) => {
    setIsMarriedStatusDropdown(false);

    setClientInfoForm((prevState: any) => ({
      ...prevState,
      fillingStatus: value,
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
              <span>{clientInfoForm?.fillingStatus || "Select Status"}</span>
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
                    "Married Filing Jointly",
                    "Married Filing separately",
                    "Head of household",
                  ].map((status) => (
                    <li key={status}>
                      <button
                        onClick={() =>
                          onMarriedStatusHandler(status.toLowerCase())
                        }
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
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-white"
          >
            Home Office
          </label>

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

        {/* Annual gross income */}
        <div className="w-full">
          <div className=" mb-2 flex items-center space-x-2 ">
            <label className="text-lg font-normal text-white">
              Annual gross income
            </label>
            <span
              className="text-primary hover:text-hoverColor  text-lg"
              title="Annual gross income"
            >
              <GoQuestion />
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

        {/* Age (as of Jan 1, 2024)*/}
        <div className="w-full">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-white"
          >
            Age (current)
          </label>

          <input
            autoComplete="off"
            className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
            placeholder="35"
            type="text"
            id="age"
            value={Number(clientAge) ?? ""}
            onChange={(e) => setClientAge(Number(e.target.value))}
          />
        </div>

        {/* You standard deduction: $13,850  */}
        <div className="w-full">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-white"
          >
            Your standard deduction: $13,850
          </label>

          <div className="flex flex-col gap-2">
            {/* Itemized Deduction */}
            <div className="flex items-center ps-4 bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md w-full text-white ">
              <input
                id="bordered-radio-1"
                type="radio"
                name="bordered-radio"
                className="w-5 h-5 bg-[#383E54] border border-white border-opacity-10 rounded-md text-white focus:ring-primary focus:border-primary !cursor-pointer"
                checked={!standardDeductionFlag} // Unchecked if standard deduction is selected
                onChange={() => setStandardDeductionFlag(false)}
              />
              <label
                htmlFor="bordered-radio-1"
                className="w-full py-4 ms-2 text-lg font-normal text-white"
              >
                Itemized Deduction
              </label>
            </div>

            {/* Standard Deduction */}
            <div className="flex items-center ps-4 bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md w-full text-white cursor-pointer">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="w-5 h-5 bg-[#383E54] border border-white border-opacity-10 rounded-md text-white focus:ring-primary focus:border-primary  !cursor-pointer"
                checked={standardDeductionFlag}
                onChange={() => setStandardDeductionFlag(true)}
              />
              <label
                htmlFor="bordered-radio-2"
                className="w-full py-4 ms-2 text-lg font-normal text-white"
              >
                Standard Deduction
              </label>
            </div>
          </div>
        </div>

        {/* Itemized deduction */}
        {standardDeductionFlag ? (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={
              standardDeductionFlag
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="w-full">
              <div className=" mb-2 flex items-center space-x-2 ">
                <label className="text-lg font-normal text-white">
                  Itemized deduction
                </label>
                <span
                  className="text-primary hover:text-hoverColor  text-lg"
                  title="Itemized deduction"
                >
                  <GoQuestion />
                </span>
              </div>

              <input
                autoComplete="off"
                type="text"
                id="email-address-icon"
                className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
                placeholder="$"
                name="standardDeduction.itemizedDeduction"
                value={clientInfoForm.standardDeduction.itemizedDeduction || ""}
                onChange={handleChange}
              />
            </div>

            {/* Taxes withheld  */}
            <div className="w-full">
              <div className=" mb-2 flex items-center space-x-2 ">
                <label className="text-lg font-normal text-white">
                  Taxes withheld
                </label>
                <span
                  className="text-primary hover:text-hoverColor  text-lg"
                  title="Taxes withheld"
                >
                  <GoQuestion />
                </span>
              </div>
              <input
                autoComplete="off"
                type="text"
                id="email-address-icon"
                className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
                placeholder="$"
                name="standardDeduction.taxesWithheld"
                value={clientInfoForm.standardDeduction.taxesWithheld || ""}
                onChange={handleChange}
              />
            </div>
          </motion.div>
        ) : (
          ""
        )}

        {/* Show Advanced */}
        <div>
          <div className="w-full">
            <button
              onClick={() => setShowAdvancedFlag(!showAdvancedFlag)}
              className=" mb-2 flex items-center space-x-3  py-5 justify-between !cursor-pointer"
            >
              <label className="text-lg font-semibold text-primary !cursor-pointer">
                Show Advanced
              </label>
              <span
                className="text-primary hover:text-hoverColor  text-2xl font-semibold"
                title="Taxes withheld"
              >
                <IoIosArrowDown
                  className={`size-5 text-primary transform transition-transform duration-300 ${
                    showAdvancedFlag ? "rotate-180" : "rotate-0"
                  }`}
                />
              </span>
            </button>
            {showAdvancedFlag ? (
              <motion.div
                className="flex flex-col space-y-3 2xl:space-y-5 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={
                  showAdvancedFlag
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {/* 40(K) contributations  */}
                <div className="w-full">
                  <div className=" mb-2 flex items-center space-x-2 ">
                    <label className="text-lg font-normal text-white">
                      40(K) contributations
                    </label>
                    <span
                      className="text-primary hover:text-hoverColor  text-lg"
                      title="40(K) contributations"
                    >
                      <GoQuestion />
                    </span>
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    id="email-address-icon"
                    className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
                    placeholder="$"
                    name="advanced.contributations"
                    value={clientInfoForm.advanced.contributations || ""}
                    onChange={handleChange}
                  />
                </div>
                {/* IRA contributations  */}
                <div className="w-full">
                  <div className=" mb-2 flex items-center space-x-2 ">
                    <label className="text-lg font-normal text-white">
                      IRA contributations
                    </label>
                    <span
                      className="text-primary hover:text-hoverColor  text-lg"
                      title="IRA contributations"
                    >
                      <GoQuestion />
                    </span>
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    id="email-address-icon"
                    className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
                    placeholder="$"
                    name="advanced.iRAContributations"
                    value={clientInfoForm.advanced.iRAContributations || ""}
                    onChange={handleChange}
                  />
                </div>
                {/* Other deductions  */}
                <div className=" w-full">
                  <div className=" mb-2 flex items-center space-x-2 ">
                    <label className="text-lg font-normal text-white">
                      Other deductions
                    </label>
                    <span
                      className="text-primary hover:text-hoverColor  text-lg"
                      title="Other deductions"
                    >
                      <GoQuestion />
                    </span>
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    id="email-address-icon"
                    className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
                    placeholder="$"
                    name="advanced.otherDeductions"
                    value={clientInfoForm.advanced.otherDeductions || ""}
                    onChange={handleChange}
                  />
                </div>
                {/* Tax credits */}
                <div className="w-full">
                  <div className=" mb-2 flex items-center space-x-2 ">
                    <label className="text-lg font-normal text-white">
                      Tax credits
                    </label>
                    <span
                      className="text-primary hover:text-hoverColor  text-lg"
                      title="Taxes withheld"
                    >
                      <GoQuestion />
                    </span>
                  </div>
                  <input
                    autoComplete="off"
                    type="text"
                    id="email-address-icon"
                    className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
                    placeholder="$"
                    name="advanced.taxCredits"
                    value={clientInfoForm.advanced.taxCredits || ""}
                    onChange={handleChange}
                  />
                </div>
              </motion.div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculateValueLeftSide;
