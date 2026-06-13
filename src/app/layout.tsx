import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Become.ing — A Journey of Reinvention",
  description:
    "A thoughtful space for reflection, creativity, reinvention, and meaningful connection. Midlife is not an ending — it is a becoming.",
  keywords:
    "midlife, personal growth, wellness, creativity, reinvention, self-discovery, women, community",
  openGraph: {
    title: "Become.ing — A Journey of Reinvention",
    description:
      "A thoughtful space for reflection, creativity, reinvention, and meaningful connection.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
