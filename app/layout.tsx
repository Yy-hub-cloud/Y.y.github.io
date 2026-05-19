import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yang Yu | Academic Homepage",
  description:
    "Academic homepage for Yang Yu, a PhD student working on flexible electronics, bioelectronic interfaces, MEMS, and stretchable devices.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
