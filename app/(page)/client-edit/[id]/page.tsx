import { getAllClientData } from "@/app/actions/client";
import { auth } from "@/auth";
import EditClient from "@/components/clientList/EditClient";

const page = async ({ params }: any) => {
  const session = await auth();
  const clientDataList = await getAllClientData();
  const { id } = await params;

  const clientDetails = await clientDataList?.data?.clients?.find(
    (client: any) => client._id === id
  );

  return (
    <div className="bg-[#eeeeee]">
      <EditClient
        session={session?.user?.accessToken}
        id={id}
        clientDetails={clientDetails}
      />
    </div>
  );
};

export default page;
