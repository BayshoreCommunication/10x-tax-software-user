import TaxProposalPlanView from "@/components/generatePlan/TaxProposalPlanView";

const page = async ({ params }: any) => {
  const { id } = await params;
  return (
    <div className="p-7  bg-[#eeeeee]">
      <TaxProposalPlanView taxId={id} />
    </div>
  );
};

export default page;
