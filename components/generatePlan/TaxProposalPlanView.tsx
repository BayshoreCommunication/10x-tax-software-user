"use client";

import Link from "next/link";
import { useState } from "react";
import { FaDownload, FaRegEye } from "react-icons/fa";
import { SiAdobeacrobatreader } from "react-icons/si";
import PDFGeneratorWithDownload from "../shared/pdfGenerator/PDFGeneratorWithDownload";
import TaxProposalSend from "../shared/pdfGenerator/TaxProposalSend";
import ViewTaxPlan from "./ViewTaxPlan";
import ViewTaxProposal from "./ViewTaxProposal";

const TaxProposalPlanView = ({ taxId }: any) => {
  const [pdfDownloadPlan, setPdfDownloadPlan] = useState(false);
  const [pdfDownloadProposal, setPdfDownloadProposa] = useState(false);

  const pdfDownloadHandler = (value: string) => {
    if (value === "taxplan") {
      return (
        <PDFGeneratorWithDownload
          RenderComponent={ViewTaxPlan}
          title={"tax-plan"}
        />
      );
    } else if (value === "taxproposal") {
      return (
        <PDFGeneratorWithDownload
          RenderComponent={ViewTaxProposal}
          title={"tax-proposal"}
        />
      );
    }
  };

  return (
    <div className="container py-10 overflow-hidden">
      <div className="bg-white p-14">
        <div className="flex flex-col gap-10">
          {/* Plan */}
          <div>
            <h2 className="text-4xl font-bold border-b pb-5 mb-6"> Plan</h2>
            <button
              onMouseEnter={() => setPdfDownloadPlan(true)}
              onMouseLeave={() => setPdfDownloadPlan(false)}
              className="p-5 2xl:p-8 bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.15)] flex justify-between items-center space-x-4 w-full"
            >
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
                  href={`/view-proposal/${taxId}/tax-plan`}
                  className="flex items-center space-x-2 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium"
                >
                  <FaRegEye />
                  <span>View</span>
                </Link>
              </div>
              <div className="">
                {pdfDownloadPlan ? (
                  <PDFGeneratorWithDownload
                    RenderComponent={ViewTaxPlan}
                    title={"tax-plan"}
                  />
                ) : (
                  <button
                    className={`flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium`}
                  >
                    <p>Download PDF</p>
                    <FaDownload />
                  </button>
                )}
              </div>
            </button>
          </div>
          {/* Proposal */}
          <div>
            <h2 className="text-4xl font-bold border-b pb-5 mb-6"> Proposal</h2>
            <button
              onMouseEnter={() => setPdfDownloadProposa(true)}
              onMouseLeave={() => setPdfDownloadProposa(false)}
              className="p-5 2xl:p-8 bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.15)] flex justify-between items-center w-full"
            >
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
                  {/* <Link
                    href="#"
                    className="flex items-center space-x-2 mt-3 text-lg  hover:text-primary duration-300 font-medium"
                  >
                    <IoSend />
                    <span>Send</span>
                  </Link> */}
                  <div className="">
                    <TaxProposalSend RenderComponent={ViewTaxProposal} />
                  </div>
                  <Link
                    href={`/view-proposal/${taxId}/tax-proposal`}
                    className="flex items-center space-x-2 mt-3 text-lg  hover:text-primary duration-300 font-medium"
                  >
                    <FaRegEye />
                    <span>View</span>
                  </Link>
                </div>
              </div>
              <div className="">
                {pdfDownloadProposal ? (
                  <PDFGeneratorWithDownload
                    RenderComponent={ViewTaxProposal}
                    title={"tax-proposal"}
                  />
                ) : (
                  <button
                    className={`flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium`}
                  >
                    <p>Download PDF</p>
                    <FaDownload />
                  </button>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxProposalPlanView;
