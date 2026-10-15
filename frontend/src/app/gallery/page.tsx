import Link from "next/link";
import { media } from "@/data/media";
import { galleryItems } from "@/data/gallery";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Photographs of Dal Lake, Boulevard Road, Kashmiri cuisine and the surroundings of Shamyana Hotel & Restaurant in Srinagar.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments"
        accent="by the lake."
        intro="Our rooms, our dining rooms and the lakeside city around us."
        image={media.houseboats}
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
        size="md"
      />
      <section className="bg-cream py-20 md:py-28" aria-label="Photo gallery">
        <div className="container-x">
          <GalleryGrid items={galleryItems} filterable />
          <p className="mt-10 text-center text-xs leading-relaxed text-ink-soft">
            Hotel, room and restaurant photographs are Shamyana&apos;s own. Scenic and food photographs are openly licensed images used with attribution — see{" "}
            <Link href="/credits" className="underline underline-offset-2">
              image credits
            </Link>
            . Food photographs show dishes of the same kind we serve, not Shamyana&apos;s own plating.
          </p>
        </div>
      </section>
    </>
  );
}
