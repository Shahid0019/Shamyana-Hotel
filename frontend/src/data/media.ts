import type { ImageCredit, MediaAsset, MediaKind } from "@/types";
import credits from "./image-credits.json";

import dalLakeDusk from "../../public/images/destinations/dal-lake-dusk.jpg";
import dalLakePanorama from "../../public/images/destinations/dal-lake-panorama.jpg";
import dalLakeWide from "../../public/images/destinations/dal-lake-wide.jpg";
import dalLakeShikaras from "../../public/images/destinations/dal-lake-shikaras.jpg";
import shikarasBoulevard from "../../public/images/destinations/shikaras-boulevard.jpg";
import emptyShikara from "../../public/images/destinations/empty-shikara.jpg";
import houseboats from "../../public/images/destinations/houseboats.jpg";
import floatingMarket from "../../public/images/destinations/floating-market.jpg";
import dalLakeMorning from "../../public/images/destinations/dal-lake-4.jpg";
import dalLakeStill from "../../public/images/destinations/dal-lake-6.jpg";
import shalimarBagh from "../../public/images/destinations/shalimar-bagh.jpg";
import nishatBagh from "../../public/images/destinations/nishat-bagh.jpg";
import pariMahal from "../../public/images/destinations/pari-mahal.jpg";
import chinarBagh from "../../public/images/destinations/chinar-bagh.jpg";
import papierMache from "../../public/images/destinations/papier-mache.jpg";
import khatamband from "../../public/images/destinations/khatamband.jpg";

import exteriorDay from "../../public/images/hotel/exterior-day.jpg";
import exteriorSnowNight from "../../public/images/hotel/exterior-snow-night.jpg";
import exteriorSnowDay from "../../public/images/hotel/exterior-snow-day.jpg";
import entranceNight from "../../public/images/hotel/entrance-night.jpg";
import diningLattice from "../../public/images/restaurant/dining-lattice.jpg";
import diningHall from "../../public/images/restaurant/dining-hall.jpg";
import diningGlassTables from "../../public/images/restaurant/dining-glass-tables.jpg";
import diningWoodHall from "../../public/images/restaurant/dining-wood-hall.jpg";
import greenRoom1 from "../../public/images/rooms/green-room-1.jpg";
import greenRoom2 from "../../public/images/rooms/green-room-2.jpg";
import greenRoomSofa from "../../public/images/rooms/green-room-sofa.jpg";
import greenRoomHeadboard from "../../public/images/rooms/green-room-headboard.jpg";
import greenHeadboardDetail from "../../public/images/rooms/green-headboard-detail.jpg";
import greenRoomCeiling from "../../public/images/rooms/green-room-ceiling.jpg";
import greenRoomLarge from "../../public/images/rooms/green-room-large.jpg";
import greenRoomSofa2 from "../../public/images/rooms/green-room-sofa-2.jpg";
import suiteOpenPlan1 from "../../public/images/rooms/suite-open-plan-1.jpg";
import suiteOpenPlan2 from "../../public/images/rooms/suite-open-plan-2.jpg";
import woodRoomSofa from "../../public/images/rooms/wood-room-sofa.jpg";
import woodRoom2 from "../../public/images/rooms/wood-room-2.jpg";
import woodRoomArch from "../../public/images/rooms/wood-room-arch.jpg";
import woodRoomWindow from "../../public/images/rooms/wood-room-window.jpg";
import woodRoomNight from "../../public/images/rooms/wood-room-night.jpg";
import woodRoomArch2 from "../../public/images/rooms/wood-room-arch-2.jpg";
import woodRoom3 from "../../public/images/rooms/wood-room-3.jpg";

