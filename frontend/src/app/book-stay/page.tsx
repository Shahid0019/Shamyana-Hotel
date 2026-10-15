import { Suspense } from "react";
import { media } from "@/data/media";
import { site } from "@/data/site";
import { EnquiryLayout } from "@/components/forms/EnquiryLayout";
import { BookingForm, BookingFormFromParams } from "@/components/forms/BookingForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Request a Booking",
  description:
    "Enquire about availability at Hotel Shamyana – Dal View, Boulevard Road, Srinagar. Send your dates and our reception team will confirm availability and rates.",
  path: "/book-stay",
});

export default function BookStayPage() {
  return (
    <EnquiryLayout
      crumbs={[{ name: "Request a Booking", path: "/book-stay" }]}
      eyebrow={site.hotelName}
      title="Plan your stay"
      accent="by Dal Lake."
      intro="Tell us your dates and who's travelling. We'll get back to you to confirm availability and rates — nothing is charged online."
      image={media.dalLakeShikaras}
      facts={[
        { label: "Check-in", value: `From ${site.hotel.checkIn}` },
        { label: "Check-out", value: `By ${site.hotel.checkOut}` },
      ]}
    >
      <Eyebrow>Enquire about availability</Eyebrow>
      <h2 className="mt-4 mb-12 text-display-3">Your booking request</h2>
      <Suspense fallback={<BookingForm />}>
        <BookingFormFromParams />
      </Suspense>
    </EnquiryLayout>
  );
}
