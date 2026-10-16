import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
