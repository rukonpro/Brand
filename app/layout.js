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
   <head>
        {/* Set the address bar theme color */}
        <meta name="theme-color" content="#ff6600" />
      </head>
      <body className={`${inter.className} bg-gray-100 dark:bg-slate-900 dark:text-slate-50`}>
      <main className="relative">
          <ClientSessionProvider>
          <AppProvider>

          {children}

          <Toaster />
          <Analytics />
          </AppProvider>
          </ClientSessionProvider>
        </main>
      </body>
    </html>
  );
}
