import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  index,
  tone = "dark",
  className,
  center,
}: {
  children: ReactNode;
  index?: string;
  tone?: "dark" | "light";
  className?: string;
  center?: boolean;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "dark" ? "text-gold-deep" : "text-gold-light",
        center && "justify-center",
        className,
      )}
    >
      {index && (
        <>
          <span className="tabular-nums">{index}</span>
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}
