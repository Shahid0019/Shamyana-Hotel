import type { MetadataRoute } from "next";
import { rooms } from "@/data/rooms";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<[string, number]> = [
    ["/", 1],
    ["/hotel", 0.9],
    ["/rooms", 0.9],
    ["/restaurant", 0.9],
    ["/restaurant/menu", 0.8],
    ["/book-stay", 0.8],
    ["/reserve-table", 0.8],
    ["/experiences", 0.7],
    ["/gallery", 0.6],
    ["/about", 0.6],
    ["/contact", 0.7],
    ["/privacy-policy", 0.2],
    ["/terms", 0.2],
    ["/credits", 0.1],
  ];
  return [
    ...pages.map(([path, priority]) => ({ url: absoluteUrl(path), priority })),
    ...rooms.map((r) => ({ url: absoluteUrl(`/rooms/${r.slug}`), priority: 0.8 })),
  ];
}
