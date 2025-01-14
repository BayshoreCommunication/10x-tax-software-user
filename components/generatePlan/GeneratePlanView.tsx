"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Loader from "../shared/ui/Loader";
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

interface ClientInfoForm {
  fillingStatus: string;
  basicInformation: BasicInformation;
  strategy: Strategy;
  dependents: Dependents;
}

const GeneratePlanView = ({ id, session, clientDetails }: any) => {
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
  });

  // Data save handler

  const handleSubmitFormData = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
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

      const result = await response.json();

      if (response.ok) {
        setError(null);
        router.push(`/view-proposal/${id}`);
      } else {
        const errorMessage = result?.error || "Failed to update client data.";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error update client data:", error);
      setError("Something went wrong. Please try again.");
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
