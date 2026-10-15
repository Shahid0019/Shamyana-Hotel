import { Plus } from "lucide-react";
import type { FaqItem } from "@/types";

/** Native <details> accordion — accessible and works without JavaScript. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-xl text-ink md:text-2xl [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus
              aria-hidden="true"
              className="size-5 shrink-0 text-gold-deep transition-transform duration-500 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-3xl pb-6 text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
