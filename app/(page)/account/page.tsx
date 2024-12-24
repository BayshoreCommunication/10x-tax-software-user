import { getUserData } from "@/app/actions/user";
import AccountInfo from "@/components/account/AccountInfo";

const page = async () => {
  const userData = await getUserData();

  return (
    <div className="bg-[#eeeeee]">
      <AccountInfo userData={userData} />
    </div>
  );
};

export default page;
