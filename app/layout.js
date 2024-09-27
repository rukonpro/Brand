import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Navbar from "@/app/components/navbar/navbar";
import { Analytics } from '@vercel/analytics/react';
import Footer from "@/app/components/Footer/Footer";
import {AppProvider} from "@/app/context/BrandContext";
import ClientSessionProvider from "@/app/context/ClientSessionProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brand - Your Ultimate Online Shopping Destination",
  description: "Discover a wide range of high-quality products at Brand. From fashion to electronics, enjoy seamless shopping with fast delivery, secure payments, and unbeatable prices. Shop the latest trends and essentials now!",
};



export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 dark:bg-slate-900 dark:text-slate-50`}>
      <main className="relative">
          <ClientSessionProvider>
          <AppProvider>
          <div className="sticky top-0 z-[20]">
            <Navbar />
          </div>
          {children}
          <Footer />
          <Toaster />
          <Analytics />
          </AppProvider>
          </ClientSessionProvider>
        </main>
      </body>
    </html>
  );
}
