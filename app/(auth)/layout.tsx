import "@/styles/globals.css";
import { Metadata } from "next";

import clsx from "clsx";

import GlobalToast from "@/components/shared/ui/GlobalToast";
import { Providers } from "../providers";

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
            {children} <GlobalToast />
          </div>
        </Providers>
      </body>
    </html>
  );
}
