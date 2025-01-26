"use client";

interface TaxBracket {
  min: number;
  max: number | null; // Use null for no upper limit
  rate: number; // Tax rate in percentage
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

interface MarginalTaxRateDetails {
  taxableIncome: number;
  marginalRate: number;
  bracket: TaxBracket;
}

const ShowCalculateValueRightSide = ({ clientInfoForm }: any) => {
  // const [filingStatus, setFilingStatus] = useState<FilingStatus | undefined>(
  //   clientInfoForm?.fillingStatus || "Single"
  // );
  // const [calculatedTax, setCalculatedTax] = useState<number>(0);
  // const [effectiveTaxRate, setEffectiveTaxRate] = useState<number>(0);
  // const [taxableIncome, setTaxableIncome] = useState<number | null>(null);
  // const [totalDeductions, setTotalDeductions] = useState<number>(0);
  // const [marginalTaxRate, setMarginalTaxRate] = useState<
  //   MarginalTaxRateDetails[]
  // >([]);

  // // Helper: Calculate dependents' deductions
  // const calculateDependentsDeduction = (
  //   dependents: Dependents | undefined
  // ): number => {
  //   if (!dependents) return 0;

  //   return (
  //     (dependents.underAge17 || 0) * 2000 +
  //     (dependents.fullTimeStudentsAge17To23 || 0) * 500 +
  //     (dependents.otherDependents || 0) * 1
  //   );
  // };

  // // Helper: Calculate strategy deductions
  // const calculateStrategyDeductions = (
  //   strategy: Strategy | null | undefined
  // ): number => {
  //   if (!strategy) {
  //     return 0;
  //   }

  //   return Object.values(strategy).reduce((total, value) => {
  //     if (typeof value === "string") {
  //       return total + (parseInt(value, 10) || 0);
  //     }
  //     return total;
  //   }, 0);
  // };

  // // Helper: Calculate marginal tax rate
  // const calculateMarginalTaxRate = (
  //   grossIncome: number | null,
  //   deductions: number,
  //   filingStatus: FilingStatus
  // ): MarginalTaxRateDetails => {
  //   const taxableIncome =
  //     grossIncome && grossIncome > 0 ? grossIncome - deductions : 0;
  //   const brackets = taxData[filingStatus];

  //   if (!brackets || brackets.length === 0) {
  //     return {
  //       taxableIncome: 0,
  //       marginalRate: 0,
  //       bracket: { min: 0, max: null, rate: 0 },
  //     };
  //   }

  //   for (const bracket of brackets) {
  //     if (
  //       taxableIncome >= bracket.min &&
  //       (bracket.max === null || taxableIncome <= bracket.max)
  //     ) {
  //       return { taxableIncome, marginalRate: bracket.rate, bracket };
  //     }
  //   }

  //   return {
  //     taxableIncome: 0,
  //     marginalRate: 0,
  //     bracket: { min: 0, max: null, rate: 0 },
  //   };
  // };

  // // Main calculation flow
  // const calculateTaxDetails = () => {
  //   const grossIncome = parseFloat(
  //     clientInfoForm?.basicInformation?.annualGrossIncome?.toString() || "0"
  //   );

  //   // If grossIncome is null or invalid, set default to null
  //   if (isNaN(grossIncome)) {
  //     setTaxableIncome(null);
  //     setCalculatedTax(0);
  //     setEffectiveTaxRate(0);
  //     setMarginalTaxRate([]);
  //     return;
  //   }

  //   const dependentsDeduction = calculateDependentsDeduction(
  //     clientInfoForm?.dependents
  //   );
  //   const strategyDeductions = calculateStrategyDeductions(
  //     clientInfoForm?.strategy
  //   );

  //   const totalDeductions = dependentsDeduction + strategyDeductions;
  //   setTotalDeductions(totalDeductions);

  //   const taxableIncome = grossIncome - totalDeductions;
  //   setTaxableIncome(taxableIncome);

  //   // Ensure filingStatus is valid and taxData[filingStatus] exists
  //   const brackets = taxData[filingStatus || "Single"];
  //   if (!brackets || brackets.length === 0) {
  //     console.error("No tax brackets found for the provided filing status.");
  //     setCalculatedTax(0);
  //     return;
  //   }

  //   const totalTax = brackets.reduce((tax, { min, max, rate }) => {
  //     if (taxableIncome > min) {
  //       const taxableAmount =
  //         Math.min(taxableIncome, max ?? taxableIncome) - min;
  //       tax += taxableAmount * (rate / 100);
  //     }
  //     return tax;
  //   }, 0);
  //   setCalculatedTax(totalTax);

  //   const effectiveRate = (totalTax / grossIncome) * 100;
  //   setEffectiveTaxRate(effectiveRate);

  //   const marginalDetails = calculateMarginalTaxRate(
  //     grossIncome,
  //     totalDeductions,
  //     filingStatus || "Single"
  //   );
  //   setMarginalTaxRate([marginalDetails]);
  // };

  // useEffect(() => {
  //   calculateTaxDetails();
  // }, [clientInfoForm, filingStatus]);

  return (
    <div>
      <div className="border border-[#B1B1B1] p-5 2xl:p-8">
        <div>
          <h2 className="text-2xl font-bold text-secondary text-left mb-2">
            Income Tax Breakdown
          </h2>
          <p className="text-xl text-[#555555]">Federal income tax breakdown</p>
          <h3 className="text-[#B50302] text-4xl font-semibold mt-3">
            {/* ${calculatedTax} */}
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
                <span className="text-base font-normal text-[#126742]"></span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  <span>-</span> Standard deduction
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {/* ${totalDeductions} */}
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
                {/* ${taxableIncome} */}
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
                  {/* ${marginalTaxRate?.taxableIncome} */}
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
                {/* ${beforAdjustment} */}
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
                  {/* {marginalTaxRate?.marginalRate?.toFixed(2)}% */}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-base font-normal text-[#555555]">
                  Effective tax rate
                </span>
                <span className="text-base font-normal text-[#126742]">
                  {/* {effectiveTaxRate.toFixed(2)}% */}
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
