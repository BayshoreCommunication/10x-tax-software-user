"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import Loader from "../shared/ui/Loader";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const UserSubscription = ({ token }: any) => {
  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingYear, setLoadingYear] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (
    priceId: string,
    planType: "month" | "year"
  ) => {
    setError("");

    // Set correct loading state
    if (planType === "month") {
      setLoadingMonth(true);
    } else if (planType === "year") {
      setLoadingYear(true);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ priceId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session.");
      }

      const data = await response.json();
      const sessionId = data?.payload?.sessionId;

      if (!sessionId) {
        throw new Error("Session ID is missing from the response.");
      }

      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to initialize.");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during subscription.");
      alert(`Error: ${err.message || "Unexpected error."}`);
    } finally {
      // Reset only the corresponding loading state
      if (planType === "month") {
        setLoadingMonth(false);
      } else if (planType === "year") {
        setLoadingYear(false);
      }
    }
  };

  return (
    <div>
      <div className="container py-10">
        <div className="bg-white p-12">
          <h2 className="text-3xl font-bold text-[#11142D] text-center py-4 mx-[10%] 2xl:mx-[20%]">
            Choose Your Monthly Or Yearly Plan
          </h2>

          <div className="w-[90%] xl:w-[80%] 2xl:w-[60%] flex items-center justify-between space-x-8 mx-auto pt-20 pb-40">
            {/* Monthly Plan */}
            <div className="shadow-medium rounded-xl px-6 py-16 w-[50%]">
              <div className="w-full bg-[#EBEBEB] py-3 px-4 rounded-large mb-6">
                <h2 className="text-2xl font-normal text-[#11142D] text-center">
                  Basic
                </h2>
              </div>
              <div className="my-12">
                <h2 className="text-6xl font-bold text-primary text-center">
                  $29
                </h2>
                <h3 className="text-4xl font-normal text-[#11142D] text-center mt-5">
                  Monthly
                </h3>
              </div>
              <div className="w-full flex items-center">
                <button
                  onClick={() =>
                    handleSubscribe("price_1QoKhb2KJShS0dIf3zNXSO2h", "month")
                  }
                  className={`bg-primary hover:bg-hoverColor py-3 px-4 rounded-large text-2xl font-normal text-white text-center w-full 
                 
                  }`}
                  disabled={loadingMonth}
                >
                  {loadingMonth ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader /> <span>Processing</span>
                    </div>
                  ) : (
                    <span>Choose Plan</span>
                  )}
                </button>
              </div>
            </div>

            {/* Yearly Plan */}
            <div className="shadow-medium rounded-xl px-6 pb-16 w-[50%] bg-secondary">
              <div className="flex justify-end py-4">
                <div className="border p-1 border-primary rounded-lg w-[70%] lg:w-[40%] 2xl:w-[30%]">
                  <p className="text-center text-primary">Recommended</p>
                </div>
              </div>
              <div className="w-full bg-[#DEDEDE1A] py-3 px-4 rounded-large mb-6">
                <h2 className="text-2xl font-normal text-white text-center">
                  Best Offer - Save 16%
                </h2>
              </div>
              <div className="my-12">
                <h2 className="text-6xl font-bold text-primary text-center">
                  $299
                </h2>
                <h3 className="text-4xl font-normal text-white text-center mt-5">
                  Yearly
                </h3>
              </div>
              <div className="w-full flex items-center">
                <button
                  onClick={() =>
                    handleSubscribe("price_1QoKhb2KJShS0dIfskgihfFz", "year")
                  }
                  className={`bg-primary hover:bg-hoverColor py-3 px-4 rounded-large text-2xl font-normal text-white text-center w-full 
                  
                  }`}
                  disabled={loadingYear}
                >
                  {loadingYear ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader /> <span>Processing</span>
                    </div>
                  ) : (
                    <span>Choose Plan & Save 16%</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default UserSubscription;
