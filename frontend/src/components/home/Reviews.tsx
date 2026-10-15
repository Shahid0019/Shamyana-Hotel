import { ArrowUpRight } from "lucide-react";
import { listings } from "@/data/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OrnamentDivider } from "@/components/ui/Ornament";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Guest reviews. No testimonials are reproduced here until the property has
 * permission to publish specific, attributed reviews. Visitors are linked to
 * the independent platforms instead, and no scores are hard-coded.
 */
export function Reviews({ index = "08" }: { index?: string }) {
  const groups = [
    { title: "Stay reviews", items: listings.filter((l) => l.type === "hotel") },
    { title: "Dining reviews", items: listings.filter((l) => l.type === "restaurant") },
  ];

  return (
    <section aria-labelledby="reviews-title" className="section-y relative overflow-hidden bg-sand">
      <div className="container-x">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div data-reveal>
            <Eyebrow index={index} center>
              Guest reviews
            </Eyebrow>
          </div>
          <h2 id="reviews-title" data-reveal className="mt-6 text-display-3">
            In our guests&apos;
            <span className="italic-accent text-gold-deep"> own words.</span>
          </h2>
          <div data-reveal>
            <OrnamentDivider className="mt-8 justify-center" />
          </div>
          <p data-reveal className="mt-8 text-ink-soft">
            Read independent reviews from guests who have stayed and dined with us on the platforms below — and if
            you visit, we&apos;d be grateful if you shared your experience too.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2 md:gap-16">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="eyebrow font-sans text-gold-deep">{g.title}</h3>
              <ul className="mt-4 border-t border-line">
                {g.items.map((l) => (
                  <li key={l.href} className="border-b border-line">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex min-h-16 items-center justify-between gap-4 py-4"
                    >
                      <span className="font-display text-2xl text-ink transition-colors group-hover:text-gold-deep md:text-3xl">
                        {l.name}
                      </span>
                      <span className="flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.2em] text-ink-soft uppercase">
                        Read reviews
                        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      <span className="sr-only">on {l.name} (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
