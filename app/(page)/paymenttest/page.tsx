import { auth } from "@/auth";
import UserSubscription from "@/components/subscription/UserSubscription";

const page = async () => {
  const session = await auth();
  return (
    <div className="bg-[#eeeeee]">
      <UserSubscription token={session?.user?.accessToken} />
    </div>
  );
};

export default page;
