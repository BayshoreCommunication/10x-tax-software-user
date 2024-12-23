"use client";

import { updateUserData } from "@/app/actions/user";
import Image from "next/image";
import { useState } from "react";
import { TbEditCircle } from "react-icons/tb";
import { toast } from "react-toastify";
import ColorPicker from "../shared/ui/ColorPicker";
import ColorPickerView from "../shared/ui/ColorPickerView";

const InformationUpdateForm = ({
  userData,
  userInfoUpdateFlag,
  setUserInfoUpdateFlag,
  setUserEmailUpdateFlag,
  setUserPasswordUpdateFlag,
}: {
  userData: any;
  userInfoUpdateFlag: any;
  setUserInfoUpdateFlag: any;
  setUserEmailUpdateFlag: any;
  setUserPasswordUpdateFlag: any;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    userData?.logoUrl
  );
  const [businessInfoForm, setBusinessInfoForm] = useState({
    image: userData?.logoUrl,
    businessName: userData?.businessName || "",
    businessWebsite: userData?.businessWebsite || "",
    website: userData?.website || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    brandColor: userData?.brandColor || "#ff0000",
  });

  const [businessEmailForm, setBusinessEmailForm] = useState("");
  const [businessPasswordForm, setBusinessPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const userInfoChangeHandle = () => {
    setUserInfoUpdateFlag(false);
    setUserEmailUpdateFlag(false);
    setUserPasswordUpdateFlag(false);
  };

  // User Info  Update

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
      setBusinessInfoForm((prevState) => ({
        ...prevState,
        image: file,
      }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitUpdateFormData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", businessInfoForm.image);
    formData.append("businessName", businessInfoForm.businessName);
    formData.append("businessWebsite", businessInfoForm.businessWebsite);
    formData.append("website", businessInfoForm.website);
    formData.append("phone", businessInfoForm.phone);
    formData.append("address", businessInfoForm.address);
    formData.append("brandColor", businessInfoForm.brandColor);

    try {
      const result = await updateUserData(formData);
      if (result.ok) {
        setError(null);
        toast.success("Info Update successfully!");
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
    <div>
      <div className="flex items-center space-x-8">
        <div className="relative w-[150px] h-[150px] border-2  rounded-full">
          <div>
            <Image
              src={logoPreview}
              alt="User Picture"
              width={150}
              height={150}
              className="absolute inset-0 rounded-full"
            />
          </div>
          {userInfoUpdateFlag && (
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
          )}
        </div>

        <div className="relative overflow-x-auto">
          <div className=" px-6 flex items-center space-x-3">
            <h2 className="text-2xl font-medium text-[#000000]">Information</h2>
            <button onClick={() => setUserInfoUpdateFlag(true)}>
              <TbEditCircle className="text-edit text-2xl hover:text-primary cursor-pointer" />
            </button>
          </div>
          <table className="w-full text-left rtl:text-right text-xl font-medium ">
            <tbody>
              <tr className="bg-white">
                <td className="px-6 py-3 text-[#666666]">Business Name:</td>
                <td className="px-6 py-3 text-[#11142D]">
                  {userInfoUpdateFlag ? (
                    <input
                      autoComplete="off"
                      type="text"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400  active:border-primary outline-none "
                      id="businessName"
                      name="businessName"
                      value={businessInfoForm.businessName}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      autoComplete="off"
                      type="text"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400  active:border-primary outline-none "
                      value={userData?.businessName}
                    />
                  )}
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-3 text-[#666666]">Business Website:</td>
                <td className="px-6 py-3 text-[#11142D]">
                  {userInfoUpdateFlag ? (
                    <input
                      autoComplete="off"
                      type="text"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400  active:border-primary outline-none "
                      id="businessWebsite"
                      name="businessWebsite"
                      value={businessInfoForm.businessWebsite}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      autoComplete="off"
                      type="text"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                      value={userData?.businessWebsite}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="max-w-[960px] mt-8">
        <div className="relative overflow-x-auto">
          <table className="w-full text-left rtl:text-right text-xl font-medium ">
            <tbody>
              <tr className="bg-white">
                <td className="px-6 py-3 text-[#666666]">Address:</td>
                <td className="px-6 py-3 text-[#11142D]">
                  {userInfoUpdateFlag ? (
                    <input
                      autoComplete="off"
                      type="text"
                      id="address"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400  active:border-primary outline-none "
                      id="address"
                      name="address"
                      value={businessInfoForm.address}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      autoComplete="off"
                      type="text"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                      value={userData?.address}
                    />
                  )}
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-3 text-[#666666]">Website:</td>
                <td className="px-6 py-3 text-[#11142D]">
                  {userInfoUpdateFlag ? (
                    <input
                      autoComplete="off"
                      type="text"
                      id="address"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400  active:border-primary outline-none "
                      id="website"
                      name="website"
                      value={businessInfoForm.website}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      autoComplete="off"
                      type="text"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                      value={userData?.website}
                    />
                  )}
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-3 text-[#666666]">Phone Number:</td>
                <td className="px-6 py-3 text-[#11142D]">
                  {userInfoUpdateFlag ? (
                    <input
                      autoComplete="off"
                      type="text"
                      id="address"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400  active:border-primary outline-none "
                      id="phone"
                      name="phone"
                      value={businessInfoForm.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      autoComplete="off"
                      type="text"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                      value={userData?.phone}
                    />
                  )}
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-6 py-3 text-[#666666]">Brand Color:</td>
                <td className="px-6 py-3 text-[#11142D]">
                  {userInfoUpdateFlag ? (
                    <ColorPicker
                      brandColor={businessInfoForm?.brandColor}
                      setBusinessInfoForm={setBusinessInfoForm}
                    />
                  ) : (
                    <ColorPickerView
                      brandColor={businessInfoForm?.brandColor}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="pt-3 ml-6">
            {error && <p className="text-red-500 text-base">{error}</p>}
          </div>
          {userInfoUpdateFlag && (
            <div className=" mx-6 mt-6 space-x-4 flex items-center">
              <button
                onClick={() => setUserInfoUpdateFlag(false)}
                className="px-4 py-2 border-2  text-white rounded-md font-medium text-base bg-primary hover:bg-[#be9837] hover:text-white w-[140px] "
              >
                Cancle
              </button>
              <button
                type="submit"
                onClick={handleSubmitUpdateFormData}
                className="px-4 py-2 border-2  text-white rounded-md font-medium text-base bg-primary hover:bg-[#be9837] hover:text-white w-[140px]"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 text-gray-300 animate-spin fill-white"
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
                    <p>Updating...</p>
                  </div>
                ) : (
                  <p>Update</p>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InformationUpdateForm;
