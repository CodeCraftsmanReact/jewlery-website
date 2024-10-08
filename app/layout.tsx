import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navigation from "@/components/navigation";
import Cart from "@/components/cart-provider";
import PageTransitionEffect from "./PageTransitionEffect";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emily's Jewels",
  description: "Buy Jewlery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-[100vh] relative`}>
        <PageTransitionEffect>
          <Cart>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navigation />
              {children}
            </ThemeProvider>
          </Cart>
        </PageTransitionEffect>
      </body>
    </html>
  );
}
