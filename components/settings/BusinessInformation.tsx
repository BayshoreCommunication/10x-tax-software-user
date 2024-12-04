"use client";
import { TbEditCircle } from "react-icons/tb";
import ColorPicker from "../shared/ui/ColorPicker";

const BusinessInformation = () => {
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
          <h2 className="text-2xl font-medium pt-14 text-[#000000] px-6">
            Information
          </h2>
          <div className="mt-4 max-w-[780px]">
            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xl font-medium ">
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Address:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      <input
                        autoComplete="off"
                        type="text"
                        id="email-address-icon"
                        className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                        value={" 1A,hdh United State"}
                      />
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Website:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      <input
                        autoComplete="off"
                        type="text"
                        id="email-address-icon"
                        className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                        value={"10xtaxpro.com"}
                      />
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Phone Number:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      <input
                        autoComplete="off"
                        type="text"
                        id="email-address-icon"
                        className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                        value={"+1 345 6457"}
                      />
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Brand Color:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      <ColorPicker />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <h2 className="text-2xl font-medium pt-10 pb-4 text-[#000000] px-6">
            Change Your Password
          </h2>
          <div className="relative overflow-x-auto max-w-[780px]">
            <table className="w-full text-left rtl:text-right text-xl font-medium ">
              <tbody>
                <tr className="bg-white">
                  <td className="px-6 py-3 text-[#666666] w-[30%]">
                    Old Password:
                  </td>
                  <td className="px-6 py-3 text-[#11142D]">
                    <input
                      autoComplete="off"
                      type="password"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                      value={1234567}
                    />
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-3 text-[#666666] w-[30%]">
                    New Password:
                  </td>
                  <td className="px-6 py-3 text-[#11142D]">
                    <input
                      autoComplete="off"
                      type="password"
                      id="email-address-icon"
                      className="bg-white border border-gray-300 text-lg rounded-lg focus:ring-primary focus:border-primary block w-full pl-4 py-2 placeholder-gray-400  active:border-primary outline-none"
                      value={1234567}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button className="px-4 py-2 border-2  text-white rounded-md font-medium text-base bg-primary hover:bg-[#be9837] hover:text-white w-[140px] mt-10">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default BusinessInformation;
