"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type Tab = {
  slug: string;
  label: string;
};

const TopMainTabs: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedTab, setSelectedTab] = useState<string>("/");

  const tabs: Tab[] = [
    { slug: "/", label: "Dashboard" },
    { slug: "/client", label: "Client" },
    { slug: "/tax-plan-generator", label: "Tax Plan Generator" },
  ];

  // Explicitly typing the function parameters
  const handleSelectTab = (slug: string): void => {
    router.push(slug);
  };

  return (
    <section className="bg-secondary border-t-1 border-gray-700">
      <div className="container">
        <div className="relative flex justify-center items-center w-full py-5">
          <div className="grid grid-cols-3 divide-x divide-gray-500 bg-[#383E54] relative w-full">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => handleSelectTab(tab.slug)}
                className="relative px-6 py-3 cursor-pointer text-center text-xl font-semibold transition"
              >
                <span className="relative z-10 text-white">{tab.label}</span>

                {pathname === tab.slug && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-primary z-0 border-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopMainTabs;
