import { getUserData } from "@/app/actions/user";
import SubscriptionDetails from "@/components/subscription/SubscriptionDetails";

const page = async () => {
  const { ok, data: userData, error } = await getUserData();
  return (
    <div className="bg-[#eeeeee]">
      <SubscriptionDetails userData={userData} />
    </div>
  );
};

export default page;
