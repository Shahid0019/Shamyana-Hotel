import type { Experience, FaqItem } from "@/types";
import { media } from "./media";

/**
 * Nearby experiences. These are attractions and activities around Srinagar,
 * not services owned or operated by Shamyana. Booking help, transfers and
 * guided activities are subject to availability and confirmation.
 */
export const experiences: Experience[] = [
  {
    id: "shikara",
    title: "A shikara on Dal Lake",
    description:
      "Glide past houseboats, lotus beds and floating gardens aboard Srinagar's iconic hand-built boats. Shikara ghats line Boulevard Road.",
    distance: "Ghats along Boulevard Road",
    image: media.shikarasBoulevard,
  },
  {
    id: "boulevard",
    title: "Walks along the Boulevard",
    description:
      "Boulevard Road traces the eastern shore of Dal Lake — an unhurried promenade at sunrise, and a lively one at dusk.",
    distance: "On your doorstep",
    image: media.dalLakeDusk,
  },
  {
    id: "mughal-gardens",
    title: "The Mughal Gardens",
    description:
      "Terraced gardens laid out by the Mughal emperors — Nishat Bagh, Shalimar Bagh and Chashme Shahi — rise from the shores of the lake.",
    distance: "A short drive along the lake",
    image: media.shalimarBagh,
  },
  {
    id: "pari-mahal",
    title: "Pari Mahal",
    description:
      "A seven-terraced garden on the Zabarwan slopes with sweeping views over Dal Lake and the city below.",
    distance: "Above Chashme Shahi",
    image: media.pariMahal,
  },
  {
    id: "markets",
    title: "Srinagar's markets",
    description:
      "From the lakeside stalls of Dal to the old bazaars of the city, discover saffron, dry fruit, shawls and spices.",
    distance: "Around the city",
    image: media.floatingMarket,
  },
  {
    id: "craft",
    title: "Kashmiri craftsmanship",
    description:
      "Papier-mâché, walnut-wood carving, khatamband ceilings and fine pashmina — crafts handed down through generations of Kashmiri artisans.",
    distance: "Workshops across Srinagar",
    image: media.papierMache,
  },
  {
    id: "autumn",
    title: "Chinar season",
    description:
      "In autumn the great chinar trees of Srinagar turn amber and crimson — one of the most photographed seasons in Kashmir.",
    distance: "October – November",
    image: media.chinarBagh,
  },
  {
    id: "culinary",
    title: "A taste of Wazwan",
    description:
      "Return to Shamyana for the flavours of Kashmir — Rista, Tabak Maaz and Nadru Yakhni, served at our own restaurant.",
    distance: "At Shamyana Restaurant",
    image: media.wazwanSpread,
  },
];

export const experiencesNote =
  "Experiences listed are independent attractions around Srinagar. Our reception team is happy to help with suggestions; booking assistance, transfers and guided activities are subject to availability and confirmation.";

export const hotelFaqs: FaqItem[] = [
  {
    question: "What are the check-in and check-out times?",
    answer: "Check-in is from 2:00 PM and check-out is by 12:00 PM. Early check-in or late check-out may be possible on request, subject to availability.",
  },
  {
    question: "How far is the hotel from Dal Lake?",
    answer: "Shamyana is on Boulevard Road at Ghat No. 2, Dalgate. Travel listings describe Dal Lake as about a 3-minute walk away.",
  },
  {
    question: "Do all rooms have a view of Dal Lake?",
    answer: "Not necessarily. Views differ from room to room. If a view matters to you, mention it in your enquiry and the reception team will advise on what is available.",
  },
  {
    question: "Is there a restaurant on site?",
    answer: "Yes. Shamyana Restaurant serves Kashmiri Wazwan alongside Indian, Mughlai, barbecue, Chinese-style and vegetarian dishes.",
  },
  {
    question: "Can you help arrange airport transfers or sightseeing?",
    answer: "Airport transfers and tour assistance appear on our travel listings. Please ask when you enquire — arrangements are subject to availability and confirmation.",
  },
  {
    question: "Is my booking confirmed when I submit the online form?",
    answer: "No. The form sends an enquiry to our reception team. Your stay is confirmed only once the hotel contacts you to confirm availability and rates.",
  },
];
