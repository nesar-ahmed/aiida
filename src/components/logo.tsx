import { cn } from "cn";

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden
      className={cn("size-9", className)}
      fill="none"
    >
      <defs>
        <linearGradient id="aiida-logo-g" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0" stopColor="var(--primary)" />
          <stop offset="1" stopColor="var(--gold)" />
        </linearGradient>
      </defs>
      <path
        d="M6 34V21a14 14 0 0 1 28 0v13"
        stroke="url(#aiida-logo-g)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M20 8.5a5.5 5.5 0 1 0 4.6 8.4 4.4 4.4 0 0 1-2.6-8 5.5 5.5 0 0 0-2-0.4Z"
        fill="var(--gold)"
      />
      <path
        d="M20 14.5V18m0 0a5 5 0 0 0 5 5v11"
        stroke="var(--primary)"
        strokeWidth="0"
      />
      <path d="M2 34h36" stroke="url(#aiida-logo-g)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="20" cy="4.5" r="1.6" fill="var(--primary)" />
      <path
        d="M12.5 34V24a7.5 7.5 0 0 1 15 0v10"
        stroke="var(--primary)"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
