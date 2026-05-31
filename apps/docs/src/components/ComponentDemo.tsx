"use client";

import { demoRegistry } from "@/demos";

/** Renders the live interactive demo for a component slug. Returns null when no demo exists. */
export function ComponentDemo({ slug }: { slug: string }) {
  const Demo = demoRegistry[slug];
  if (!Demo) return null;
  return <Demo />;
}
