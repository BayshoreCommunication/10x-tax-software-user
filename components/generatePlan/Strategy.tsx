"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { GoQuestion } from "react-icons/go";
import Loader from "../shared/ui/Loader";

const Strategy = ({
  clientInfoForm,
  setClientInfoForm,
  setActiveTab,
  id,
  session,
}: any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        router.push(`/calculate-tax/${id}`);
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
    <div>
      <form onSubmit={handleSubmitFormData}>
        <h3 className="text-xl font-semibold mt-3">Maximize Deductions</h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-full h-[90px]">
            <div>
              <div className="mb-2 flex items-center space-x-1 relative">
                <label className="block text-lg font-normal text-gray-900">
                  Home Office
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
                type="text"
                id="home-office"
                name="strategy.homeOffice"
                value={clientInfoForm.strategy.homeOffice || ""}
                onChange={handleChange}
                placeholder="$"
                autoComplete="off"
                className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
              />
            </div>
          </div>

          <div className="w-full h-[90px]">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Depreciation
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
              Travel
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
              Meals
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

        <h3 className="text-xl font-semibold mt-4 mb-1">
          Employing Family Members / Shifting Income to Family
        </h3>
        <div className="flex items-center space-x-6 py-3">
          <div className="w-1/2">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Hiring Children
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
          <div className="w-1/2">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Schedule C to S Corp
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
          <div className="w-1/2">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Cost Segregation
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
          <div className="w-1/2">
            <label
              htmlFor="name-icon"
              className="block mb-2 text-lg font-normal text-gray-900"
            >
              Rent home to corporation (Augusta)
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
            type="submit"
            className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white w-[400px] text-center h-[45px]"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <Loader />
                <p>Generating...</p>
              </div>
            ) : (
              <p> Generate</p>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Strategy;
