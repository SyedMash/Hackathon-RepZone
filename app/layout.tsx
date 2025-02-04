import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Smooth from "@/components/experience/Smooth";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import ShoppingCartProvider from "@/provider/schopping-cart-provider";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "ARC Official",
  description:
    "Arc is your go-to destination for high-quality gym gear, fitness apparel, and workout essentials. Elevate your training with top-tier equipment designed for performance and style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Smooth>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider>
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
              <ShoppingCartProvider>
                {children}
                <Toaster />
              </ShoppingCartProvider>
            </ClerkProvider>
          </ThemeProvider>
        </Smooth>
      </body>
    </html>
  );
}
