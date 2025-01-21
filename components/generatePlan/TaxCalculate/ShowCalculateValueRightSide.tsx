"use client";

import { getTaxRangeSheet } from "@/app/actions/taxplan";
import { useEffect, useState } from "react";

interface TaxRate {
  Individual?: { min: number; max: number };
  MarriedFilingJointly?: { min: number; max: number };
  MarriedFilingSeparately?: { min: number; max: number };
  HeadOfHousehold?: { min: number; max: number };
  TaxRate: number;
}

interface TaxRangeSheet {
  taxRates: TaxRate[];
}

const ShowCalculateValueRightSide = ({ clientInfoForm }: any) => {
  const [taxRangeSheet, setTaxRangeSheet] = useState<TaxRangeSheet | null>(
    null
  );

  const [clientTaxRate, setClientTaxRate] = useState("");

  useEffect(() => {
    const fetchTaxRangeSheet = async () => {
      try {
        const response = await getTaxRangeSheet();
        setTaxRangeSheet(response?.data?.taxPlan?.taxRangeSheet);
      } catch (error) {
        console.error("Error fetching tax range sheet:", error);
      }
    };

    fetchTaxRangeSheet();

    if (clientInfoForm?.fillingStatus === "Individual") {
      taxRangeSheet?.taxRates?.map((el: any, index: any) => {
        if (
          el?.Individual?.min !== undefined &&
          el?.Individual?.max !== undefined &&
          el?.Individual?.min <=
            clientInfoForm?.basicInformation?.annualGrossIncome &&
          el?.Individual?.max >
            clientInfoForm?.basicInformation?.annualGrossIncome
        ) {
          setClientTaxRate(el?.TaxRate);
        }
      });
    } else if (clientInfoForm?.fillingStatus === "Married Filing Jointly") {
      taxRangeSheet?.taxRates?.map((el: any, index: any) => {
        if (
          el?.MarriedFilingJointly?.min !== undefined &&
          el?.MarriedFilingJointly?.max !== undefined &&
          el?.MarriedFilingJointly?.min <=
            clientInfoForm?.basicInformation?.annualGrossIncome &&
          el?.MarriedFilingJointly?.max >
            clientInfoForm?.basicInformation?.annualGrossIncome
        ) {
          setClientTaxRate(el?.TaxRate);
        }
      });
    } else if (clientInfoForm?.fillingStatus === "Married Filing separately") {
      taxRangeSheet?.taxRates?.map((el: any, index: any) => {
        if (
          el?.MarriedFilingSeparately?.min !== undefined &&
          el?.MarriedFilingSeparately?.max !== undefined &&
          el?.MarriedFilingSeparately?.min <=
            clientInfoForm?.basicInformation?.annualGrossIncome &&
          el?.MarriedFilingSeparately?.max >
            clientInfoForm?.basicInformation?.annualGrossIncome
        ) {
          setClientTaxRate(el?.TaxRate);
        }
      });
    } else if (clientInfoForm?.fillingStatus === "Head of household") {
      taxRangeSheet?.taxRates?.map((el: any, index: any) => {
        if (
          el?.HeadOfHousehold?.min !== undefined &&
          el?.HeadOfHousehold?.max !== undefined &&
          el?.HeadOfHousehold?.min <=
            clientInfoForm?.basicInformation?.annualGrossIncome &&
          el?.HeadOfHousehold?.max >
            clientInfoForm?.basicInformation?.annualGrossIncome
        ) {
          setClientTaxRate(el?.TaxRate);
        }
      });
    }

    // const filingStatusKey =
    //   clientInfoForm?.fillingStatus?.replace(/\s+/g, "") || "";

    // taxRangeSheet?.taxRates?.forEach((el) => {
    //   const statusData = el?.[filingStatusKey];
    //   const annualIncome = clientInfoForm?.basicInformation?.annualGrossIncome;

    //   if (statusData?.min < annualIncome && statusData?.max > annualIncome) {
    //     setClientTaxRate(el?.TaxRate);
    //   }
    // });
  }, [clientInfoForm]);

  // taxRangeSheet?.map((el, index)=> if(el))

  // if (clientInfoForm?.fillingStatus && taxRangeSheet?.taxRates) {
  //   const taxRatesForStatus = taxRangeSheet.taxRates.map((el) => {
  //     const { min, max, TaxRate } = el?.Individual || {};
  //     const annualIncome = clientInfoForm?.basicInformation?.annualGrossIncome;

  //     if (min < annualIncome && max > annualIncome) {
  //       return TaxRate;
  //     }
  //     return null;
  //   });

  //   const matchedRate = taxRatesForStatus.find((rate) => rate !== null);
  //   if (matchedRate !== undefined) {
  //     setClientTaxRate(matchedRate);
  //   }
  // }

  const taxableAmount =
    clientInfoForm?.basicInformation?.annualGrossIncome *
    (parseFloat(clientTaxRate) / 100);

  return (
    <div>
      <div className="border border-[#B1B1B1] p-5 2xl:p-8">
        <div>
          <h2 className="text-2xl font-bold text-secondary text-left mb-2">
            Income Tax Breakdown
          </h2>
          <p className="text-xl text-[#555555]">Federal income tax breakdown</p>
          <h3 className="text-[#B50302] text-4xl font-semibold mt-3">
            ${taxableAmount}
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
                  ${clientInfoForm?.basicInformation?.annualGrossIncome}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Standard deduction
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxableAmount}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Retirement contributions
                </span>
                <span className="text-base font-normal text-[#126742]">$0</span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Other deductions
                </span>
                <span className="text-base font-normal text-[#126742]">$0</span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Taxable income
              </span>
              <span className="text-base font-medium text-[#126742]">
                $
                {clientInfoForm?.basicInformation?.annualGrossIncome -
                  taxableAmount}
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
                  $14,260
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Federal taxes withheld
                </span>
                <span className="text-base font-normal text-[#126742]">$0</span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Tax credits
                </span>
                <span className="text-base font-normal text-[#126742]">$0</span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Taxes owed
              </span>
              <span className="text-base font-medium text-[#B50302]">
                ${taxableAmount}
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
                  22%
                  {/* {clientTaxRate}% */}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  Effective tax rate
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {clientTaxRate}%
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCalculateValueRightSide;
