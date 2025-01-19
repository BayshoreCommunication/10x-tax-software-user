import { auth } from "@/auth";
import AddNewClientForm from "@/components/addNewClient/AddNewClientForm";

const page = async () => {
  const session = await auth();

  return (
    <div className="bg-[#eeeeee]">
      <AddNewClientForm session={session?.user?.accessToken} />
    </div>
  );
};

export default page;
