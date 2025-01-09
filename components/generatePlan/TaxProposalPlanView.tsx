import Link from "next/link";
import { FaDownload, FaRegEye } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { SiAdobeacrobatreader } from "react-icons/si";

const TaxProposalPlanView = () => {
  return (
    <div className="container py-10">
      <div className="bg-white p-14">
        <div className="flex flex-col gap-10">
          {/* Plan */}
          <div>
            <h2 className="text-4xl font-bold border-b pb-5 mb-6"> Plan</h2>
            <div className="p-5 2xl:p-8 bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.15)] flex justify-between items-start space-x-4">
              <div>
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
                <Link
                  href={"/view-proposal/tax-plan"}
                  className="flex items-center space-x-2 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium"
                >
                  <FaRegEye />
                  <span>View</span>
                </Link>
              </div>
              <div>
                <Link
                  href="#"
                  className="flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium"
                  download={true}
                >
                  <span>Download PDF</span>
                  <FaDownload />
                </Link>
              </div>
            </div>
          </div>
          {/* Proposal */}
          <div>
            <h2 className="text-4xl font-bold border-b pb-5 mb-6"> Proposal</h2>
            <div className="p-5 2xl:p-8 bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.15)] flex justify-between items-start space-x-4">
              <div>
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
                <div className="flex items-center  gap-5">
                  <Link
                    href="#"
                    className="flex items-center space-x-2 mt-3 text-lg  hover:text-primary duration-300 font-medium"
                  >
                    <IoSend />
                    <span>Send</span>
                  </Link>
                  <Link
                    href={"/view-proposal/tax-proposal"}
                    className="flex items-center space-x-2 mt-3 text-lg  hover:text-primary duration-300 font-medium"
                  >
                    <FaRegEye />
                    <span>View</span>
                  </Link>
                </div>
              </div>
              <div>
                <Link
                  href="#"
                  className="flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium"
                  download={true}
                >
                  <span>Download PDF</span>
                  <FaDownload />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxProposalPlanView;
