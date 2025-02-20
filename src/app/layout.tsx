import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@components/root/navbar";

import {config} from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import NextTopLoader from "nextjs-toploader";
import {Toaster} from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Bulakapal",
    template: "%s - Bulakapal"
  },
  description: "Bulakapal e-commerce",
};

config.autoAddCss = false

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <NextTopLoader color="#000000" zIndex={2000} showSpinner={false} />
      <Navbar/>
      <Toaster toastOptions={{
        duration: 3000,
      }}/>
      <main className="mt-32 p-2 max-w-[1280px] mx-auto mb-16">
        {children}
      </main>
    </body>
    </html>
  );
}
