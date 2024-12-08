import { auth } from "@/auth";
import ClientListTable from "@/components/dashboard/ClientListTable";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import { redirect } from "next/navigation";

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

  if (!session) {
    redirect("/sign-in");
  }

  console.log("Session", session);

  return (
    <div className="bg-[#eeeeee]">
      <DashboardOverview />
      <ClientListTable />
    </div>
  );
};

export default page;
