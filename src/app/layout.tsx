import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import SessionProvider from "./SessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/IRANSansX-Medium.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "مکش مارکت",
  description: "سلامتی اینجاست چون تو ما را انتخاب کرده ای",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          <main className="p-4 max-w-7xl mx-auto min-w-[300px]">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
