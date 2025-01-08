"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";

type Tab = {
  slug: string;
  label: string;
};

const TopMainTabs: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs: Tab[] = useMemo(
    () => [
      { slug: "/", label: "Dashboard" },
      { slug: "/client", label: "Client" },
      { slug: "/tax-plan-generator", label: "Tax Plan Generator" },
    ],
    []
  );

  return (
    <section className="bg-secondary border-t border-gray-700">
      <div className="container">
        <div className="relative flex justify-center items-center w-full py-5">
          <div className="grid grid-cols-3 divide-x divide-gray-500 bg-[#383E54] relative w-full">
            {tabs.map((tab) => (
              <Link
                key={tab.slug}
                href={tab.slug}
                className={`relative px-6 py-3 text-center text-xl font-semibold transition ${
                  pathname === tab.slug ? "text-primary" : "text-white"
                }`}
              >
                <span className="relative z-10 text-white">{tab.label}</span>

                {pathname === tab.slug && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-primary z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopMainTabs;
