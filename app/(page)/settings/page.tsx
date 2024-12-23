import { getUserData } from "@/app/actions/user";
import BusinessInformation from "@/components/settings/BusinessInformation";

const page = async () => {
  const userData = await getUserData();
  return (
    <div className=" bg-[#eeeeee]">
      <BusinessInformation userData={userData?.payload?.user} />
    </div>
  );
};

export default page;
