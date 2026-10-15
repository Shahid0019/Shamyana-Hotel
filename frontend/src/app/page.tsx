import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { Welcome } from "@/components/home/Welcome";
import { FeaturedRooms } from "@/components/home/FeaturedRooms";
import { ExperiencesSlider } from "@/components/home/ExperiencesSlider";
import { RestaurantShowcase } from "@/components/home/RestaurantShowcase";
import { Gatherings } from "@/components/home/Gatherings";
import { ReservationSection } from "@/components/home/ReservationSection";
import { FactsStrip } from "@/components/home/FactsStrip";
import { VisitUs } from "@/components/home/VisitUs";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: "Shamyana Hotel & Restaurant · Hotel near Dal Lake, Boulevard Road, Srinagar" },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Welcome />
      <FactsStrip />
      <FeaturedRooms />
      <ExperiencesSlider />
      <RestaurantShowcase />
      <Gatherings />
      <VisitUs />
      <ReservationSection />
    </>
  );
}
