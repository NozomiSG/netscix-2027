import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HashScroller from "@/components/HashScroller";

export const metadata: Metadata = {
  title: "NetSciX 2027 — International School and Conference on Network Science",
  description:
    "NetSciX 2027 — International School and Conference on Network Science. Feb 2027, Hong Kong SAR.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Header />
        <HashScroller />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
