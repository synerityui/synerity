import type { Metadata } from "next";
import "@synerity/tokens/css";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: { default: "Synerity", template: "%s — Synerity" },
  description: "Headless by design. Beautiful by default. A React UI library that doesn't make you choose.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
