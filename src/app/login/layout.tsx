
 
import type { Metadata } from 'next';
 
/*
 * Load the fonts using next/font/google. For details, see
 * https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#with-tailwind-css
 */
 

export const metadata: Metadata = {
  title: 'Nested Layouts',
  description: 'Nested Layouts',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html   lang="en" suppressHydrationWarning>
      <body>
            <main className="flex-1 container max-w-screen-lg">{children}</main>
      </body>
    </html>
  );
}
