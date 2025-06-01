import Image from "next/image";
import { MdDone } from "react-icons/md";

const ViewTaxProposalTest = () => {
  return (
    <div className="container mx-auto px-4 2xl:px-20 !bg-transparent">
      <div className="flex flex-col gap-6 2xl:gap-10 mb-5">
        {/* TAX PLANNING PROPOSAL  */}
        <div>
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
              <h4 className="text-3xl 2xl:text-4xl font-normal  text-primary">
                Proactive plan to reduce or eliminate taxes while complying with
                federal, state, and local law.
              </h4>
              <h6 className="text-xl  font-normal mb-4 text-black">
                Review of deductions, legal entity design, retirement,
                insurance, loopholes, TCJA, FFCRA, CARES, advanced strategies,
                and industry-specific strategies.
              </h6>
            </div>
            <div className="absolute bottom-10 right-10">
              <Image
                src="/assets/generate-plan/apex-advisor-logo.png"
                alt="apex advisor logo"
                width={300}
                height={200}
                className="max-w-36 w-full"
              ></Image>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm 2xl:text-sm font-normal mb-4 text-black">
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
              Presentation. Any reproduction, copying or redistribution of this
              Presentation, electronic or otherwise, in whole or in part, is
              strictly prohibited without the express written permission of Apex
              Advisor Group. Any tax related information provided by this
              Presentation should not be used or be relied upon to (i) avoid the
              imposition of any payment, interest or penalties imposed by the
              U.S. Internal Revenue Service or to otherwise (ii) promote, market
              or recommend to others any tax related advice. This Presentation
              utilizes sections of the Internal Revenue Code and associated
              regulations in effect as of the date of this Presentation. Apex
              Advisor Group assumes no obligation to update this Presentation in
              order to reflect changes in the U.S. tax laws. This Presentation
              also utilizes certain information that you may have provided to
              Apex Advisor Group such as certain prior tax returns and answers
              to certain tax related questionnaires. Neither Apex Advisor Group,
              its suppliers and licensors shall be held liable for any
              liabilities arising from any incomplete, inaccurate, missing or
              other erroneous information provided to Apex Advisor Group or for
              any errors or omissions of Apex Advisor Group, its suppliers and
              licensors with respect to the use of this Presentation. You
              further acknowledge that your use of this Presentation does not
              make you a third party beneficiary with respect to any products or
              services provided, supplied and/or licensed to Apex Advisor Group.
            </p>
          </div>
        </div>
        {/* Important Information */}
        <div className="text-black text-start px-10 pt-10 pb-32 2xl:px-20 2xl:pt-20 2xl:pb-40 relative min-h-[750px] flex items-center bg-[#F0F3F7] border-t-8 border-primary">
          <div className="flex  gap-10 2xl:gap-20 items-start">
            <div>
              <h2 className="text-4xl 2xl:text-5xl font-bold  text-black">
                Important Information
              </h2>
            </div>
            <div>
              <p className="text-base 2xl:text-lg font-normal mb-4 text-black">
                This Presentation, including all associated materials
                (collectively "this Presentation") is for informational purposes
                and its use is for the intended recipient only. Nothing in this
                Presentation should be construed to constitute or be relied upon
                as providing a legal opinion or providing legal advice by Apex
                Advisor Group. No accountant-client relationship is created
                solely by your use of this Presentation. Apex Advisor Group, its
                licensors and suppliers disclaim all liability in connection
                with your use of this presentation and you assume all
                responsibilities and obligations with respect to any decisions,
                conclusions, opinions or actions that you may take regarding
                your use of this Presentation.
              </p>
              <p className="text-base 2xl:text-lg font-normal mb-4 text-black">
                Any reproduction, copying or redistribution of this
                Presentation, electronic or otherwise, in whole or in part, is
                strictly prohibited without the express written permission of
                Apex Advisor Group.
              </p>
              <p className="text-base 2xl:text-lg font-normal mb-4 text-black">
                Any tax related information provided by this Presentation should
                not be used or be relied upon to (i) avoid the imposition of any
                payment, interest or penalties imposed by the U.S. Internal
                Revenue Service or to otherwise (ii) promote, market or
                recommend to others any tax related advice.
              </p>
              <p className="text-base 2xl:text-lg font-normal mb-4 text-black">
                This Presentation utilizes sections of the Internal Revenue Code
                and associated regulations in effect as of the date of this
                Presentation. Apex Advisor Group assumes no obligation to update
                this Presentation in order to reflect changes in the U.S. tax
                laws.
              </p>
              <p className="text-base 2xl:text-lg font-normal  text-black">
                This Presentation also utilizes certain information that you may
                have provided to Apex Advisor Group such as certain prior tax
                returns and answers to certain tax related questionnaires.
                Neither Apex Advisor Group, its suppliers and licensors shall be
                held liable for any liabilities arising from any incomplete,
                inaccurate, missing or other erroneous information provided to
                Apex Advisor Group or for any errors or omissions of Apex
                Advisor Group, its suppliers and licensors with respect to the
                use of this Presentation. You further acknowledge that your use
                of this Presentation does not make you a third party beneficiary
                with respect to any products or services provided, supplied
                and/or licensed for Apex Advisor Group.
              </p>
            </div>
          </div>
          <div className="absolute bottom-10 right-10">
            <Image
              src="/assets/generate-plan/apex-advisor-logo.png"
              alt="apex advisor logo"
              width={300}
              height={200}
              className="max-w-32 w-full"
            ></Image>
          </div>
        </div>
        {/*  TABLE OF CONTENTS */}
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
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
                      <span>Planning vs. Preparation</span>
                      <span className="text-primary">4</span>
                    </li>
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
                      <span>Your Estimated Tax Savings</span>
                      <span className="text-primary">5</span>
                    </li>
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
                      <span>What You Lost Last Year</span>
                      <span className="text-primary">6</span>
                    </li>
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
                      <span>Categories of Tax Planning Strategies</span>
                      <span className="text-primary">7</span>
                    </li>
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
                      <span>Stages of Tax Planning</span>
                      <span className="text-primary">8</span>
                    </li>
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
                      <span>Tax Engagement Options</span>
                      <span className="text-primary">9</span>
                    </li>
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
                      <span>Next Steps In The Planning Process</span>
                      <span className="text-primary">10</span>
                    </li>
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
                      <span>We Look Forward To Working With You</span>
                      <span className="text-primary">11</span>
                    </li>
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
                      <span>Frequently Asked Questions (FAQ)</span>
                      <span className="text-primary">12</span>
                    </li>
                    <li className="flex justify-between items-center text-base 2xl:text-lg font-normal text-black">
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
                src="/assets/generate-plan/apex-advisor-logo.png"
                alt="apex advisor logo"
                width={300}
                height={200}
                className="max-w-32 w-full"
              />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm">
              This Presentation, including all associated materials
              (collectively this Presentation") is for informational purposes
              and its use is for the intended recipient only. Nothing in this
              Presentation should be construed to constitute or be relied upon
              as providing a legal opinion or providing legal advice by Apex
              Advisor Group. No accountant-client relationship is created solely
              by your use of this Presentation. Apex Advisor Group, its
              licensors and suppliers disclaim all liability in connection with
              your use of this presentation and you assume all responsibilities
              and obligations with respect to any decisions, conclusions,
              opinions or actions that you may take regarding your use of this
              Presentation. Any reproduction, copying or redistribution of this
              Presentation, electronic or otherwise, in whole or in part, is
              strictly prohibited without the express written permission of Apex
              Advisor Group. Any tax related information provided by this
              Presentation should not be used or be relied upon to (i) avoid the
              imposition of any payment, interest or penalties imposed by the
              US. Internal Revenue Service or to otherwise (ii) promote, market
              of recommend to others any tax related advice. This Presentation
              utilizes sections of the Internal Revenue Code and associated
              regulations in effect as of the date of this Presentation. Apex
              Advisor Group assumes no obligation to update this Presentation in
              order to reflect changes in the US tax laws. This Presentation
              also utilizes certain information that you may have provided to
              Apex Advisor Group such as certain prior tax returns and answers
              to certain tax related questionnaires. Neither Apex Advisor Group,
              its suppliers and licensors shall be held liable for any
              liabilities arising from any incomplete, inaccurate, missing or
              other emoneous information provided to Apex Advisor Group or for
              any errors or omissions of Apex Advisor Group, its suppliers and
              licensors with respect to the use of this Presentation. You
              further acknowledge that your use of this Présentation does not
              make you a third party beneficiary with respect
            </p>
          </div>
        </div>
        {/* Your Estimated Tax Savings */}
        <div>
          <div className="min-h-[750px] h-full relative flex  ">
            <div className="text-black text-start px-10 pt-10 pb-10 2xl:px-20 2xl:pt-20 2xl:pb-10 relative min-h-[550px] flex items-center bg-[#F0F3F7] border-t-8 border-primary w-full">
              <div className="flex flex-col h-full gap-8 2xl:gap-14 w-full ">
                <div>
                  <h2 className="text-4xl 2xl:text-5xl text-black font-bold mb-3">
                    Your Estimated Tax Savings
                  </h2>
                  <p className="text-base 2xl:text-lg font-normal mb-4 text-black ">
                    Based on preliminary information, this is how much we
                    estimate you can save in taxes based on your current
                    situation and projections.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-10 w-full mx-auto">
                  <div className=" max-w-xs">
                    <h3 className="text-3xl font-bold text-black">
                      Tax Planning
                    </h3>
                    <p className="text-base 2xl:text-lg font-normal mb-4 text-black text-justify  mt-4 pb-4 border-b border-black">
                      The process of looking at a person's life, business, and
                      regulatory requirements to legally reduce taxes.
                    </p>

                    <h4 className="text-2xl font-bold text-primary">
                      Before Year End
                    </h4>
                  </div>
                  <div className="h-full w-px bg-primary"></div>
                  <div className=" max-w-xs">
                    <h3 className="text-3xl font-bold text-black">
                      Tax Preparation
                    </h3>
                    <p className="text-base 2xl:text-lg font-normal mb-4 text-black text-justify  mt-4 pb-4 border-b border-black">
                      The process of reviewing the years financial results and
                      preparing tax returns for submission to the IRS.
                    </p>

                    <h4 className="text-2xl font-bold text-red-600">
                      After Year End
                    </h4>
                  </div>
                </div>
                <p className="text-center text-2xl font-normal text-neutral-500">
                  12/31/2023
                </p>
              </div>

              <div className="absolute bottom-10 right-10">
                <Image
                  src="/assets/generate-plan/apex-advisor-logo.png"
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
              Presentation. Any reproduction, copying or redistribution of this
              Presentation, electronic or otherwise, in whole or in part, is
              strictly prohibited without the express written permission of Apex
              Advisor Group. Any tax related information provided by this
              Presentation should not be used or be relied upon to (i) avoid the
              imposition of any payment, interest or penalties imposed by the
              U.S. Internal Revenue Service or to otherwise (ii) promote, market
              or recommend to others any tax related advice. This Presentation
              utilizes sections of the Internal Revenue Code and associated
              regulations in effect as of the date of this Presentation. Apex
              Advisor Group assumes no obligation to update this Presentation in
              order to reflect changes in the U.S. tax laws. This Presentation
              also utilizes certain information that you may have provided to
              Apex Advisor Group such as certain prior tax returns and answers
              to certain tax related questionnaires. Neither Apex Advisor Group,
              its suppliers and licensors shall be held liable for any
              liabilities arising from any incomplete, inaccurate, missing or
              other erroneous information provided to Apex Advisor Group or for
              any errors or omissions of Apex Advisor Group, its suppliers and
              licensors with respect to the use of this Presentation. You
              further acknowledge that your use of this Presentation does not
              make you a third party beneficiary with respect to any products or
              services provided, supplied and/or licensed to Apex Advisor Group.
            </p>
          </div>
        </div>
        {/* Planning vs. Preparation */}
        <div>
          <div className="min-h-[750px] h-full relative flex  ">
            <div className="text-black text-start px-10 pt-10 pb-10 2xl:px-20 2xl:pt-20 2xl:pb-20 relative min-h-[750px] flex items-center bg-[#F0F3F7] border-t-8 border-primary w-full">
              <div className="flex flex-col h-full gap-8 2xl:gap-14 ">
                <div>
                  <h2 className="text-4xl 2xl:text-5xl text-black font-bold mb-3">
                    Planning vs. Preparation
                  </h2>
                  <p className="text-base 2xl:text-lg font-normal mb-4 text-black">
                    There's a distinction between reactive, past looking
                    preparation and forward looking, proactive planning.
                  </p>
                </div>
                <div className="grid grid-cols-3 ">
                  <div className="flex  justify-between items-end gap-2 pe-6 2xl:pe-20 py-5">
                    <div className="flex flex-col justify-between items-end gap-2">
                      <h4 className="text-3xl font-bold text-primary">2023</h4>
                      <p className="text-end text-lg leading-[130%]">
                        Estimated <br /> Overpayment
                      </p>
                    </div>
                    <h4 className="text-3xl font-bold text-black mb-[3px]">
                      $31,012
                    </h4>
                  </div>
                  <div className="flex  justify-between items-end gap-2 px-6 2xl:px-20 border-x-2 border-primary py-5">
                    <div className="flex flex-col justify-between items-end gap-2">
                      <h4 className="text-3xl font-bold text-primary">2023</h4>
                      <p className="text-end text-lg leading-[130%]">
                        Estimated <br /> Overpayment
                      </p>
                    </div>
                    <h4 className="text-3xl font-bold text-black mb-[3px]">
                      $31,012
                    </h4>
                  </div>
                  <div className="flex  justify-between items-end gap-2 ps-6 2xl:ps-20 py-5">
                    <div className="flex flex-col justify-between items-end gap-2">
                      <h4 className="text-3xl font-bold text-primary">2023</h4>
                      <p className="text-end text-lg leading-[130%]">
                        Estimated <br /> Overpayment
                      </p>
                    </div>
                    <h4 className="text-3xl font-bold text-black mb-[3px]">
                      $31,012
                    </h4>
                  </div>
                </div>
                <div className="grid grid-cols-3 mt-10">
                  <div>
                    <p className=" text-base text-justify leading-[130%] pe-10 2xl:pe-20 border-r-2  border-primary py-5">
                      These are estimated tax savings based on the information
                      we have received from you via conversations, emails, tax
                      returns etc. These are preliminary estimates and will
                      change if we decide to engage in a tax planning
                      engagement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-10">
                <Image
                  src="/assets/generate-plan/apex-advisor-logo.png"
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
              Presentation. Any reproduction, copying or redistribution of this
              Presentation, electronic or otherwise, in whole or in part, is
              strictly prohibited without the express written permission of Apex
              Advisor Group. Any tax related information provided by this
              Presentation should not be used or be relied upon to (i) avoid the
              imposition of any payment, interest or penalties imposed by the
              U.S. Internal Revenue Service or to otherwise (ii) promote, market
              or recommend to others any tax related advice. This Presentation
              utilizes sections of the Internal Revenue Code and associated
              regulations in effect as of the date of this Presentation. Apex
              Advisor Group assumes no obligation to update this Presentation in
              order to reflect changes in the U.S. tax laws. This Presentation
              also utilizes certain information that you may have provided to
              Apex Advisor Group such as certain prior tax returns and answers
              to certain tax related questionnaires. Neither Apex Advisor Group,
              its suppliers and licensors shall be held liable for any
              liabilities arising from any incomplete, inaccurate, missing or
              other erroneous information provided to Apex Advisor Group or for
              any errors or omissions of Apex Advisor Group, its suppliers and
              licensors with respect to the use of this Presentation. You
              further acknowledge that your use of this Presentation does not
              make you a third party beneficiary with respect to any products or
              services provided, supplied and/or licensed to Apex Advisor Group.
            </p>
          </div>
        </div>
        {/* What You Lost Last Year */}
        <div className="">
          <div className="min-h-[750px] h-full relative flex  ">
            <div className="text-black text-start px-10 pt-10 pb-10 2xl:px-10 2xl:pt-20 2xl:pb-20 relative min-h-[750px] flex items-center bg-[#F0F3F7] border-t-8 border-primary w-full">
              <div className="flex flex-col h-full gap-10 2xl:gap-20 w-full justify-center items-start">
                <div className="w-full  mb-3 lg:mb-5">
                  <h2 className="text-4xl 2xl:text-5xl text-black font-bold mb-3">
                    What You Lost Last Year
                  </h2>
                  <p className="text-base 2xl:text-lg font-normal mb-4 text-black">
                    If you had worked with us last year, how much would you have
                    saved compared to your current accountant?
                  </p>
                </div>
                <div className="flex items-end justify-between gap-2 w-full">
                  <div className="flex  justify-between items-end gap-2 ">
                    <div className="flex flex-col justify-between items-end gap-2">
                      <h4 className="text-3xl font-bold text-primary">2023</h4>
                      <p className="text-end text-lg leading-[130%]">
                        Fee To <br /> Accountant
                      </p>
                    </div>
                  </div>
                  <h4 className="text-3xl font-bold ">?</h4>
                  <h4 className="text-3xl font-bold text-primary ">+</h4>
                  <div className="flex  justify-between items-end gap-2 ">
                    <div className="flex flex-col justify-between items-end gap-2">
                      <h4 className="text-3xl font-bold text-primary">2023</h4>
                      <p className="text-end text-lg leading-[130%]">
                        Estimated <br /> Overpayment
                      </p>
                    </div>
                  </div>
                  <h4 className="text-3xl font-bold text-black mb-[3px]">
                    $31,012
                  </h4>
                  <h4 className="text-3xl font-bold text-primary">=</h4>
                  <p className="text-start text-base font-bold leading-[130%] max-w-xs">
                    What you paid. It's just that the accountant split it with
                    the IRS...
                  </p>
                </div>
                <div className="grid grid-cols-3 mt-10">
                  <div>
                    <p className=" text-base text-justify leading-[130%] pe-10 2xl:pe-20 border-r-2  border-primary py-5">
                      These are estimated tax savings based on the information
                      we have received from you via conversations, emails, tax
                      returns etc. These are preliminary estimates and will
                      change if we decide to engage in a tax planning
                      engagement.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-10 right-10">
                <Image
                  src="/assets/generate-plan/apex-advisor-logo.png"
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
              This Presentation, including all associated materials
              (collectively this Presentation") is for informational purposes
              and its use is for the intended recipient only. Nothing in this
              Presentation should be construed to constitute or be relied upon
              as providing a legal opinion or providing legal advice by Apex
              Advisor Group. No accountant-client relationship is created solely
              by your use of this Presentation. Apex Advisor Group, its
              licensors and suppliers disclaim all liability in connection with
              your use of this presentation and you assume all responsibilities
              and obligations with respect to any decisions, conclusions,
              opinions or actions that you may take regarding your use of this
              Presentation. Any reproduction, copying or redistribution of this
              Presentation, electronic or otherwise, in whole or in part, is
              strictly prohibited without the express written permission of Apex
              Advisor Group. Any tax related information provided by this
              Presentation should not be used or be relied upon to (i) avoid the
              imposition of any payment, interest or penalties imposed by the
              US. Internal Revenue Service or to otherwise (ii) promote, market
              of recommend to others any tax related advice. This Presentation
              utilizes sections of the Internal Revenue Code and associated
              regulations in effect as of the date of this Presentation. Apex
              Advisor Group assumes no obligation to update this Presentation in
              order to reflect changes in the US tax laws. This Presentation
              also utilizes certain information that you may have provided to
              Apex Advisor Group such as certain prior tax returns and answers
              to certain tax related questionnaires. Neither Apex Advisor Group,
              its suppliers and licensors shall be held liable for any
              liabilities arising from any incomplete, inaccurate, missing or
              other emoneous information provided to Apex Advisor Group or for
              any errors or omissions of Apex Advisor Group, its suppliers and
              licensors with respect to the use of this Presentation. You
              further acknowledge that your use of this Présentation does not
              make you a third party beneficiary with respect
            </p>
          </div>
        </div>
        {/*   Categories of Tax Planning Strategies */}
        <div className="">
          <div className="min-h-[750px] h-full relative flex  ">
            {/* Left Blue Section */}
            <div className="bg-primary w-1/4 "></div>

            {/*  Categories of Tax Planning Strategies */}
            <div className=" bg-[#F0F3F7] w-3/4 ">
              <div className="flex justify-center items-center h-full">
                <div className="w-full px-10 py-20">
                  <div className=" w-full 2xl:max-w-2xl mb-3 lg:mb-5">
                    <h2 className=" text-4xl 2xl:text-5xl text-black font-bold mb-3">
                      Categories of Tax Planning Strategies
                    </h2>
                    <p className="text-base 2xl:text-lg font-normal text-black">
                      We will review hundreds of strategies and their
                      combinations. Here are a few of the categories we will
                      assess.
                    </p>
                  </div>
                  <ul className="space-y-3  list-disc list-inside">
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      Planning vs. Preparation
                    </li>
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      Your Estimated Tax Savings
                    </li>
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      What You Lost Last Year
                    </li>
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      Categories of Tax Planning Strategies
                    </li>
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      Stages of Tax Planning
                    </li>
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      Tax Engagement Options
                    </li>
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      Next Steps In The Planning Process
                    </li>
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      We Look Forward To Working With You
                    </li>
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      Frequently Asked Questions (FAQ)
                    </li>
                    <li className=" text-base 2xl:text-lg font-normal text-black">
                      Important Information
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Logo Section */}
            <div className="absolute bottom-10 right-10 z-50">
              <Image
                src="/assets/generate-plan/apex-advisor-logo.png"
                alt="apex advisor logo"
                width={300}
                height={200}
                className="max-w-32 w-full"
              />
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm">
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
              Presentation. Any reproduction, copying or redistribution of this
              Presentation, electronic or otherwise, in whole or in part, is
              strictly prohibited without the express written permission of Apex
              Advisor Group. Any tax related information provided by this
              Presentation should not be used or be relied upon to (i) avoid the
              imposition of any payment, interest or penalties imposed by the
              U.S. Internal Revenue Service or to otherwise (ii) promote, market
              or recommend to others any tax related advice. This Presentation
              utilizes sections of the Internal Revenue Code and associated
              regulations in effect as of the date of this Presentation. Apex
              Advisor Group assumes no obligation to update this Presentation in
              order to reflect changes in the U.S. tax laws. This Presentation
              also utilizes certain information that you may have provided to
              Apex Advisor Group such as certain prior tax returns and answers
              to certain tax related questionnaires. Neither Apex Advisor Group,
              its suppliers and licensors shall be held liable for any
              liabilities arising from any incomplete, inaccurate, missing or
              other erroneous information provided to Apex Advisor Group or for
              any errors or omissions of Apex Advisor Group, its suppliers and
              licensors with respect to the use of this Presentation. You
              further acknowledge that your use of this Presentation does not
              make you a third party beneficiary with respect to any products or
              services provided, supplied and/or licensed to Apex Advisor Group.
            </p>
          </div>
        </div>

        {/* Stages of Tax Planning */}
        <div className="">
          <div className="min-h-[750px] h-full relative flex  ">
            <div className="text-black text-start px-10 pt-10 pb-10 2xl:px-20 2xl:pt-20 2xl:pb-10 relative min-h-[550px] flex items-center bg-[#F0F3F7] border-t-8 border-primary w-full">
              <div className="flex flex-col h-full gap-8 2xl:gap-14 w-full ">
                <div>
                  <h2 className="text-4xl 2xl:text-5xl text-black font-bold mb-3">
                    Stages of Tax Planning
                  </h2>
                  <p className="text-base 2xl:text-lg font-normal mb-4 text-black ">
                    While tax planning starts with a plan, that plan needs to be
                    implemented in a legal manner, maintained, and reflected in
                    the tax return.
                  </p>
                </div>

                <div className="flex items-start justify-between gap-8 w-full mx-auto">
                  <div className=" max-w-xs">
                    <h3 className="text-3xl font-bold text-primary">
                      Planning
                    </h3>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      The planning is the most important part of our engagement.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      We are performing a review of your tax position and making
                      recommendations for how much you can save with proactive
                      tax planning strategies.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      Some savings may be from prior years, but most will be in
                      the current year and beyond
                    </p>
                  </div>
                  <div className="h-full w-px bg-primary"></div>
                  <div className=" max-w-xs">
                    <h3 className="text-3xl font-bold text-primary">
                      Implementation
                    </h3>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      Once we complete the tax plan, we will present to you
                      anywhere from 1-25+ strategies depending on the
                      circumstances.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      Some of the strategies require minimal implementation,
                      others may be complex and involved 3rd parties.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      We'll guide you every step of the way.
                    </p>
                  </div>
                  <div className="h-full w-px bg-primary"></div>
                  <div className=" max-w-xs">
                    <h3 className="text-3xl font-bold text-primary">
                      Quarterly
                    </h3>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      Keeping up with the compliance to ensure the savings are
                      defendable, and realized in the returns, is where tax
                      planning gets finalized.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      If we decide to work together on a quarterly basis, this
                      includes basic planning, implementation of basic planning
                      strategies and a review of financial results to make
                      proper estimated payments.
                    </p>
                  </div>
                  <div className="h-full w-px bg-primary"></div>
                  <div className=" max-w-xs">
                    <h3 className="text-3xl font-bold text-primary">
                      Preparation
                    </h3>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      The preparation of the returns is the last stage of the
                      process.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      At this point, we can actually calculate what your final
                      tax payment will be and compare it to what you would have
                      paid without doing proactive tax planning.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                      The preparation does not cover monthly accounting, clean
                      up, or closing the books.
                    </p>
                  </div>
                </div>
                <ul className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                  <li>
                    *This does not include back-end fees or commissions from 3rd
                    parties
                  </li>
                  <li>
                    *There may be additional planning fees for large or complex
                    implementations
                  </li>
                  <li>
                    *This includes support for 1 business return, and 1 personal
                    return
                  </li>
                  <li>
                    *We may bill hourly if we go over in scope or time in the
                    implementation of these changes
                  </li>
                </ul>
              </div>

              <div className="absolute bottom-10 right-10">
                <Image
                  src="/assets/generate-plan/apex-advisor-logo.png"
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
              Presentation. Any reproduction, copying or redistribution of this
              Presentation, electronic or otherwise, in whole or in part, is
              strictly prohibited without the express written permission of Apex
              Advisor Group. Any tax related information provided by this
              Presentation should not be used or be relied upon to (i) avoid the
              imposition of any payment, interest or penalties imposed by the
              U.S. Internal Revenue Service or to otherwise (ii) promote, market
              or recommend to others any tax related advice. This Presentation
              utilizes sections of the Internal Revenue Code and associated
              regulations in effect as of the date of this Presentation. Apex
              Advisor Group assumes no obligation to update this Presentation in
              order to reflect changes in the U.S. tax laws. This Presentation
              also utilizes certain information that you may have provided to
              Apex Advisor Group such as certain prior tax returns and answers
              to certain tax related questionnaires. Neither Apex Advisor Group,
              its suppliers and licensors shall be held liable for any
              liabilities arising from any incomplete, inaccurate, missing or
              other erroneous information provided to Apex Advisor Group or for
              any errors or omissions of Apex Advisor Group, its suppliers and
              licensors with respect to the use of this Presentation. You
              further acknowledge that your use of this Presentation does not
              make you a third party beneficiary with respect to any products or
              services provided, supplied and/or licensed to Apex Advisor Group.
            </p>
          </div>
        </div>

        {/* Tax Engagementn Options */}
        <div className="">
          <div className="min-h-[750px] h-full relative flex  ">
            <div className="text-black text-start px-10 pt-10 pb-10 2xl:px-20 2xl:pt-20 2xl:pb-10 relative min-h-[550px] flex items-center bg-[#F0F3F7] border-t-8 border-primary w-full">
              <div className="flex flex-col h-full gap-8 2xl:gap-14 w-full ">
                <div>
                  <h2 className="text-4xl 2xl:text-5xl text-black font-bold mb-3">
                    Tax Engagement Options
                  </h2>
                </div>
                <div>
                  <table className="min-w-full  text-sm text-left">
                    <thead className=" text-black">
                      <tr>
                        <th className=""></th>
                        <th className="border border-primary px-4 py-2 text-center text-base 2xl:text-lg font-semibold">
                          Planning
                        </th>
                        <th className="border border-primary px-4 py-2 text-center text-base 2xl:text-lg font-semibold max-w-40">
                          Planning & Core Implementation
                        </th>
                        <th className="border border-primary px-4 py-2 text-center text-base 2xl:text-lg font-semibold max-w-40">
                          Planning Implementation Preparation Quarterlies
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          The Tax Plan For Current Year & Beyond
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Deduction Review & Strategy Planning
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Legal Entity Optimization Across LLC, S Corp, C Corp,
                          Partnership
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Retirement Options To Save While Minimizing Taxes
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Insurance Review To Protect Assets & Reduce Taxes
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          TCJA, FFCRA, CARES Review For Liability Minimization
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          IRS & Court Case References Support Positions
                        </td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Core Strategy Implementation
                        </td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Business Tax Preparation
                        </td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Individual Tax Preparation
                        </td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Quarterly Estimated Payments
                        </td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Quarterly Core Tax Planning & Implementation
                        </td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-primary px-4 py-2 text-base 2xl:text-lg font-normal">
                          Quarterly 1-on-1 Review Tax Position
                        </td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center "></td>
                        <td className="border border-primary px-4 py-2 text-center  text-primary">
                          <MdDone className="text-2xl mx-auto" />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="border border-primary px-4 py-2 text-center  ">
                          <h5 className="text-xl font-semibold">$3,500</h5>
                          <p className="text-base font-medium">one-time</p>
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  ">
                          <h5 className="text-xl font-semibold">$5,500</h5>
                          <p className="text-base font-medium">one-time</p>
                        </td>
                        <td className="border border-primary px-4 py-2 text-center  ">
                          <h5 className="text-xl font-semibold">$2,750</h5>
                          <p className="text-base font-medium">one-time</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="text-base 2xl:text-lg font-normal mb-2 text-black leading-1  mt-4  border-black">
                  <li>
                    *This does not include back-end fees or commissions from 3rd
                    parties
                  </li>
                  <li>
                    *There may be additional planning fees for large or complex
                    implementations
                  </li>
                  <li>
                    *This includes support for 1 business return, and 1 personal
                    return
                  </li>
                  <li>
                    *We may bill hourly if we go over in scope or time in the
                    implementation of these changes
                  </li>
                </ul>
              </div>

              <div className="absolute bottom-10 right-10">
                <Image
                  src="/assets/generate-plan/apex-advisor-logo.png"
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
              Presentation. Any reproduction, copying or redistribution of this
              Presentation, electronic or otherwise, in whole or in part, is
              strictly prohibited without the express written permission of Apex
              Advisor Group. Any tax related information provided by this
              Presentation should not be used or be relied upon to (i) avoid the
              imposition of any payment, interest or penalties imposed by the
              U.S. Internal Revenue Service or to otherwise (ii) promote, market
              or recommend to others any tax related advice. This Presentation
              utilizes sections of the Internal Revenue Code and associated
              regulations in effect as of the date of this Presentation. Apex
              Advisor Group assumes no obligation to update this Presentation in
              order to reflect changes in the U.S. tax laws. This Presentation
              also utilizes certain information that you may have provided to
              Apex Advisor Group such as certain prior tax returns and answers
              to certain tax related questionnaires. Neither Apex Advisor Group,
              its suppliers and licensors shall be held liable for any
              liabilities arising from any incomplete, inaccurate, missing or
              other erroneous information provided to Apex Advisor Group or for
              any errors or omissions of Apex Advisor Group, its suppliers and
              licensors with respect to the use of this Presentation. You
              further acknowledge that your use of this Presentation does not
              make you a third party beneficiary with respect to any products or
              services provided, supplied and/or licensed to Apex Advisor Group.
            </p>
          </div>
        </div>

        {/* Next Steps In The Planning Process*/}
        <div className="">
          <div className="min-h-[750px] h-full relative flex  ">
            <div className="text-black text-start px-10 pt-10 pb-10 2xl:px-20 2xl:pt-20 2xl:pb-10 relative min-h-[550px] flex items-center bg-[#F0F3F7] border-t-8 border-primary w-full">
              <div className="flex flex-col h-full gap-8 2xl:gap-14 w-full ">
                <div>
                  <h2 className="text-4xl 2xl:text-5xl text-black font-bold mb-3">
                    Next Steps In The Planning Process
                  </h2>
                  <p className="text-base 2xl:text-lg font-normal mb-4 text-black ">
                    While tax planning starts with a plan, that plan needs to be
                    implemented in a legal manner, maintained, and reflected in
                    the tax return.
                  </p>
                </div>

                <div className="flex items-start justify-center gap-8 w-full mx-auto ">
                  <div className=" max-w-xs p-6 bg-primary min-h-96">
                    <h3 className="text-3xl font-bold text-white pb-3 border-b-1 border-white">
                      Kick Off Call
                    </h3>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-white   mt-3  ">
                      We'll schedule a kick off call where we can walk through
                      the engagement and what information we'll need to get in
                      order to complete our planning.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-white   mt-3  ">
                      This call will last approximately 45 minutes and can be
                      performed remotely.
                    </p>
                  </div>
                  <div className=" max-w-xs p-6 bg-primary  min-h-96">
                    <h3 className="text-3xl font-bold text-white pb-3 border-b-1 border-white">
                      File Request, Questionnaires
                    </h3>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-white   mt-3  ">
                      In order of us to do a full analysis of the situation, we
                      will send you a full request list of tax and other
                      financial information.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-white   mt-3  ">
                      Additionally, we'll need you to complete a questionnaire
                      to help us identify savings opportunities.
                    </p>
                  </div>
                  <div className=" max-w-xs p-6 bg-primary  min-h-96">
                    <h3 className="text-3xl font-bold text-white pb-3 border-b-1 border-white">
                      Finalize Tax Plan
                    </h3>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-white   mt-3  ">
                      When we receive all the required information, and perform
                      our research, we will present to you our planning
                      strategies and what the process of implementation will be
                      for each.
                    </p>
                    <p className="text-base 2xl:text-lg font-normal mb-2 text-white   mt-3  ">
                      This will include source references for all planning
                      strategies.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-10">
                <Image
                  src="/assets/generate-plan/apex-advisor-logo.png"
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
              Presentation. Any reproduction, copying or redistribution of this
              Presentation, electronic or otherwise, in whole or in part, is
              strictly prohibited without the express written permission of Apex
              Advisor Group. Any tax related information provided by this
              Presentation should not be used or be relied upon to (i) avoid the
              imposition of any payment, interest or penalties imposed by the
              U.S. Internal Revenue Service or to otherwise (ii) promote, market
              or recommend to others any tax related advice. This Presentation
              utilizes sections of the Internal Revenue Code and associated
              regulations in effect as of the date of this Presentation. Apex
              Advisor Group assumes no obligation to update this Presentation in
              order to reflect changes in the U.S. tax laws. This Presentation
              also utilizes certain information that you may have provided to
              Apex Advisor Group such as certain prior tax returns and answers
              to certain tax related questionnaires. Neither Apex Advisor Group,
              its suppliers and licensors shall be held liable for any
              liabilities arising from any incomplete, inaccurate, missing or
              other erroneous information provided to Apex Advisor Group or for
              any errors or omissions of Apex Advisor Group, its suppliers and
              licensors with respect to the use of this Presentation. You
              further acknowledge that your use of this Presentation does not
              make you a third party beneficiary with respect to any products or
              services provided, supplied and/or licensed to Apex Advisor Group.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTaxProposalTest;
