import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { MediaAsset } from "@/types";
import { kindLabel } from "@/data/media";
import { cn } from "@/lib/cn";
import { ChinarLeaf } from "./Ornament";

interface MediaProps {
  asset?: MediaAsset | null;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Set on the single largest above-the-fold image of a page */
  preload?: boolean;
  /** Shows a small label such as "Representative image" */
  showTag?: boolean;
  tagPosition?: "top-left" | "bottom-left" | "bottom-right";
  placeholderLabel?: string;
  /** Override the asset's focal point; pass false to control it via imgClassName */
  focus?: string | false;
}

/**
 * Fills its (relatively positioned) parent with an optimised image.
 * Renders a clearly labelled placeholder when no approved asset exists.
 */
export function Media({
  asset,
  sizes,
  className,
  imgClassName,
  preload,
  showTag = true,
  tagPosition = "bottom-left",
  placeholderLabel = "Photograph to follow",
  focus,
}: MediaProps) {
  if (!asset) {
    return <MediaPlaceholder label={placeholderLabel} className={className} />;
  }

  const tag = showTag && asset.kind !== "property" ? kindLabel[asset.kind] : null;

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={asset.image}
        alt={asset.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        preload={preload}
        className={cn("object-cover", imgClassName)}
        style={focus === false ? undefined : { objectPosition: focus ?? asset.focus ?? "50% 50%" }}
      />
      {tag && (
        <span
          className={cn(
            "pointer-events-none absolute z-[1] bg-night/55 px-2.5 py-1 text-[0.6rem] font-medium tracking-[0.12em] text-cream/90 uppercase backdrop-blur-sm",
            tagPosition === "top-left" && "top-3 left-3",
            tagPosition === "bottom-left" && "bottom-3 left-3",
            tagPosition === "bottom-right" && "right-3 bottom-3",
          )}
        >
          {tag}
        </span>
      )}
    </div>
  );
}

export function MediaPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} — placeholder, awaiting approved photography`}
      className={cn("absolute inset-0 flex flex-col items-center justify-center gap-3 bg-sand text-center", className)}
    >
      <div className="lattice-bg absolute inset-0 opacity-25" />
      <div className="absolute inset-4 border border-gold/40" />
      <ChinarLeaf className="relative size-8 text-gold-deep" />
      <div className="relative px-6">
        <p className="font-display text-2xl text-ink italic">{label}</p>
        <p className="mt-2 flex items-center justify-center gap-2 text-[0.6rem] font-semibold tracking-[0.2em] text-gold-deep uppercase">
          <ImageOff aria-hidden="true" className="size-3.5" />
          Photography coming soon
        </p>
      </div>
    </div>
  );
}
