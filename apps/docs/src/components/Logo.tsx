export function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="12" cy="12" r="6" fill="var(--syn-primary)" />
      <circle cx="28" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="28" r="6" fill="currentColor" />
      <line x1="12" y1="12" x2="28" y2="12" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
