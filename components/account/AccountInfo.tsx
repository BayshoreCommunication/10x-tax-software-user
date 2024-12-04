"use client";
import { TbEditCircle } from "react-icons/tb";

const AccountInfo = () => {
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
              {/* <Image
                src="/assets/admin-image/user-image.png"
                alt="User Picture"
                width={150}
                height={150}
                className="absolute inset-0 rounded-full"
              /> */}
              <h2 className="text-xl font-medium text-[#666666] absolute inset-0 flex justify-center items-center text-center">
                Company
                <br /> Logo
              </h2>
              <div className=" bg-primary hover:bg-[#be9837] p-1 flex items-center justify-center w-8 h-8 border border-white rounded-full absolute bottom-6 right-6 translate-x-1/2 translate-y-1/2 cursor-pointer">
                <TbEditCircle className="text-white text-xl" />
              </div>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xl font-medium ">
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Business Name:</td>
                    <td className="px-6 py-3 text-[#11142D]">@jeremyrose</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Email:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      example@gmail.com
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10 max-w-[500px]">
            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xl font-medium ">
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Address:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      1A,hdh United State
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">
                      Subscription End Date:
                    </td>
                    <td className="px-6 py-3 text-[#11142D]">1-1-2025 </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Website:</td>
                    <td className="px-6 py-3 text-[#11142D]">10xtaxpro.com</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Phone Number:</td>
                    <td className="px-6 py-3 text-[#11142D]">+1 345 6457</td>
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
                    value={"#E9A31C"}
                    className="focus:outline-none w-[100px] border-none"
                  />
                  <div className="w-7 h-7 rounded mx-2 bg-[#E9A31C]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 border-2  text-white rounded-md font-medium text-base bg-primary hover:bg-[#be9837] hover:text-white w-[140px] mt-10">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
