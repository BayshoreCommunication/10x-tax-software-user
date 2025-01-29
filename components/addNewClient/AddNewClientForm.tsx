"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
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

const AddNewClientForm = ({ session }: any) => {
  const router = useRouter();
  const [marriedStatusDropdown, setIsMarriedStatusDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Initial state with proper typing
  const [clientInfoForm, setClientInfoForm] = useState<ClientInfoForm>({
    fillingStatus: "",
    basicInformation: {
      fullName: "",
      phone: "",
      email: "",
      profession: "",
      annualGrossIncome: null,
      dateOfBirth: "",
      maritalStatus: "",
      address: "",
      spouseDetails: {
        fullName: "",
        profession: "",
        income: null,
        dateOfBirth: "",
      },
    },
    strategy: {
      homeOffice: "",
      depreciation: "",
      travel: "",
      meals: "",
      hiringChildren: "",
      scheduleCToSCorp: "",
      costSegregation: "",
      rentHomeToCorporation: "",
    },
    dependents: {
      underAge17: "",
      fullTimeStudentsAge17To23: "",
      otherDependents: "",
      totalNumberOfDependents: "",
    },
  });

  // Handler for marital status
  const onMarriedStatusHandler = (value: string) => {
    setIsMarriedStatusDropdown(false);

    setClientInfoForm((prevState) => ({
      ...prevState,
      basicInformation: {
        ...prevState.basicInformation,
        maritalStatus: value,
      },
    }));
  };

  // Handler for form input changes
  // Handler for form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const keys = name.split(/[\[\]\.]+/).filter(Boolean);

    setClientInfoForm((prevState) => {
      const updatedState = { ...prevState };
      let current: any = updatedState; // Temporarily use `any` for dynamic traversal

      for (let i = 0; i < keys.length - 1; i++) {
        const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
        if (!current[key]) current[key] = isNaN(Number(keys[i + 1])) ? {} : [];
        current = current[key];
      }

      const finalKey = keys[keys.length - 1];
      current[finalKey] = isNaN(Number(value)) ? value : Number(value);

      return updatedState;
    });
  };

  function convertToFormData(
    obj: Record<string, any>,
    formData = new FormData(),
    parentKey = ""
  ): FormData {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof Date) {
        formData.append(fullKey, value.toISOString());
      } else if (typeof value === "object" && value !== null) {
        convertToFormData(value, formData, fullKey);
      } else if (value !== null && value !== undefined) {
        formData.append(fullKey, value.toString());
      }
    }
    return formData;
  }

  const handleSubmitFormData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert `clientInfoForm` to JSON and send it in the body of the POST request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/client-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session}`, // Ensure session includes the correct token
          },
          body: JSON.stringify(clientInfoForm), // Assuming clientInfoForm is defined in the component
        }
      );

      const result = await response.json();

      if (response.ok) {
        setError(null);
        toast.success("Client created successfully!");
        router.back();
      } else {
        const errorMessage = result?.error || "Failed to create client data.";
        toast.error(errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error creating client data:", error);
      toast.error("An unexpected error occurred. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container  py-10">
      <div className="bg-white p-10">
        <h2 className="w-[25%] text-2xl font-bold text-secondary text-left py-4">
          Add Client
        </h2>
        <div>
          <form className="">
            <div className="flex items-center space-x-6 py-3">
              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-lg font-normal text-gray-900"
                >
                  Full Name<span className="text-primary">*</span>
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  id="clientInfoForm.fullName"
                  className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400 active:border-primary outline-none"
                  placeholder="Carlos Rosario"
                  name="basicInformation.fullName"
                  value={clientInfoForm.basicInformation.fullName || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-lg font-normal text-gray-900"
                >
                  Mobile Number<span className="text-primary">*</span>
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  id="clientInfoForm.phone"
                  className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="(555) 555-1234"
                  name="basicInformation.phone"
                  value={clientInfoForm.basicInformation.phone || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center space-x-6 py-3">
              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-lg font-normal text-gray-900"
                >
                  Email<span className="text-primary">*</span>
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  id="basicInformation.email"
                  className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="example@gmail.com"
                  name="basicInformation.email"
                  value={clientInfoForm.basicInformation.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-lg font-normal text-gray-900"
                >
                  Profession<span className="text-primary">*</span>
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  id="basicInformation.profession"
                  className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="Software Engineer"
                  name="basicInformation.profession"
                  value={clientInfoForm.basicInformation.profession || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center space-x-6 py-3">
              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-lg font-normal text-gray-900"
                >
                  Annual Gross Income<span className="text-primary">*</span>
                </label>

                <input
                  autoComplete="off"
                  type="number"
                  id="clientInfoForm.annualGrossIncome"
                  className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="$"
                  name="basicInformation.annualGrossIncome"
                  value={
                    clientInfoForm.basicInformation.annualGrossIncome ?? ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-lg font-normal text-gray-400"
                >
                  Date of Birth<span className="text-primary">*</span>
                </label>

                <div className="relative max-w-full">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="basicInformation.dateOfBirth"
                    type="date"
                    className="ps-10 p-2.5 bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                    placeholder="Select date"
                    name="basicInformation.dateOfBirth"
                    value={clientInfoForm.basicInformation.dateOfBirth || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6 py-3">
              <div className="w-full">
                <label
                  htmlFor="marital-status-dropdown"
                  className="block mb-2 text-lg font-normal text-gray-900"
                >
                  Marital Status<span className="text-primary">*</span>
                </label>
                <div className="relative inline-block w-full">
                  <button
                    id="marital-status-dropdown"
                    onClick={() =>
                      setIsMarriedStatusDropdown(!marriedStatusDropdown)
                    }
                    className="w-full px-5 py-2.5 text-lg text-gray-600 bg-[#eeeeee] border border-gray-300 rounded-lg hover:bg-[#eeeeee] focus:outline-none focus:ring-4 inline-flex items-center justify-between"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={marriedStatusDropdown}
                  >
                    <span>
                      {clientInfoForm?.basicInformation?.maritalStatus ||
                        "Select Status"}
                    </span>
                    <svg
                      className="w-2.5 h-2.5 ml-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  {marriedStatusDropdown && (
                    <div
                      className="absolute z-10 w-full mt-2 bg-[#eeeeee] border border-gray-300 rounded-lg shadow-md"
                      role="menu"
                      aria-labelledby="marital-status-dropdown"
                    >
                      <ul className="divide-y divide-gray-200">
                        {["Single", "Married", "Divorced"].map((status) => (
                          <li key={status}>
                            <button
                              onClick={() =>
                                onMarriedStatusHandler(status.toLowerCase())
                              }
                              className="block w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              {status}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-lg font-normal text-gray-900"
                >
                  Address<span className="text-primary">*</span>
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  id="basicInformation.address"
                  className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="Concrete, Washington"
                  name="basicInformation.address"
                  value={clientInfoForm.basicInformation.address || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            {clientInfoForm?.basicInformation?.maritalStatus === "married" ? (
              <div className="mt-6">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-lg font-normal text-gray-900"
                >
                  Spouse Details
                </label>
                <div className="bg-[#eeeeee] p-5">
                  <div className="flex items-center space-x-6 py-3">
                    <div className="w-full">
                      <input
                        autoComplete="off"
                        type="text"
                        id="clientDetails[0].basicInformation[0].spouseDetails[0].name"
                        className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                        placeholder="Name"
                        name="basicInformation.spouseDetails.fullName"
                        value={
                          clientInfoForm.basicInformation?.spouseDetails
                            .fullName || ""
                        }
                        onChange={handleChange}
                      />
                    </div>
                    <div className="w-full">
                      <input
                        autoComplete="off"
                        type="text"
                        id="clientDetails[0].basicInformation[0].spouseDetails[0].profession"
                        className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                        placeholder="Profession"
                        name="basicInformation.spouseDetails.profession"
                        value={
                          clientInfoForm?.basicInformation?.spouseDetails
                            ?.profession || ""
                        }
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 py-5">
                    <div className="w-full">
                      <input
                        autoComplete="off"
                        type="number"
                        id="basicInformation.spouseDetails.income"
                        className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                        placeholder="Income"
                        name="basicInformation.spouseDetails.income"
                        value={
                          clientInfoForm?.basicInformation?.spouseDetails
                            ?.income ?? ""
                        }
                        onChange={handleChange}
                      />
                    </div>

                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                        </svg>
                      </div>
                      <input
                        id="basicInformation.spouseDetails.dateOfBirth"
                        type="date"
                        className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none p-4 ps-10"
                        placeholder="Date of Birth"
                        name="basicInformation.spouseDetails.dateOfBirth"
                        value={
                          clientInfoForm?.basicInformation?.spouseDetails
                            ?.dateOfBirth || ""
                        }
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="pt-6 text-center">
              {error && <p className="text-red-500 text-base">{error}</p>}
            </div>

            <div className="w-full flex items-center  justify-center mt-4 space-x-6">
              <button
                type="submit"
                onClick={handleSubmitFormData}
                className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[220px] text-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-gray-300 animate-spin fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                    <p>Creating...</p>
                  </div>
                ) : (
                  <p>Add Client</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewClientForm;
