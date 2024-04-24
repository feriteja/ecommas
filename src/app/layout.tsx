import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "@/store/StoreProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Ecommas",
  description: "Toko ecom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={cn(
            "bg-background min-h-screen font-sans antialiased",
            inter.variable
          )}
        >
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
