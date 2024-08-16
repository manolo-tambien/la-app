import "../globals.css";
import type { Metadata } from "next";
import ClientProvider from "@/components/ClientProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Max4",
  description: "Max4",
};
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html>
        <body>
          <ClientProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ClientProvider>
        </body>
      </html>
    </>
  );
}
