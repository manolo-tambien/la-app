 
import type { Metadata } from "next";
import { Provider } from 'react-redux';
import store from '../store';
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/ClientProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { LeftBar } from "../../../components/layout/left-bar";
import { LeftBar } from "../components/layout/left-bar"
import { LeftBarMobile } from "../components/layout/left-bar-mobile";
import { BreadcrumbTop } from "../components/breadcrumb";
import { ProfilePicMenu } from "../components/profile-pic-menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ClientProvider>
      <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <LeftBar>
            </LeftBar>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <LeftBarMobile></LeftBarMobile>
                <BreadcrumbTop></BreadcrumbTop>
                <div className="relative ml-auto flex-1 md:grow-0"></div>
                <ProfilePicMenu></ProfilePicMenu>
              </header>
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">{children}</main>
            </div>
          </div>
        </TooltipProvider>
      </ClientProvider>
      </body>
    </html>
  );
}
