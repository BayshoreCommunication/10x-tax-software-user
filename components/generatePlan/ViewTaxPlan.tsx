"use client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ViewTaxPlan = ({}) => {
  const taxInfo = useSelector((state: RootState) => state.taxInfo);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full">
      <div className="p-5 2xl:p-8 max-w-5xl mx-auto bg-white rounded-lg shadow-[0px_0px_10px_rgba(0,0,0,0.15)]">
        <div className="text-left">
          <h2 className="text-2xl font-bold text-secondary text-left mb-2">
            Income Tax Breakdown
          </h2>
          <p className="text-xl text-[#555555]">Federal income tax breakdown</p>
          <h3 className="text-[#B50302] text-4xl font-semibold mt-3">
            {formatCurrency(taxInfo?.data?.taxInfo?.calculatedTax ?? 0)}
          </h3>
        </div>
        <div className="mt-10 2xl:mt-14 flex flex-col gap-8">
          <div>
            <h4 className="text-xl font-semibold text-secondary text-left">
              Taxable income
            </h4>
            <ul className="space-y-2 py-4 mb-3 border-b">
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  Gross income
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(
                    taxInfo?.data?.taxInfo?.annualGrossIncome ?? 0
                  )}
                </span>
              </li>

              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Total Deductions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxInfo?.data?.taxInfo?.totalDeductions ?? 0)}
                </span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Taxable income
              </span>
              <span className="text-lg font-medium text-[#dca100f9]">
                {formatCurrency(taxInfo?.data?.taxInfo?.taxableIncome ?? 0)}
              </span>
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-secondary text-left">
              Estimated federal taxes
            </h4>
            <ul className="space-y-2 py-4 mb-3 border-b">
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  Total Tax Without Deduction
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(
                    taxInfo?.data?.taxInfo?.totalTaxWithoutDeduction ?? 0
                  )}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Total Tax After Deduction
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(
                    taxInfo?.data?.taxInfo?.totalTaxAfterDeduction ?? 0
                  )}
                </span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Tax Saved by Deductions
              </span>
              <span className="text-lg font-medium text-[#B50302]">
                {formatCurrency(
                  taxInfo?.data?.taxInfo?.taxSavedByDeductions ?? 0
                )}
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
      </div>
    </div>
  );
};

export default ViewTaxPlan;
