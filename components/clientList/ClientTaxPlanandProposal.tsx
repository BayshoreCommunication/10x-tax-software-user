"use client";

import { removeData, setData } from "@/redux/features/taxInfoSlice";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { SiAdobeacrobatreader } from "react-icons/si";
import { useDispatch } from "react-redux";
import ViewTaxPlan from "../generatePlan/ViewTaxPlan";
import ViewTaxProposal from "../generatePlan/ViewTaxProposal";
import PDFGeneratorWithDownload from "../shared/pdfGenerator/PDFGeneratorWithDownload";
import { formatDate } from "../shared/ui/DateFormat";

const ClientTaxPlanandProposal = ({ clientTaxPlanAndProposal }: any) => {
  const dispatch = useDispatch();
  const [pdfDownloadPlan, setPdfDownloadPlan] = useState(false);
  const [pdfDownloadProposal, setPdfDownloadProposa] = useState(false);

  const onClickHandleMouseEnter = (index: number) => {
    dispatch(removeData());
    setPdfDownloadPlan(true);

    const clientDetails = clientTaxPlanAndProposal?.find(
      (value: any, i: number) => i === index
    );

    if (clientDetails) {
      dispatch(setData(clientDetails));
    }
  };

  return (
    <div className="mt-6 p-5 2xl:p-10 border">
      <div className="">
        <div className="flex items-start space-x-36">
          <h4 className="w-full border-b text-2xl font-bold text-secondary text-left pb-2">
            Tax Plans
          </h4>
          <h4 className="w-full border-b text-2xl font-bold text-secondary text-left pb-2">
            Tax Proposal
          </h4>
        </div>
        {clientTaxPlanAndProposal?.length > 0 ? (
          <div className="">
            {clientTaxPlanAndProposal.map((el: any, index: number) => (
              <div className="flex items-start gap-10 2xl:gap-20">
                <div className="flex-1">
                  <div className="mt-4">
                    <button
                      onMouseEnter={() => onClickHandleMouseEnter(index)}
                      onMouseLeave={() => setPdfDownloadPlan(false)}
                      key={index}
                      className="py-3 2xl:py-4 bg-white flex justify-between items-center space-x-4 w-full"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary text-white rounded-lg">
                          <SiAdobeacrobatreader className="text-2xl" />
                        </div>
                        <div>
                          <h6 className="text-xl font-medium text-secondary mb-1">
                            Tax Plan
                          </h6>
                          <p className="text-base font-normal text-secondary opacity-70">
                            {formatDate(el?.createdAt)}
                          </p>
                        </div>
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
                      {/* <button className="flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium">
                        <p>Download PDF</p>
                        <FaDownload />
                      </button> */}
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mt-4">
                    <button
                      onMouseEnter={() => setPdfDownloadProposa(true)}
                      onMouseLeave={() => setPdfDownloadProposa(false)}
                      key={index}
                      className="py-3 2xl:py-4 bg-white flex justify-between items-center space-x-4 w-full"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-primary text-white rounded-lg">
                          <SiAdobeacrobatreader className="text-2xl" />
                        </div>
                        <div>
                          <h6 className="text-xl font-medium text-secondary mb-1">
                            Tax Proposal
                          </h6>
                          <p className="text-base font-normal text-secondary opacity-70">
                            {formatDate(el?.createdAt)}
                          </p>
                        </div>
                      </div>
                      {/* <button className="flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium">
                        <p>Download PDF</p>
                        <FaDownload />
                      </button> */}

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
            ))}
          </div>
        ) : (
          <p className="text-center text-base  text-gray-600 flex items-center justify-center min-h-[15vh]">
            No tax data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientTaxPlanandProposal;
