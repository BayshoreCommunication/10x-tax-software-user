import { getAllClientData } from "@/app/actions/client";
import { auth } from "@/auth";
import GeneratePlanView from "@/components/generatePlan/GeneratePlanView";

const page = async ({ params }: any) => {
  const session = await auth();
  const clientDataList = await getAllClientData();
  const { id } = await params;

  const clientDetails = await clientDataList?.data?.clients?.find(
    (client: any) => client._id === id
  );

  return (
    <div className="bg-[#eeeeee] ">
      <GeneratePlanView
        id={id}
        session={session?.user?.accessToken}
        clientDetails={clientDetails}
      />
    </div>
  );
};

export default page;
