import { getClientTaxList } from "@/app/actions/taxplan";
import { FaDownload } from "react-icons/fa";
import { SiAdobeacrobatreader } from "react-icons/si";
import { formatDate } from "../shared/ui/DateFormat";

interface TaxPlanData {
  id: string;
  name: string;
}

const ClientDetails = async ({ clientDetails }: any) => {
  const taxPlanList = await getClientTaxList(clientDetails?._id);

  return (
    <div className="container py-10">
      <div className="bg-white p-14">
        {/* Client Information */}
        <div className="w-full border-b pb-1">
          <h2 className="w-[25%] text-2xl font-bold text-secondary text-left pb-2">
            Client Information
          </h2>
        </div>
        <div className="mt-6 p-5 2xl:p-10 border">
          <h4 className="text-2xl font-semibold text-[#1F263E] mb-4">
            {clientDetails?.basicInformation?.fullName}
          </h4>
          <div className="flex items-start gap-6 md:gap-32">
            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xl font-medium ">
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Name:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {clientDetails?.basicInformation?.fullName}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Profession:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {clientDetails?.basicInformation?.fullName}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Profession:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {clientDetails?.basicInformation?.profession}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Income:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      ${clientDetails?.basicInformation?.annualGrossIncome}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-left rtl:text-right text-xl font-medium ">
                <tbody>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Phone:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {clientDetails?.basicInformation?.phone}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Date of Birth:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {formatDate(clientDetails?.basicInformation?.dateOfBirth)}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">Address:</td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {clientDetails?.basicInformation?.address}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-6 py-3 text-[#666666]">
                      Marital Status:
                    </td>
                    <td className="px-6 py-3 text-[#11142D]">
                      {clientDetails?.basicInformation?.maritalStatus}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {clientDetails?.basicInformation?.maritalStatus === "married" ? (
          <div className="mt-6 p-5 2xl:p-10 border">
            <h4 className="text-2xl font-semibold text-[#1F263E] mb-4">
              Spouse Details
            </h4>
            <div className="flex items-start gap-6 md:gap-32">
              <div className="relative overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xl font-medium ">
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-6 py-3 text-[#666666]">Name:</td>
                      <td className="px-6 py-3 text-[#11142D]">
                        {
                          clientDetails?.basicInformation?.spouseDetails
                            ?.fullName
                        }
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-6 py-3 text-[#666666]">Income:</td>
                      <td className="px-6 py-3 text-[#11142D]">
                        $
                        {clientDetails?.basicInformation?.spouseDetails?.income}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="relative overflow-x-auto">
                <table className="w-full text-left rtl:text-right text-xl font-medium ">
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-6 py-3 text-[#666666]">Profession:</td>
                      <td className="px-6 py-3 text-[#11142D]">
                        {
                          clientDetails?.basicInformation?.spouseDetails
                            ?.profession
                        }
                      </td>
                    </tr>

                    <tr className="bg-white">
                      <td className="px-6 py-3 text-[#666666]">
                        Date of Birth:
                      </td>
                      <td className="px-6 py-3 text-[#11142D]">
                        {formatDate(
                          clientDetails?.basicInformation?.spouseDetails
                            ?.dateOfBirth
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Tax Plans and Proposals */}
        <div className="mt-6 p-5 2xl:p-10 border">
          <div className="">
            <div className="flex items-start space-x-36">
              <h4 className="w-full border-b text-2xl font-bold text-secondary text-left pb-2">
                Tax Plans
              </h4>
              <h4 className="w-full border-b text-2xl font-bold text-secondary text-left pb-2">
                Tax Proposal
              </h4>
            </div>
            {taxPlanList?.data?.taxPlan?.taxPlan?.length > 0 ? (
              <div className="">
                {taxPlanList?.data?.taxPlan?.taxPlan.map(
                  (el: any, index: number) => (
                    <div className="flex items-start gap-10 2xl:gap-20">
                      <div className="flex-1">
                        <div className="mt-4">
                          <div
                            key={index}
                            className="py-3 2xl:py-4 bg-white flex justify-between items-center space-x-4 w-full"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-3 bg-primary text-white rounded-lg">
                                <SiAdobeacrobatreader className="text-2xl" />
                              </div>
                              <div>
                                <h6 className="text-xl font-medium text-secondary mb-1">
                                  Tax Plan
                                </h6>
                                <p className="text-base font-normal text-secondary opacity-70">
                                  {formatDate(el?.createdAt)}
                                </p>
                              </div>
                            </div>
                            <button className="flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium">
                              <p>Download PDF</p>
                              <FaDownload />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="mt-4">
                          <div
                            key={index}
                            className="py-3 2xl:py-4 bg-white flex justify-between items-center space-x-4 w-full"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-3 bg-primary text-white rounded-lg">
                                <SiAdobeacrobatreader className="text-2xl" />
                              </div>
                              <div>
                                <h6 className="text-xl font-medium text-secondary mb-1">
                                  Tax Proposal
                                </h6>
                                <p className="text-base font-normal text-secondary opacity-70">
                                  {formatDate(el?.createdAt)}
                                </p>
                              </div>
                            </div>
                            <button className="flex items-center space-x-3 mt-3 text-lg justify-start hover:text-primary duration-300 font-medium">
                              <p>Download PDF</p>
                              <FaDownload />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : (
              <p className="text-center text-base  text-gray-600 flex items-center justify-center min-h-[15vh]">
                No tax data available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
