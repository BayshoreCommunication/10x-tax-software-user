import { getUserData } from "@/app/actions/user";
import AccountInfo from "@/components/account/AccountInfo";

interface Props {
  payload: any;
}

const page: React.FC<Props> = async () => {
  const userData = await getUserData();
  return (
    <div className="bg-[#eeeeee]">
      <AccountInfo userData={userData?.payload?.user} />
    </div>
  );
};

export default page;
