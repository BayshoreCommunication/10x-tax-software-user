"use client";

import { userLogOut } from "@/app/actions";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { PiListPlusBold } from "react-icons/pi";
import { RiSettings3Line } from "react-icons/ri";
import { toast } from "react-toastify";

const UserDropDownButton = ({ user }: any) => {
  const notify = () =>
    toast.success("Wow so easy!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const pathname = usePathname();
  const router = useRouter();
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

  const handleMenuClick = (slug: any) => {
    router.push(slug);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="relative inline-block text-left z-20" ref={dropdownRef}>
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
                  src={user?.image || "/default-user-image.png"}
                  alt="User Image"
                  width={100}
                  height={100}
                  className="w-[35px] h-[35px]"
                  unoptimized
                />
              </div>
            </div>
            <div className="text-left">
              <h3 className="font-medium text-lg text-white">{user?.name}</h3>
              <p className="font-normal text-sm text-white">{user?.email}</p>
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
              <button
                onClick={() => handleMenuClick("/account")}
                className="w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white flex items-center space-x-2"
              >
                <FaRegUser className="size-4" />
                <p>Account</p>
              </button>

              <button
                onClick={() => handleMenuClick("/subscription")}
                className="w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white flex items-center space-x-2"
              >
                <PiListPlusBold className="size-4" />
                <p>Subscription</p>
              </button>

              <button
                onClick={() => handleMenuClick("/settings")}
                className="w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white flex items-center space-x-2"
              >
                <RiSettings3Line className="size-4" />
                <p>Settings</p>
              </button>
              <form action={userLogOut}>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-left text-lg text-gray-700 hover:bg-primary hover:text-white flex items-center space-x-2"
                >
                  <FiLogOut className="size-4" />
                  <p> Logout</p>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropDownButton;
