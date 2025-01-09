import "@/styles/globals.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import tinycolor from "tinycolor2";
import { getUserData } from "./actions/user";

export const metadata: Metadata = {
  metadataBase: new URL("https://10x-tax-software-user.vercel.app"),
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { ok, data: userData } = await getUserData();

  const brandColor = ok ? userData?.brandColor : "#D5AD45";
  const hoverColor = tinycolor(brandColor).darken(10).toString();

  return (
    <html lang="en">
      <head>
        <style>{`:root { --primary-color: ${brandColor || "#D5AD45"}; --hover-color: ${hoverColor}; }`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
