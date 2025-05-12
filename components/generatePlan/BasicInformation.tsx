"use client";
import { useState } from "react";
import { GoQuestion } from "react-icons/go";
import { toast } from "react-toastify";
import DatePickerInputField from "../shared/ui/DatePickerInputField";
import DatePickerInputForSpouse from "../shared/ui/DatePickerInputForSpouse";
import Loader from "../shared/ui/Loader";

// interface ClientDeletedModalProps {
//   setClientInfoForm: (value: boolean) => void;
//   clientInfoForm: string | null;
// }

const BasicInformation = ({
  clientInfoForm,
  setClientInfoForm,
  setActiveTab,
  id,
  session,
}: any) => {
  const [marriedStatusDropdown, setIsMarriedStatusDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [nextLoading, setNextLoading] = useState<boolean>(false);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const keys = name.split(/[\[\]\.]+/).filter(Boolean);

    setClientInfoForm((prevState: any) => {
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

  const handleDateChange = (dateString: string) => {
    setClientInfoForm((prev: any) => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        dateOfBirth: dateString,
      },
    }));
  };

  const handleSpouseDateChange = (dateString: string) => {
    setClientInfoForm((prev: any) => ({
      ...prev,
      basicInformation: {
        ...prev.basicInformation,
        spouseDetails: {
          ...prev.basicInformation?.spouseDetails,
          dateOfBirth: dateString,
        },
      },
    }));
  };

  const handleSubmitFormData = async (e: React.FormEvent) => {
    e.preventDefault();

    const action = (e.nativeEvent as SubmitEvent).submitter?.getAttribute(
      "name"
    );

    if (action === "next") {
      setNextLoading(true);
    } else {
      setSaveLoading(true);
    }

    try {
      // Convert `clientInfoForm` to JSON and send it in the body of the POST request
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/client-details/${id}`,
        {
          method: "PUT",
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
        if (action === "next") {
          setActiveTab("filling-status");
        } else {
          toast.success("Client save successfully!");
        }
      } else {
        const errorMessage = result?.error || "Failed to update client data.";
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error update client data:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setSaveLoading(false);
      setNextLoading(false);
    }
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmitFormData}>
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
            <div className="mb-2 flex items-center space-x-1 relative">
              <label className="block text-lg font-normal text-gray-900">
                Annual gross income
              </label>

              <span className="group text-primary hover:text-hoverColor text-lg cursor-pointer relative">
                <GoQuestion />

                <div className="absolute left-1/2 top-full mt-1 hidden w-max -translate-x-1/2 rounded bg-gray-500 p-2 text-sm text-white group-hover:block z-10">
                  Note: Additional text to be added later <br />
                  as per client's request.
                </div>
              </span>
            </div>

            <input
              autoComplete="off"
              type="number"
              id="clientInfoForm.annualGrossIncome"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none pr-3"
              placeholder="$"
              name="basicInformation.annualGrossIncome"
              value={clientInfoForm.basicInformation.annualGrossIncome ?? ""}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Date of Birth<span className="text-primary">*</span>
            </label>

            <div className="max-w-full">
              <DatePickerInputField
                id="basicInformation.dateOfBirth"
                name="basicInformation.dateOfBirth"
                value={clientInfoForm.basicInformation.dateOfBirth}
                onChange={handleDateChange}
                placeholder="Select birth date"
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
                className="w-full px-5 py-2.5 text-lg text-gray-600 bg-[#eeeeee] border border-gray-300 rounded-lg hover:bg-[#eeeeee] focus:outline-none focus:ring-4 inline-flex items-center justify-between capitalize"
                type="button"
                aria-haspopup="true"
                aria-expanded={marriedStatusDropdown}
              >
                <span>
                  {clientInfoForm?.basicInformation?.maritalStatus || "Select"}
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
                    {["Single", "Married"].map((status) => (
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
                      clientInfoForm.basicInformation?.spouseDetails.fullName ||
                      ""
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
                      clientInfoForm?.basicInformation?.spouseDetails?.income ??
                      ""
                    }
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full">
                  <DatePickerInputForSpouse
                    id=""
                    name="basicInformation?.spouseDetails
                            ?.dateOfBirth"
                    value={
                      clientInfoForm?.basicInformation?.spouseDetails
                        ?.dateOfBirth
                    }
                    onChange={handleSpouseDateChange}
                    placeholder="Select birth date"
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
            name="next"
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[120px] text-center h-[45px]"
          >
            {nextLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader />
              </div>
            ) : (
              <p>Next</p>
            )}
          </button>
          <button
            name="save"
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-secondary hover:bg-[#0d121c] hover:text-white w-[120px] text-center h-[45px]"
          >
            {saveLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader />
              </div>
            ) : (
              <p>Save</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInformation;
