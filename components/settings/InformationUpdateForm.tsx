"use client";

import { updateUserData } from "@/app/actions/user";
import Image from "next/image";
import { memo, useCallback, useMemo, useState } from "react";
import { TbEditCircle } from "react-icons/tb";
import { toast } from "react-toastify";
import ColorPicker from "../shared/ui/ColorPicker";
import ColorPickerView from "../shared/ui/ColorPickerView";

interface UserData {
  logoUrl: string;
  businessName: string;
  businessWebsite: string;
  website: string;
  phone: string;
  address: string;
  brandColor: string;
}

type Props = {
  userData: UserData;
  userInfoUpdateFlag: boolean;
  setUserInfoUpdateFlag: (val: boolean) => void;
  setUserEmailUpdateFlag: (val: boolean) => void;
  setUserPasswordUpdateFlag: (val: boolean) => void;
};

const InformationUpdateForm = memo(
  ({
    userData,
    userInfoUpdateFlag,
    setUserInfoUpdateFlag,
    setUserEmailUpdateFlag,
    setUserPasswordUpdateFlag,
  }: Props) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState(userData?.logoUrl);

    const [businessInfoForm, setBusinessInfoForm] = useState({
      image: userData?.logoUrl,
      businessName: userData?.businessName || "",
      businessWebsite: userData?.businessWebsite || "",
      website: userData?.website || "",
      phone: userData?.phone || "",
      address: userData?.address || "",
      brandColor: userData?.brandColor || "#D5AD45",
    });

    const userInfoChangeHandle = useCallback(() => {
      setUserInfoUpdateFlag(false);
      setUserEmailUpdateFlag(false);
      setUserPasswordUpdateFlag(false);
    }, [
      setUserInfoUpdateFlag,
      setUserEmailUpdateFlag,
      setUserPasswordUpdateFlag,
    ]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBusinessInfoForm((prev: any) => ({ ...prev, [name]: value }));
      },
      []
    );

    const handleLogoUpload = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const allowedTypes = ["image/jpeg", "image/png"];
        const maxSizeInBytes = 1 * 1024 * 1024; // 1MB

        if (!allowedTypes.includes(file.type)) {
          setError("Only JPG and PNG formats are allowed.");
          return;
        }

        if (file.size > maxSizeInBytes) {
          setError("Image size should be less than 1MB.");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            setLogoPreview(reader.result.toString());
          }
        };
        reader.readAsDataURL(file);

        setBusinessInfoForm((prev: any) => ({ ...prev, image: file }));
        setError(null);
      },
      []
    );

    const handleSubmitUpdateFormData = useCallback(
      async (e: React.FormEvent) => {
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
            userInfoChangeHandle();
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
      },
      [businessInfoForm, userInfoChangeHandle]
    );

    const inputClasses = useMemo(
      () =>
        "bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-[400px] pl-4 py-2 placeholder-gray-400 active:border-primary outline-none",
      []
    );

    const buttonClasses = useMemo(
      () =>
        "px-4 py-2 border-2 text-white rounded-md font-medium text-base bg-primary hover:bg-hoverColor hover:text-white w-[140px]",
      []
    );

    return (
      <div>
        <div className="flex items-center space-x-8">
          <div className="relative w-[150px] h-[150px] border-2 rounded-full">
            <div className="relative w-[150px] h-[150px] border-2 rounded-full">
              <Image
                src={logoPreview || "/assets/user-image/user-image.png"}
                alt="User Picture"
                width={150}
                height={150}
                className="w-full h-full object-cover object-center rounded-full"
                priority
              />
            </div>

            {userInfoUpdateFlag && (
              <div className="mt-6">
                <button
                  onClick={handleSubmitUpdateFormData}
                  disabled={loading}
                  className="bg-primary hover:bg-hoverColor text-white px-6 py-2 rounded-lg"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={userInfoChangeHandle}
                  className="ml-4 text-gray-600 hover:text-red-500 underline"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="relative overflow-x-auto">
            <div className="px-6 flex items-center space-x-3">
              <h2 className="text-2xl font-medium text-[#000000]">
                Information
              </h2>
              <button onClick={() => setUserInfoUpdateFlag(true)}>
                <TbEditCircle className="text-edit text-2xl hover:text-primary cursor-pointer" />
              </button>
            </div>
            <table className="w-full text-left rtl:text-right text-xl font-medium">
              <tbody>
                <TableRow
                  label="Business Name:"
                  value={businessInfoForm.businessName}
                  name="businessName"
                  editing={userInfoUpdateFlag}
                  onChange={handleChange}
                  inputClasses={inputClasses}
                  displayValue={userData?.businessName}
                />
                <TableRow
                  label="Business Website:"
                  value={businessInfoForm.businessWebsite}
                  name="businessWebsite"
                  editing={userInfoUpdateFlag}
                  onChange={handleChange}
                  inputClasses={inputClasses}
                  displayValue={userData?.businessWebsite}
                />
              </tbody>
            </table>
          </div>
        </div>
        <div className="max-w-[960px] mt-8">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xl font-medium">
              <tbody>
                <TableRow
                  label="Address:"
                  value={businessInfoForm.address}
                  name="address"
                  editing={userInfoUpdateFlag}
                  onChange={handleChange}
                  inputClasses={inputClasses}
                  displayValue={userData?.address}
                />
                <TableRow
                  label="Website:"
                  value={businessInfoForm.website}
                  name="website"
                  editing={userInfoUpdateFlag}
                  onChange={handleChange}
                  inputClasses={inputClasses}
                  displayValue={userData?.website}
                />
                <TableRow
                  label="Phone Number:"
                  value={businessInfoForm.phone}
                  name="phone"
                  editing={userInfoUpdateFlag}
                  onChange={handleChange}
                  inputClasses={inputClasses}
                  displayValue={userData?.phone}
                />
                <tr className="bg-white">
                  <td className="px-6 py-3 text-[#666666]">Brand Color:</td>
                  <td className="px-6 py-3">
                    {userInfoUpdateFlag ? (
                      <ColorPicker
                        brandColor={businessInfoForm?.brandColor}
                        setBusinessInfoForm={setBusinessInfoForm}
                      />
                    ) : (
                      <ColorPickerView brandColor={userData?.brandColor} />
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="pt-3 ml-6">
              {error && <p className="text-red-500 text-base">{error}</p>}
            </div>

            {userInfoUpdateFlag && (
              <div className="mx-6 mt-6 space-x-4 flex items-center">
                <button
                  onClick={() => setUserInfoUpdateFlag(false)}
                  className={buttonClasses}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmitUpdateFormData}
                  className={buttonClasses}
                  disabled={loading}
                >
                  {loading ? <LoadingSpinner /> : "Update"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

const TableRow = memo(
  ({
    label,
    value,
    name,
    editing,
    onChange,
    inputClasses,
    displayValue,
  }: {
    label: string;
    value: string;
    name: string;
    editing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputClasses: string;
    displayValue?: string;
  }) => (
    <tr className="bg-white">
      <td className="px-6 py-3 text-[#666666]">{label}</td>
      <td className="px-6 py-3 text-[#11142D]">
        {editing ? (
          <input
            autoComplete="off"
            type="text"
            className={inputClasses}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            autoComplete="off"
            type="text"
            readOnly
            className={inputClasses}
            value={displayValue || ""}
          />
        )}
      </td>
    </tr>
  )
);

const LoadingSpinner = memo(() => (
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
));

export default InformationUpdateForm;
