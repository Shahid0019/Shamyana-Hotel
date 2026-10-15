"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  /** Animate direct `[data-reveal]` descendants in sequence */
  stagger?: number;
  y?: number;
  delay?: number;
  /** "fade" moves content up; "mask" wipes images open from the bottom */
  variant?: "fade" | "mask";
  /** Start immediately instead of when scrolled into view (above the fold) */
  immediate?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, "children" | "className">;

/**
 * Scroll-triggered reveal. Children marked with `data-reveal` are hidden by
 * CSS only while JS is active and motion is allowed (see globals.css), so the
 * page is fully readable without JavaScript or with reduced motion.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  stagger = 0.12,
  y = 28,
  delay = 0,
  variant = "fade",
  immediate = false,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
      if (root.hasAttribute("data-reveal") && !root.hasAttribute("data-revealed")) targets.unshift(root);
      if (!targets.length) return;

      const markDone = () => targets.forEach((t) => t.setAttribute("data-revealed", ""));

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => markDone());
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const fromVars: gsap.TweenVars =
          variant === "mask"
            ? { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 }
            : { y, opacity: 0 };
        const toVars: gsap.TweenVars =
          variant === "mask"
            ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.3, ease: "expo.inOut" }
            : { y: 0, opacity: 1, duration: 1.1, ease: "power3.out" };

        gsap.set(targets, { ...fromVars, animation: "none" });
        gsap.to(targets, {
          ...toVars,
          delay,
          stagger,
          clearProps: "transform,clipPath",
          onComplete: markDone,
          scrollTrigger: immediate
            ? undefined
            : { trigger: root, start: "top 85%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <Tag ref={scope} className={className} {...rest}>
      {children}
    </Tag>
  );
}
