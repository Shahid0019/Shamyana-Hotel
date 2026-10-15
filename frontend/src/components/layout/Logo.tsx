import Link from "next/link";
import { cn } from "@/lib/cn";

/** Shamyana crest: a Kashmiri arch framing a chinar leaf, with the wordmark. */
export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" fill="none" aria-hidden="true" className={cn("h-12 w-auto", className)}>
      <path d="M6 70V30C6 15 18 4 32 2c14 2 26 13 26 28v40" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11 70V31C11 19 20 10 32 8c12 2 21 11 21 23v39" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
      <path
        d="M32 18l1.9 5.7 4.4-2.4-1 5.4 6.2-.9-2.9 4.7 4.9 2.4-5.8 1.6 1.3 4.4-6.7-2.2-.9 8.2h-2.6l-.9-8.2-6.7 2.2 1.3-4.4-5.8-1.6 4.9-2.4-2.9-4.7 6.2.9-1-5.4 4.4 2.4Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M32 22v24" stroke="currentColor" strokeWidth="0.7" />
      <path d="M14 56h36" stroke="currentColor" strokeWidth="0.7" />
      <text x="32" y="64" textAnchor="middle" fill="currentColor" fontSize="5.2" letterSpacing="1.4" fontFamily="var(--font-cormorant), serif">
        SHAMYANA
      </text>
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Shamyana Hotel & Restaurant — home"
      className={cn(
        "inline-flex items-center justify-center transition-colors duration-500",
        tone === "light" ? "text-cream" : "text-ink",
        className,
      )}
    >
      <Crest className="h-12 sm:h-14" />
    </Link>
  );
}
