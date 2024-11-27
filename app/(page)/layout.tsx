import "@/styles/globals.css";
import { Metadata } from "next";

import clsx from "clsx";
import { Providers } from "../providers";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://10x-tax-software-admin.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={clsx("antialiased")}>
        <Providers themeProps={{ attribute: "className" }}>
          <div className="overflow-x-hidden">
            <MainHeader />
            {children}
            <MainFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
