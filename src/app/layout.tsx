import { NavBar } from "@/components/NavBar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRUST-bench Leaderboard",
  description: "CRUST-bench Leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-DMWFXSYD87"/>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DMWFXSYD87');
          `}
        </Script>
        <link rel="icon" href="/site-logo.svg" sizes="any" />
      </head>
      <body className="{inter.className}">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
