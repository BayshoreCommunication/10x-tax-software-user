import { getAllClientData } from "@/app/actions/client";
import TaxProposalPlanView from "@/components/generatePlan/TaxProposalPlanView";

const page = async ({ params }: any) => {
  const clientDataList = await getAllClientData();
  const { id } = await params;

  const clientDetails = await clientDataList?.data?.clients?.find(
    (client: any) => client._id === id
  );

  return (
    <div className="p-7  bg-[#eeeeee]">
      <TaxProposalPlanView clientDetails={clientDetails} taxId={id} />
    </div>
  );
};

export default page;
