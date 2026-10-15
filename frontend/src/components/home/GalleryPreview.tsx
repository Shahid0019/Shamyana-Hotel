import { homeGallery } from "@/data/gallery";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/Button";

export function GalleryPreview({ index = "09" }: { index?: string }) {
  return (
    <section aria-labelledby="gallery-title" className="section-y bg-cream">
      <div className="container-x">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow index={index}>Gallery</Eyebrow>
            <h2 id="gallery-title" className="mt-6 text-display-3">
              Moments by
              <span className="italic-accent text-gold-deep"> the lake.</span>
            </h2>
          </div>
          <TextLink href="/gallery">Open the gallery</TextLink>
        </div>
        <GalleryGrid items={homeGallery} />
      </div>
    </section>
  );
}
