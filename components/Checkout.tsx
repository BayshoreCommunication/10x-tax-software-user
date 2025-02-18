// "use client";
// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { useState } from "react";

// const Checkout = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const amount = 500;
//   const vendorAccountId = "dfgfdfgf";

//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/create-checkout-session`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `${token}`,
//       },
//       body: JSON.stringify({ priceId }),
//     }
//   );

//   const handlePayment = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`,
//         {
//           amount,
//           vendorAccountId,
//         }
//       );

//       const result = await stripe?.confirmCardPayment(data.clientSecret, {
//         payment_method: { card: elements?.getElement(CardElement)! },
//       });

//       if (result?.paymentIntent?.status === "succeeded") {
//         alert("Payment successful!");
//       } else {
//         alert("Payment failed!");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Payment error");
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <CardElement />
//       <button onClick={handlePayment} disabled={loading}>
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </div>
//   );
// };

// export default Checkout;

const Checkout = () => {
  return <div>Checkout</div>;
};

export default Checkout;
