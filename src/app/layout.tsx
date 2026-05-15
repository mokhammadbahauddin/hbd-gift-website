import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Penjaga Hati",
  description: "Kenangan dan Ucapan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
