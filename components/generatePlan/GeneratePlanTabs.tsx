"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import BasicInformation from "./BasicInformation";
import Dependents from "./Dependents";
import FillingStatus from "./FillingStatus";
import Strategy from "./Strategy";

// Define the types for the form
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

type FilingStatus =
  | "single"
  | "marriedFilingJointly"
  | "marriedFilingSeparately"
  | "headOfHousehold";

interface Advanced {
  contributations: string;
  iRAContributations: string;
  otherDeductions: string;
  taxCredits: string;
}

interface ClientInfoForm {
  fillingStatus: string;
  basicInformation: {
    fullName: string;
    phone: string;
    email: string;
    profession: string;
    annualGrossIncome: number;
    dateOfBirth: string;
    maritalStatus: string;
    address: string;
    spouseDetails: {
      fullName: string;
      profession: string;
      income: number;
      dateOfBirth: string;
    };
  };
  strategy: Record<string, any>;
  dependents: Record<string, any>;
  advanced?: Record<string, any>; // Make 'advanced' optional
}

const GeneratePlanTabs = ({ session, id, clientDetails }: any) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("basic-information");
  const [generateplanViewFlag, setGenerateplanViewFlag] = useState(false);
  const [marriedStatusDropdown, setIsMarriedStatusDropdown] = useState(false);

  // Initial tab item

  const tabsItem = [
    {
      title: "Basic Information",
      key: "basic-information",
    },
    { title: "Filling Status", key: "filling-status" },
    { title: "Dependents", key: "dependents" },
    { title: "Strategy", key: "strategy" },
  ];

  // Initial state with proper typing

  const [clientInfoForm, setClientInfoForm] = useState<ClientInfoForm>({
    fillingStatus: clientDetails?.fillingStatus || "single",
    basicInformation: {
      fullName: clientDetails?.basicInformation?.fullName || "",
      phone: clientDetails?.basicInformation?.phone || "",
      email: clientDetails?.basicInformation?.email || "",
      profession: clientDetails?.basicInformation?.profession || "",
      annualGrossIncome:
        clientDetails?.basicInformation?.annualGrossIncome || 0,
      dateOfBirth: clientDetails?.basicInformation?.dateOfBirth || "",
      maritalStatus: clientDetails?.basicInformation?.maritalStatus || "",
      address: clientDetails?.basicInformation?.address || "",
      spouseDetails: {
        fullName:
          clientDetails?.basicInformation?.spouseDetails?.fullName || "",
        profession:
          clientDetails?.basicInformation?.spouseDetails?.profession || "",
        income: clientDetails?.basicInformation?.spouseDetails?.income || 0,
        dateOfBirth:
          clientDetails?.basicInformation?.spouseDetails?.dateOfBirth || "",
      },
    },
    strategy: {
      homeOffice: clientDetails?.strategy?.homeOffice || "",
      depreciation: clientDetails?.strategy?.depreciation || "",
      travel: clientDetails?.strategy?.travel || "",
      meals: clientDetails?.strategy?.meals || "",
      hiringChildren: clientDetails?.dependents?.underAge17 * 15000 || "",
      scheduleCToSCorp: clientDetails?.strategy?.scheduleCToSCorp || "",
      costSegregation: clientDetails?.strategy?.costSegregation || "",
      rentHomeToCorporation:
        clientDetails?.strategy?.rentHomeToCorporation || "",
      healthInsurance: clientDetails?.strategy?.healthInsurance || "",
      fringeBenefits: clientDetails?.strategy?.fringeBenefits || "",
      accountablePlan: clientDetails?.strategy?.accountablePlan || "",
      other: clientDetails?.strategy?.other || "",
    },
    dependents: {
      underAge17: clientDetails?.dependents?.underAge17 || "",
      fullTimeStudentsAge17To23:
        clientDetails?.dependents?.fullTimeStudentsAge17To23 || "",
      otherDependents: clientDetails?.dependents?.otherDependents || "",
      totalNumberOfDependents:
        clientDetails?.dependents?.totalNumberOfDependents || "",
    },
    advanced: clientDetails?.advanced || {}, // Add 'advanced' here, with a default value (empty object)
  });

  // Handler for marital status

  const onMarriedStatusHandler = (value: string) => {
    setIsMarriedStatusDropdown(false);

    setClientInfoForm((prevState: any) => ({
      ...prevState,
      basicInformation: {
        ...prevState.basicInformation,
        maritalStatus: value,
      },
    }));
  };

  // Hiring Children Value Calculation

  useEffect(() => {
    if (clientInfoForm?.dependents?.underAge17) {
      const hiringChildrenValue = clientInfoForm.dependents.underAge17 * 15000;
      setClientInfoForm((prevState: any) => ({
        ...prevState,
        strategy: {
          ...prevState.strategy,
          hiringChildren: hiringChildrenValue,
        },
      }));
    }
  }, [clientInfoForm?.dependents?.underAge17]);

  return (
    <div className="container py-10">
      <div className="bg-white p-14">
        <div className="">
          <h2 className="w-[25%] text-2xl font-bold text-secondary text-left py-4">
            Client Data
          </h2>
          <div className="flex border-b border-gray-400 justify-start space-x-14">
            {tabsItem.map((tab) => (
              <div key={tab?.key} className="relative">
                <button
                  className={`py-3 px-1 md:px-4  font-semibold md:text-xl w-full text-left ${
                    activeTab === tab?.key ? "text-black" : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab(tab?.key)}
                >
                  {tab?.title}
                </button>
                {activeTab === tab?.key && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-black"
                    layoutId="underline"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          <motion.div
            className="mt-2"
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          ></motion.div>
          <div className="mt-6">
            {activeTab === "basic-information" ? (
              <BasicInformation
                clientInfoForm={clientInfoForm}
                setClientInfoForm={setClientInfoForm}
                id={id}
                session={session}
                setActiveTab={setActiveTab}
              />
            ) : activeTab === "filling-status" ? (
              <FillingStatus
                clientInfoForm={clientInfoForm}
                setClientInfoForm={setClientInfoForm}
                id={id}
                session={session}
                setActiveTab={setActiveTab}
              />
            ) : activeTab === "strategy" ? (
              <Strategy
                clientInfoForm={clientInfoForm}
                setClientInfoForm={setClientInfoForm}
                id={id}
                session={session}
                setActiveTab={setActiveTab}
              />
            ) : activeTab === "dependents" ? (
              <Dependents
                clientInfoForm={clientInfoForm}
                setClientInfoForm={setClientInfoForm}
                id={id}
                session={session}
                setActiveTab={setActiveTab}
                setGenerateplanViewFlag={setGenerateplanViewFlag}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePlanTabs;
