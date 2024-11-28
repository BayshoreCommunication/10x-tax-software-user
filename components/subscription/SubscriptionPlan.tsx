import React from "react";

const SubscriptionPlan = () => {
  return (
    <div className="container py-10">
      <div className="bg-white  p-12">
        <h2 className="text-3xl font-bold text-[#11142D] text-center py-4">
          Choose Your Monthly Or Yearly Plan
        </h2>

        <div className="max-w-[60%] flex items-center justify-between space-x-8 mx-auto pt-20 pb-40">
          <div className="shadow-medium rounded-xl px-6 py-16 w-[50%]">
            <div className="w-full bg-[#EBEBEB] py-3 px-4 rounded-large mb-6">
              <h2 className="text-2xl font-normal text-[#11142D] text-center">
                Basic
              </h2>
            </div>
            <div className="my-12">
              <h2 className="text-6xl font-bold text-primary text-center">
                $99
              </h2>
              <h3 className="text-4xl font-normal text-[#11142D] text-center mt-5">
                Monthly
              </h3>
            </div>
            <button className="w-full bg-primary py-3 px-4 rounded-large">
              <h2 className="text-2xl font-normal text-white text-center">
                Choose Plan
              </h2>
            </button>
          </div>
          <div className="shadow-medium rounded-xl px-6  pb-16 w-[50%] bg-secondary">
            <div className="flex justify-end py-4">
              <div className="border p-1 border-primary rounded-lg w-[70%]  lg:w-[40%]  2xl:w-[30%]">
                <p className=" text-center text-primary">Recommended</p>
              </div>
            </div>
            <div className="w-full bg-[#DEDEDE1A] py-3 px-4 rounded-large mb-6">
              <h2 className="text-2xl font-normal text-white text-center">
                Best Offer - Save 16%
              </h2>
            </div>
            <div className="my-12">
              <h2 className="text-6xl font-bold text-primary text-center">
                $999
              </h2>
              <h3 className="text-4xl font-normal text-white text-center mt-5">
                Annually
              </h3>
            </div>
            <button className="w-full bg-primary py-3 px-4 rounded-large">
              <h2 className="text-2xl font-normal text-white text-center">
                Choose Plan & Save16%
              </h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlan;
