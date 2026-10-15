import type { MenuCategory, MenuItem } from "@/types";
import { media } from "./media";

/**
 * Digital menu data.
 *
 * Items listed here are dishes that appear on third-party menus for Shamyana
 * Restaurant. Prices are null until verified against the current printed
 * menu. Add the rest of the current menu here (or replace with a CMS/API
 * response of the same shape) once the client supplies it.
 *
 * Images are representative photographs of each dish type, not Shamyana's
 * own plating, and are labelled as such on the site.
 */

export const menuCategories: MenuCategory[] = [
  {
    id: "wazwan",
    name: "Kashmiri Wazwan",
    intro: "The celebrated multi-course cuisine of Kashmir, slow-cooked with fennel, dry ginger and Kashmiri chilli.",
  },
  {
    id: "bbq",
    name: "Barbecue & Tandoori",
    intro: "Marinated meats cooked over charcoal and in the clay tandoor.",
  },
  {
    id: "mughlai",
    name: "Indian & Mughlai",
    intro: "Rich North Indian and Mughlai curries for every table.",
  },
  {
    id: "chinese",
    name: "Chinese-style",
    intro: "Indo-Chinese favourites, sizzlers and wok-tossed dishes.",
  },
  {
    id: "rice",
    name: "Biryani & Rice",
    intro: "Fragrant biryanis and pulaos.",
  },
  {
    id: "veg",
    name: "Vegetarian",
    intro: "Kashmiri and Indian vegetarian dishes.",
  },
  {
    id: "desserts",
    name: "Desserts",
    intro: "Something sweet to close the meal.",
  },
  {
    id: "drinks",
    name: "Drinks",
    intro: "Teas, coffees and cold beverages.",
  },
];

export const menuItems: MenuItem[] = [
  {
    id: "tabak-maaz",
    name: "Tabak Maaz",
    categoryId: "wazwan",
    description: "Lamb ribs simmered in milk and aromatic spices, then fried until crisp and golden.",
    diet: "non-veg",
    price: null,
    image: media.tabakMaaz,
    signature: true,
  },
  {
    id: "rista",
    name: "Rista",
    categoryId: "wazwan",
    description: "Hand-pounded mutton meatballs in a vivid red gravy scented with Kashmiri chilli and fennel.",
    diet: "non-veg",
    price: null,
    image: media.rista,
    signature: true,
  },
  {
    id: "nadru-yakhni",
    name: "Nadru Yakhni",
    categoryId: "wazwan",
    description: "Lotus stem cooked in a delicate yoghurt gravy flavoured with fennel and dried mint.",
    diet: "veg",
    price: null,
    allergens: ["Dairy"],
    image: media.yakhni,
    signature: true,
  },
  {
    id: "waza-chicken",
    name: "Waza Chicken",
    categoryId: "wazwan",
    description: "Chicken prepared in the style of the Kashmiri waza, the master cooks of the Wazwan feast.",
    diet: "non-veg",
    price: null,
  },
  {
    id: "shamyana-special-bbq",
    name: "Shamyana Special BBQ",
    categoryId: "bbq",
    description: "The house barbecue selection, chargrilled and served hot from the grill.",
    diet: null,
    price: null,
    image: media.tandooriPlatter,
    signature: true,
  },
  {
    id: "chicken-sizzler",
    name: "Chicken Sizzler",
    categoryId: "chinese",
    description: "Chicken served on a sizzling iron platter with vegetables and sauce.",
    diet: "non-veg",
    price: null,
    image: media.chickenSizzler,
    signature: true,
  },
  {
    id: "shamyana-pulao",
    name: "Shamyana Pulao",
    categoryId: "rice",
    description: "The house pulao — fragrant rice prepared in the Shamyana kitchen's own style.",
    diet: null,
    price: null,
    image: media.kashmiriPulao,
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    categoryId: "rice",
    description: "Long-grain rice layered and slow-cooked with spiced chicken.",
    diet: "non-veg",
    price: null,
  },
  {
    id: "mutton-biryani",
    name: "Mutton Biryani",
    categoryId: "rice",
    description: "Long-grain rice layered and slow-cooked with tender spiced mutton.",
    diet: "non-veg",
    price: null,
    image: media.muttonBiryani,
    signature: true,
  },
];

export const signatureDishes = menuItems.filter((i) => i.signature);

export function categoryName(id: string) {
  return menuCategories.find((c) => c.id === id)?.name ?? "";
}
