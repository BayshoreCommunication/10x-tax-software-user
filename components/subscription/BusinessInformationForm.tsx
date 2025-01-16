"use client";
import { updateUserData } from "@/app/actions/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { TbEditCircle } from "react-icons/tb";
import { toast } from "react-toastify";
import ColorPicker from "../shared/ui/ColorPicker";

const BusinessInformationForm = ({ userData }: { userData: any }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [brandColor, setBrandColor] = useState<string>("#ff0000");
  const [businessInfoForm, setBusinessInfoForm] = useState({
    image: "",
    businessName: userData?.businessName || "",
    businessWebsite: "",
    phone: userData?.phone || "",
    address: "",
    website: "",
    brandColor: brandColor,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessInfoForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      var reader = new FileReader();
      reader.onloadend = function () {
        if (reader.result) {
          setLogoPreview(reader.result.toString());
        }
      };
      setBusinessInfoForm((prevState: any) => ({
        ...prevState,
        image: file,
      }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", businessInfoForm.image);
    formData.append("businessName", businessInfoForm.businessName);
    formData.append("businessWebsite", businessInfoForm.businessWebsite);
    formData.append("phone", businessInfoForm.phone);
    formData.append("address", businessInfoForm.address);
    formData.append("brandColor", businessInfoForm.brandColor);
    formData.append("website", businessInfoForm.website);

    try {
      const result = await updateUserData(formData);
      if (result.ok) {
        router.push("/");
        toast.success("Successful update!");
        setError(null);

        // toast.success("Info Update successfully!");
      } else {
        setError(result.error || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Info Update failed");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 flex items-center justify-center">
      <div className="bg-white  p-12 w-[65%]">
        <h2 className="text-3xl font-bold text-[#11142D] text-left py-4">
          Business Information
        </h2>
        <div className="p-14">
          <form onSubmit={handleSubmit}>
            <div>
              <div className="relative w-[150px] h-[150px] border-2 border-primary rounded-full">
                {logoPreview ? (
                  <div>
                    <Image
                      src={logoPreview}
                      alt="User Picture"
                      width={150}
                      height={150}
                      className="absolute inset-0 rounded-full w-[146px] h-[146px]"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <h2 className="text-xl font-medium text-[#11142D] text-center">
                      Choose your logo
                    </h2>
                  </div>
                )}

                <div className="bg-primary hover:bg-yellow-500 p-1 flex items-center justify-center w-8 h-8 border border-white rounded-full absolute bottom-5 right-6 translate-x-1/2 translate-y-1/2 cursor-pointer">
                  <label
                    htmlFor="image"
                    className="cursor-pointer flex items-center justify-center w-full h-full"
                  >
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      name="image"
                    />
                    <TbEditCircle className="text-white text-xl" />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <div className="py-3">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-xl font-normal text-gray-900"
                >
                  Business Website
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  id="businessWebsite"
                  name="businessWebsite"
                  value={businessInfoForm.businessWebsite}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="https://www.exampleurl.com"
                />
              </div>
            </div>

            <div className="flex items-center justify-between space-x-5 py-3">
              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-xl font-normal text-gray-900"
                >
                  Name
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={businessInfoForm.businessName}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="Carlos Rosario"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-xl font-normal text-gray-900"
                >
                  Email
                </label>

                <input
                  autoComplete="off"
                  type="email"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  value={userData?.email || ""}
                />
              </div>
            </div>

            <div className="flex items-center justify-between space-x-5 py-3">
              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-xl font-normal text-gray-900"
                >
                  Phone Number
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  id="phone"
                  name="phone"
                  value={businessInfoForm.phone}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder="+1 353 6789"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-xl font-normal text-gray-900"
                >
                  Website
                </label>

                <input
                  autoComplete="off"
                  type="text"
                  id="website"
                  className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                  placeholder=""
                  name="website"
                  value={businessInfoForm?.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Business Address
              </label>

              <input
                autoComplete="off"
                type="text"
                className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                placeholder=""
                id="address"
                name="address"
                value={businessInfoForm.address}
                onChange={handleChange}
              />
            </div>

            <div className="py-3">
              <label
                htmlFor="name-icon"
                className="block mb-2 text-xl font-normal text-gray-900"
              >
                Choose Your Brand Color
              </label>
              {/* <ColorPicker
                brandColor={brandColor}
                setBrandColor={setBrandColor}
              /> */}
              <ColorPicker
                brandColor={businessInfoForm?.brandColor}
                setBusinessInfoForm={setBusinessInfoForm}
              />
            </div>

            <div className="pt-3 text-center">
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <div className="py-8 flex justify-center items-center mx-0">
              <button
                type="submit"
                className="text-white bg-primary hover:bg-hoverColor] font-medium rounded-lg text-lg px-5 py-3 w-[50%]"
                disabled={loading}
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
                    <p>Creating...</p>
                  </div>
                ) : (
                  <p>Create</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessInformationForm;

// "use client";

// import { useState } from "react";
// import { userImageUpload } from "../app/action/testImage";

// const UploadImage = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<string>("");

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     setSelectedFile(file || null);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!selectedFile) {
//       setUploadStatus("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     try {
//       const result = await userImageUpload(formData);
//       setUploadStatus(result.message);
//     } catch (error) {
//       setUploadStatus("An error occurred during upload");
//     }
//   };

//   return (
//     <div>
//       <h1>Upload Image</h1>
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} accept="image/*" />
//         <button type="submit">Upload</button>
//       </form>
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };

// export default UploadImage;
