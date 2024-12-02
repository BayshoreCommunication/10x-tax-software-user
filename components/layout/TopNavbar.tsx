import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import UserDropDownButton from "./UserDropDownButton";
const TopNavbar = async () => {
  const session = await auth();

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
            <UserDropDownButton user={session?.user} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNavbar;
