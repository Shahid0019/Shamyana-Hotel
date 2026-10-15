import { LegalPage } from "@/components/ui/LegalPage";
import { primaryPhone, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms for using the ${site.name} website and its enquiry forms.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms">
      <p>
        By using this website you agree to these terms. {/* TODO(client): have these terms reviewed before launch. */}
      </p>

      <h2>Enquiries are not bookings</h2>
      <p>
        Booking enquiries and table requests sent through this website are requests only. A stay or reservation is
        confirmed only when our team contacts you to confirm it. Availability is never guaranteed by submitting a form.
      </p>

      <h2>Rates and menu information</h2>
      <p>
        Rates are provided when we confirm your enquiry. Menu items, ingredients and availability may change; please
        tell our team about any allergies or dietary requirements before ordering.
      </p>

      <h2>Facilities and services</h2>
      <p>
        Facilities described on this website reflect information listed on travel platforms and may change. Services such
        as airport transfers and tour assistance are arranged on request and subject to availability.
      </p>

      <h2>Nearby attractions</h2>
      <p>
        Attractions and activities described on this website are independent of {site.name} unless stated otherwise.
      </p>

      <h2>Photographs</h2>
      <p>
        Some photographs show the surrounding area or are representative images of dishes, and are labelled as such.
        Third-party photographs are used under their licences — see the image credits page.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Call <a href={`tel:${primaryPhone.tel}`}>{primaryPhone.display}</a>.
      </p>
    </LegalPage>
  );
}
