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
  }, [1]);

  useEffect(() => {
    if (clientInfoForm?.fillingStatus === "Single") {
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
  }, [taxRangeSheet, clientInfoForm]);

  const calculatePercentage = (value: any, percent: number) => {
    return (parseFloat(value) || 0) * (percent / 100);
  };

  // Function to calculate dependents deduction
  const calculateDependentsDeduction = (dependents: any) => {
    if (!dependents) return 0;

    const underAge17Deduction = dependents.underAge17
      ? parseInt(dependents.underAge17, 10) * 2000
      : 0;

    const fullTimeStudentsDeduction = dependents.fullTimeStudentsAge17To23
      ? parseInt(dependents.fullTimeStudentsAge17To23, 10) * 500
      : 0;

    const otherDependentsDeduction = dependents.otherDependents
      ? parseInt(dependents.otherDependents, 10) * 1
      : 0;

    return (
      underAge17Deduction + fullTimeStudentsDeduction + otherDependentsDeduction
    );
  };

  const calculateStrategyDeductions = (strategy: any) => {
    if (!strategy) return 0;

    const {
      costSegregation = "0",
      depreciation = "0",
      hiringChildren = "0",
      homeOffice = "0",
      meals = "0",
      rentHomeToCorporation = "0",
      scheduleCToSCorp = "0",
      travel = "0",
      healthInsurance = "0",
      fringeBenefits = "0",
      accountablePlan = "0",
      other = "0",
    } = strategy;

    return (
      parseInt(costSegregation, 10) +
      parseInt(depreciation, 10) +
      parseInt(hiringChildren, 10) +
      parseInt(homeOffice, 10) +
      parseInt(meals, 10) +
      parseInt(rentHomeToCorporation, 10) +
      parseInt(scheduleCToSCorp, 10) +
      parseInt(travel, 10) +
      parseInt(healthInsurance, 10) +
      parseInt(fringeBenefits, 10) +
      parseInt(accountablePlan, 10) +
      parseInt(other, 10)
    );
  };

  // Function to calculate the total deductions
  const calculateTotalDeductions = (
    dependents: any,
    strategy: any,
    clientTaxRate: number
  ) => {
    const dependentsDeduct = calculateDependentsDeduction(dependents);
    const strategyDeduct = calculateStrategyDeductions(strategy);

    return (dependentsDeduct + strategyDeduct || 0) * (clientTaxRate / 100);
  };

  // Function to calculate taxable amount
  const calculateTaxableAmount = (
    annualGrossIncome: number,
    totalDeductions: number,
    clientTaxRate: number
  ) => {
    return annualGrossIncome - totalDeductions * (clientTaxRate / 100);
  };

  // Main calculation function
  const calculateTaxDetails = (clientInfoForm: any, clientTaxRate: number) => {
    const dependents = clientInfoForm?.dependents || {};
    const strategy = clientInfoForm?.strategy || {};
    const annualGrossIncome =
      clientInfoForm?.basicInformation?.annualGrossIncome || 0;

    // Step-by-step calculation
    const totalDeductions = calculateTotalDeductions(
      dependents,
      strategy,
      clientTaxRate
    );

    const taxableAmount = calculateTaxableAmount(
      annualGrossIncome,
      totalDeductions,
      clientTaxRate
    );

    return {
      totalDeductions,
      taxableAmount,
    };
  };

  const { totalDeductions, taxableAmount } = calculateTaxDetails(
    clientInfoForm,
    parseFloat(clientTaxRate)
  );

  const beforAdjustment =
    clientInfoForm?.basicInformation?.annualGrossIncome *
    (parseFloat(clientTaxRate) / 100);

  console.log(
    "check right now",
    clientInfoForm?.basicInformation?.annualGrossIncome
  );

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
                  ${totalDeductions}
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
                  totalDeductions}
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
                  ${beforAdjustment}
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
                ${beforAdjustment}
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
                  {clientTaxRate}%{/* {clientTaxRate}% */}
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
