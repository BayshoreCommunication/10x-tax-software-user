"use client";
import { PiInfo } from "react-icons/pi";

const Dependents = ({ setGenerateplanViewFlag }: any) => {
  return (
    <div>
      <div className="flex items-center space-x-6 py-3">
        <div className="w-full">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            Under age 17
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
          <div className=" mb-2 flex items-center space-x-1">
            <label className="text-lg font-normal text-gray-90">
              Full- time students age 17 - 23
            </label>
            <span className="text-primary hover:text-hoverColor cursor-pointer">
              <PiInfo />
            </span>
          </div>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="$"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6 py-3">
        <div className="w-full">
          <div className=" mb-2 flex items-center space-x-1">
            <label className="text-lg font-normal text-gray-90">
              Other dependents
            </label>
            <span className="text-primary hover:text-hoverColor cursor-pointer">
              <PiInfo />
            </span>
          </div>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="$"
          />
        </div>
        <div className="w-full">
          <div className=" mb-2 flex items-center space-x-1">
            <label className="text-lg font-normal text-gray-90">
              Total number of dependents
            </label>
            <span className="text-primary hover:text-hoverColor cursor-pointer">
              <PiInfo />
            </span>
          </div>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="$"
          />
        </div>
      </div>
      <div className="w-full flex items-center  justify-center mt-10 space-x-6">
        <button
          onClick={() => setGenerateplanViewFlag(true)}
          className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[400px] text-center"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default Dependents;
