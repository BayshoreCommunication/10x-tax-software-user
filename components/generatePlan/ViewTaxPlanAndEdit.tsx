"use client";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ViewTaxPlanAndEdit = () => {
  const router = useRouter();

  const taxInfo = useSelector((state: RootState) => state.taxInfo);

  const goBackTwoSteps = () => {
    window.history.go(-2);
  };

  return (
    <div className="w-full">
      <div className="p-5 2xl:p-8 max-w-5xl mx-auto bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.15)]">
        <div>
          <h2 className="text-2xl font-bold text-secondary text-left mb-2">
            Income Tax Breakdown
          </h2>
          <p className="text-xl text-[#555555]">Federal income tax breakdown</p>
          <h3 className="text-[#B50302] text-4xl font-semibold mt-3">
            ${taxInfo?.data?.taxInfo?.calculatedTax?.toFixed(2)}
          </h3>
        </div>
        <div className="mt-10 2xl:mt-14 flex flex-col gap-8">
          <div>
            <h4 className="text-xl font-semibold text-secondary">
              Taxable income
            </h4>
            <ul className="space-y-2 py-4 mb-3 border-b">
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  Gross income
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxInfo?.data?.taxInfo?.annualGrossIncome}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Standard deduction
                  {/* {clientInfoForm?.deduction
                    ? "Itemized deductions"
                    : "Standard deduction"} */}
                </span>
                <span className="text-base font-normal text-[#126742]">
                  $
                  {(taxInfo?.data?.taxInfo?.standardAndItemizedDeduction ?? 0) +
                    (taxInfo?.data?.taxInfo?.ageDeductions ?? 0)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Strategy Deductions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxInfo?.data?.taxInfo?.strategyDeductions || 0}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Dependents Deduction
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxInfo?.data?.taxInfo?.dependentsDeduction || 0}
                </span>
              </li>

              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Retirement contributions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxInfo?.data?.taxInfo?.retirementDeduction || 0}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Other deductions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxInfo?.data?.taxInfo?.otherDeductions}
                </span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Taxable income
              </span>
              <span className="text-lg font-medium text-[#dca100f9]">
                ${taxInfo?.data?.taxInfo?.taxableIncome?.toFixed(2)}
              </span>
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-secondary">
              Estimated federal taxes
            </h4>
            <ul className="space-y-2 py-4 mb-3 border-b">
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  Estimated taxes before adjustments
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxInfo?.data?.taxInfo?.beforAdjustingTax?.toFixed(2)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Federal taxes withheld
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxInfo?.data?.taxInfo?.taxesWithheld}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Tax credits
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxInfo?.data?.taxInfo?.taxCredits}
                </span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Taxes owed
              </span>
              <span className="text-lg font-medium text-[#B50302]">
                ${taxInfo?.data?.taxInfo?.taxesOwed?.toFixed(2)}
              </span>
            </p>
          </div>
          <div>
            <ul className="space-y-2 py-4">
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  Marginal tax rate
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {taxInfo?.data?.taxInfo?.marginalTaxRate}%
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  Effective tax rate
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {taxInfo?.data?.taxInfo?.effectiveTaxRate?.toFixed(2)}%
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full flex items-center  justify-start space-x-6  ">
          <button
            onClick={goBackTwoSteps}
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white text-center max-w-[200px] w-full"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTaxPlanAndEdit;
