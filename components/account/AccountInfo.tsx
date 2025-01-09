"use client";
import Image from "next/image";
import Link from "next/link";
import { TbEditCircle } from "react-icons/tb";
import { formatDate } from "../shared/ui/DateFormat";

const AccountInfo = ({ userData }: { userData: any }) => {
  return (
    <div className="container py-10">
      <div className=" bg-white p-12">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#11142D]">
            Business Information
          </h2>
        </div>
        <div className="border p-6">
          <div className="flex items-center space-x-8">
            <div className="relative w-[150px] h-[150px] border-2 rounded-full">
              <div className="relative w-[150px] h-[150px] overflow-hidden rounded-full">
                <Image
                  src={userData?.logoUrl || "/assets/user-image/user-image.png"}
                  alt="User Picture"
                  layout="fill" // Ensures the image fills the container
                  objectFit="cover" // Maintains aspect ratio while cropping
                  quality={90} // Ensures good image quality
                  priority // Optimizes loading for critical images
                  className="bg-cover bg-center w-full h-full rounded-full"
                />
              </div>

              <div className=" bg-primary hover:bg-hoverColor p-1 flex items-center justify-center w-8 h-8 border border-white rounded-full absolute bottom-5 right-6 translate-x-1/2 translate-y-1/2 cursor-pointer">
                <TbEditCircle className="text-white text-xl" />
              </div>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xl font-medium ">
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Business Name:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {userData?.businessName}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Email:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {userData?.email}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10 max-w-[650px]">
            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xl font-medium ">
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Address:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {userData?.address}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666] ">
                      Subscription End Date:
                    </td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {formatDate(userData?.currentSubscriptionExpiredDate)}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Website:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {userData?.businessWebsite}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Phone Number:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {userData?.phone}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="py-3 w-[225px] px-6">
                <label
                  htmlFor="name-icon"
                  className="block mb-2 text-xl font-medium text-gray-900"
                >
                  Brand Color
                </label>
                <div className="border border-gray-300 flex items-center space-x-6 rounded p-2">
                  <input
                    type="text"
                    value={userData?.brandColor || "#E9A31C"}
                    className="focus:outline-none w-[100px] border-none bg-white text-black"
                  />
                  <div
                    className="w-7 h-7 rounded mx-2 "
                    style={{ backgroundColor: userData?.brandColor }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Link
            href={"/settings"}
            className="px-4 py-2 border-2  text-white rounded-md font-medium text-base bg-primary hover:bg-hoverColor hover:text-white w-[140px]"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
