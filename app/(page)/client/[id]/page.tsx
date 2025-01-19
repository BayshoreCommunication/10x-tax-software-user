import { getAllClientData } from "@/app/actions/client";
import ClientDetails from "@/components/clientList/ClientDetails";

const page = async ({ params }: any) => {
  const clientDataList = await getAllClientData();
  const { id } = await params;

  const clientDetails = await clientDataList?.data?.clients?.find(
    (client: any) => client._id === id
  );

  return (
    <div>
      <ClientDetails />
    </div>
  );
};

export default page;
