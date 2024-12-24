import { auth } from "@/auth";
import ClientListTable from "@/components/dashboard/ClientListTable";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { redirect } from "next/navigation";
import { getUserData } from "../actions/user";

export const metadata = {
  title: "10x Tax Software",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi imperdiet, mauris vitae molestie gravida, libero lorem fermentum elit, eu placerat nunc elit id massa. Morbi interdum lectus ut mauris vehicula",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-USA",
    },
  },
  openGraph: {
    images: "/opengraph-image.png",
  },
};

const page = async () => {
  const session = await auth();
  const userData = await getUserData();
  if (!session) {
    redirect("/sign-in");
  }

  // if (!userData.subscription) {
  //   redirect("/confirm-subscription");
  // }

  return (
    <div className="bg-[#eeeeee]">
      <DashboardOverview />
      <ClientListTable />
    </div>
  );
};

export default page;
