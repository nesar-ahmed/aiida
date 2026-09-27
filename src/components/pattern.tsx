import { cn } from "cn";

export function GeometricPattern({
  className,
  id = "girih",
}: {
  className?: string;
  id?: string;
}) {
  const patternId = `aiida-${id}`;
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none text-primary/15", className)}
    >
      <defs>
        <pattern
          id={patternId}
          width="96"
          height="96"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M48 6 L62 34 L90 48 L62 62 L48 90 L34 62 L6 48 L34 34 Z" />
            <rect x="24" y="24" width="48" height="48" />
            <rect
              x="24"
              y="24"
              width="48"
              height="48"
              transform="rotate(45 48 48)"
            />
            <circle cx="48" cy="48" r="9" />
            <path d="M0 0 L14 14 M96 0 L82 14 M0 96 L14 82 M96 96 L82 82" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
