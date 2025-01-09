import Image from "next/image";
import React from "react";

const dashboardData = [
  {
    title: "Total Client",
    value: 550,
    description: "All Client Report",
    icon: "/assets/assetsadmin-image/total-client.png",
    backgroundColor: "#F8ECCF",
  },
  {
    title: "Total Plans",
    value: 150,
    description: "Plans Report",
    icon: "/assets/assetsadmin-image/total-plans.png",
    backgroundColor: "#FDD9D4",
  },
  {
    title: "Total Proposal Sent",
    value: 120,
    description: "All Proposal Sent",
    icon: "/assets/assetsadmin-image/total-proposal-sent.png",
    backgroundColor: "#C5D4FD",
  },
  {
    title: "Subscription Plan",
    value: "$99",
    description: "Monthly Plan",
    icon: "/assets/assetsadmin-image/subscription-plan.png",
    backgroundColor: "#D3EED1",
  },
  {
    title: "Payment Status",
    value: "Paid",
    description: "$99.00",
    icon: "/assets/assetsadmin-image/payment-status.png",
    backgroundColor: "#EBCBFE",
  },
  {
    title: "Subscription End Date",
    value: "12/08/2025",
    description: "End Date",
    icon: "/assets/assetsadmin-image/subscription-plan.png",
    backgroundColor: "#B9EFF6",
  },
];

const DashboardOverview = () => {
  return (
    <div className="container py-10">
      <div className="grid grid-cols-3 items-center justify-between gap-5">
        {dashboardData?.map((el: any, index: number) => (
          <div
            style={{ backgroundColor: el?.backgroundColor }}
            className="p-7 2xl:space-y-14 xl:space-y-10 space-y-8 rounded"
          >
            <h2 className="text-2xl font-medium text-[#11142D]">{el?.title}</h2>
            <div className="flex items-center justify-between">
              <Image
                src={el?.icon}
                alt={el?.title}
                width={150}
                height={150}
                className="w-[60px] h-[60px]"
              />
              <div className="">
                <h2 className="2xl:text-3xl text-2xl font-bold  text-[#11142D]">
                  {el?.value}
                </h2>
                <p className="2xl:text-lg text-base font-normal text-[#11142D] mt-1">
                  {el?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
