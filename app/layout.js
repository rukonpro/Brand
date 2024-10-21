import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
import { AppProvider } from "@/app/context/BrandContext";
import ClientSessionProvider from "@/app/context/ClientSessionProvider";
import { CartProvider } from "./context/CartContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Set the address bar theme color */}
        <meta name="theme-color" content="#dbeafe" />
      </head>
      <body className={`${inter.className} bg-gray-100 dark:bg-slate-900 dark:text-slate-50`}>
        <main className="relative">
          <ClientSessionProvider>
            <CartProvider>
              <AppProvider>

                {children}

                <Toaster />
                <Analytics />
              </AppProvider>
            </CartProvider>
          </ClientSessionProvider>
        </main>
      </body>
    </html>
  );
}
