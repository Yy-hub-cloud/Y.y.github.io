import type { Metadata } from "next";
import type { ReactNode } from "react";
import { COVER_SEEN_KEY } from "./cover-session";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yang Yu | Academic Homepage",
  description:
    "Academic homepage for Yang Yu, featuring research on predictably formed three-dimensional buckling structures, flexible electronics, and bioelectronic interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const normalizedBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");
  const coverSessionScript = `try{var path=window.location.pathname.replace(/\\/+$/,"");if(path!==${JSON.stringify(normalizedBasePath)}){window.sessionStorage.setItem(${JSON.stringify(COVER_SEEN_KEY)},"true");}}catch(e){}`;

  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: coverSessionScript }} />
        {children}
      </body>
    </html>
  );
}
