"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ViewTaxProposal = () => {
  const taxInfo = useSelector((state: RootState) => state.taxInfo);

  return (
    <div className="flex flex-col gap-6 2xl:gap-10">
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
      <div>
        <div className="min-h-[750px] h-full relative flex  ">
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
          <div className="absolute bottom-10 right-10 z-50">
            <Image
              src="/assets/site-logo/10x-tax.png"
              alt="apex advisor logo"
              width={300}
              height={200}
              className="max-w-32 w-full"
            />
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
      <div>
        <div className="min-h-[750px] h-full relative flex  ">
          <div className="text-black text-start px-10 pt-10 pb-10 2xl:px-20 2xl:pt-20 2xl:pb-20 relative min-h-[750px] flex items-center bg-[#F0F3F7] border-t-8 border-primary w-full">
            <div className="flex flex-col h-full gap-8 2xl:gap-14 ">
              <div>
                <h2 className="text-4xl 2xl:text-5xl text-black font-bold mb-3">
                  Your Estimated Tax Savings
                </h2>
                <p className="text-lg 2xl:text-xl font-normal mb-4 text-black">
                  Based on preliminary information, this is how much we estimate
                  you can save in taxes based on your current situation and
                  projections.
                </p>
              </div>
              <div className="grid grid-cols-3 ">
                <div className="flex  justify-between items-end gap-2 pe-6 2xl:pe-20 py-5">
                  <div className="flex flex-col justify-between items-end gap-2">
                    <h4 className="text-3xl font-bold text-primary">
                      {
                        taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentOne
                          ?.year
                      }
                    </h4>
                    <p className="text-end text-lg leading-[130%]">
                      Estimated <br /> Overpayment
                    </p>
                  </div>
                  <h4 className="text-3xl font-bold text-black mb-[3px]">
                    $
                    {taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentOne.amount?.toFixed(
                      2
                    ) || 0}
                  </h4>
                </div>
                <div className="flex  justify-between items-end gap-2 px-6 2xl:px-20 border-x-2 border-primary py-5">
                  <div className="flex flex-col justify-between items-end gap-2">
                    <h4 className="text-3xl font-bold text-primary">
                      {
                        taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentTwo
                          ?.year
                      }
                    </h4>
                    <p className="text-end text-lg leading-[130%]">
                      Estimated <br /> Overpayment
                    </p>
                  </div>
                  <h4 className="text-3xl font-bold text-black mb-[3px]">
                    $
                    {taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentTwo.amount?.toFixed(
                      2
                    ) || 0}
                  </h4>
                </div>
                <div className="flex  justify-between items-end gap-2 ps-6 2xl:ps-20 py-5">
                  <div className="flex flex-col justify-between items-end gap-2">
                    <h4 className="text-3xl font-bold text-primary">
                      {
                        taxInfo?.data?.taxProposalInfo?.ourEstimatedOverpayment
                          ?.year
                      }
                    </h4>
                    <p className="text-end text-lg leading-[130%]">
                      Estimated <br /> Overpayment
                    </p>
                  </div>
                  <h4 className="text-3xl font-bold text-black mb-[3px]">
                    $
                    {taxInfo?.data?.taxProposalInfo?.ourEstimatedOverpayment?.amount?.toFixed(
                      2
                    ) || 0}
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
      <div>
        <div className="min-h-[750px] h-full relative flex  ">
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
                      {
                        taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentOne
                          ?.year
                      }
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
                      {
                        taxInfo?.data?.taxProposalInfo?.estimatedOverpaymentTwo
                          ?.year
                      }
                    </h4>
                    <p className="text-end text-lg leading-[130%]">
                      Estimated <br /> Overpayment
                    </p>
                  </div>
                </div>
                <h4 className="text-3xl font-bold ">?</h4>
                <h4 className="text-3xl font-bold text-primary">=</h4>
                <p className="text-start text-base font-bold leading-[130%] max-w-xs">
                  $
                  {taxInfo?.data?.taxProposalInfo?.ourEstimatedOverpayment?.estimatedLostLastYear?.toFixed(
                    2
                  )}
                </p>
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
    </div>
  );
};

export default ViewTaxProposal;
