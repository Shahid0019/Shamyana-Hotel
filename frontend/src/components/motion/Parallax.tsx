"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Light depth effect: the inner layer drifts slower than the page. The inner
 * layer is oversized vertically so no gap appears at either end.
 */
export function Parallax({
  children,
  className,
  amount = 12,
}: {
  children: ReactNode;
  className?: string;
  /** Total travel as a percentage of the container height */
  amount?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: outer.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: outer },
  );

  return (
    <div ref={outer} className={cn("absolute inset-0 overflow-hidden", className)}>
      <div ref={inner} className="absolute inset-x-0 will-change-transform" style={{ top: `-${amount}%`, bottom: `-${amount}%` }}>
        {children}
      </div>
    </div>
  );
}
