import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { OrnamentDivider } from "@/components/ui/Ornament";
import { MenuBrowser } from "@/components/restaurant/MenuBrowser";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menu — Kashmiri Wazwan & Multi-cuisine",
  description:
    "The Shamyana Restaurant menu: Kashmiri Wazwan such as Rista, Tabak Maaz and Nadru Yakhni, barbecue and tandoori, biryanis, Chinese-style dishes and more. Boulevard Road, Srinagar.",
  path: "/restaurant/menu",
});

export default function MenuPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-sand pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="lattice-bg pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="container-x relative">
          <Breadcrumbs
            tone="dark"
            items={[
              { name: "Restaurant", path: "/restaurant" },
              { name: "Menu", path: "/restaurant/menu" },
            ]}
          />
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <Eyebrow>Shamyana Restaurant</Eyebrow>
              <h1 className="mt-5 text-display-1">
                The Menu
                <span className="block italic-accent text-gold-deep">from Wazwan to wok.</span>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <OrnamentDivider />
              <p className="mt-6 text-ink-soft">Browse by category, search for a dish, or filter vegetarian options.</p>
              <ButtonLink href="/reserve-table" className="mt-6">
                Reserve a Table
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-24" aria-label="Menu">
        <div className="container-x pt-12">
          <MenuBrowser />
        </div>
      </section>
    </>
  );
}
