import { cn } from "@/lib/cn";

/** Abstract chinar leaf — the emblem of Kashmir — drawn as a fine line. */
export function ChinarLeaf({ className, strokeWidth = 1 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={cn("size-6", className)}>
      <path
        d="M24 3.5 26.9 12.2 33.6 8.6 32 16.8 41.5 15.4 37 22.6 44.5 26.2 35.6 28.6 37.6 35.4 27.4 32 26 44.5H22L20.6 32 10.4 35.4 12.4 28.6 3.5 26.2 11 22.6 6.5 15.4 16 16.8 14.4 8.6 21.1 12.2Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d="M24 9v35.5M24 22l-7.5-6.5M24 22l7.5-6.5M24 29l-9.5-1M24 29l9.5-1"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.7}
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Fine ornamental divider — line, lattice diamond, line. */
export function OrnamentDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 text-gold", className)} aria-hidden="true">
      <span className="h-px w-10 bg-current opacity-60 sm:w-16" />
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
        <path d="M12 1 23 12 12 23 1 12Z" stroke="currentColor" strokeWidth="1.2" />
        <path d="M12 7 17 12 12 17 7 12Z" fill="currentColor" opacity="0.6" />
      </svg>
      <span className="h-px w-10 bg-current opacity-60 sm:w-16" />
    </div>
  );
}

/** Corner fragment inspired by khatamband lattice ceilings. */
export function LatticeCorner({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={cn("size-28 text-gold", className)}>
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.55">
        <path d="M0 60 60 0M0 120 120 0M60 120 120 60" />
        <path d="M0 30 30 0M30 120 120 30M90 120 120 90" opacity="0.6" />
        <path d="M60 0v120M0 60h120" opacity="0.35" />
        <rect x="45" y="45" width="30" height="30" transform="rotate(45 60 60)" />
        <rect x="52" y="52" width="16" height="16" transform="rotate(45 60 60)" />
        <circle cx="60" cy="60" r="2.2" fill="currentColor" />
      </g>
    </svg>
  );
}
