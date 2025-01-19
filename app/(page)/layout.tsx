import MainFooter from "@/components/layout/MainFooter";
import MainHeader from "@/components/layout/MainHeader";
import GlobalToast from "@/components/shared/ui/GlobalToast";
import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata } from "next";
import ReduxProvider from "../../redux/reduxProvider";
import { Providers } from "../providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://10x-tax-software-user.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReduxProvider>
        <body className={clsx("antialiased")}>
          <Providers themeProps={{ attribute: "className" }}>
            <div className="overflow-x-hidden">
              <MainHeader />
              {children}
              <GlobalToast />
              <MainFooter />
            </div>
          </Providers>
        </body>
      </ReduxProvider>
    </html>
  );
}
