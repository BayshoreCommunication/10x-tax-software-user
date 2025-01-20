// "use client";

// import { createSubscription } from "@/app/actions/user";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
// import {
//   CardCvcElement,
//   CardExpiryElement,
//   CardNumberElement,
//   Elements,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { toast } from "react-toastify";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// const ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: "#32325d",
//       fontFamily: "Arial, sans-serif",
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       "::placeholder": {
//         color: "#aab7c4",
//       },
//     },
//     invalid: {
//       color: "#fa755a",
//       iconColor: "#fa755a",
//     },
//   },
// };

// interface PaymentInfo {
//   email: string;
//   name: string;
//   country: string;
//   address: string;
//   paymentId: string;
// }

// const CheckoutForm = ({
//   token,
//   subscriptionInfo,
//   paymentInfo,
//   setPaymentInfo,
//   amount,
// }: any) => {
//   const router = useRouter();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState<string | null>(null);
//   const [processing, setProcessing] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const { isPending, paypalDispatch } = usePayPalScriptReducer();

//   const handleSubmitStripe = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       setError("Stripe has not loaded yet. Please try again later.");
//       return;
//     }

//     setError(null);
//     setProcessing(true);

//     try {
//       const cardElement = elements.getElement(CardNumberElement);
//       if (!cardElement) {
//         setError("Unable to retrieve card details. Please try again.");
//         setProcessing(false);
//         return;
//       }

//       const paymentIntentResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `${token}`,
//           },
//           body: JSON.stringify({
//             amount: amount,
//             currency: "usd",
//             customerDetails: {
//               name: paymentInfo.name || "",
//               email: paymentInfo?.email || "",
//               country: paymentInfo?.country || "",
//               address: paymentInfo?.address || "",
//             },
//           }),
//         }
//       );

//       if (!paymentIntentResponse.ok) {
//         const { message } = await paymentIntentResponse.json();
//         throw new Error(message || "Failed to create payment intent.");
//       }

//       const { payload } = await paymentIntentResponse.json();
//       const clientSecret = payload?.clientSecret;

//       if (!clientSecret) {
//         throw new Error("Client secret not received. Please try again.");
//       }

//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card: cardElement, billing_details: paymentInfo },
//       });

//       if (paymentResult.error) {
//         throw new Error(paymentResult.error.message || "Payment failed.");
//       }

//       const paymentIntent = paymentResult.paymentIntent;
//       if (!paymentIntent || paymentIntent.status !== "succeeded") {
//         throw new Error("Payment did not succeed. Please try again.");
//       }

//       const paymentInfos: PaymentInfo = {
//         email: paymentInfo.email,
//         name: paymentInfo.name,
//         country: paymentInfo.country,
//         address: paymentInfo.address,
//         paymentId: paymentIntent.id,
//       };

//       const subscriptionResponse = await createSubscription(
//         paymentInfos,
//         subscriptionInfo
//       );
//       if (!subscriptionResponse.ok) {
//         throw new Error("Failed to create subscription.");
//       }

//       toast.success("Payment successful!");
//       router.push("/update-business-information");
//     } catch (err: any) {
//       setError(err.message || "An unexpected error occurred.");
//       toast.error(err.message || "Payment or subscription failed.");
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const handlePayPalSuccess = (details: any, data: any) => {
//     // Handle PayPal payment success here
//     // For example, create a subscription, save payment info, etc.
//     const paymentInfos: PaymentInfo = {
//       email: paymentInfo.email,
//       name: paymentInfo.name,
//       country: paymentInfo.country,
//       address: paymentInfo.address,
//       paymentId: details.id,
//     };

//     createSubscription(paymentInfos, subscriptionInfo)
//       .then(() => {
//         toast.success("Payment successful!");
//         router.push("/update-business-information");
//       })
//       .catch((err) => {
//         toast.error("Subscription creation failed.");
//       });
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmitStripe}>
//         <div className="flex items-center justify-between space-x-8 py-3">
//           <div className="w-[45%]">
//             <label
//               htmlFor="name-icon"
//               className="block mb-2 text-xl font-normal text-gray-900"
//             >
//               Card Number
//             </label>
//             <div className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-3 placeholder-gray-400 outline-none">
//               <CardNumberElement options={ELEMENT_OPTIONS} />
//             </div>
//           </div>
//           <div className="w-[30%]">
//             <label
//               htmlFor="name-icon"
//               className="block mb-2 text-xl font-normal text-gray-900"
//             >
//               Expiry Date
//             </label>
//             <div className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-3 placeholder-gray-400 outline-none">
//               <CardExpiryElement options={ELEMENT_OPTIONS} />
//             </div>
//           </div>
//           <div className="w-[25%]">
//             <label
//               htmlFor="name-icon"
//               className="block mb-2 text-xl font-normal text-gray-900"
//             >
//               CVC
//             </label>
//             <div className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-3 placeholder-gray-400 outline-none">
//               <CardCvcElement options={ELEMENT_OPTIONS} />
//             </div>
//           </div>
//         </div>
//         <div className="pt-3 text-center">
//           {error && <p className="text-red-500 text-sm">{error}</p>}
//         </div>
//         <div className="py-6 flex justify-center items-center mx-0">
//           <button
//             type="submit"
//             className="text-white bg-primary hover:bg-[#be9837] font-medium rounded-lg text-lg px-5 py-3 w-[50%]"
//             disabled={!stripe || processing}
//           >
//             {processing ? <p>Processing...</p> : <p>Pay with Card</p>}
//           </button>
//         </div>
//       </form>

//       {/* PayPal Button */}
//       <div className="py-6 flex justify-center items-center mx-0">
//         <PayPalButtons
//           style={{ layout: "vertical" }}
//           createOrder={(data, actions) => {
//             return actions.order.create({
//               purchase_units: [
//                 {
//                   amount: {
//                     value: amount,
//                   },
//                 },
//               ],
//             });
//           }}
//           onApprove={(data, actions) => {
//             return actions.order.capture().then((details) => {
//               handlePayPalSuccess(details, data);
//             });
//           }}
//         />
//       </div>
//     </>
//   );
// };

// const PaypalCheckoutForm = (props: any) => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm {...props} />
//   </Elements>
// );

// export default PaypalCheckoutForm;

const PaypalCheckoutForm = () => {
  return <div>PaypalCheckoutForm</div>;
};

export default PaypalCheckoutForm;
