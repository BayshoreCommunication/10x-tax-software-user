// "use client";
// import axios from "axios";
// import { useState } from "react";

// const CreateVendor = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleCreateVendor = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/create-vendor`,
//         {
//           email,
//         }
//       );
//       window.location.href = response.data.url; // Redirect vendor to Stripe onboarding
//     } catch (error) {
//       console.error("Error creating vendor account:", error);
//       alert("Error creating vendor account:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Create Vendor Stripe Account</h2>
//       <input
//         type="email"
//         placeholder="Vendor Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 w-full rounded"
//       />
//       <button
//         onClick={handleCreateVendor}
//         className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//         disabled={loading}
//       >
//         {loading ? "Processing..." : "Create Vendor"}
//       </button>
//     </div>
//   );
// };

// export default CreateVendor;

const CreateVendor = () => {
  return <div>CreateVendor</div>;
};

export default CreateVendor;
