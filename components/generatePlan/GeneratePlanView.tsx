import { GoQuestion } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";

const GeneratePlanView = () => {
  return (
    <div className="">
      <div className="flex justify-between items-start space-x-4">
        {/* Tax Generator / Left Side */}
        <div className="w-[30%] bg-secondary p-5 2xl:p-8">
          <h2 className="text-2xl font-bold text-white text-left mb-3 2xl:mb-5">
            Tax Generator
          </h2>
          <form action="" className="flex flex-col space-y-3 2xl:space-y-5">
            {/* Tax Filling Status */}
            <div className="w-full">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-lg font-normal text-white"
              >
                Tax Filling Status
              </label>

              <input
                autoComplete="off"
                type="text"
                id="email-address-icon"
                disabled
                className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  outline-none cursor-not-allowed"
                placeholder="Married Filing Jointly"
              />
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
              />
            </div>
            {/* Age (as of Jan 1, 2024)*/}
            <div className="w-full">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-lg font-normal text-white"
              >
                Age (as of Jan 1, 2024)
              </label>

              <input
                autoComplete="off"
                type="text"
                id="email-address-icon"
                className="bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white"
                placeholder="35"
              />
            </div>
            {/* You standard deduction: $13,850  */}
            <div className="w-full">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-lg font-normal text-white"
              >
                You standard deduction: $13,850
              </label>

              <div className="flex flex-col gap-2">
                <div className="flex items-center ps-4 bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary  w-full  placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white">
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    value=""
                    name="bordered-radio"
                    className="w-5 h-5 bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block   placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white "
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-lg font-normal text-white"
                  >
                    Itemized deduction
                  </label>
                </div>
                <div className="flex items-center ps-4 bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary  w-full  placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white">
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    value=""
                    name="bordered-radio"
                    className="w-5 h-5 bg-[#383E54] border border-white border-opacity-10 text-lg rounded-md focus:ring-primary focus:border-primary block   placeholder-white placeholder-opacity-80  active:border-primary outline-none text-white "
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
              />
            </div>
            {/* Show Advanced */}
            <div>
              <div className="w-full">
                <div className=" mb-2 flex items-center space-x-3  py-5 ju">
                  <label className="text-lg font-semibold text-primary ">
                    Show Advanced
                  </label>
                  <span
                    className="text-primary hover:text-hoverColor  text-2xl font-semibold"
                    title="Taxes withheld"
                  >
                    <IoIosArrowDown />
                  </span>
                </div>
                <div className="flex flex-col space-y-3 2xl:space-y-5">
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
                    />
                  </div>{" "}
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* Tax Plan / Right Side */}
        <div className="w-[70%] border border-secondary p-5">
          <h2 className="text-2xl font-bold text-secondary text-left mb-2">
            Tax Plan
          </h2>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePlanView;
