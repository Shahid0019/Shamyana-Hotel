import type { Metadata } from "next";
import { menuCategories } from "@/data/menu";
import { fullAddress, site } from "@/data/site";

export function absoluteUrl(path = "/") {
  return `${site.url}${path === "/" ? "" : path}`;
}

/** Per-page metadata with canonical URL and Open Graph defaults. */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_IN",
      type: "website",
      ...(image ? { images: [image] } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} · ${site.name}`, description },
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.countryCode,
};

/**
 * Structured data for the hotel. Deliberately omits ratings, review counts,
 * price ranges and amenity claims until they are verified.
 */
export function hotelJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": `${site.url}/#hotel`,
    name: site.hotelName,
    alternateName: site.alternateNames,
    description: site.description,
    url: absoluteUrl("/hotel"),
    image: absoluteUrl("/og-image.jpg"),
    telephone: site.phones[0].tel,
    address: postalAddress,
    checkinTime: site.hotel.checkInIso,
    checkoutTime: site.hotel.checkOutIso,
    containsPlace: { "@id": `${site.url}/#restaurant` },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}`,
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function restaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${site.url}/#restaurant`,
    name: site.restaurantName,
    alternateName: "Shamyana Lodge & Restaurant",
    url: absoluteUrl("/restaurant"),
    image: absoluteUrl("/og-image.jpg"),
    telephone: site.phones[0].tel,
    address: postalAddress,
    servesCuisine: menuCategories.map((c) => c.name),
    hasMenu: absoluteUrl("/restaurant/menu"),
    acceptsReservations: "True",
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    telephone: site.phones.map((p) => p.tel),
    address: postalAddress,
    description: `${site.description} Address: ${fullAddress}.`,
    subOrganization: [{ "@id": `${site.url}/#hotel` }, { "@id": `${site.url}/#restaurant` }],
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
