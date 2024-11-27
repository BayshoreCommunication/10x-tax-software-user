"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

type Tab = {
  key: string;
  label: string;
};

const TopMainTabs = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  const tabs: Tab[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "client", label: "Client" },
    { key: "tax", label: "Tax Plan Generator" },
  ];

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    label: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      setSelectedTab(label);
    }
  };

  return (
    <section className="bg-secondary border-t-1 border-gray-700">
      <div className="container">
        <div className="relative flex justify-center items-center w-full py-5">
          {/* Tabs */}
          <div className="grid grid-cols-3 divide-x divide-gray-500 bg-[#383E54] relative w-full">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.label)}
                // onKeyDown={(e) => handleKeyPress(e, tab.label)}
                // role="button"
                // tabIndex={0}
                className="relative px-6 py-3 cursor-pointer text-center text-xl font-semibold transition"
                // aria-selected={selectedTab === tab.label}
                // aria-label={`Select ${tab.label} tab`}
              >
                {/* Tab Text */}
                <span className={`relative z-10 text-white`}>{tab.label}</span>
                {/* Active tab indicator */}
                {selectedTab === tab.label && (
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
