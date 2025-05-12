"use client";

import { getTaxRangeSheet } from "@/app/actions/taxplan";
import { calculateAge } from "@/components/shared/ageCalculater/ageToDateAndDateToAge";
import { ClientInfoForm } from "@/types/clientInfo";
import { useEffect, useState } from "react";

interface StandardDeduction {
  itemizedDeduction: string | undefined;
  taxesWithheld?: string | undefined;
}

type FilingStatus =
  | "single"
  | "marriedFilingJointly"
  | "marriedFilingSeparately"
  | "headOfHousehold";

interface Strategy {
  homeOffice: string;
  depreciation: string;
  travel: string;
  meals: string;
  hiringChildren: string;
  scheduleCToSCorp: string;
  costSegregation: string;
  rentHomeToCorporation: string;
}

interface Dependents {
  underAge17: string;
  fullTimeStudentsAge17To23: string;
  otherDependents: string;
  totalNumberOfDependents: string;
}
interface Advanced {
  contributations: string;
  iRAContributations: string;
  otherDeductions: string;
  taxCredits: string;
}

interface BasicInformation {
  fullName: string;
  phone: string;
  email: string;
  profession: string;
  annualGrossIncome: number | null;
  dateOfBirth: string;
  maritalStatus: string;
  address: string;
  spouseDetails: SpouseDetails;
}

interface SpouseDetails {
  fullName: string;
  profession: string;
  income: number | null;
  dateOfBirth: string;
}

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  _id: string;
}

