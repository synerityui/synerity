"use client";

import React from "react";

type DemoSectionProps = {
  title: string;
  code?: string;
  children: React.ReactNode;
  col?: boolean;
  grid?: boolean;
};

export function DemoSection({ title, children, col, grid }: DemoSectionProps) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontSize: 11, fontWeight: 600, textTransform: "uppercase",
        letterSpacing: "0.08em", color: "var(--syn-text-muted)",
        fontFamily: "var(--syn-font-mono)", marginBottom: 10,
      }}>
        {title}
      </div>
      <div style={{
        display: grid ? "grid" : "flex",
        flexDirection: col ? "column" : undefined,
        flexWrap: "wrap",
        gap: 12,
        padding: 24,
        background: "var(--syn-bg-raised)",
        border: "1px solid var(--syn-border)",
        borderRadius: "var(--syn-radius-lg)",
        alignItems: col ? "flex-start" : "center",
        gridTemplateColumns: grid ? "repeat(auto-fill, minmax(180px, 1fr))" : undefined,
      }}>
        {children}
      </div>
    </div>
  );
}

export function Row({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", ...style }}>
      {children}
    </div>
  );
}

export function Col({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
      {children}
    </div>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontFamily: "var(--syn-font-mono)", color: "var(--syn-text-muted)", marginBottom: 4 }}>
      {children}
    </div>
  );
}
