import ViewTaxPlanAndEdit from "@/components/generatePlan/ViewTaxPlanAndEdit";
import ViewTaxProposalEdit from "@/components/generatePlan/ViewTaxProposalEdit";

const Page = async ({ params }: any) => {
  const { slug, id } = await params;

  return (
    <div className="p-7 bg-[#eeeeee]">
      <div className="container py-10">
        <div className="bg-white p-14">
          {slug === "tax-plan" ? (
            <ViewTaxPlanAndEdit />
          ) : (
            <ViewTaxProposalEdit />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
