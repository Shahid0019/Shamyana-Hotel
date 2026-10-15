export interface NavLink {
  href: string;
  label: string;
}

export const mainNav: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/hotel", label: "Our Hotel" },
  { href: "/rooms", label: "Rooms" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/gallery", label: "Gallery" },
  { href: "/experiences", label: "Experiences" },
  { href: "/contact", label: "Contact" },
];

export const footerExplore: NavLink[] = [
  { href: "/about", label: "About Shamyana" },
  { href: "/hotel", label: "Our Hotel" },
  { href: "/rooms", label: "Rooms" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/restaurant/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/experiences", label: "Experiences" },
];

export const footerPlan: NavLink[] = [
  { href: "/book-stay", label: "Request a Booking" },
  { href: "/reserve-table", label: "Reserve a Table" },
  { href: "/contact", label: "Contact & Directions" },
];

export const footerLegal: NavLink[] = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/credits", label: "Image Credits" },
];
