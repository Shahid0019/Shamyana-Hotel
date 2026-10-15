import type { StaticImageData } from "next/image";

/**
 * How a photograph relates to the property. This is shown to visitors so
 * that scenery and representative food photos are never mistaken for
 * photographs of Shamyana itself.
 *  - property:       approved photograph of Shamyana (client supplied)
 *  - scenic:         the surrounding area (Dal Lake, Srinagar)
 *  - representative: a dish or object of the same kind, not Shamyana's own
 */
export type MediaKind = "property" | "scenic" | "representative";

export interface ImageCredit {
  author: string;
  license: string;
  licenseUrl?: string;
  sourceUrl: string;
  title: string;
}

export interface MediaAsset {
  id: string;
  image: StaticImageData;
  alt: string;
  kind: MediaKind;
  caption?: string;
  /** CSS object-position used for art-directed crops */
  focus?: string;
  credit?: ImageCredit;
}

export interface PhoneNumber {
  label: string;
  display: string;
  tel: string;
}

export interface ExternalListing {
  name: string;
  href: string;
  type: "hotel" | "restaurant";
}

export interface Amenity {
  id: string;
  label: string;
  icon:
    | "wifi"
    | "parking"
    | "restaurant"
    | "room-service"
    | "laundry"
    | "ac"
    | "power"
    | "reception"
    | "airport"
    | "tour";
}

export interface Room {
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  description: string[];
  /** Values set to null are unconfirmed and render as "Confirm on enquiry" */
  details: {
    area: string | null;
    bed: string | null;
    occupancy: string | null;
    view: string | null;
  };
  features: string[];
  tags: Array<"family" | "couples" | "terrace" | "lake-view">;
  /** Price is only shown when provided by the client or a live rate source */
  pricePerNight: number | null;
  images: MediaAsset[];
  source: string;
}

export type DietType = "veg" | "non-veg";

export interface MenuCategory {
  id: string;
  name: string;
  intro: string;
}

export interface MenuItem {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  /** null = not yet confirmed; shown as "Ask your server" */
  diet: DietType | null;
  /** In INR. null = not yet verified against the current menu */
  price: number | null;
  allergens?: string[];
  image?: MediaAsset;
  signature?: boolean;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  distance?: string;
  image: MediaAsset;
}

export interface FaqItem {
  question: string;
  answer: string;
}
