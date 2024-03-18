import "./globals.css";

import { Inter } from "next/font/google";
import Image from "next/image";

import type { Metadata } from "next";
import { GlobalContextProvider } from "./Context/store";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Assessment app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <div className="w-full px-12 py-6 flex justify-between bg-white shadow-lg fixed">
          <Link href={'/'}><Image src="/next.svg" width={100} height={200} alt="logo"></Image></Link> 
        </div>
        <div className="flex justify-center">
        <main className="pt-24 max-w-6xl">
          <GlobalContextProvider>{children}</GlobalContextProvider>
        </main>
        </div>
       
      </body>
    </html>
  );
}
