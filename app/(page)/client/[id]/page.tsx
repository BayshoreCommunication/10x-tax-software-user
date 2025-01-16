import { getAllClientData } from "@/app/actions/client";
import ClientDetials from "@/components/clientList/ClientDetials";

const page = async ({ params }: any) => {
  const clientDataList = await getAllClientData();
  const { id } = await params;

  const clientDetails = await clientDataList?.data?.clients?.find(
    (client: any) => client._id === id
  );

  return (
    <div>
      <ClientDetials />
    </div>
  );
};

export default page;
