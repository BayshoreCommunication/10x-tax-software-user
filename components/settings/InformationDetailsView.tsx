// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import ColorPickerView from "../shared/ui/ColorPickerView";

// interface UserData {
//   logoUrl?: string;
//   businessName?: string;
//   businessWebsite?: string;
//   website?: string;
//   phone?: string;
//   address?: string;
//   brandColor?: string;
// }

// const InputField = ({
//   label,
//   value,
//   onChange,
//   name,
// }: {
//   label: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   name: string;
// }) => (
//   <tr className="bg-white">
//     <td className="px-6 py-3 text-[#666666]">{label}</td>
//     <td className="px-6 py-3 text-[#11142D]">
//       <input
//         type="text"
//         autoComplete="off"
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400 outline-none"
//       />
//     </td>
//   </tr>
// );

// const InformationDetailsView = ({ userData }: { userData: UserData }) => {
//   const [logoPreview] = useState<string>(
//     userData?.logoUrl || "/assets/user-image/user-image.png"
//   );

//   const [businessInfoForm, setBusinessInfoForm] = useState({
//     image: userData?.logoUrl || "",
//     businessName: userData?.businessName || "",
//     businessWebsite: userData?.businessWebsite || "",
//     website: userData?.website || "",
//     phone: userData?.phone || "",
//     address: userData?.address || "",
//     brandColor: userData?.brandColor || "#D5AD45",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setBusinessInfoForm((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="space-y-10">
//       <div className="flex items-start space-x-8">
//         <div className="w-[150px] h-[150px] relative border-2 rounded-full overflow-hidden">
//           <Image
//             src={logoPreview}
//             alt="User Picture"
//             width={150}
//             height={150}
//             className="object-cover object-center w-full h-full"
//           />
//         </div>

//         <div className="overflow-x-auto">
//           <div className="px-6 flex items-center space-x-3 mb-4">
//             <h2 className="text-2xl font-medium text-[#000000]">Information</h2>
//           </div>
//           <table className="w-full text-left text-xl font-medium">
//             <tbody>
//               <InputField
//                 label="Business Name:"
//                 name="businessName"
//                 value={businessInfoForm.businessName}
//                 onChange={handleChange}
//               />
//               <InputField
//                 label="Business Website:"
//                 name="businessWebsite"
//                 value={businessInfoForm.businessWebsite}
//                 onChange={handleChange}
//               />
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="max-w-[960px]">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-xl font-medium">
//             <tbody>
//               <InputField
//                 label="Address:"
//                 name="address"
//                 value={businessInfoForm.address}
//                 onChange={handleChange}
//               />
//               <InputField
//                 label="Website:"
//                 name="website"
//                 value={businessInfoForm.website}
//                 onChange={handleChange}
//               />
//               <InputField
//                 label="Phone Number:"
//                 name="phone"
//                 value={businessInfoForm.phone}
//                 onChange={handleChange}
//               />
//               <tr className="bg-white">
//                 <td className="px-6 py-3 text-[#666666]">Brand Color:</td>
//                 <td className="px-6 py-3 text-[#11142D]">
//                   <ColorPickerView brandColor={businessInfoForm.brandColor} />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InformationDetailsView;

const InformationDetailsView = () => {
  return <div>InformationDetailsView</div>;
};

export default InformationDetailsView;
