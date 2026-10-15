import type { Amenity, ExternalListing, PhoneNumber } from "@/types";

/**
 * ---------------------------------------------------------------------------
 * CENTRAL BUSINESS CONFIGURATION
 * ---------------------------------------------------------------------------
 * Every factual detail shown on the website comes from this file.
 *
 * Values marked `null` are NOT yet confirmed by the client and are hidden or
 * shown as "please confirm" on the site. Fill them in only with information
 * the property has confirmed — never with guesses.
 * ---------------------------------------------------------------------------
 */

export const site = {
  name: "Shamyana Hotel & Restaurant",
  shortName: "Shamyana",
  hotelName: "Hotel Shamyana – Dal View",
  restaurantName: "Shamyana Restaurant",
  alternateNames: [
    "Hotel Shamyana – Dal View",
    "Shamyana Lodge & Restaurant",
    "Shamyana Restaurant",
  ],

  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.yourdomain.com) */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  description:
    "Hotel Shamyana – Dal View and Shamyana Restaurant on Boulevard Road, Srinagar: comfortable rooms a short walk from Dal Lake and a restaurant serving Kashmiri Wazwan and multi-cuisine dishes.",

  address: {
    street: "Ghat No. 2, Boulevard Road, Dalgate",
    locality: "Srinagar",
    region: "Jammu & Kashmir",
    regionCode: "JK",
    postalCode: "190001",
    country: "India",
    countryCode: "IN",
  },

  /** Used for the map embed and the directions link */
  mapQuery: "Shamyana Hotel & Restaurant, Boulevard Road, Ghat No. 2, Dalgate, Srinagar 190001",

  phones: [
    { label: "Reception & Restaurant", display: "+91 194 250 1629", tel: "+911942501629" },
    { label: "Additional line", display: "+91 194 250 0632", tel: "+911942500632" },
  ] satisfies PhoneNumber[],

  /** TODO(client): confirm an official email address */
  email: null as string | null,

  /** TODO(client): confirm a WhatsApp business number */
  whatsapp: null as string | null,

  /** Hotel facts listed on travel booking platforms */
  hotel: {
    classification: "3-star hotel, as listed on travel booking platforms",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    checkInIso: "14:00",
    checkOutIso: "12:00",
    lakeWalk: "About a 3-minute walk to Dal Lake (as listed on MakeMyTrip)",
  },

  restaurant: {
    cuisines: [
      "Kashmiri Wazwan",
      "Indian & Mughlai",
      "Barbecue & Tandoori",
      "Chinese-style",
      "Biryani & Rice",
      "Vegetarian",
      "Desserts & Beverages",
    ],
    services: ["Indoor & outdoor seating", "Takeaway", "Table reservations"],
    /**
     * TODO(client): Opening hours differ across listing platforms.
     * Replace null with confirmed hours, e.g. [{ days: "Daily", hours: "8:00 AM – 11:00 PM" }]
     */
    hours: null as Array<{ days: string; hours: string }> | null,
  },

  /**
   * Official social accounts. Leave empty until each account is confirmed as
   * belonging to the property.
   */
  social: [] as Array<{ name: string; href: string }>,

  /** The year the business was founded — TODO(client): confirm before using */
  foundedYear: null as number | null,
} as const;

/**
 * Amenities shown on third-party travel listings. These are presented with a
 * "please confirm" note until the client verifies each one.
 */
export const amenitiesConfirmed = false;

export const amenities: Amenity[] = [
  { id: "wifi", label: "Wi-Fi", icon: "wifi" },
  { id: "parking", label: "Parking", icon: "parking" },
  { id: "restaurant", label: "On-site restaurant", icon: "restaurant" },
  { id: "room-service", label: "Room service", icon: "room-service" },
  { id: "laundry", label: "Laundry service", icon: "laundry" },
  { id: "ac", label: "Hot + cold air conditioning", icon: "ac" },
  { id: "power", label: "Power backup", icon: "power" },
  { id: "reception", label: "24-hour reception", icon: "reception" },
  { id: "airport", label: "Airport transfer", icon: "airport" },
  { id: "tour", label: "Tour assistance", icon: "tour" },
];

/** Third-party listings where guests can read and leave reviews */
export const listings: ExternalListing[] = [
  {
    name: "Tripadvisor",
    type: "restaurant",
    href: "https://www.tripadvisor.com/Restaurant_Review-g297623-d1202056-Reviews-Shamyana_Restaurant-Srinagar_Srinagar_District_Kashmir_Jammu_and_Kashmir.html",
  },
  {
    name: "Zomato",
    type: "restaurant",
    href: "https://www.zomato.com/srinagar/shamyana-lodge-restaurant-dal-gate",
  },
  {
    name: "Swiggy",
    type: "restaurant",
    href: "https://www.swiggy.com/city/srinagar/shamyana-restaurant-rajbagh-boulevard-rest698316",
  },
  {
    name: "MakeMyTrip",
    type: "hotel",
    href: "https://www.makemytrip.com/hotels/hotel_shamyana_dal_view-details-srinagar.html",
  },
  {
    name: "Goibibo",
    type: "hotel",
    href: "https://www.goibibo.com/hotels/shamyana-dal-view-hotel-in-srinagar-976809954152464558/",
  },
  {
    name: "Agoda",
    type: "hotel",
    href: "https://www.agoda.com/shamyana-hotel/hotel/srinagar-in.html",
  },
];

export const fullAddress = `${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postalCode}, ${site.address.country}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapQuery)}`;

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`;

export const primaryPhone = site.phones[0];