interface TaxData {
  single: TaxBracket[];
  marriedFilingJointly: TaxBracket[];
  marriedFilingSeparately: TaxBracket[];
  headOfHousehold: TaxBracket[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Advanced {
  contributations: string;
  iRAContributations: string;
  otherDeductions: string;
  taxCredits: string;
}

type TaxState = {
  calculatedTax: number;
  marginalTaxRate: number;
  effectiveTaxRate: number;
  taxableIncome: number;
  taxesOwed: number;
  totalDeductions: number;
  annualGrossIncome: number;
  totalTaxWithoutDeduction: number;
  totalTaxAfterDeduction: number;
  taxSavedByDeductions: number;
};

type DeductionInput = {
  contributations?: number | string;
  iRAContributations?: number | string;
  otherDeductions?: number | string;
};

interface ShowCalculateValueRightSideProps {
  clientInfoForm: ClientInfoForm;
  taxDetails: TaxState | null;
  setTaxDetails: React.Dispatch<React.SetStateAction<TaxState | null>>;
}

const ShowCalculateValueRightSide: React.FC<
  ShowCalculateValueRightSideProps
> = ({ clientInfoForm, taxDetails, setTaxDetails }) => {
  const [taxRangeSheet, setTaxRangeSheet] = useState<TaxData>({
    single: [],
    marriedFilingJointly: [],
    marriedFilingSeparately: [],
    headOfHousehold: [],
    createdAt: "",
    updatedAt: "",
    __v: 0,
  });

  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    clientInfoForm.fillingStatus
  );
  const [grossIncome, setGrossIncome] = useState<number | null>(
    clientInfoForm.basicInformation?.annualGrossIncome || null
  );
  const [clientAge, setClientAge] = useState<number | null>(
    calculateAge(clientInfoForm.basicInformation?.dateOfBirth) || null
  );

  // tax range sheet get

  useEffect(() => {
    const fetchTaxRangeSheet = async () => {
      try {
        const response = await getTaxRangeSheet();

        if (response?.data?.taxPlan?.taxRangeSheet) {
          setTaxRangeSheet(response.data.taxPlan.taxRangeSheet);
        } else {
          console.error("Invalid tax range sheet data structure:", response);
        }
      } catch (error) {
        console.error("Error fetching tax range sheet:", error);
      }
    };

    fetchTaxRangeSheet();
  }, []);

  const taxBrackets = taxRangeSheet[clientInfoForm?.fillingStatus];

  const calculateStandardDeductions = (filingStatus: FilingStatus): number => {
    let deductionsValue = 0;

    if (filingStatus === "single") deductionsValue = 15000;
    else if (filingStatus === "marriedFilingJointly") deductionsValue = 30000;
    else if (filingStatus === "headOfHousehold") deductionsValue = 22500;
    else if (filingStatus === "marriedFilingSeparately")
      deductionsValue = 15000;

    return deductionsValue;
  };

  // const calculateStrategyDeductions = (
  //   strategy: Record<string, string>
  // ): number => {
  //   return Object.values(strategy).reduce((total, value) => {
  //     const numericValue = parseFloat(value);
  //     return total + (isNaN(numericValue) ? 0 : numericValue);
  //   }, 0);
  // };

  const calculateStrategyDeductions = (strategy: Strategy): number => {
    return Object.values(strategy).reduce((total, value) => {
      const numericValue = parseFloat(value);
      return total + (isNaN(numericValue) ? 0 : numericValue);
    }, 0);
  };

  const calculateAgeDeductions = (
    clientAge: number | null,
    filingStatus: FilingStatus | undefined
  ): number => {
    if (clientAge && clientAge > 65 && filingStatus) {
      const deductionsMap: Record<FilingStatus, number> = {
        single: 13850,
        marriedFilingJointly: 27700,
        headOfHousehold: 20800,
        marriedFilingSeparately: 13850,
      };

      return deductionsMap[filingStatus] || 0;
    }

    return 0;
  };

  // const calculateMarginalTaxRate = (
  //   income: number,
  //   filingStatus: FilingStatus
  // ): number => {
  //   const taxBrackets = taxRangeSheet[filingStatus];

  //   for (let i = 0; i < taxBrackets?.length; i++) {
  //     const bracket = taxBrackets[i];
  //     if (
  //       income >= bracket.min &&
  //       (bracket.max === null ||
  //         bracket.max === undefined ||
  //         income <= bracket.max)
  //     ) {
  //       return bracket.rate;
  //     }
  //   }

  //   return taxBrackets[taxBrackets?.length - 1]?.rate;
  // };

  const calculateMarginalTaxRate = (
    income: number,
    filingStatus: FilingStatus
  ): number => {
    const taxBrackets = taxRangeSheet[filingStatus];

    // Check if taxBrackets is defined and not empty
    if (!taxBrackets || taxBrackets.length === 0) {
      // throw new Error(
      //   "Tax brackets are not defined or empty for the given filing status."
      // );
      return 0;
    }

    for (let i = 0; i < taxBrackets.length; i++) {
      const bracket = taxBrackets[i];
      if (
        income >= bracket.min &&
        (bracket.max === null ||
          bracket.max === undefined ||
          income <= bracket.max)
      ) {
        return bracket.rate;
      }
    }

    // Ensure the last element is defined before accessing its rate
    const lastBracket = taxBrackets[taxBrackets.length - 1];
    if (!lastBracket) {
      // throw new Error("The last tax bracket is undefined.");
      return 0;
    }

    return lastBracket.rate;
  };

  const calculateEffectiveTaxRate = (
    income: number,
    totalTax: number
  ): number => {
    if (income > 0) return (totalTax / income) * 100;
    return 0;
  };

  const otherAndRetirementDeductions = (value: DeductionInput = {}) => {
    const { contributations, iRAContributations, otherDeductions } = value;

    const parsedContributations = contributations
      ? Number(contributations)
      : undefined;
    const parsedIRAContributations = iRAContributations
      ? Number(iRAContributations)
      : undefined;
    const parsedOtherDeductions = otherDeductions ? Number(otherDeductions) : 0;

    const retirementDeduction =
      parsedContributations === undefined ||
      parsedContributations === null ||
      parsedContributations === 0
        ? (parsedIRAContributations ?? 0)
        : parsedContributations;

    return { retirementDeduction, otherDeduction: parsedOtherDeductions };
  };

  useEffect(() => {
    const strategyDeductions = calculateStrategyDeductions(
      clientInfoForm?.strategy
    );

    const totalStandardDeductions = calculateStandardDeductions(
      clientInfoForm?.fillingStatus
    );

    const marginalTaxRate = calculateMarginalTaxRate(
      clientInfoForm?.basicInformation?.annualGrossIncome || 0,
      clientInfoForm?.fillingStatus
    );

    const totalDeductions = strategyDeductions + totalStandardDeductions;

    const taxableIncome =
      (clientInfoForm?.basicInformation?.annualGrossIncome ?? 0) -
      totalDeductions;

    const calculateTotalTax = (
      income: number,
      filingStatus: FilingStatus
    ): number => {
      const taxBrackets = taxRangeSheet[filingStatus];
      let totalTax = 0;
      let remainingIncome = income;

      for (let i = 0; i < taxBrackets?.length; i++) {
        const { min, max, rate } = taxBrackets[i];

        if (remainingIncome <= min) break;

        // Check if max is null or undefined
        if (max !== null && remainingIncome > max) {
          totalTax += (max - min) * (rate / 100);
          remainingIncome -= max - min;
        } else {
          totalTax += (remainingIncome - min) * (rate / 100);
          break;
        }
      }

      return totalTax;
    };

    const calculateEffectiveTaxRate = (
      income: number,
      totalTax: number
    ): number => {
      return income > 0 ? (totalTax / income) * 100 : 0;
    };

    const totalTax = calculateTotalTax(
      taxableIncome,
      clientInfoForm?.fillingStatus
    );

    console.log("totalTax", totalTax);

    const effectiveTaxRate = calculateEffectiveTaxRate(
      clientInfoForm?.basicInformation?.annualGrossIncome || 0,
      totalTax
    );

    const totalTaxWithoutDeduction = calculateTotalTax(
      clientInfoForm?.basicInformation?.annualGrossIncome ?? 0,
      clientInfoForm?.fillingStatus
    );

    const taxSavedByDeductions = totalTaxWithoutDeduction - totalTax;

    setTaxDetails({
      annualGrossIncome:
        clientInfoForm?.basicInformation?.annualGrossIncome || 0,
      calculatedTax: totalTax || 0,
      marginalTaxRate: marginalTaxRate || 0,
      effectiveTaxRate: effectiveTaxRate || 0,
      taxableIncome: taxableIncome || 0,
      taxesOwed: totalTax || 0,
      //  beforAdjustingTax: totalTax || 0,
      totalDeductions: totalDeductions || 0,
      totalTaxWithoutDeduction: totalTaxWithoutDeduction || 0,
      totalTaxAfterDeduction: totalTax || 0,
      taxSavedByDeductions: taxSavedByDeductions || 0,
    });
  }, [
    clientInfoForm,
    clientInfoForm?.strategy,
    clientInfoForm?.fillingStatus,
    taxRangeSheet,
  ]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div>
      <div className="border border-[#B1B1B1] p-5 2xl:p-8">
        <div>
          <h2 className="text-2xl font-bold text-secondary text-left mb-2">
            Income Tax Breakdown
          </h2>
          <p className="text-xl text-[#555555]">Federal income tax breakdown</p>
          <h3 className="text-[#B50302] text-4xl font-semibold mt-3">
            {formatCurrency(taxDetails?.calculatedTax ?? 0)}
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
                  {formatCurrency(taxDetails?.annualGrossIncome ?? 0)}
                </span>
              </li>

              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Total Deductions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.totalDeductions ?? 0)}
                </span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Taxable income
              </span>
              <span className="text-lg font-medium text-[#dca100f9]">
                {formatCurrency(taxDetails?.taxableIncome ?? 0)}
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
                  Total Tax Without Deduction
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.totalTaxWithoutDeduction ?? 0)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Total Tax After Deduction
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.totalTaxAfterDeduction ?? 0)}
                </span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Tax Saved by Deductions
              </span>
              <span className="text-lg font-medium text-[#B50302]">
                {formatCurrency(taxDetails?.taxSavedByDeductions ?? 0)}
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
                  {taxDetails?.marginalTaxRate}%
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  Effective tax rate
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {taxDetails?.effectiveTaxRate?.toFixed(2)}%
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
