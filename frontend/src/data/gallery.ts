import type { GalleryItem } from "@/components/gallery/GalleryGrid";
import { media } from "./media";

/** Gallery content — the property's own photographs first, then the surroundings. */
const propertyItems: GalleryItem[] = [
  { asset: media.exteriorSnowNight, category: "The Hotel" },
  { asset: media.greenRoomHeadboard, category: "Rooms" },
  { asset: media.diningLattice, category: "Restaurant" },
  { asset: media.suiteOpenPlan1, category: "Rooms" },
  { asset: media.exteriorDay, category: "The Hotel" },
  { asset: media.diningGlassTables, category: "Restaurant" },
  { asset: media.woodRoomWindow, category: "Rooms" },
  { asset: media.greenRoomCeiling, category: "Rooms" },
  { asset: media.diningHall, category: "Restaurant" },
  { asset: media.exteriorSnowDay, category: "The Hotel" },
  { asset: media.woodRoomArch, category: "Rooms" },
  { asset: media.diningWoodHall, category: "Restaurant" },
  { asset: media.greenRoomSofa2, category: "Rooms" },
  { asset: media.woodRoomSofa, category: "Rooms" },
  { asset: media.suiteOpenPlan2, category: "Rooms" },
  { asset: media.greenHeadboardDetail, category: "Rooms" },
];

const surroundings: GalleryItem[] = [
  { asset: media.dalLakeDusk, category: "Dal Lake" },
  { asset: media.wazwanSpread, category: "Food" },
  { asset: media.shikarasBoulevard, category: "Dal Lake" },
  { asset: media.tabakMaaz, category: "Food" },
  { asset: media.dalLakeWide, category: "Dal Lake" },
  { asset: media.khatamband, category: "Kashmir" },
  { asset: media.rista, category: "Food" },
  { asset: media.nishatBagh, category: "Kashmir" },
  { asset: media.emptyShikara, category: "Dal Lake" },
  { asset: media.kahwa, category: "Food" },
  { asset: media.chinarBagh, category: "Kashmir" },
  { asset: media.tandooriPlatter, category: "Food" },
  { asset: media.houseboats, category: "Dal Lake" },
  { asset: media.papierMache, category: "Kashmir" },
  { asset: media.muttonBiryani, category: "Food" },
  { asset: media.pariMahal, category: "Kashmir" },
  { asset: media.dalLakeMorning, category: "Dal Lake" },
  { asset: media.gushtaba, category: "Food" },
  { asset: media.shalimarBagh, category: "Kashmir" },
  { asset: media.phirni, category: "Food" },
];

export const galleryItems: GalleryItem[] = [...propertyItems, ...surroundings];

export const homeGallery = galleryItems.slice(0, 8);
