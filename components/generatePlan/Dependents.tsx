"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { PiInfo } from "react-icons/pi";
import Loader from "../shared/ui/Loader";

const Dependents = ({
  clientInfoForm,
  setClientInfoForm,
  setActiveTab,
  id,
  session,
  setGenerateplanViewFlag,
}: any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Input onchange handler

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

  // Data Save handler

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
    <form onSubmit={handleSubmitFormData}>
      {/*Form*/}
      <div className="flex items-center space-x-6 py-3">
        <div className="w-full">
          <label
            htmlFor="name-icon"
            className="block mb-2 text-lg font-normal text-gray-900"
          >
            Under age 17
          </label>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="$"
            name="dependents.underAge17"
            value={clientInfoForm.dependents.underAge17 || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <div className=" mb-2 flex items-center space-x-1">
            <label className="text-lg font-normal text-gray-90">
              Full- time students age 17 - 23
            </label>
            <span className="text-primary hover:text-hoverColor cursor-pointer">
              <PiInfo />
            </span>
          </div>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="$"
            name="dependents.fullTimeStudentsAge17To23"
            value={clientInfoForm.dependents.fullTimeStudentsAge17To23 || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center space-x-6 py-3">
        <div className="w-full">
          <div className=" mb-2 flex items-center space-x-1">
            <label className="text-lg font-normal text-gray-90">
              Other dependents
            </label>
            <span className="text-primary hover:text-hoverColor cursor-pointer">
              <PiInfo />
            </span>
          </div>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="$"
            name="dependents.otherDependents"
            value={clientInfoForm.dependents.otherDependents || ""}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <div className=" mb-2 flex items-center space-x-1">
            <label className="text-lg font-normal text-gray-90">
              Total number of dependents
            </label>
            <span className="text-primary hover:text-hoverColor cursor-pointer">
              <PiInfo />
            </span>
          </div>

          <input
            autoComplete="off"
            type="text"
            id="email-address-icon"
            className="bg-[#eeeeee] border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
            placeholder="$"
            name="dependents.totalNumberOfDependents"
            value={clientInfoForm.dependents.totalNumberOfDependents || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Error Handling*/}

      <div className="pt-6 text-center">
        {error && <p className="text-red-500 text-base">{error}</p>}
      </div>

      {/* Submit Button*/}

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
  );
};

export default Dependents;
