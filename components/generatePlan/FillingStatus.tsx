"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../shared/ui/Loader";

const FillingStatus = ({
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

  const toCamelCase = (str: any) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word: any, index: any) =>
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join("");
  };

  const camelCaseToSpaced = (str: any) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (match: any) => match.toUpperCase())
      .trim();
  };

  const onMarriedStatusHandler = (value: string) => {
    setIsMarriedStatusDropdown(false);

    setClientInfoForm((prevState: any) => ({
      ...prevState,
      fillingStatus: toCamelCase(value),
    }));
  };

  // Input onChange handler

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

  // Data save handler

  const handleSubmitFormData = async (e: React.FormEvent) => {
    e.preventDefault();

    const action = (e.nativeEvent as SubmitEvent).submitter?.getAttribute(
      "name"
    );

    if (action === "back") {
      setActiveTab("basic-information");
    }

    if (action === "next") {
      setNextLoading(true);
    } else {
      setSaveLoading(true);
    }

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
        if (action === "next") {
          setActiveTab("dependents");
        } else if (action === "save") {
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
      <div className="flex items-center space-x-6 pb-3">
        <form className="w-full" onSubmit={handleSubmitFormData}>
          <div className="w-full">
            <label
              htmlFor="marital-status-dropdown"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Select Filling Status<span className="text-primary">*</span>
            </label>
            <div className="relative inline-block w-full">
              <button
                id="marital-status-dropdown"
                onClick={() =>
                  setIsMarriedStatusDropdown(!marriedStatusDropdown)
                }
                className="w-full px-5 py-2.5 text-lg text-gray-600 bg-[#eeeeee] border border-gray-300 rounded-lg hover:bg-[#eeeeee] focus:outline-none focus:ring-4 inline-flex items-center justify-between relative"
                type="button"
                aria-haspopup="true"
                aria-expanded={marriedStatusDropdown}
              >
                <span>
                  {camelCaseToSpaced(clientInfoForm?.fillingStatus) ||
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
                    {[
                      "Single",
                      "Married filing jointly",
                      "Married filing separately",
                      "Head of household",
                    ].map((status) => (
                      <li key={status}>
                        <button
                          onClick={() => onMarriedStatusHandler(status)}
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

          {/* Error Handling*/}

          <div className="pt-6 text-center">
            {error && <p className="text-red-500 text-base">{error}</p>}
          </div>

          {/* Submit Button*/}

          <div className="w-full flex items-center  justify-center mt-10 space-x-6">
            <button
              name="back"
              type="submit"
              className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[120px] text-center h-[45px]"
            >
              Back
            </button>
            <button
              name="next"
              type="submit"
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
              type="submit"
              className="px-4 py-2  text-white rounded-md font-medium text-lg bg-secondary hover:bg-[#0d121c] hover:text-white w-[120px]  text-center h-[45px]"
            >
              {saveLoading ? (
                <div className="flex items-center justify-center space-x-2 ">
                  <Loader />
                </div>
              ) : (
                <p> Save</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FillingStatus;
