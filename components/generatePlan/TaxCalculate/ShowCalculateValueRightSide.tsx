"use client";

import { calculateAge } from "@/components/shared/ageCalculater/ageToDateAndDateToAge";
import { useEffect, useState } from "react";

type FilingStatus =
  | "Single"
  | "Married filing jointly"
  | "Married filing separately"
  | "Head of household";

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

interface ClientInfoForm {
  fillingStatus: FilingStatus;
  basicInformation: BasicInformation;
  strategy: Strategy;
  dependents: Dependents;
  deduction: boolean;
  standardDeduction: { itemizedDeduction: string };
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
}

const taxData = {
  Single: [
    { min: 0, max: 11600, rate: 10 },
    { min: 11601, max: 47150, rate: 12 },
    { min: 47151, max: 100525, rate: 22 },
    { min: 100526, max: 191950, rate: 24 },
    { min: 191951, max: 243725, rate: 32 },
    { min: 243726, max: 609350, rate: 35 },
    { min: 609351, max: null, rate: 37 },
  ],
  "Married filing jointly": [
    { min: 0, max: 23200, rate: 10 },
    { min: 23201, max: 94300, rate: 12 },
    { min: 94301, max: 201050, rate: 22 },
    { min: 201051, max: 383900, rate: 24 },
    { min: 383901, max: 487450, rate: 32 },
    { min: 487451, max: 731200, rate: 35 },
    { min: 731201, max: null, rate: 37 },
  ],
  "Married filing separately": [
    { min: 0, max: 11600, rate: 10 },
    { min: 11601, max: 47150, rate: 12 },
    { min: 47151, max: 100525, rate: 22 },
    { min: 100526, max: 191950, rate: 24 },
    { min: 191951, max: 243725, rate: 32 },
    { min: 243726, max: 365600, rate: 35 },
    { min: 365601, max: null, rate: 37 },
  ],
  "Head of household": [
    { min: 0, max: 16550, rate: 10 },
    { min: 16551, max: 63100, rate: 12 },
    { min: 63101, max: 100525, rate: 22 },
    { min: 100526, max: 191950, rate: 24 },
    { min: 191951, max: 243700, rate: 32 },
    { min: 243701, max: 609350, rate: 35 },
    { min: 609351, max: null, rate: 37 },
  ],
};

