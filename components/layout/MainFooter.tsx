import Link from "next/link";
import React, { useMemo } from "react";

import { siteConfig } from "@/config/site";

// Define the type for quick links
type QuickLink = {
  slug: string;
  label: string;
};

// Define the type for the SocialIcon component
type SocialIconProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const MainFooter = () => {
  // Ensure siteConfig.footerQuickLinks has a proper fallback
  const quickLinks: QuickLink[] = useMemo(() => {
    return siteConfig?.footerQucksLink || [];
  }, []);

  const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon }) => (
    <div className="bg-black rounded-full p-2">
      <Icon className="text-white w-5 h-5" />
    </div>
  );

  return (
    <footer className="bg-[#eeeeee]">
      <div className="container py-5 md:py-8">
        <div className="flex justify-center">
          <ul className="text-black font-normal list-none ml-0 flex flex-col md:flex-row items-center justify-center text-center space-x-12">
            {quickLinks.map((el, index) => (
              <li
                className="flex items-center text-md md:text-[18px]"
                key={index}
              >
                <Link href={el.slug} className="hover:underline">
                  {el.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-gray-300 sm:mx-auto lg:my-5 w-[70%]" />
        <div className="flex items-center justify-center">
          <p className="text-black font-normal text-md md:text-[18px] text-center mb-4 md:mb-0">
            All Rights Reserved By 10x Tax Pro
          </p>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(MainFooter);
