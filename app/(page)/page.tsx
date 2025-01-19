import ClientDetails from "@/components/clientList/ClientDetails";
import ClientListTable from "@/components/dashboard/ClientListTable";
import DashboardOverview from "@/components/dashboard/DashboardOverview";

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

const page = () => {
  return (
    <div className="bg-[#eeeeee]">
      <DashboardOverview />
      {/* <ClientListTable /> */}
      <ClientDetails />
    </div>
  );
};

export default page;
