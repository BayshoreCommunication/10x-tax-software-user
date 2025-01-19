import ViewTaxPlanAndEdit from "@/components/generatePlan/ViewTaxPlanAndEdit";
import ViewTaxProposal from "@/components/generatePlan/ViewTaxProposal";

const page = async ({ params }: any) => {
  const { slug } = await params;
  return (
    <div className="p-7  bg-[#eeeeee]">
      <div className="container py-10">
        <div className="bg-white p-14">
          {slug === "tax-plan" ? <ViewTaxPlanAndEdit /> : <ViewTaxProposal />}
        </div>
      </div>
    </div>
  );
};

export default page;
