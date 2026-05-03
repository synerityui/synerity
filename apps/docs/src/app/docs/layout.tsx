import type { Metadata } from "next";
import { DocsSidebar } from "@/components/DocsSidebar";

export const metadata: Metadata = { title: "Docs" };

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
      <DocsSidebar />
      <main style={{ flex: 1, minWidth: 0, padding: "48px 56px", maxWidth: 880 }}>
        {children}
      </main>
    </div>
  );
}
