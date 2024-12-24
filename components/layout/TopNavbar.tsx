import { getUserData } from "@/app/actions/user";
import Image from "next/image";
import Link from "next/link";
import UserDropDownButton from "./UserDropDownButton";
const TopNavbar = async () => {
  const userData = await getUserData();

  return (
    <section className="bg-secondary">
      <div className="container">
        <div className=" py-4 flex justify-between items-center">
          <Link
            href={"/"}
            className="flex items-center justify-center w-[80px] h-[75px]"
          >
            <Image
              src="/assets/site-logo/10x-tax-logo.png"
              alt="10x Tax Software"
              width={100}
              height={95}
              className="w-[80px] h-[75px]"
            />
          </Link>
          <div>
            <UserDropDownButton userData={userData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNavbar;
