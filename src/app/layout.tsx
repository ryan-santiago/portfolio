import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollPageNav } from "@/components/layout/ScrollPageNav";
import { SnakeGameProvider } from "@/components/snake/SnakeGameContext";
import { SnakeWindow } from "@/components/snake/SnakeWindow";
import { RaceToZeroProvider } from "@/components/race-to-zero/RaceToZeroContext";
import { RaceToZeroWindow } from "@/components/race-to-zero/RaceToZeroWindow";
import { Game2048Provider } from "@/components/game2048/Game2048Context";
import { Game2048Window } from "@/components/game2048/Game2048Window";
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
        <SnakeGameProvider>
          <RaceToZeroProvider>
            <Game2048Provider>
              <ScrollPageNav />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <SnakeWindow />
              <RaceToZeroWindow />
              <Game2048Window />
            </Game2048Provider>
          </RaceToZeroProvider>
        </SnakeGameProvider>
      </body>
    </html>
  );
}
