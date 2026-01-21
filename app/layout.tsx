import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wnaderly",
  description: "Find Your Next Destination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background ">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