import tabakMaaz from "../../public/images/food/tabak-maaz.jpg";
import rista from "../../public/images/food/rista.jpg";
import gushtaba from "../../public/images/food/gushtaba.jpg";
import roganJosh from "../../public/images/food/rogan-josh.jpg";
import wazwanSpread from "../../public/images/food/wazwan-spread.jpg";
import yakhni from "../../public/images/food/yakhni.jpg";
import muttonBiryani from "../../public/images/food/mutton-biryani.jpg";
import kashmiriPulao from "../../public/images/food/kashmiri-pulao.jpg";
import tandooriPlatter from "../../public/images/food/tandoori-platter.jpg";
import chickenSizzler from "../../public/images/food/chicken-sizzler.jpg";
import chilliChicken from "../../public/images/food/chilli-chicken.jpg";
import dumAloo from "../../public/images/food/dum-aloo.jpg";
import kahwa from "../../public/images/food/kahwa.jpg";
import noonChai from "../../public/images/food/noon-chai.jpg";
import phirni from "../../public/images/food/phirni.jpg";

/**
 * Media registry.
 *
 * - kind "property": photographs supplied by Shamyana (hotel, rooms, restaurant).
 * - kind "scenic": openly licensed photographs of the surrounding area.
 * - kind "representative": openly licensed photographs of dishes of the same
 *   kind served at the restaurant. Scenic and representative images are
 *   credited on /credits.
 */

type CreditRecord = (typeof credits)[number];
const creditBySrc = new Map<string, CreditRecord>(credits.map((c) => [c.src, c]));

function creditFor(path: string): ImageCredit | undefined {
  const c = creditBySrc.get(path);
  if (!c) return undefined;
  return {
    author: c.author,
    license: c.license,
    licenseUrl: c.licenseUrl || undefined,
    sourceUrl: c.sourceUrl,
    title: c.title,
  };
}

function asset(
  id: string,
  image: MediaAsset["image"],
  path: string,
  kind: MediaKind,
  alt: string,
  extra: Partial<Pick<MediaAsset, "caption" | "focus">> = {},
): MediaAsset {
  return { id, image, kind, alt, credit: creditFor(path), ...extra };
}

