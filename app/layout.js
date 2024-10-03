import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Navbar from "@/app/components/navbar/navbar";
import { Analytics } from '@vercel/analytics/react';
import Footer from "@/app/components/Footer/Footer";
import {AppProvider} from "@/app/context/BrandContext";
import ClientSessionProvider from "@/app/context/ClientSessionProvider";
const inter = Inter({ subsets: ["latin"] });

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
