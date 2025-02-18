"use client";

import { getTaxRangeSheet } from "@/app/actions/taxplan";
import { calculateAge } from "@/components/shared/ageCalculater/ageToDateAndDateToAge";
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
  healthInsurance: string;
  fringeBenefits: string;
  accountablePlan: string;
  other: string;
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

interface ClientInfoForm {
  fillingStatus: FilingStatus;
  basicInformation: BasicInformation;
  strategy: Strategy;
  dependents: Dependents;
  deduction: boolean;
  advanced: Advanced;
  standardDeduction: StandardDeduction | undefined;
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
  otherDeductions: number;
  strategyDeductions: number;
  standardAndItemizedDeduction: number;
  marginalTaxRate: number;
  effectiveTaxRate: number;
  taxableIncome: number;
  ageDeductions: number;
  taxesOwed: number;
  beforAdjustingTax: number;
  taxCredits: number;
  totalDeductions: number;
  taxesWithheld: number;
  annualGrossIncome: number;
  retirementDeduction: number;
  dependentsDeduction: number;
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

  console.log(
    "check this vlaue form output",
    taxBrackets,
    clientInfoForm?.fillingStatus
  );

  const calculateStandardDeductions = (
    filingStatus: FilingStatus,
    deduction: boolean,
    itemizedDeduction: string | undefined
  ): number => {
    let deductionsValue = 0;
    if (!deduction) {
      if (filingStatus === "single") deductionsValue = 15000;
      else if (filingStatus === "marriedFilingJointly") deductionsValue = 30000;
      else if (filingStatus === "headOfHousehold") deductionsValue = 22500;
      else if (filingStatus === "marriedFilingSeparately")
        deductionsValue = 15000;
    } else {
      deductionsValue = parseFloat(itemizedDeduction || "0");
    }
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

  const calculateDependentsDeduction = (
    dependents: Dependents | undefined
  ): number => {
    if (!dependents) return 0;
    const underAge17 = parseInt(dependents.underAge17) || 0;
    const fullTimeStudentsAge17To23 =
      parseInt(dependents.fullTimeStudentsAge17To23) || 0;
    const otherDependents = parseInt(dependents.otherDependents) || 0;
    return (
      underAge17 * 2000 + fullTimeStudentsAge17To23 * 500 + otherDependents * 1
    );
  };

  // const calculateAgeDeductions = (
  //   clientAge: number | null,
  //   filingStatus: FilingStatus | undefined
  // ): number => {
  //   if (clientAge && clientAge > 65) {
  //     const deductionsMap: Record<FilingStatus, number> = {
  //       Single: 13850,
  //       "Married filing jointly": 27700,
  //       "Head of household": 20800,
  //       "Married filing separately": 13850,
  //     };

  //     return deductionsMap[filingStatus || ""] || 0;
  //   }

  //   return 0;
  // };

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

    const dependentsDeduction = calculateDependentsDeduction(
      clientInfoForm?.dependents
    );

    const totalStandardDeductions = calculateStandardDeductions(
      clientInfoForm?.fillingStatus,
      clientInfoForm?.deduction,
      clientInfoForm?.standardDeduction?.itemizedDeduction
    );

    const ageDeductions = calculateAgeDeductions(
      calculateAge(clientInfoForm.basicInformation?.dateOfBirth),
      clientInfoForm?.fillingStatus
    );

    const marginalTaxRate = calculateMarginalTaxRate(
      clientInfoForm?.basicInformation?.annualGrossIncome || 0,
      clientInfoForm?.fillingStatus
    );

    const { retirementDeduction, otherDeduction } =
      otherAndRetirementDeductions({
        contributations: clientInfoForm?.advanced?.contributations,
        iRAContributations: clientInfoForm?.advanced?.iRAContributations,
        otherDeductions: clientInfoForm?.advanced?.otherDeductions,
      });

    const totalDeductions =
      dependentsDeduction +
        strategyDeductions +
        ageDeductions +
        totalStandardDeductions +
        retirementDeduction +
        otherDeduction || 0;

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

    const taxGiven =
      parseFloat(clientInfoForm?.advanced?.taxCredits || "0") +
      parseFloat(clientInfoForm?.standardDeduction?.taxesWithheld || "0");

    const taxesOwed = totalTax - taxGiven;

    const effectiveTaxRate = calculateEffectiveTaxRate(
      clientInfoForm?.basicInformation?.annualGrossIncome || 0,
      totalTax
    );

    setTaxDetails({
      annualGrossIncome:
        clientInfoForm?.basicInformation?.annualGrossIncome || 0,
      calculatedTax: taxesOwed || 0,
      otherDeductions: otherDeduction || 0,
      strategyDeductions: strategyDeductions || 0,
      standardAndItemizedDeduction: totalStandardDeductions || 0,
      marginalTaxRate: marginalTaxRate || 0,
      effectiveTaxRate: effectiveTaxRate || 0,
      taxableIncome: taxableIncome || 0,
      ageDeductions: ageDeductions || 0,
      retirementDeduction: retirementDeduction || 0,
      dependentsDeduction: dependentsDeduction || 0,
      taxesOwed: taxesOwed || 0,
      beforAdjustingTax: totalTax || 0,
      taxCredits: parseFloat(clientInfoForm?.advanced?.taxCredits || "0"),
      taxesWithheld: parseFloat(
        clientInfoForm?.standardDeduction?.taxesWithheld || "0"
      ),
      totalDeductions: totalDeductions || 0,
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
                  <span>-</span>{" "}
                  {clientInfoForm?.deduction
                    ? "Itemized deductions"
                    : "Standard deduction"}
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(
                    (taxDetails?.standardAndItemizedDeduction ?? 0) +
                      (taxDetails?.ageDeductions ?? 0)
                  )}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Strategy Deductions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.strategyDeductions ?? 0)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Dependents Deduction
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.dependentsDeduction ?? 0)}
                </span>
              </li>

              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Retirement contributions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.retirementDeduction ?? 0)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Other deductions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.otherDeductions ?? 0)}
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
                  Estimated taxes before adjustments
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.beforAdjustingTax ?? 0)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Federal taxes withheld
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.taxesWithheld ?? 0)}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Tax credits
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {formatCurrency(taxDetails?.taxCredits ?? 0)}
                </span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Taxes owed
              </span>
              <span className="text-lg font-medium text-[#B50302]">
                {formatCurrency(taxDetails?.taxesOwed ?? 0)}
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
