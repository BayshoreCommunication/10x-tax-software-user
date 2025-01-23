"use client";

import { createSubscription } from "@/app/actions/user";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const BankAccountCheckoutForm = ({
  token,
  subscriptionInfo,
  paymentInfo,
  setPaymentInfo,
  amount,
}: any) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const customerDetails = {
    name: paymentInfo.name || "",
    email: paymentInfo?.email || "",
    phone: "",
    address: {
      line1: "",
      city: paymentInfo?.address || "",
      state: "NY",
      postal_code: "10001",
      country: "US",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet. Please try again later.");
      return;
    }

    setError(null);
    setProcessing(true);

    try {
      const paymentMethodResult = await stripe.createPaymentMethod({
        type: "us_bank_account",
        us_bank_account: {
          account_number: paymentInfo.accountNumber,
          routing_number: paymentInfo.routingNumber,
          account_holder_type: "individual",
        },
        billing_details: {
          name: paymentInfo?.name,
          email: paymentInfo?.email,
        },
      });

      if (paymentMethodResult.error) {
        throw new Error(
          paymentMethodResult.error.message ||
            "Failed to create payment method."
        );
      }

      const paymentMethodId = paymentMethodResult.paymentMethod?.id;

      if (!paymentMethodId) {
        throw new Error(
          "Failed to retrieve payment method ID. Please try again."
        );
      }

      const paymentIntentResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            amount: 50,
            currency: "usd",
            paymentMethodType: ["us_bank_account"],
            customerDetails,
          }),
        }
      );

      const paymentIntentData = await paymentIntentResponse.json();

      if (
        !paymentIntentResponse.ok ||
        !paymentIntentData?.payload?.clientSecret
      ) {
        throw new Error(
          paymentIntentData.message || "Failed to create payment intent."
        );
      }

      const { clientSecret } = paymentIntentData.payload;

      const paymentInfos = {
        email: paymentInfo.email,
        name: paymentInfo.name,
        country: paymentInfo.country,
        address: paymentInfo.address,
        paymentId: paymentMethodId,
      };

      const subscriptionResponse = await createSubscription(
        paymentInfos,
        subscriptionInfo
      );

      if (!subscriptionResponse.ok) {
        throw new Error("Failed to create subscription.");
      }

      toast.success("Payment successful!");

      const paymentResult = await stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/update-business-infomation`,
          payment_method: paymentMethodId,
        },
      });

      if (paymentResult.error) {
        throw new Error(
          paymentResult.error.message ||
            "An unexpected error occurred during payment."
        );
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "An unexpected error occurred.");
      toast.error(err.message || "Payment or subscription failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between space-x-8 py-3">
        <div className="w-[33.33%]">
          <label className="block mb-2 text-xl font-normal text-gray-900">
            Account Holder Name
          </label>
          <input
            type="text"
            className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400 outline-none"
            placeholder="Test Account"
            value={paymentInfo.name}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, name: e.target.value })
            }
          />
        </div>
        <div className="w-[33.33%]">
          <label className="block mb-2 text-xl font-normal text-gray-900">
            Routing Number
          </label>
          <input
            type="text"
            className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400 outline-none"
            placeholder="110000000"
            value={paymentInfo.routingNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, routingNumber: e.target.value })
            }
          />
        </div>
        <div className="w-[33.33%]">
          <label className="block mb-2 text-xl font-normal text-gray-900">
            Account Number
          </label>
          <input
            type="text"
            className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400 outline-none"
            placeholder="000123456789"
            value={paymentInfo.accountNumber}
            onChange={(e) =>
              setPaymentInfo({ ...paymentInfo, accountNumber: e.target.value })
            }
          />
        </div>
      </div>
      <div className="pt-3 text-center">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="py-6 flex justify-center items-center">
        <button
          type="submit"
          className="text-white bg-primary hover:bg-hoverColor font-medium rounded-lg text-lg px-5 py-3 w-[50%]"
          disabled={!stripe || processing}
        >
          {processing ? (
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
              <p>Processing...</p>
            </div>
          ) : (
            <p>Pay with Bank Account</p>
          )}
        </button>
      </div>
    </form>
  );
};

const BankCheckoutForm = (props: any) => (
  <Elements stripe={stripePromise}>
    <BankAccountCheckoutForm {...props} />
  </Elements>
);

export default BankCheckoutForm;
