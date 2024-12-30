import { getUserData } from "@/app/actions/user";
import BusinessInformation from "@/components/settings/BusinessInformation";

const page = async () => {
  const { ok, data: userData, error } = await getUserData();
  return (
    <div className=" bg-[#eeeeee]">
      <BusinessInformation userData={userData} />
    </div>
  );
};

export default page;
