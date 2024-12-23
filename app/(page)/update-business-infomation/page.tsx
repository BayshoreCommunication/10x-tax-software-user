import { getUserData } from "@/app/actions/user";
import BusinessInformationForm from "@/components/subscription/BusinessInformationForm";

const page = async () => {
  const userData = await getUserData();

  return (
    <div className="bg-[#eeeeee]">
      <BusinessInformationForm userData={userData?.payload?.user} />
    </div>
  );
};

export default page;