import type { Metadata } from "next";
import { Inter, Actor } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Multi modal pdf",
  description: "Created by Piyushkumar Dubey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
