"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../shared/ui/Loader";

const Strategy = ({
  clientInfoForm,
  setClientInfoForm,
  setActiveTab,
  id,
  session,
}: any) => {
  const [error, setError] = useState<string | null>(null);
  const [saveLoading, setSaveLoading] = useState<boolean>(false);
  const [nextLoading, setNextLoading] = useState<boolean>(false);

  // Input onChange handler

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const keys = name.split(/[\[\]\.]+/).filter(Boolean);

    setClientInfoForm((prevState: any) => {
      const updatedState = { ...prevState };
      let current: any = updatedState;

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
      setActiveTab("filling-status");
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
      <form onSubmit={handleSubmitFormData}>
        <h3 className="text-xl font-semibold mt-3">Maximize Deductions</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Home Office<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
              name="strategy.homeOffice"
              value={clientInfoForm.strategy.homeOffice || ""}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Depreciation<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
              name="strategy.depreciation"
              value={clientInfoForm.strategy.depreciation || ""}
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
              Travel<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
              name="strategy.travel"
              value={clientInfoForm.strategy.travel || ""}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Meals<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
              name="strategy.meals"
              value={clientInfoForm.strategy.meals || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-4 mb-1">Entry Structuring</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-[49%]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Hiring Children<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
              name="strategy.hiringChildren"
              value={clientInfoForm.strategy.hiringChildren || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Entry Structuring</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-[49%]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Schedule C to S Corp<span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
              name="strategy.scheduleCToSCorp"
              value={clientInfoForm.strategy.scheduleCToSCorp || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Niche</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-[49%]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Cost Segregation
              <span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
              name="strategy.costSegregation"
              value={clientInfoForm.strategy.costSegregation || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-1">Advanced Strategies</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-[49%]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Rent home to corporation (Augusta)
              <span className="text-primary">*</span>
            </label>

            <input
              autoComplete="off"
              type="text"
              id="email-address-icon"
              className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              placeholder="$"
              name="strategy.rentHomeToCorporation"
              value={clientInfoForm.strategy.rentHomeToCorporation || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Error handle */}

        <div className="pt-6 text-center">
          {error && <p className="text-red-500 text-base">{error}</p>}
        </div>

        {/* Submit button */}

        <div className="w-full flex items-center  justify-center mt-10 space-x-6">
          <button
            name="back"
            type="submit"
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[120px] text-center"
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
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-secondary hover:bg-[#0d121c] hover:text-white w-[120px] text-center h-[45px]"
          >
            {saveLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader />
                <p>Saving...</p>
              </div>
            ) : (
              <p> Save</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Strategy;
