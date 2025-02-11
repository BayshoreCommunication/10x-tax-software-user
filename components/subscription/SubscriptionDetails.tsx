"use client";
import { cancelUserAutoSubscription } from "@/app/actions/user";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { calculateRemainingDays, formatDate } from "../shared/ui/DateFormat";

const SubscriptionDetails = ({ userData }: { userData: any }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancelSubscription = async () => {
    if (!userData?.isAutoSubscription) {
      setError("User already has auto subscription canceled.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await cancelUserAutoSubscription();

      if (response.ok) {
        toast.success("Subscription cancle successful!");
      } else {
        setError(response.error || "Failed to cancel subscription.");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <div className="bg-white  p-12 ">
        <h2 className="text-3xl font-bold text-[#11142D]  py-4 mx-[10%] 2xl:mx-[20%]">
          Subscription Plan
        </h2>

        <div>
          {userData?.currentSubscriptionType === "month" ? (
            <div className="w-[90%] xl:w-[80%] 2xl:w-[60%] flex items-center justify-between space-x-8 mx-auto pt-20 pb-40">
              <div className="shadow-medium rounded-xl px-6 py-16  w-[50%]">
                <div className="w-full  mb-6">
                  <h2 className="text-3xl font-bold text-[#11142D] text-left py-4 ">
                    Your Current Plan
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
                <div className="my-5">
                  <h2 className="text-6xl font-bold text-primary text-left">
                    $29
                  </h2>
                  <h3 className="text-4xl font-normal text-[#11142D] text-left mt-2">
                    Monthly
                  </h3>
                </div>
                <div className="mb-4">
                  <p>
                    <strong>Duration </strong>:{" "}
                    {calculateRemainingDays(
                      userData?.currentSubscriptionExpiredDate
                    )}{" "}
                    Days
                  </p>
                  <p>
                    <strong>Start </strong>:{" "}
                    {formatDate(userData?.currentSubscriptionPayDate)}
                  </p>
                  <p>
                    <strong>Next Payment Date </strong>:{" "}
                    {formatDate(userData?.currentSubscriptionExpiredDate)}
                  </p>
                </div>
                <div className="w-full flex items-center">
                  {userData?.isAutoSubscription ? (
                    <button
                      className=" bg-primary hover:bg-hoverColor py-3 px-4 rounded-large text-2xl font-normal text-white text-center w-full"
                      onClick={handleCancelSubscription}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-300 animate-spin fill-white"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                          <p>Canceling...</p>
                        </div>
                      ) : (
                        <p>Cancel</p>
                      )}
                    </button>
                  ) : (
                    <button
                      // href={`/confirm-subscription/monthly`}
                      className=" bg-primary hover:bg-hoverColor py-3 px-4 rounded-large text-2xl font-normal text-white text-center w-full"
                    >
                      Running
                    </button>
                  )}
                </div>
              </div>

              <div className="shadow-medium rounded-xl px-6  pb-16 w-[50%] bg-secondary">
                <div className="flex justify-end py-4">
                  <div className="border p-1 border-primary rounded-lg w-[70%]  lg:w-[40%]  2xl:w-[30%]">
                    <p className=" text-center text-primary">Recommended</p>
                  </div>
                </div>
                <div className="w-full bg-[#DEDEDE1A] py-6 px-4 rounded-large mb-6">
                  <h2 className="text-2xl font-normal text-white text-center">
                    Best Offer - Save 16%
                  </h2>
                </div>
                <div className="my-20">
                  <h2 className="text-6xl font-bold text-primary text-center">
                    $299
                  </h2>
                  <h3 className="text-4xl font-normal text-white text-center mt-5">
                    Yearly
                  </h3>
                </div>
                <div className="w-full flex items-center">
                  <Link
                    href={`/confirm-subscription/yearly`}
                    className=" bg-primary hover:bg-hoverColor py-3 px-4 rounded-large text-2xl font-normal text-white text-center w-full"
                  >
                    Choose Plan & Save16%
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-[60%] flex items-center justify-between space-x-8 mx-auto pt-20 pb-40">
              <div className="shadow-medium rounded-xl px-6 py-16 w-[50%]">
                <div className="w-full bg-[#EBEBEB] py-5 px-4 rounded-large mb-6">
                  <h2 className="text-2xl font-normal text-[#11142D] text-center">
                    Basic
                  </h2>
                </div>
                <div className="my-20">
                  <h2 className="text-6xl font-bold text-primary text-center">
                    $99
                  </h2>
                  <h3 className="text-4xl font-normal text-[#11142D] text-center mt-5">
                    Monthly
                  </h3>
                </div>
                <div className="w-full flex items-center">
                  <Link
                    href={`/confirm-subscription/monthly`}
                    className=" bg-primary hover:bg-hoverColor py-3 px-4 rounded-large text-2xl font-normal text-white text-center w-full"
                  >
                    Choose Plan
                  </Link>
                </div>
              </div>

              <div className="shadow-medium rounded-xl px-6  pb-16 w-[50%] bg-secondary">
                <div className="flex justify-end pt-4">
                  <div className="border p-1 border-primary rounded-lg w-[70%]  lg:w-[40%]  2xl:w-[30%]">
                    <p className=" text-center text-primary">Recommended</p>
                  </div>
                </div>
                <div className="w-full  py-3 rounded-large mb-2">
                  <h2 className="text-3xl font-bold text-white text-left py-4 ">
                    Your Current Plan
                  </h2>
                  <p className="text-white">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>
                </div>
                <div className="my-4">
                  <h2 className="text-6xl font-bold text-primary text-left">
                    $299
                  </h2>
                  <h3 className="text-4xl font-normal text-white text-left mt-2">
                    Yearly
                  </h3>
                </div>
                <div className="mb-4 text-white">
                  <p>
                    <strong>Duration </strong>:{" "}
                    {calculateRemainingDays(
                      userData?.currentSubscriptionExpiredDate
                    )}{" "}
                    Days
                  </p>
                  <p>
                    <strong>Start </strong>:{" "}
                    {formatDate(userData?.currentSubscriptionPayDate)}
                  </p>
                  <p>
                    <strong>Next Payment Date </strong>:{" "}
                    {formatDate(userData?.currentSubscriptionExpiredDate)}
                  </p>
                </div>
                <div className="w-full flex items-center">
                  {userData?.isAutoSubscription ? (
                    <button
                      className=" bg-primary hover:bg-hoverColor py-3 px-4 rounded-large text-2xl font-normal text-white text-center w-full"
                      onClick={handleCancelSubscription}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-gray-300 animate-spin fill-white"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                          </div>
                          <p>Canceling...</p>
                        </div>
                      ) : (
                        <p>Cancel</p>
                      )}
                    </button>
                  ) : (
                    <button
                      // href={`/confirm-subscription/monthly`}
                      className=" bg-primary hover:bg-hoverColor py-3 px-4 rounded-large text-2xl font-normal text-white text-center w-full"
                    >
                      Running
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="pt-3 text-center">
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDetails;
