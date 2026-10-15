import type { Room } from "@/types";
import { media } from "./media";

/**
 * Room categories as they appear on travel booking listings.
 *
 * - `images` are property photographs supplied by Shamyana. Photos were
 *   matched to categories by appearance — confirm the mapping with the hotel.
 * - Any `details` value left as null renders as "Confirm on enquiry".
 * - `pricePerNight` stays null until the client provides rates or a live
 *   rate source is integrated. Never hard-code OTA prices here.
 *
 * Structured so this array can later be replaced by a PMS / booking-engine
 * API response with the same shape.
 */
export const rooms: Room[] = [
  {
    slug: "standard-room",
    name: "Standard Room",
    shortName: "Standard Room",
    summary:
      "A comfortable, practical room for travellers who plan to spend their days out exploring Srinagar and Dal Lake.",
    description: [
      "The Standard Room is a simple, well-kept base for your stay on Boulevard Road, a short walk from the shikara ghats.",
      "Bed configuration, room size and occupancy are confirmed when you enquire — use the booking form to ask about anything specific.",
    ],
    details: { area: null, bed: null, occupancy: null, view: null },
    features: ["Room service (on request)"],
    tags: ["couples"],
    pricePerNight: null,
    images: [media.woodRoomArch, media.woodRoomArch2, media.woodRoomNight],
    source: "Room category confirmed by the property; details to be confirmed on enquiry.",
  },
  {
    slug: "deluxe-room",
    name: "Deluxe Room (Hot + Cold AC)",
    shortName: "Deluxe Room",
    summary:
      "A comfortable room with a king-size bed and year-round climate control, ideal for couples and solo travellers exploring Srinagar.",
    description: [
      "The Deluxe Room is a practical, comfortable base for days spent around Dal Lake and the old city. Hot and cold air conditioning keeps the room comfortable through Kashmir's warm summers and cold winters alike.",
      "Travel listings describe the room as approximately 210 sq ft with a king-size bed. Please confirm the exact configuration and view of your room when you enquire.",
    ],
    details: {
      area: "Approx. 210 sq ft",
      bed: "King-size bed",
      occupancy: null,
      view: null,
    },
    features: ["Hot + cold air conditioning", "King-size bed", "Room service (on request)"],
    tags: ["couples"],
    pricePerNight: null,
    images: [media.greenRoomHeadboard, media.greenRoom1, media.greenHeadboardDetail],
    source: "Room type and size as listed on travel booking platforms (MakeMyTrip / Goibibo).",
  },
  {
    slug: "super-deluxe-room",
    name: "Super Deluxe Room",
    shortName: "Super Deluxe Room",
    summary: "An upgraded room with more space and comfort, for guests who want a little extra during their stay.",
    description: [
      "The Super Deluxe Room builds on the Deluxe category with added comfort — a relaxing retreat after a day on the lake or in the old city.",
      "Exact size, bedding, occupancy and view are confirmed when you enquire. Tell us what matters to you in the booking form.",
    ],
    details: { area: null, bed: null, occupancy: null, view: null },
    features: ["Upgraded room", "Room service (on request)"],
    tags: ["couples"],
    pricePerNight: null,
    images: [media.greenRoom2, media.greenRoomCeiling, media.greenRoomSofa2],
    source: "Room category confirmed by the property; details to be confirmed on enquiry.",
  },
  {
    slug: "lake-view-room",
    name: "Lake View Room",
    shortName: "Lake View Room",
    summary: "A room facing towards Dal Lake — wake up to the light on the water and the hills beyond.",
    description: [
      "The Lake View Room looks out towards Dal Lake, the heart of Srinagar. Mornings bring mist over the water; evenings bring the glow of the Boulevard.",
      "Views can vary from room to room. Bedding, size and occupancy are confirmed when you enquire through the booking form.",
    ],
    details: { area: null, bed: null, occupancy: null, view: "Towards Dal Lake" },
    features: ["Lake-facing", "Room service (on request)"],
    tags: ["couples", "lake-view"],
    pricePerNight: null,
    images: [media.woodRoomWindow, media.woodRoom2, media.woodRoom3],
    source: "Room category confirmed by the property; details to be confirmed on enquiry.",
  },
  {
    slug: "family-room-with-terrace",
    name: "Family Room with Terrace (Hot + Cold AC)",
    shortName: "Family Room with Terrace",
    summary:
      "A family room with access to a terrace and hot and cold air conditioning — room to unwind together after a day in the city.",
    description: [
      "Designed for families and small groups travelling together, the Family Room includes a terrace and hot and cold air conditioning for comfort in every season.",
      "Bed configuration, room size and maximum occupancy vary — share your group size when you enquire and the reception team will advise on the best arrangement.",
    ],
    details: {
      area: null,
      bed: null,
      occupancy: null,
      view: null,
    },
    features: ["Terrace", "Hot + cold air conditioning", "Suitable for families"],
    tags: ["family", "terrace"],
    pricePerNight: null,
    images: [media.woodRoomSofa, media.woodRoom3, media.woodRoom2],
    source: "Room type as listed on travel booking platforms.",
  },
  {
    slug: "suite",
    name: "Suite",
    shortName: "Suite",
    summary: "Our most spacious accommodation, with room to relax — ideal for longer stays and special occasions.",
    description: [
      "The Suite offers the most space at Shamyana, with room to unwind together after a day exploring Srinagar.",
      "Layout, bedding, size, occupancy and view are confirmed when you enquire. Share your plans in the booking form and our team will advise.",
    ],
    details: { area: null, bed: null, occupancy: null, view: null },
    features: ["Most spacious category", "Room service (on request)"],
    tags: ["family", "couples"],
    pricePerNight: null,
    images: [media.suiteOpenPlan1, media.suiteOpenPlan2, media.greenRoomLarge, media.greenRoomSofa],
    source: "Room category confirmed by the property; details to be confirmed on enquiry.",
  },
];

export function getRoom(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}

export const roomFilters = [
  { id: "all", label: "All rooms" },
  { id: "couples", label: "Couples" },
  { id: "family", label: "Families" },
  { id: "lake-view", label: "Lake view" },
  { id: "terrace", label: "With terrace" },
] as const;

export type RoomFilterId = (typeof roomFilters)[number]["id"];