export const media = {
  dalLakeDusk: asset(
    "dal-lake-dusk",
    dalLakeDusk,
    "/images/destinations/dal-lake-dusk.jpg",
    "scenic",
    "The prow of a shikara gliding across a still Dal Lake at dusk, with Boulevard Road and the Zabarwan hills along the shore",
    { caption: "Dal Lake at dusk", focus: "50% 70%" },
  ),
  dalLakePanorama: asset(
    "dal-lake-panorama",
    dalLakePanorama,
    "/images/destinations/dal-lake-panorama.jpg",
    "scenic",
    "A wide, calm view across Dal Lake from a shikara on an overcast morning",
    { caption: "Morning on Dal Lake" },
  ),
  dalLakeWide: asset(
    "dal-lake-wide",
    dalLakeWide,
    "/images/destinations/dal-lake-wide.jpg",
    "scenic",
    "Carved wooden houseboats moored along Dal Lake under spring trees",
    { caption: "Houseboats on Dal Lake" },
  ),
  dalLakeShikaras: asset(
    "dal-lake-shikaras",
    dalLakeShikaras,
    "/images/destinations/dal-lake-shikaras.jpg",
    "scenic",
    "A yellow shikara drifting down a tree-lined channel of Dal Lake, its reflection on the water",
    { caption: "The quiet channels of Dal Lake" },
  ),
  shikarasBoulevard: asset(
    "shikaras-boulevard",
    shikarasBoulevard,
    "/images/destinations/shikaras-boulevard.jpg",
    "scenic",
    "Shikaras with bright canopies waiting at a ghat near Boulevard Road with mountains beyond",
    { caption: "Shikaras near Boulevard Road" },
  ),
  emptyShikara: asset(
    "empty-shikara",
    emptyShikara,
    "/images/destinations/empty-shikara.jpg",
    "scenic",
    "A single empty shikara resting among lotus leaves on Dal Lake",
    { caption: "Among the lotus beds" },
  ),
  houseboats: asset(
    "houseboats",
    houseboats,
    "/images/destinations/houseboats.jpg",
    "scenic",
    "A row of houseboats and shikaras on Dal Lake under a soft sky",
    { caption: "Life along the lake" },
  ),
  floatingMarket: asset(
    "floating-market",
    floatingMarket,
    "/images/destinations/floating-market.jpg",
    "scenic",
    "Lakeside shops and colourful shikaras in the waterways of Dal Lake",
    { caption: "Lakeside markets" },
  ),
  dalLakeMorning: asset(
    "dal-lake-morning",
    dalLakeMorning,
    "/images/destinations/dal-lake-4.jpg",
    "scenic",
    "Mist over Dal Lake with the bow of a shikara in the foreground",
    { caption: "Mist over the lake" },
  ),
  dalLakeStill: asset(
    "dal-lake-still",
    dalLakeStill,
    "/images/destinations/dal-lake-6.jpg",
    "scenic",
    "A still, silver Dal Lake meeting the hills on the horizon",
    { caption: "Stillness" },
  ),
  shalimarBagh: asset(
    "shalimar-bagh",
    shalimarBagh,
    "/images/destinations/shalimar-bagh.jpg",
    "scenic",
    "The terraced water channel and fountains of Shalimar Bagh, a Mughal garden in Srinagar",
    { caption: "Shalimar Bagh" },
  ),
  nishatBagh: asset(
    "nishat-bagh",
    nishatBagh,
    "/images/destinations/nishat-bagh.jpg",
    "scenic",
    "Sunset over Dal Lake seen from the terraces of Nishat Bagh",
    { caption: "Sunset at Nishat Bagh" },
  ),
  pariMahal: asset(
    "pari-mahal",
    pariMahal,
    "/images/destinations/pari-mahal.jpg",
    "scenic",
    "The terraced gardens of Pari Mahal overlooking Dal Lake and Srinagar",
    { caption: "Pari Mahal" },
  ),
  chinarBagh: asset(
    "chinar-bagh",
    chinarBagh,
    "/images/destinations/chinar-bagh.jpg",
    "scenic",
    "Autumn chinar trees in amber and gold reflected in a Srinagar canal",
    { caption: "Chinars in autumn" },
  ),
  papierMache: asset(
    "papier-mache",
    papierMache,
    "/images/destinations/papier-mache.jpg",
    "scenic",
    "Hand-painted Kashmiri papier-mâché vases in rich reds and greens",
    { caption: "Kashmiri papier-mâché" },
  ),
  khatamband: asset(
    "khatamband",
    khatamband,
    "/images/destinations/khatamband.jpg",
    "scenic",
    "Hand-carved Kashmiri wooden doors with intricate floral relief",
    { caption: "Carved Kashmiri woodwork", focus: "50% 40%" },
  ),

  tabakMaaz: asset(
    "tabak-maaz",
    tabakMaaz,
    "/images/food/tabak-maaz.jpg",
    "representative",
    "Tabak Maaz — crisp, golden fried lamb ribs on a white plate",
  ),
  rista: asset(
    "rista",
    rista,
    "/images/food/rista.jpg",
    "representative",
    "Rista — pounded mutton meatballs in a deep red Kashmiri gravy",
  ),
  gushtaba: asset(
    "gushtaba",
    gushtaba,
    "/images/food/gushtaba.jpg",
    "representative",
    "Gushtaba — mutton meatballs in a creamy yoghurt gravy",
  ),
  roganJosh: asset(
    "rogan-josh",
    roganJosh,
    "/images/food/rogan-josh.jpg",
    "representative",
    "Rogan Josh — slow-cooked mutton in a glossy red gravy",
  ),
  wazwanSpread: asset(
    "wazwan-spread",
    wazwanSpread,
    "/images/food/wazwan-spread.jpg",
    "representative",
    "A Wazwan spread served on a shared plate with rice and several Kashmiri dishes",
  ),
  yakhni: asset(
    "yakhni",
    yakhni,
    "/images/food/yakhni.jpg",
    "representative",
    "A pale, fragrant Kashmiri yakhni — a yoghurt-based gravy",
    { focus: "50% 40%" },
  ),
  muttonBiryani: asset(
    "mutton-biryani",
    muttonBiryani,
    "/images/food/mutton-biryani.jpg",
    "representative",
    "Mutton biryani on a plate garnished with cucumber and tomato",
  ),
  kashmiriPulao: asset(
    "kashmiri-pulao",
    kashmiriPulao,
    "/images/food/kashmiri-pulao.jpg",
    "representative",
    "Kashmiri pulao topped with dried fruit, nuts and pomegranate",
  ),
  tandooriPlatter: asset(
    "tandoori-platter",
    tandooriPlatter,
    "/images/food/tandoori-platter.jpg",
    "representative",
    "A mixed tandoori and barbecue platter with chargrilled chicken and kebabs",
  ),
  chickenSizzler: asset(
    "chicken-sizzler",
    chickenSizzler,
    "/images/food/chicken-sizzler.jpg",
    "representative",
    "A chicken sizzler served on a hot iron plate with vegetables",
  ),
  chilliChicken: asset(
    "chilli-chicken",
    chilliChicken,
    "/images/food/chilli-chicken.jpg",
    "representative",
    "Indo-Chinese chilli chicken with spring onion and peppers",
  ),
  dumAloo: asset(
    "dum-aloo",
    dumAloo,
    "/images/food/dum-aloo.jpg",
    "representative",
    "Kashmiri dum aloo — whole potatoes in a rich red gravy",
  ),
  kahwa: asset(
    "kahwa",
    kahwa,
    "/images/food/kahwa.jpg",
    "representative",
    "A glass cup of golden Kashmiri kahwa tea with saffron and almonds",
  ),
  noonChai: asset(
    "noon-chai",
    noonChai,
    "/images/food/noon-chai.jpg",
    "representative",
    "A cup of pink Kashmiri noon chai on a patterned cloth",
  ),
  phirni: asset(
    "phirni",
    phirni,
    "/images/food/phirni.jpg",
    "representative",
    "Phirni — a chilled, creamy ground-rice pudding served in a clay bowl",
  ),

  // ---- Property photographs supplied by Shamyana ----
  exteriorDay: asset("exterior-day", exteriorDay, "/images/hotel/exterior-day.jpg", "property", "The yellow façade of Shamyana Lodge & Restaurant under a clear blue sky", { caption: "Shamyana by day" }),
  exteriorSnowNight: asset("exterior-snow-night", exteriorSnowNight, "/images/hotel/exterior-snow-night.jpg", "property", "Shamyana glowing with warm lights on a snowy winter night", { caption: "Winter evening at Shamyana" }),
  exteriorSnowDay: asset("exterior-snow-day", exteriorSnowDay, "/images/hotel/exterior-snow-day.jpg", "property", "Shamyana's courtyard and façade under fresh winter snow", { caption: "Snow day at Shamyana" }),
  entranceNight: asset("entrance-night", entranceNight, "/images/hotel/entrance-night.jpg", "property", "The lit entrance of Shamyana Lodge & Restaurant at night", { caption: "The entrance" }),
  diningLattice: asset("dining-lattice", diningLattice, "/images/restaurant/dining-lattice.jpg", "property", "Shamyana Restaurant's dining room framed by lattice curtains and warm lamps", { caption: "Dining room" }),
  diningHall: asset("dining-hall", diningHall, "/images/restaurant/dining-hall.jpg", "property", "A dining hall with arched wall niches, copper plates and tartan tablecloths", { caption: "The dining hall" }),
  diningGlassTables: asset("dining-glass-tables", diningGlassTables, "/images/restaurant/dining-glass-tables.jpg", "property", "Tables laid for dinner beneath lattice windows in Shamyana Restaurant", { caption: "Set for dinner" }),
  diningWoodHall: asset("dining-wood-hall", diningWoodHall, "/images/restaurant/dining-wood-hall.jpg", "property", "A bright dining hall with wood panelling and large windows", { caption: "The upper dining hall" }),
  greenRoom1: asset("green-room-1", greenRoom1, "/images/rooms/green-room-1.jpg", "property", "A sage-green panelled room with a double bed, wall-mounted TV and air conditioning"),
  greenRoom2: asset("green-room-2", greenRoom2, "/images/rooms/green-room-2.jpg", "property", "A sage-green room with a quilted blue headboard and coffered ceiling"),
  greenRoomSofa: asset("green-room-sofa", greenRoomSofa, "/images/rooms/green-room-sofa.jpg", "property", "A green panelled room with a lounge sofa, coffee table and double bed"),
  greenRoomHeadboard: asset("green-room-headboard", greenRoomHeadboard, "/images/rooms/green-room-headboard.jpg", "property", "A double bed with a tufted blue headboard in a green panelled room"),
  greenHeadboardDetail: asset("green-headboard-detail", greenHeadboardDetail, "/images/rooms/green-headboard-detail.jpg", "property", "Close-up of a quilted blue headboard with bedside lamps"),
  greenRoomCeiling: asset("green-room-ceiling", greenRoomCeiling, "/images/rooms/green-room-ceiling.jpg", "property", "A green room with a lit coffered ceiling, wood floor and double bed"),
  greenRoomLarge: asset("green-room-large", greenRoomLarge, "/images/rooms/green-room-large.jpg", "property", "A spacious green room with seating, a glass coffee table and a double bed"),
  greenRoomSofa2: asset("green-room-sofa-2", greenRoomSofa2, "/images/rooms/green-room-sofa-2.jpg", "property", "A green room with a corner sofa, lit ceiling and double bed"),
  suiteOpenPlan1: asset("suite-open-plan-1", suiteOpenPlan1, "/images/rooms/suite-open-plan-1.jpg", "property", "An open-plan room with a writing desk, mirror wall and bedroom area beyond"),
  suiteOpenPlan2: asset("suite-open-plan-2", suiteOpenPlan2, "/images/rooms/suite-open-plan-2.jpg", "property", "An open-plan room with a sitting area and a lit coffered ceiling"),
  woodRoomSofa: asset("wood-room-sofa", woodRoomSofa, "/images/rooms/wood-room-sofa.jpg", "property", "A wood-panelled room with a double bed, leather sofas and draped curtains"),
  woodRoom2: asset("wood-room-2", woodRoom2, "/images/rooms/wood-room-2.jpg", "property", "A wood-panelled room with a double bed, TV and seating area"),
  woodRoomArch: asset("wood-room-arch", woodRoomArch, "/images/rooms/wood-room-arch.jpg", "property", "A double bed framed by an arched, softly lit wooden headboard wall"),
  woodRoomWindow: asset("wood-room-window", woodRoomWindow, "/images/rooms/wood-room-window.jpg", "property", "A wood-panelled room with a double bed and armchairs by a sunny window"),
  woodRoomNight: asset("wood-room-night", woodRoomNight, "/images/rooms/wood-room-night.jpg", "property", "A warm wood-panelled room with a lattice-lit ceiling and wardrobe"),
  woodRoomArch2: asset("wood-room-arch-2", woodRoomArch2, "/images/rooms/wood-room-arch-2.jpg", "property", "A wood-panelled room with an arched headboard, sofas and draped curtains"),
  woodRoom3: asset("wood-room-3", woodRoom3, "/images/rooms/wood-room-3.jpg", "property", "A wood-panelled room with a double bed and draped window"),
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

export const allMedia: MediaAsset[] = Object.values(media);

export const kindLabel: Record<MediaKind, string> = {
  property: "Shamyana",
  scenic: "Around Shamyana",
  representative: "Representative image",
};
