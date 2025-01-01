"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import BasicInformation from "./BasicInformation";
import Dependents from "./Dependents";
import FillingStatus from "./FillingStatus";
import GeneratePlanView from "./GeneratePlanView";
import Strategy from "./Strategy";

const GeneratePlanTabs = () => {
  const [activeTab, setActiveTab] = useState("basic-information");
  const [generateplanViewFlag, setGenerateplanViewFlag] = useState(false);

  const tabsItem = [
    {
      title: "Basic Information",
      key: "basic-information",
    },
    { title: "Filling Status", key: "filling-status" },
    { title: "Strategy", key: "strategy" },
    { title: "Dependents", key: "dependents" },
  ];

  return (
    <div className="container py-10">
      <div className="bg-white p-14">
        {generateplanViewFlag ? (
          <>
            <GeneratePlanView />
          </>
        ) : (
          <div className="">
            <h2 className="w-[25%] text-2xl font-bold text-secondary text-left py-4">
              Client Data
            </h2>
            <div className="flex border-b border-gray-400 justify-start space-x-14">
              {tabsItem.map((tab) => (
                <div key={tab?.key} className="relative">
                  <button
                    className={`py-3 px-1 md:px-4  font-semibold md:text-xl w-full text-left ${
                      activeTab === tab?.key ? "text-black" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab?.key)}
                  >
                    {tab?.title}
                  </button>
                  {activeTab === tab?.key && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-black"
                      layoutId="underline"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            <motion.div
              className="mt-2"
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Demo content can be replaced with dynamic content for each tab */}
              {/* <h1 className="text-2xl font-semibold">
          {tabsItem.find((tab) => tab.key === activeTab)?.title}
        </h1> */}
            </motion.div>
            <div className="mt-6">
              {activeTab === "basic-information" ? (
                <BasicInformation />
              ) : activeTab === "filling-status" ? (
                <FillingStatus />
              ) : activeTab === "strategy" ? (
                <Strategy />
              ) : activeTab === "dependents" ? (
                <Dependents setGenerateplanViewFlag={setGenerateplanViewFlag} />
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratePlanTabs;
