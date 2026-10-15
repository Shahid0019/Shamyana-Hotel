import { media } from "@/data/media";
import { site } from "@/data/site";
import { EnquiryLayout } from "@/components/forms/EnquiryLayout";
import { ReservationForm } from "@/components/forms/ReservationForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Reserve a Table",
  description:
    "Request a table at Shamyana Restaurant, Boulevard Road, Srinagar — Kashmiri Wazwan and multi-cuisine dining near Dal Lake.",
  path: "/reserve-table",
});

export default function ReserveTablePage() {
  return (
    <EnquiryLayout
      crumbs={[
        { name: "Restaurant", path: "/restaurant" },
        { name: "Reserve a Table", path: "/reserve-table" },
      ]}
      eyebrow={site.restaurantName}
      title="Reserve"
      accent="your table."
      intro="Send us a request and the restaurant will confirm. Planning Wazwan for a group or a special occasion? Let us know in the notes."
      image={media.wazwanSpread}
      facts={[
        { label: "Seating", value: "Indoor & outdoor" },
        { label: "Hours", value: site.restaurant.hours ? site.restaurant.hours[0].hours : "Call to confirm" },
      ]}
    >
      <Eyebrow>Table request</Eyebrow>
      <h2 className="mt-4 mb-12 text-display-3">Your reservation</h2>
      <ReservationForm />
    </EnquiryLayout>
  );
}
