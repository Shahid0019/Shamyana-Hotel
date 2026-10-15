import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import type { MediaAsset } from "@/types";
import { site } from "@/data/site";
import { Media } from "@/components/ui/Media";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ChinarLeaf } from "@/components/ui/Ornament";

/** Split layout for booking-style pages: cinematic info panel + form. */
export function EnquiryLayout({
  crumbs,
  eyebrow,
  title,
  accent,
  intro,
  image,
  facts,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  image: MediaAsset;
  facts: Array<{ label: string; value: string }>;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <aside className="on-dark relative isolate flex flex-col justify-end overflow-hidden bg-night text-cream lg:sticky lg:top-0 lg:h-svh">
        <Media asset={image} sizes="(min-width: 1024px) 42vw, 100vw" preload tagPosition="top-left" className="-z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/70 to-night/30" />
        <div className="px-(--gutter) pt-32 pb-10 lg:px-12 lg:pb-14">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-10 text-gold-light">{eyebrow}</p>
          <h1 className="mt-4 text-display-2 text-cream">
            {title}
            <span className="block italic-accent text-gold-light">{accent}</span>
          </h1>
          <p className="mt-6 max-w-md text-cream/80">{intro}</p>
          <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-cream/15 pt-6">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow text-gold-light">{f.label}</dt>
                <dd className="mt-1.5 font-display text-xl text-cream">{f.value}</dd>
              </div>
            ))}
          </dl>
          <a href={`tel:${site.phones[0].tel}`} className="mt-8 inline-flex min-h-11 items-center gap-3 text-sm text-cream/85 hover:text-cream">
            <Phone aria-hidden="true" className="size-4 text-gold-light" />
            Prefer to talk? {site.phones[0].display}
          </a>
        </div>
      </aside>

      <section className="relative bg-cream px-(--gutter) py-16 lg:px-16 lg:pt-36 lg:pb-24 xl:px-24">
        <ChinarLeaf className="absolute top-28 right-(--gutter) hidden size-16 text-gold/30 lg:block" />
        <div className="mx-auto max-w-2xl">{children}</div>
      </section>
    </div>
  );
}
