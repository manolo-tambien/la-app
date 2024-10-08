import type { Metadata } from "next";
import AuthLogin from "@/app/layouts/AuthLogin";

export const metadata: Metadata = {
  title: "Max4",
  description: "Max4",
};
interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return <AuthLogin>{children}</AuthLogin>;
}
