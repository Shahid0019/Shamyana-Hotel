import { LegalPage } from "@/components/ui/LegalPage";
import { primaryPhone, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} handles personal information submitted through this website.`,
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy">
      <p>
        This policy explains how {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information you share
        through this website. {/* TODO(client): have this policy reviewed before launch. */}
      </p>

      <h2>What we collect</h2>
      <p>When you send a booking enquiry, table request or message, we receive the details you enter:</p>
      <ul>
        <li>your name, email address and phone number;</li>
        <li>your requested dates, times, number of guests and room preference;</li>
        <li>anything you choose to write in the requests or message field.</li>
      </ul>

      <h2>How we use it</h2>
      <p>
        We use these details only to respond to your enquiry — for example, to confirm availability, rates or your
        table. We do not sell your information, and we do not add you to marketing lists from these forms.
      </p>

      <h2>Third-party services</h2>
      <p>
        Pages with a map load an embedded Google Map, which is provided by Google and subject to Google&apos;s own privacy
        policy. Links to review and travel platforms take you to sites with their own policies.
      </p>

      <h2>Retention</h2>
      <p>We keep enquiry details only for as long as needed to handle your request and any resulting stay or reservation.</p>

      <h2>Your choices</h2>
      <p>
        To ask what information we hold about you, or to have it corrected or deleted, call us on{" "}
        <a href={`tel:${primaryPhone.tel}`}>{primaryPhone.display}</a>
        {site.email ? (
          <>
            {" "}or email <a href={`mailto:${site.email}`}>{site.email}</a>
          </>
        ) : null}
        .
      </p>
    </LegalPage>
  );
}
