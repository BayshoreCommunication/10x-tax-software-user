interface SpouseDetails {
  fullName: string;
  profession: string;
  income: number | null;
  dateOfBirth: string;
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
}

standardDeduction: interface StandardDeduction {
  itemizedDeduction: string;
  taxesWithheld: string;
}
interface Advanced {
  contributations: string;
  iRAContributations: string;
  otherDeductions: string;
  taxCredits: string;
}

type FilingStatus =
  | "single"
  | "marriedFilingJointly"
  | "marriedFilingSeparately"
  | "headOfHousehold";

export interface ClientInfoForm {
  fillingStatus: FilingStatus;
  basicInformation: BasicInformation;
  strategy: Strategy;
  dependents: Dependents;
  totalTaxWithoutDeduction: number;
  totalTaxAfterDeduction: number;
  taxSavedByDeductions: number;
}
