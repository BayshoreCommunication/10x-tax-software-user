import Link from "next/link";
import { FaBolt } from "react-icons/fa";
import { PiFireFill } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";

const SubscriptionPlan = () => {
  return (
    <div className="container py-10">
      <div className="bg-white  p-12">
        <h2 className="text-3xl font-bold text-[#11142D] text-center py-4">
          Choose Your Monthly Or Yearly Plan
        </h2>

        <div className="max-w-[60%] flex items-stretch justify-between space-x-8 mx-auto pt-20 pb-40">
          {/* ****************** */}
          <div className="shadow-small rounded-[30px] px-10 py-12 w-[50%] border border-[#eeeeee] bg-white">
            <div className=" h-full flex flex-col justify-between">
              <div>
                <div className="w-full bg-[#F0F0F0] py-5 xl:py-8 px-4 rounded-large mb-6 flex flex-col gap-2 justify-center items-center h-[150px]">
                  <FaBolt className="text-4xl 2xl:text-5xl text-primary" />
                  <h2 className="text-2xl font-semibold text-[#11142D] text-center uppercase">
                    Basic
                  </h2>
                </div>
                <div className="my-12">
                  <h2 className="text-6xl font-bold text-primary text-center">
                    $29
                    <span className="text-lg font-medium text-[#909192]">
                      /Monthly
                    </span>
                  </h2>
                </div>
              </div>
              <div className="w-full flex items-center mt-2">
                <Link
                  href={`/confirm-subscription/yearly`}
                  className=" bg-primary py-3 px-4 rounded-large text-xl font-medium text-white text-center w-full"
                >
                  Choose Plan & Save16%
                </Link>
              </div>
            </div>
          </div>
          {/* ****************** */}
          {/* <div className="shadow-small rounded-[30px] px-10 py-12 w-[50%] border border-[#eeeeee] bg-white">
            <div className="w-full bg-[#F0F0F0] py-5 xl:py-8 px-4 rounded-large flex flex-col gap-2 justify-center items-center h-[150px]">
              <h2 className="text-6xl font-bold text-primary text-center">
                $29
                <span className="text-lg font-medium text-[#909192]">
                  /Monthly
                </span>
              </h2>
            </div>
            <div className="">
              <div className="border-b-1 border-[#E5E5E5] py-4 ">
                <h4 className="text-black text-xl xl:text-2xl font-bold">
                  Your Current Plan
                </h4>
                <p className="text-sm xl:text-base mt-2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="flex flex-col gap-4 py-6">
                <div className=" flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D5AD45]/10 text-primary font-medium">
                    <SlCalender />
                    Duration:
                  </span>
                  <span className="text-[#656768] font-medium">30 Days</span>
                </div>
                <div className=" flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D5AD45]/10 text-primary font-medium">
                    <SlCalender />
                    Start:
                  </span>
                  <span className="text-[#656768] font-medium">
                    7 January 2025
                  </span>
                </div>
                <div className=" flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D5AD45]/10 text-primary font-medium">
                    <SlCalender />
                    Next Payment Date:
                  </span>
                  <span className="text-[#656768] font-medium">
                    7 February 2025
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center mt-2">
              <Link
                href={`confirm-subscription/monthly`}
                className=" bg-gray-400  py-3 px-4 rounded-large text-xl font-medium text-white text-center w-full"
              >
                Unsubscribe
              </Link>
            </div>
          </div> */}
          {/* ****************** */}
          {/* <div className="relative shadow-small rounded-[30px] px-10 py-12 w-[50%] border border-[#eeeeee] bg-secondary ">
            <div className="absolute -top-3 right-10">
              <p className="border border-primary bg-primary px-5 w-full py-1 rounded-full text-center text-white">
                Recommended
              </p>
            </div>
            <div className=" h-full flex flex-col justify-between">
              <div>
                <div className="w-full bg-[#292F46] py-5 xl:py-8 px-4 rounded-large mb-6 flex flex-col gap-2 justify-center items-center h-[150px]">
                  <PiFireFill className="text-4xl 2xl:text-5xl text-primary" />
                  <h2 className="text-2xl font-semibold text-white text-center uppercase">
                    Best Offer - Save 16%
                  </h2>
                </div>
                <div className="my-12">
                  <h2 className="text-6xl font-bold text-primary text-center">
                    $299
                    <span className="text-lg font-medium text-[#909192]">
                      /Annually
                    </span>
                  </h2>
                </div>
              </div>
              <div className="w-full flex items-center mt-2">
                <Link
                  href={`/confirm-subscription/yearly`}
                  className=" bg-primary py-3 px-4 rounded-large text-xl font-medium text-white text-center w-full"
                >
                  Choose Plan & Save16%
                </Link>
              </div>
            </div>
          </div> */}
          {/* ****************** */}
          <div className="relative shadow-small rounded-[30px] px-10 py-12 w-[50%] border border-[#eeeeee] bg-secondary ">
            <div className="absolute -top-3 right-10">
              <p className="border border-primary bg-primary px-5 w-full py-1 rounded-full text-center text-white">
                Recommended
              </p>
            </div>
            <div className="w-full bg-[#292F46] py-5 xl:py-8 px-4 rounded-large flex flex-col gap-2 justify-center items-center h-[150px]">
              <h2 className="text-6xl font-bold text-primary text-center">
                $29
                <span className="text-lg font-medium text-[#909192]">
                  /Monthly
                </span>
              </h2>
            </div>
            <div className="">
              <div className="border-b-1 border-[#E5E5E5] py-4 ">
                <h4 className="text-white text-xl xl:text-2xl font-bold">
                  Your Current Plan
                </h4>
                <p className="text-sm xl:text-base mt-2 text-[#dce0e2]">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="flex flex-col gap-4 py-6">
                <div className=" flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D5AD45]/10 text-primary font-medium">
                    <SlCalender />
                    Duration:
                  </span>
                  <span className="text-[#dce0e2] font-medium">30 Days</span>
                </div>
                <div className=" flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D5AD45]/10 text-primary font-medium">
                    <SlCalender />
                    Start:
                  </span>
                  <span className="text-[#dce0e2] font-medium">
                    7 January 2025
                  </span>
                </div>
                <div className=" flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D5AD45]/10 text-primary font-medium">
                    <SlCalender />
                    Next Payment Date:
                  </span>
                  <span className="text-[#dce0e2] font-medium">
                    7 February 2025
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center mt-2">
              <Link
                href={`confirm-subscription/monthly`}
                className=" bg-gray-400  py-3 px-4 rounded-large text-xl font-medium text-white text-center w-full"
              >
                Unsubscribe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
