import ViewTaxPlan from "@/components/generatePlan/ViewTaxPlan";
import ViewTaxProposal from "@/components/generatePlan/ViewTaxProposal";

const page = ({ params }: any) => {
  return (
    <div className="p-7  bg-[#eeeeee]">
      <div className="container py-10">
        <div className="bg-white p-14">
          {params?.slug === "tax-plan" ? <ViewTaxPlan /> : <ViewTaxProposal />}
        </div>
      </div>
    </div>
  );
};

export default page;
