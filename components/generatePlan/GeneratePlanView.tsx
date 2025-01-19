"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useDispatch } from "react-redux";
import Loader from "../shared/ui/Loader";

import { removeData, setData } from "@/redux/features/taxInfoSlice";
import CalculateValueLeftSide from "./TaxCalculate/CalculateValueLeftSide";
import ShowCalculateValueRightSide from "./TaxCalculate/ShowCalculateValueRightSide";

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
  fullTimeStudentsAge17To23: string;
  otherDependents: string;
  totalNumberOfDependents: string;
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

interface ClientInfoForm {
  fillingStatus: string;
  deduction: boolean;
  basicInformation: BasicInformation;
  strategy: Strategy;
  dependents: Dependents;
  standardDeduction: StandardDeduction;
  advanced: Advanced;
}

const GeneratePlanView = ({ id, session, clientDetails }: any) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Initial state with proper typing

  const [clientInfoForm, setClientInfoForm] = useState<ClientInfoForm>({
    fillingStatus: clientDetails?.fillingStatus || "",

    basicInformation: {
      fullName: clientDetails?.basicInformation?.fullName || "",
      phone: clientDetails?.basicInformation?.phone || "",
      email: clientDetails?.basicInformation?.email || "",
      profession: clientDetails?.basicInformation?.profession || "",
      annualGrossIncome:
        clientDetails?.basicInformation?.annualGrossIncome || null,
      dateOfBirth: clientDetails?.basicInformation?.dateOfBirth || "",
      maritalStatus: clientDetails?.basicInformation?.maritalStatus || "",
      address: clientDetails?.basicInformation?.address || "",
      spouseDetails: {
        fullName:
          clientDetails?.basicInformation?.spouseDetails?.fullName || "",
        profession:
          clientDetails?.basicInformation?.spouseDetails?.profession || "",
        income: clientDetails?.basicInformation?.spouseDetails?.income || null,
        dateOfBirth:
          clientDetails?.basicInformation?.spouseDetails?.dateOfBirth || "",
      },
    },

    strategy: {
      homeOffice: clientDetails?.strategy?.homeOffice || "",
      depreciation: clientDetails?.strategy?.depreciation || "",
      travel: clientDetails?.strategy?.travel || "",
      meals: clientDetails?.strategy?.meals || "",
      hiringChildren: clientDetails?.strategy?.hiringChildren || "",
      scheduleCToSCorp: clientDetails?.strategy?.scheduleCToSCorp || "",
      costSegregation: clientDetails?.strategy?.costSegregation || "",
      rentHomeToCorporation:
        clientDetails?.strategy?.rentHomeToCorporation || "",
    },

    dependents: {
      underAge17: clientDetails?.dependents?.underAge17 || "",
      fullTimeStudentsAge17To23:
        clientDetails?.dependents?.fullTimeStudentsAge17To23 || "",
      otherDependents: clientDetails?.dependents?.otherDependents || "",
      totalNumberOfDependents:
        clientDetails?.dependents?.totalNumberOfDependents || "",
    },

    deduction: clientDetails?.deduction || "",
    standardDeduction: {
      itemizedDeduction:
        clientDetails?.standardDeduction?.itemizedDeduction || "",
      taxesWithheld: clientDetails?.standardDeduction?.taxesWithheld || "",
    },

    advanced: {
      contributations: clientDetails?.advanced?.contributations || "",
      iRAContributations: clientDetails?.advanced?.iRAContributations || "",
      otherDeductions: clientDetails?.advanced?.otherDeductions || "",
      taxCredits: clientDetails?.advanced?.taxCredits || "",
    },
  });

  // Test Data

  const taxPlanData = {
    clientId: id,
    taxableIncome: {
      grossIncome: 100000,
      standardDeduction: 13850,
      retirementContributions: 0,
      otherDeductions: 0,
      taxableIncome: 86150,
    },

    estimatedFederalTaxes: {
      estimatedTaxesBeforeAdjustments: 14260,
      federalTaxesWithheld: 0,
      taxCredits: 0,
      taxesOwed: 14260.38,
      marginalTaxRate: 22,
      effectiveTaxRate: 16.55,
    },
  };

  const createTaxPlanByClient = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tax-plan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session}`,
          },
          body: JSON.stringify(taxPlanData),
        }
      );

      const response = await response.json();

      // console.log("check this value 173", result?.payload?.newTaxPlan?._id);

      if (response.ok) {
        dispatch(removeData());
        router.push(`/view-proposal/${id}`);
        dispatch(setData(response?.payload?.newTaxPlan));
      } else {
        const errorMessage = response?.error || "Failed to create tax plan.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error("Error creating tax plan:", error);
      setError(
        error.message || "Something went wrong while creating the tax plan."
      );
    }
  };

  const handleSubmitFormData = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Update client data
      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/client-details/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session}`,
          },
          body: JSON.stringify(clientInfoForm),
        }
      );

      const updateResult = await updateResponse.json();

      if (updateResponse.ok) {
        // Successfully updated, proceed to create tax plan
        await createTaxPlanByClient();
      } else {
        const errorMessage =
          updateResult?.error || "Failed to update client data.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error("Error updating client data:", error);
      setError(error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container  py-10">
      <div className="bg-white p-10">
        <div className="flex justify-between items-start space-x-4">
          {/* Tax Generator / Left Side */}
          <div className="w-[30%] bg-secondary p-5 2xl:p-8">
            <CalculateValueLeftSide
              clientInfoForm={clientInfoForm}
              setClientInfoForm={setClientInfoForm}
            />
          </div>
          {/* Tax Plan / Right Side */}
          <div className="w-[70%] ">
            <ShowCalculateValueRightSide />

            {/* Error handle */}

            <div className="pt-6 text-center">
              {error && <p className="text-red-500 text-base">{error}</p>}
            </div>

            {/* Submit button */}

            <div className="w-full flex items-center  justify-center mt-10 space-x-6  ">
              <button
                onClick={handleSubmitFormData}
                type="submit"
                className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor max-w-3xl hover:text-white text-center w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader />
                    <p>Procesing...</p>
                  </div>
                ) : (
                  <p>Next</p>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePlanView;
