import type { Metadata } from "next";
import MainLayout from "@/app/layouts/MainLayout"

export const metadata: Metadata = {
  title: "Max4",
  description: "Max4",
};
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <MainLayout>
          {children}
      </MainLayout>
  );
}
