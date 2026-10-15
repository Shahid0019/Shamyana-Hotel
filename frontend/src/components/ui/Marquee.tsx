import { cn } from "@/lib/cn";

/** Slow decorative text band. Hidden from assistive tech (purely ornamental). */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-[clamp(1.75rem,1.2rem+2.4vw,3.5rem)] whitespace-nowrap italic sm:px-10">
            {item}
          </span>
          <span className="size-2 rotate-45 border border-current opacity-60" />
        </span>
      ))}
    </div>
  );
  return (
    <div aria-hidden="true" className={cn("overflow-hidden py-6", className)}>
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
