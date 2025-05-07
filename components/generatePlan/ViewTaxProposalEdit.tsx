"use client";

import { updateDataField } from "@/redux/features/taxInfoSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Loader from "../shared/ui/Loader";

import { TbEditCircle } from "react-icons/tb";
import { toast } from "react-toastify";

const ViewTaxProposalEdit = ({ session }: any) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const taxInfo = useSelector((state: RootState) => state.taxInfo);

  const [estimatedTaxPay, setEstimatedTaxPay] = useState(
    taxInfo?.data?.taxInfo?.calculatedTax || 0
  );

  const [estimatedOverpaymentOneFlag, setEstimatedOverpaymentOneFlag] =
    useState(false);
  const [estimatedOverpaymentTwoFlag, setEstimatedOverpaymentOneFlagTwo] =
    useState(false);
  const [ourEstimatedOverpaymentFlag, setOurEstimatedOverpaymentFlag] =
    useState(false);

  const [estimatedOverpaymentOne, setEstimatedOverpaymentOne] = useState({
    year:
      taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentOne?.year || "2023",
    amount:
      taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentOne?.amount || 0,
    lastYearLost:
      taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentOne?.lastYearLost ||
      0,
  });

  const [estimatedOverpaymentTwo, setEstimatedOverpaymentTwo] = useState({
    year:
      taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentTwo?.year || "2023",
    amount:
      taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentTwo?.amount || 0,
    lastYearLost:
      taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentTwo?.lastYearLost ||
      0,
  });

  const [ourEstimatedOverpayment, setOurEstimatedOverpayment] = useState({
    year:
      taxInfo?.data?.taxProposalInfo?.ourEstimatedOverpayment?.year || "2025",
    amount: taxInfo?.data?.taxInfo?.calculatedTax || 0,
    estimatedLostLastYear:
      taxInfo?.data?.taxProposalInfo?.ourEstimatedOverpayment
        ?.estimatedLostLastYear || 0,
  });

  const handleEstimatedOverpaymentOne = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEstimatedOverpaymentOne((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleEstimatedOverpaymentTwo = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setEstimatedOverpaymentTwo((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleOurEstimatedOverpayment = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setOurEstimatedOverpayment((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const taxPlanData = {
    clientId: taxInfo?.data?.client,
    taxInfo: taxInfo?.data?.taxInfo,
    taxProposalInfo: {
      estimatedOverpaymentOne,
      estimatedOverpaymentTwo,
      ourEstimatedOverpayment,
    },
  };

  useEffect(() => {
    const lostValue = estimatedOverpaymentOne?.amount - estimatedTaxPay;
    setEstimatedOverpaymentOne((prev) => ({
      ...prev,
      lastYearLost: lostValue,
    }));
  }, [estimatedOverpaymentOne?.amount]);

  useEffect(() => {
    const lostValue = estimatedOverpaymentTwo?.amount - estimatedTaxPay;
    setEstimatedOverpaymentTwo((prev) => ({
      ...prev,
      lastYearLost: lostValue,
    }));
  }, [estimatedOverpaymentTwo?.amount]);

  useEffect(() => {
    if (
      estimatedOverpaymentOne?.lastYearLost &&
      estimatedOverpaymentTwo?.lastYearLost
    ) {
      const estimatedLostLastYear =
        estimatedOverpaymentOne?.lastYearLost +
        estimatedOverpaymentTwo?.lastYearLost;
      setOurEstimatedOverpayment((prev) => ({
        ...prev,
        estimatedLostLastYear: estimatedLostLastYear,
      }));
    }
  }, [
    estimatedOverpaymentOne?.lastYearLost,
    estimatedOverpaymentTwo?.lastYearLost,
  ]);

  const handleUpdateTaxProposal = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tax-plan/${taxInfo?.data?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${session}`,
          },
          body: JSON.stringify(taxPlanData),
        }
      );

      const result = await response.json();

      if (result) {
        dispatch(
          updateDataField({
            key: "taxProposalInfo",
            value: taxPlanData?.taxProposalInfo,
          })
        );

        toast.success("Tax plan updated successfully!");

        setTimeout(() => {
          setLoading(false);
          router.back();
        }, 300);
      } else {
        toast.error("Failed to update tax plan.");
        setLoading(false);
        const errorMessage = result?.error || "Failed to create tax plan.";
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error("Error creating tax plan:", error);
      setError(
        error.message || "Something went wrong while creating the tax plan."
      );
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="space-y-6 2xl:space-y-10 container">
      {/* Top Heading Part */}
      <div
        style={{
          backgroundImage: "url('/assets/generate-plan/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="text-black text-start px-20 py-40 relative min-h-[750px] flex items-center"
      >
        <div className="max-w-xl 2xl:max-w-2xl ">
          <h1 className="text-5xl 2xl:text-6xl text-black font-bold mb-5">
            TAX PLANNING PROPOSAL
          </h1>
          <h4 className="text-3xl 2xl:text-4xl font-normal mb-4 text-primary">
            Proactive plan to reduce or eliminate taxes while complying with
            federal, state, and local law.
          </h4>
          <h6 className="text-xl  font-normal mb-4 text-black">
            Review of deductions, legal entity design, retirement, insurance,
            loopholes, TCJA, FFCRA, CARES, advanced strategies, and
            industry-specific strategies.
          </h6>
        </div>
        <div className="absolute bottom-10 right-10">
          <Image
            src="/assets/site-logo/10x-tax.png"
            alt="apex advisor logo"
            width={300}
            height={200}
            className="max-w-32 w-full"
          ></Image>
        </div>
      </div>
      {/* Important Information Part */}
      <div className="text-black text-start px-10 pt-10 pb-32 2xl:px-20 2xl:pt-20 2xl:pb-40 relative min-h-[750px] flex items-center bg-[#F0F3F7] border-t-8 border-primary">
        <div className="flex  gap-10 2xl:gap-20 items-start">
          <div>
            <h2 className="text-4xl 2xl:text-5xl font-bold  text-black">
              Important Information
            </h2>
          </div>
          <div>
            <p className="text-lg 2xl:text-xl font-normal mb-4 text-black">
              This Presentation, including all associated materials
              (collectively "this Presentation") is for informational purposes
              and its use is for the intended recipient only. Nothing in this
              Presentation should be construed to constitute or be relied upon
              as providing a legal opinion or providing legal advice by Apex
              Advisor Group. No accountant-client relationship is created solely
              by your use of this Presentation. Apex Advisor Group, its
              licensors and suppliers disclaim all liability in connection with
              your use of this presentation and you assume all responsibilities
              and obligations with respect to any decisions, conclusions,
              opinions or actions that you may take regarding your use of this
              Presentation.
            </p>
            <p className="text-lg 2xl:text-xl font-normal mb-4 text-black">
              Any reproduction, copying or redistribution of this Presentation,
              electronic or otherwise, in whole or in part, is strictly
              prohibited without the express written permission of Apex Advisor
              Group.
            </p>
            <p className="text-lg 2xl:text-xl font-normal mb-4 text-black">
              Any tax related information provided by this Presentation should
              not be used or be relied upon to (i) avoid the imposition of any
              payment, interest or penalties imposed by the U.S. Internal
              Revenue Service or to otherwise (ii) promote, market or recommend
              to others any tax related advice.
            </p>
            <p className="text-lg 2xl:text-xl font-normal mb-4 text-black">
              This Presentation utilizes sections of the Internal Revenue Code
              and associated regulations in effect as of the date of this
              Presentation. Apex Advisor Group assumes no obligation to update
              this Presentation in order to reflect changes in the U.S. tax
              laws.
            </p>
            <p className="text-lg 2xl:text-xl font-normal  text-black">
              This Presentation also utilizes certain information that you may
              have provided to Apex Advisor Group such as certain prior tax
              returns and answers to certain tax related questionnaires. Neither
              Apex Advisor Group, its suppliers and licensors shall be held
              liable for any liabilities arising from any incomplete,
              inaccurate, missing or other erroneous information provided to
              Apex Advisor Group or for any errors or omissions of Apex Advisor
              Group, its suppliers and licensors with respect to the use of this
              Presentation. You further acknowledge that your use of this
              Presentation does not make you a third party beneficiary with
              respect to any products or services provided, supplied and/or
              licensed for Apex Advisor Group.
            </p>
          </div>
        </div>
        <div className="absolute bottom-10 right-10">
          <Image
            src="/assets/site-logo/10x-tax.png"
            alt="apex advisor logo"
            width={300}
            height={200}
            className="max-w-32 w-full"
          ></Image>
        </div>
      </div>

      {/*   TABLE OF CONTENTS */}

      <div>
        <div className="min-h-[750px] h-full flex">
          {/* Left Blue Section */}
          <div className="bg-primary w-1/4 "></div>

          {/* Right Content Section */}
          <div className=" bg-[#F0F3F7] w-3/4 ">
            <div className="flex justify-center items-center h-full">
              <div className="max-w-xl 2xl:max-w-2xl px-10 py-20">
                <h2 className="text-5xl 2xl:text-6xl text-black font-bold mb-5">
                  TABLE OF CONTENTS
                </h2>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>Planning vs. Preparation</span>
                    <span className="text-primary">4</span>
                  </li>
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>Your Estimated Tax Savings</span>
                    <span className="text-primary">5</span>
                  </li>
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>What You Lost Last Year</span>
                    <span className="text-primary">6</span>
                  </li>
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>Categories of Tax Planning Strategies</span>
                    <span className="text-primary">7</span>
                  </li>
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>Stages of Tax Planning</span>
                    <span className="text-primary">8</span>
                  </li>
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>Tax Engagement Options</span>
                    <span className="text-primary">9</span>
                  </li>
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>Next Steps In The Planning Process</span>
                    <span className="text-primary">10</span>
                  </li>
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>We Look Forward To Working With You</span>
                    <span className="text-primary">11</span>
                  </li>
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>Frequently Asked Questions (FAQ)</span>
                    <span className="text-primary">12</span>
                  </li>
                  <li className="flex justify-between items-center text-lg 2xl:text-xl font-normal text-black">
                    <span>Important Information </span>
                    <span className="text-primary">13</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Logo Section */}
          {/* <div className="absolute bottom-10 right-10 z-50">
            <Image
              src="/assets/site-logo/10x-tax.png"
              alt="apex advisor logo"
              width={300}
              height={200}
              className="max-w-32 w-full"
            />
          </div> */}
        </div>
        <div className="mt-6">
          <p className="text-sm">
            This Presentation, including all associated materials (collectively
            this Presentation") is for informational purposes and its use is for
            the intended recipient only. Nothing in this Presentation should be
            construed to constitute or be relied upon as providing a legal
            opinion or providing legal advice by Apex Advisor Group. No
            accountant-client relationship is created solely by your use of this
            Presentation. Apex Advisor Group, its licensors and suppliers
            disclaim all liability in connection with your use of this
            presentation and you assume all responsibilities and obligations
            with respect to any decisions, conclusions, opinions or actions that
            you may take regarding your use of this Presentation. Any
            reproduction, copying or redistribution of this Presentation,
            electronic or otherwise, in whole or in part, is strictly prohibited
            without the express written permission of Apex Advisor Group. Any
            tax related information provided by this Presentation should not be
            used or be relied upon to (i) avoid the imposition of any payment,
            interest or penalties imposed by the US. Internal Revenue Service or
            to otherwise (ii) promote, market of recommend to others any tax
            related advice. This Presentation utilizes sections of the Internal
            Revenue Code and associated regulations in effect as of the date of
            this Presentation. Apex Advisor Group assumes no obligation to
            update this Presentation in order to reflect changes in the US tax
            laws. This Presentation also utilizes certain information that you
            may have provided to Apex Advisor Group such as certain prior tax
            returns and answers to certain tax related questionnaires. Neither
            Apex Advisor Group, its suppliers and licensors shall be held liable
            for any liabilities arising from any incomplete, inaccurate, missing
            or other emoneous information provided to Apex Advisor Group or for
            any errors or omissions of Apex Advisor Group, its suppliers and
            licensors with respect to the use of this Presentation. You further
            acknowledge that your use of this Présentation does not make you a
            third party beneficiary with respect
          </p>
        </div>
      </div>

      {/*   Your Estimated Tax Savings */}

      <div>
        <div className="text-black text-start bg-[#F0F3F7] border-t-8 border-primary p-10">
          <div>
            <h2 className="text-4xl 2xl:text-5xl text-black font-bold mb-3">
              Your Estimated Tax Savings
            </h2>
            <p className="text-lg 2xl:text-xl font-normal mb-4 text-black">
              Based on preliminary information, this is how much we estimate you
              can save in taxes based on your current situation and projections.
            </p>
          </div>

          <div className="flex justify-between items-center h-full w-full space-x-10 my-24 divide-x-2 divide-primary">
            {/* 2023 */}
            <div className="flex justify-between space-x-6 items-center w-full">
              <div className="flex flex-col justify-center center ml-10">
                <div className="flex items-center space-x-1">
                  <div className="w-[100px]">
                    {estimatedOverpaymentOneFlag ? (
                      <input
                        autoComplete="off"
                        type="text"
                        id="clientInfoForm.fullName"
                        className="bg-[#eeeeeed6] text-3xl font-bold text-primary rounded-lg focus:ring-none pxcus:border-none w-[100px] pl-2 placeholder-gray-400 active:border-none outline-none"
                        placeholder=""
                        name="year"
                        value={estimatedOverpaymentOne.year}
                        onChange={handleEstimatedOverpaymentOne}
                      />
                    ) : (
                      <h4 className="text-3xl font-bold text-primary">
                        {estimatedOverpaymentOne.year}
                      </h4>
                    )}
                  </div>

                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setEstimatedOverpaymentOneFlag(
                        !estimatedOverpaymentOneFlag
                      )
                    }
                  >
                    <TbEditCircle className="text-gray-800 size-5 hover:text-primary" />
                  </button>
                </div>
                <p className="text-xl font-semibold leading-6 mt-4">
                  Estimated <br />
                  Overpayment
                </p>
              </div>

              <div className="w-[180px] flex items-center">
                <FiDollarSign className="text-gray-700 mt-1 w-8" />
                <div className="">
                  {estimatedOverpaymentOneFlag ? (
                    <input
                      autoComplete="off"
                      type="text"
                      id="clientInfoForm.fullName"
                      className="bg-[#eeeeeed6] text-2xl font-semibold rounded-lg focus:ring-none focus:border-none block w-full pl-1 placeholder-gray-400 active:border-none outline-none"
                      placeholder=""
                      name="amount"
                      value={estimatedOverpaymentOne?.amount}
                      onChange={handleEstimatedOverpaymentOne}
                    />
                  ) : (
                    <p className="text-2xl font-semibold pl-1">
                      {estimatedOverpaymentOne?.amount?.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 2024 */}

            <div className="flex justify-between space-x-6 items-center w-full">
              <div className="flex flex-col justify-center center ml-10">
                <div className="flex items-center space-x-1">
                  <div className="w-[100px]">
                    {estimatedOverpaymentTwoFlag ? (
                      <input
                        autoComplete="off"
                        type="text"
                        id="clientInfoForm.fullName"
                        className="bg-[#eeeeeed6] text-3xl font-bold text-primary rounded-lg focus:ring-none pxcus:border-none w-[100px] pl-2 placeholder-gray-400 active:border-none outline-none"
                        placeholder=""
                        name="year"
                        value={estimatedOverpaymentTwo.year}
                        onChange={handleEstimatedOverpaymentTwo}
                      />
                    ) : (
                      <h4 className="text-3xl font-bold text-primary">
                        {estimatedOverpaymentTwo.year}
                      </h4>
                    )}
                  </div>

                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setEstimatedOverpaymentOneFlagTwo(
                        !estimatedOverpaymentTwoFlag
                      )
                    }
                  >
                    <TbEditCircle className="text-gray-800 size-5 hover:text-primary" />
                  </button>
                </div>
                <p className="text-xl font-semibold leading-6 mt-4">
                  Estimated <br />
                  Overpayment
                </p>
              </div>

              <div className="w-[180px] flex items-center">
                <FiDollarSign className="text-gray-700 mt-1 w-8" />
                <div className="">
                  {estimatedOverpaymentTwoFlag ? (
                    <input
                      autoComplete="off"
                      type="text"
                      id="clientInfoForm.fullName"
                      className="bg-[#eeeeeed6] text-2xl font-semibold rounded-lg focus:ring-none focus:border-none block w-full pl-1 placeholder-gray-400 active:border-none outline-none"
                      placeholder=""
                      name="amount"
                      value={estimatedOverpaymentTwo?.amount}
                      onChange={handleEstimatedOverpaymentTwo}
                    />
                  ) : (
                    <p className="text-2xl font-semibold pl-1">
                      {estimatedOverpaymentTwo?.amount?.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 2025 */}

            <div className="flex justify-between space-x-6 items-center w-full">
              <div className="flex flex-col justify-center center ml-10">
                <div className="flex items-center space-x-1">
                  <div className="w-[100px]">
                    {ourEstimatedOverpaymentFlag ? (
                      <input
                        autoComplete="off"
                        type="text"
                        id="clientInfoForm.fullName"
                        className="bg-[#eeeeeed6] text-3xl font-bold text-primary rounded-lg focus:ring-none pxcus:border-none w-[100px] pl-2 placeholder-gray-400 active:border-none outline-none"
                        placeholder=""
                        name="year"
                        value={ourEstimatedOverpayment.year}
                        onChange={handleOurEstimatedOverpayment}
                      />
                    ) : (
                      <h4 className="text-3xl font-bold text-primary">
                        {ourEstimatedOverpayment.year}
                      </h4>
                    )}
                  </div>

                  <button
                    className="cursor-pointer"
                    onClick={() =>
                      setOurEstimatedOverpaymentFlag(
                        !ourEstimatedOverpaymentFlag
                      )
                    }
                  >
                    <TbEditCircle className="text-gray-800 size-5 hover:text-primary" />
                  </button>
                </div>
                <p className="text-xl font-semibold leading-6 mt-4">
                  Estimated <br />
                  Overpayment
                </p>
              </div>

              <div className="w-[180px] flex items-center">
                <FiDollarSign className="text-gray-700 mt-1 w-8" />
                <div className="">
                  {ourEstimatedOverpaymentFlag ? (
                    <input
                      autoComplete="off"
                      type="text"
                      id="clientInfoForm.fullName"
                      className="bg-[#eeeeeed6] text-2xl font-semibold rounded-lg focus:ring-none focus:border-none block w-full pl-1 placeholder-gray-400 active:border-none outline-none"
                      placeholder=""
                      name="amount"
                      value={ourEstimatedOverpayment?.amount}
                      onChange={handleOurEstimatedOverpayment}
                    />
                  ) : (
                    <p className="text-2xl font-semibold pl-1">
                      {ourEstimatedOverpayment?.amount?.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 mt-10">
            <div>
              <p className=" text-base text-justify leading-[130%] pe-10 2xl:pe-20 border-r-2  border-primary py-5">
                These are estimated tax savings based on the information we have
                received from you via conversations, emails, tax returns etc.
                These are preliminary estimates and will change if we decide to
                engage in a tax planning engagement.
              </p>
            </div>
          </div>

          <div className="absolute bottom-10 right-10">
            {/* <Image
              src="/assets/site-logo/10x-tax.png"
              alt="apex advisor logo"
              width={300}
              height={200}
              className="max-w-32 w-full"
            ></Image> */}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm">
            This Presentation, including all associated materials (collectively
            this Presentation") is for informational purposes and its use is for
            the intended recipient only. Nothing in this Presentation should be
            construed to constitute or be relied upon as providing a legal
            opinion or providing legal advice by Apex Advisor Group. No
            accountant-client relationship is created solely by your use of this
            Presentation. Apex Advisor Group, its licensors and suppliers
            disclaim all liability in connection with your use of this
            presentation and you assume all responsibilities and obligations
            with respect to any decisions, conclusions, opinions or actions that
            you may take regarding your use of this Presentation. Any
            reproduction, copying or redistribution of this Presentation,
            electronic or otherwise, in whole or in part, is strictly prohibited
            without the express written permission of Apex Advisor Group. Any
            tax related information provided by this Presentation should not be
            used or be relied upon to (i) avoid the imposition of any payment,
            interest or penalties imposed by the US. Internal Revenue Service or
            to otherwise (ii) promote, market of recommend to others any tax
            related advice. This Presentation utilizes sections of the Internal
            Revenue Code and associated regulations in effect as of the date of
            this Presentation. Apex Advisor Group assumes no obligation to
            update this Presentation in order to reflect changes in the US tax
            laws. This Presentation also utilizes certain information that you
            may have provided to Apex Advisor Group such as certain prior tax
            returns and answers to certain tax related questionnaires. Neither
            Apex Advisor Group, its suppliers and licensors shall be held liable
            for any liabilities arising from any incomplete, inaccurate, missing
            or other emoneous information provided to Apex Advisor Group or for
            any errors or omissions of Apex Advisor Group, its suppliers and
            licensors with respect to the use of this Presentation. You further
            acknowledge that your use of this Présentation does not make you a
            third party beneficiary with respect
          </p>
        </div>
      </div>
      {/* Bottom Part */}
      <div>
        <div className="min-h-[750px] h-full flex ">
          <div className="text-black text-start px-10 pt-10 pb-10 2xl:px-10 2xl:pt-20 2xl:pb-20 relative min-h-[750px] flex items-center bg-[#F0F3F7] border-t-8 border-primary w-full">
            <div className="flex flex-col h-full gap-10 2xl:gap-20 w-full justify-center items-center">
              <div>
                <h2 className="text-4xl 2xl:text-5xl text-black font-bold mb-3">
                  What You Lost Last Year
                </h2>
                <p className="text-lg 2xl:text-xl font-normal mb-4 text-black">
                  If you had worked with us last year, how much would you have
                  saved compared to your current accountant?
                </p>
              </div>
              <div className="flex items-end justify-between gap-2 w-full">
                <div className="flex  justify-between items-end gap-2 ">
                  <div className="flex flex-col justify-between items-end gap-2">
                    <h4 className="text-3xl font-bold text-primary">
                      {estimatedOverpaymentOne?.year}
                    </h4>
                    <p className="text-end text-lg leading-[130%]">
                      Fee To <br /> Accountant
                    </p>
                  </div>
                </div>
                <h4 className="text-3xl font-bold ">?</h4>
                <h4 className="text-3xl font-bold text-primary ">+</h4>
                <div className="flex  justify-between items-end gap-2 ">
                  <div className="flex flex-col justify-between items-end gap-2">
                    <h4 className="text-3xl font-bold text-primary">
                      {estimatedOverpaymentTwo?.year}
                    </h4>
                    <p className="text-end text-lg leading-[130%]">
                      Estimated <br /> Overpayment
                    </p>
                  </div>
                </div>
                <h4 className="text-3xl font-bold ">?</h4>
                <div className="text-3xl font-bold text-black mb-[3px]"></div>
                <h4 className="text-3xl font-bold text-primary">=</h4>
                <div className="text-start text-base font-bold leading-[130%] max-w-xs">
                  <h4 className="text-3xl font-bold text-primary">
                    {ourEstimatedOverpayment?.estimatedLostLastYear?.toFixed(2)}
                  </h4>
                </div>
              </div>
              <div className="grid grid-cols-3 mt-10">
                <div>
                  <p className=" text-base text-justify leading-[130%] pe-10 2xl:pe-20 border-r-2  border-primary py-5">
                    These are estimated tax savings based on the information we
                    have received from you via conversations, emails, tax
                    returns etc. These are preliminary estimates and will change
                    if we decide to engage in a tax planning engagement.
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-10 right-10">
              <Image
                src="/assets/site-logo/10x-tax.png"
                alt="apex advisor logo"
                width={300}
                height={200}
                className="max-w-32 w-full"
              ></Image>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm">
            This Presentation, including all associated materials (collectively
            this Presentation") is for informational purposes and its use is for
            the intended recipient only. Nothing in this Presentation should be
            construed to constitute or be relied upon as providing a legal
            opinion or providing legal advice by Apex Advisor Group. No
            accountant-client relationship is created solely by your use of this
            Presentation. Apex Advisor Group, its licensors and suppliers
            disclaim all liability in connection with your use of this
            presentation and you assume all responsibilities and obligations
            with respect to any decisions, conclusions, opinions or actions that
            you may take regarding your use of this Presentation. Any
            reproduction, copying or redistribution of this Presentation,
            electronic or otherwise, in whole or in part, is strictly prohibited
            without the express written permission of Apex Advisor Group. Any
            tax related information provided by this Presentation should not be
            used or be relied upon to (i) avoid the imposition of any payment,
            interest or penalties imposed by the US. Internal Revenue Service or
            to otherwise (ii) promote, market of recommend to others any tax
            related advice. This Presentation utilizes sections of the Internal
            Revenue Code and associated regulations in effect as of the date of
            this Presentation. Apex Advisor Group assumes no obligation to
            update this Presentation in order to reflect changes in the US tax
            laws. This Presentation also utilizes certain information that you
            may have provided to Apex Advisor Group such as certain prior tax
            returns and answers to certain tax related questionnaires. Neither
            Apex Advisor Group, its suppliers and licensors shall be held liable
            for any liabilities arising from any incomplete, inaccurate, missing
            or other emoneous information provided to Apex Advisor Group or for
            any errors or omissions of Apex Advisor Group, its suppliers and
            licensors with respect to the use of this Presentation. You further
            acknowledge that your use of this Présentation does not make you a
            third party beneficiary with respect
          </p>
        </div>
      </div>
      <div className="w-full flex items-center  justify-center space-x-6  mt-5">
        <button
          className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white text-center max-w-[160px] w-full h-12"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="px-4 py-2  text-white rounded-md font-medium text-lg bg-primary hover:bg-hoverColor hover:text-white text-center max-w-[160px] w-full h-12"
          onClick={handleUpdateTaxProposal}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </div>
  );
};

export default ViewTaxProposalEdit;
