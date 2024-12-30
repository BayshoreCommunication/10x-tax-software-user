import { getUserData } from "@/app/actions/user";
import BusinessInformationForm from "@/components/subscription/BusinessInformationForm";

const page = async () => {
  const { ok, data: userData, error } = await getUserData();

  return (
    <div className="bg-[#eeeeee]">
      <BusinessInformationForm userData={userData} />
    </div>
  );
};

export default page;
