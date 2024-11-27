"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { PiListPlus } from "react-icons/pi";
import { PiListPlusBold } from "react-icons/pi";
import { RiSettings3Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import Image from "next/image";

const TopNavbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const dashboardTitle = siteConfig?.sideBarItems?.find(
    (el: any, index: number) => el?.slug === pathname
  )?.label;

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
            <div
              className="relative inline-block text-left z-20"
              ref={dropdownRef}
            >
              <div>
                <button
                  type="button"
                  className={`inline-flex w-full items-center justify-center gap-x-1.5 rounded-full px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-[#383E54] hover:bg-[#383E54] border border-[#383E54] shadow ${
                    isOpen ? "bg-[#383E54]" : "bg-[#383E54]"
                  }`}
                  id="menu-button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
                  <div className="w-10 h-10 overflow-hidden bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="flex items-center justify-center w-[30px] h-[30px]">
                      <Image
                        src="/assets/user-image/user-image.png"
                        alt="User Image"
                        width={100}
                        height={100}
                        className="w-[35px] h-[35px]"
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-lg text-white">
                      Company Name
                    </h3>
                    <p className="font-normal text-sm text-white">
                      10xtaxpro.com
                    </p>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <IoIosArrowDown className="text- size-5 text-white" />
                  </div>
                </button>
              </div>

              {isOpen && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    <Link
                      href={"/settings"}
                      className="w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white flex items-center space-x-2"
                    >
                      <FaRegUser className="size-4" />
                      <p>Account</p>
                    </Link>

                    <Link
                      href={"/settings"}
                      className="w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white flex items-center space-x-2"
                    >
                      <PiListPlusBold className="size-4" />
                      <p>Subscription</p>
                    </Link>

                    <Link
                      href={"/settings"}
                      className="w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white flex items-center space-x-2"
                    >
                      <RiSettings3Line className="size-4" />
                      <p>Settings</p>
                    </Link>

                    <button
                      onClick={toggleDropdown}
                      type="submit"
                      className="w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white flex items-center space-x-2"
                    >
                      <FiLogOut className="size-4" />
                      <p> Logout</p>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNavbar;
