import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "arxiv2product",
  description: "A report cockpit for product ideas extracted from scientific papers."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