const ShowCalculateValueRightSide = ({
  clientInfoForm,
}: {
  clientInfoForm: ClientInfoForm;
}) => {
  const [filingStatus, setFilingStatus] = useState<FilingStatus>(
    clientInfoForm.fillingStatus
  );
  const [grossIncome, setGrossIncome] = useState<number | null>(
    clientInfoForm.basicInformation?.annualGrossIncome || null
  );
  const [clientAge, setClientAge] = useState<number | null>(
    calculateAge(clientInfoForm.basicInformation?.dateOfBirth) || null
  );

  const [taxDetails, setTaxDetails] = useState({
    ageDeductions: 0,
    calculatedTax: 0,
    effectiveTaxRate: 0,
    marginalTaxRate: 0,
    taxableIncome: 0,
    totalDeductions: 0,
    standardAndItemizedDeduction: 0,
    otherDeductions: 0,
    strategyDeductions: 0,
    taxesWithheld: 0,
    taxCredits: 0,
    taxesOwed: 0,
  });

  const calculateStandardDeductions = (
    filingStatus: FilingStatus,
    deduction: boolean,
    itemizedDeduction: string
  ): number => {
    let deductionsValue = 0;
    if (!deduction) {
      if (filingStatus === "Single") deductionsValue = 15000;
      else if (filingStatus === "Married filing jointly")
        deductionsValue = 30000;
      else if (filingStatus === "Head of household") deductionsValue = 22500;
      else if (filingStatus === "Married filing separately")
        deductionsValue = 15000;
    } else {
      deductionsValue = parseFloat(itemizedDeduction || "0");
    }
    return deductionsValue;
  };

  const calculateStrategyDeductions = (
    strategy: Record<string, string>
  ): number => {
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

  const calculateAgeDeductions = (
    clientAge: number | null,
    filingStatus: FilingStatus | undefined
  ): number => {
    if (clientAge && clientAge > 65) {
      const deductionsMap: Record<FilingStatus, number> = {
        Single: 13850,
        "Married filing jointly": 27700,
        "Head of household": 20800,
        "Married filing separately": 13850,
      };

      return deductionsMap[filingStatus || ""] || 0;
    }

    return 0;
  };

  const calculateMarginalTaxRate = (
    income: number,
    filingStatus: FilingStatus
  ): number => {
    const taxBrackets = taxData[filingStatus];

    for (let i = 0; i < taxBrackets.length; i++) {
      const bracket = taxBrackets[i];
      if (
        income >= bracket.min &&
        (bracket.max === null || income <= bracket.max)
      ) {
        return bracket.rate;
      }
    }

    return taxBrackets[taxBrackets.length - 1].rate;
  };

  const calculateEffectiveTaxRate = (
    income: number,
    totalTax: number
  ): number => {
    if (income > 0) return (totalTax / income) * 100;
    return 0;
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
      clientInfoForm?.standardDeduction?.itemizedDeduction || 0
    );

    const ageDeductions = calculateAgeDeductions(
      calculateAge(clientInfoForm.basicInformation?.dateOfBirth),
      clientInfoForm?.fillingStatus
    );

    const marginalTaxRate = calculateMarginalTaxRate(
      clientInfoForm?.basicInformation?.annualGrossIncome || 0,
      clientInfoForm?.fillingStatus
    );

    const totalDeductions =
      dependentsDeduction +
        strategyDeductions +
        ageDeductions +
        totalStandardDeductions || 0;

    const taxableIncome =
      clientInfoForm?.basicInformation?.annualGrossIncome - totalDeductions;

    const calculateTotalTax = (
      income: number,
      filingStatus: FilingStatus
    ): number => {
      const taxBrackets = taxData[filingStatus];
      let totalTax = 0;
      let remainingIncome = income;

      for (let i = 0; i < taxBrackets.length; i++) {
        const { min, max, rate } = taxBrackets[i];

        if (remainingIncome <= min) break;

        if (remainingIncome > max) {
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
      parseFloat(
        clientInfoForm?.advanced?.taxCredits +
          clientInfoForm?.standardDeduction?.taxesWithheld
      ) || 0;

    const taxesOwed = totalTax - taxGiven;

    const effectiveTaxRate = calculateEffectiveTaxRate(
      clientInfoForm?.basicInformation?.annualGrossIncome || 0,
      totalTax
    );

    setTaxDetails({
      calculatedTax: taxesOwed || 0,
      otherDeductions: strategyDeductions || 0,
      strategyDeductions: strategyDeductions || 0,
      standardAndItemizedDeduction: totalStandardDeductions || 0,
      marginalTaxRate: marginalTaxRate || 0,
      effectiveTaxRate: effectiveTaxRate || 0,
      taxableIncome: taxableIncome || 0,
      ageDeductions: ageDeductions || 0,
      taxesOwed: taxesOwed || 0,
      beforAdjustingTax: totalTax || 0,
      taxCredits: clientInfoForm?.advanced?.taxCredits || 0,
      taxesWithheld: clientInfoForm?.standardDeduction?.taxesWithheld || 0,
    });
  }, [clientInfoForm]);

  return (
    <div>
      <div className="border border-[#B1B1B1] p-5 2xl:p-8">
        <div>
          <h2 className="text-2xl font-bold text-secondary text-left mb-2">
            Income Tax Breakdown
          </h2>
          <p className="text-xl text-[#555555]">Federal income tax breakdown</p>
          <h3 className="text-[#B50302] text-4xl font-semibold mt-3">
            ${taxDetails?.calculatedTax}
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
                  ${grossIncome}
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
                  ${taxDetails?.standardAndItemizedDeduction || 0}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Retirement contributions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxDetails?.ageDeductions || 0}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Other deductions
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxDetails?.otherDeductions}
                </span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Taxable income
              </span>
              <span className="text-base font-medium text-[#126742]">
                ${taxDetails?.taxableIncome}
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
                  ${taxDetails?.beforAdjustingTax}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Federal taxes withheld
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxDetails?.taxesWithheld}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Tax credits
                </span>
                <span className="text-base font-normal text-[#126742]">
                  ${taxDetails?.taxCredits}
                </span>
              </li>
            </ul>
            <p className="flex justify-between">
              <span className="text-base font-medium text-[#555555]">
                Taxes owed
              </span>
              <span className="text-base font-medium text-[#B50302]">
                ${taxDetails?.taxesOwed}
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
