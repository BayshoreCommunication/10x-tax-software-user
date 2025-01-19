import { FaDownload } from "react-icons/fa";
import { SiAdobeacrobatreader } from "react-icons/si";

const ClientDetails = () => {
  return (
    <div className="container py-10">
      <div className="bg-white p-14">
        <div className=" w-full border-b pb-1">
          <h2 className="w-[25%] text-2xl font-bold text-secondary text-left pb-2">
            Client Information
          </h2>
        </div>
        <div className="mt-6 p-5 2xl:p-10 border">
          <h4 className="text-2xl font-semibold text-[#1F263E] mb-4">
            Carlos Rosario
          </h4>
          <div className="flex items-start gap-6 2xl:gap-10">
            <div className="flex-1 space-y-4 ">
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">Name:</span>
                Jeremy Rose
              </p>
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">Email:</span>
                example@gmail.com
              </p>
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">
                  Profession:
                </span>
                Doctor
              </p>
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">Income:</span>
                $100000
              </p>
            </div>
            <div className="flex-1 space-y-4">
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">Phones:</span>
                +880 123456789
              </p>
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">
                  Date of Birth:
                </span>
                August 24, 2005
              </p>
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">
                  Address:
                </span>
                2118 Thornridge Cir. Syracuse, Connecticut 35624s
              </p>
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">
                  Married:
                </span>
                Married
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 p-5 2xl:p-10 border">
          <h4 className="text-2xl font-semibold text-[#1F263E] mb-4">
            Spouse Details
          </h4>
          <div className="flex items-start gap-6 2xl:gap-10">
            <div className="flex-1 space-y-4 ">
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">Name:</span>
                Elizabeth Rose
              </p>

              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">Income:</span>
                $120000
              </p>
            </div>
            <div className="flex-1 space-y-4">
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">
                  Profession:
                </span>
                Bankers
              </p>
              <p className="flex items-start text-lg font-medium text-[#1F263E]">
                <span className=" text-[#808080] max-w-40 w-full">
                  Date of Birth:
                </span>
                September 15. 2006
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 p-5 2xl:p-10 border">
          <div className="flex items-start gap-10 2xl:gap-20 ">
            <div className=" flex-1">
              <h4 className=" w-full border-b  text-2xl font-bold text-secondary text-left pb-2">
                Tax Plans
              </h4>
              <div className="mt-4">
                <div className="py-3 2xl:py-4 bg-white  flex justify-between items-center space-x-4 w-full">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary text-white rounded-lg ">
                      <SiAdobeacrobatreader className="text-2xl" />
                    </div>
                    <div>
                      <h6 className="text-xl font-medium text-secondary mb-1">
                        Tax Plan
                      </h6>
                      <p className="text-base font-normal text-secondary opacity-70">
                        19-06-24s
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <button
                      className={`flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium`}
                    >
                      <p>Download PDF</p>
                      <FaDownload />
                    </button>
                  </div>
                </div>
                <div className="py-3 2xl:py-4 bg-white  flex justify-between items-center space-x-4 w-full">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary text-white rounded-lg ">
                      <SiAdobeacrobatreader className="text-2xl" />
                    </div>
                    <div>
                      <h6 className="text-xl font-medium text-secondary mb-1">
                        Tax Plan
                      </h6>
                      <p className="text-base font-normal text-secondary opacity-70">
                        19-06-24s
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <button
                      className={`flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium`}
                    >
                      <p>Download PDF</p>
                      <FaDownload />
                    </button>
                  </div>
                </div>
                <div className="py-3 2xl:py-4 bg-white  flex justify-between items-center space-x-4 w-full">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary text-white rounded-lg ">
                      <SiAdobeacrobatreader className="text-2xl" />
                    </div>
                    <div>
                      <h6 className="text-xl font-medium text-secondary mb-1">
                        Tax Plan
                      </h6>
                      <p className="text-base font-normal text-secondary opacity-70">
                        19-06-24s
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <button
                      className={`flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium`}
                    >
                      <p>Download PDF</p>
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex-1">
              <h4 className=" w-full border-b  text-2xl font-bold text-secondary text-left pb-2">
                Tax Proposal
              </h4>
              <div className="mt-4">
                <div className="py-3 2xl:py-4 bg-white  flex justify-between items-center space-x-4 w-full">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary text-white rounded-lg ">
                      <SiAdobeacrobatreader className="text-2xl" />
                    </div>
                    <div>
                      <h6 className="text-xl font-medium text-secondary mb-1">
                        Tax Proposal
                      </h6>
                      <p className="text-base font-normal text-secondary opacity-70">
                        19-06-24s
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <button
                      className={`flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium`}
                    >
                      <p>Download PDF</p>
                      <FaDownload />
                    </button>
                  </div>
                </div>
                <div className="py-3 2xl:py-4 bg-white  flex justify-between items-center space-x-4 w-full">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary text-white rounded-lg ">
                      <SiAdobeacrobatreader className="text-2xl" />
                    </div>
                    <div>
                      <h6 className="text-xl font-medium text-secondary mb-1">
                        Tax Proposal
                      </h6>
                      <p className="text-base font-normal text-secondary opacity-70">
                        19-06-24s
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <button
                      className={`flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium`}
                    >
                      <p>Download PDF</p>
                      <FaDownload />
                    </button>
                  </div>
                </div>
                <div className="py-3 2xl:py-4 bg-white  flex justify-between items-center space-x-4 w-full">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary text-white rounded-lg ">
                      <SiAdobeacrobatreader className="text-2xl" />
                    </div>
                    <div>
                      <h6 className="text-xl font-medium text-secondary mb-1">
                        Tax Proposal
                      </h6>
                      <p className="text-base font-normal text-secondary opacity-70">
                        19-06-24s
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <button
                      className={`flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium`}
                    >
                      <p>Download PDF</p>
                      <FaDownload />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6  space-x-5">
          <button
            name="back"
            type="submit"
            className="px-4 py-2  text-primary rounded-md font-medium text-lg border border-primary bg-transparent  w-[120px] text-center"
          >
            Delete
          </button>
          <button
            name="back"
            type="submit"
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[120px] text-center"
          >
            Edit
          </button>
          <button
            name="back"
            type="submit"
            className="px-8 py-2  text-white rounded-md font-medium text-lg bg-secondary hover:bg-secondary/80 hover:text-white  text-center"
          >
            Generate Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
