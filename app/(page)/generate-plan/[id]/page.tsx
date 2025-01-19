import { getAllClientData } from "@/app/actions/client";
import { auth } from "@/auth";
import GeneratePlanTabs from "@/components/generatePlan/GeneratePlanTabs";

const page = async ({ params }: any) => {
  const session = await auth();
  const clientDataList = await getAllClientData();
  const { id } = await params;

  const clientDetails = await clientDataList?.data?.clients?.find(
    (client: any) => client._id === id
  );
  return (
    <div className="bg-[#eeeeee]">
      <GeneratePlanTabs
        session={session?.user?.accessToken}
        id={id}
        clientDetails={clientDetails}
      />
    </div>
  );
};

export default page;
