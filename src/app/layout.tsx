import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollPageNav } from "@/components/layout/ScrollPageNav";
import { SITE_NAME } from "@/lib/constants";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} | Tech Lead, Architect & Fullstack Developer`,
  description:
    "Ryan is a Tech Lead, Architect, and Fullstack Developer building beautiful, user-first websites and leading developer teams to the finish line.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <ScrollPageNav />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
