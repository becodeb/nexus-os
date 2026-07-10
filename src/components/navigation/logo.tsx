export function NexusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="9" fill="#3B82F6" />
      <path
        d="M9 22V10.5L21 22V10.5"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
