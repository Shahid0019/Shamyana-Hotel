import Image from "next/image";
import { allMedia, kindLabel } from "@/data/media";
import { LegalPage } from "@/components/ui/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Image Credits",
  description: "Attribution for openly licensed photographs used on the Shamyana Hotel & Restaurant website.",
  path: "/credits",
});

export default function CreditsPage() {
  const credited = allMedia.filter((m) => m.credit);
  return (
    <LegalPage title="Image Credits" path="/credits">
      <p>
        The photographs below are openly licensed images from Wikimedia Commons, used with thanks under the licences
        shown. Images marked &ldquo;{kindLabel.representative}&rdquo; show dishes of the same kind served at Shamyana,
        not our own plating.
      </p>
      <ul className="!ml-0 grid gap-4 sm:grid-cols-2">
        {credited.map((m) => (
          <li key={m.id} className="!ml-0 flex !list-none gap-4 rounded-2xl border border-line bg-cream p-3">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
              <Image src={m.image} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div className="min-w-0 text-sm leading-relaxed">
              <p className="truncate font-medium text-ink">{m.caption ?? m.alt.split(" — ")[0]}</p>
              <p>
                Photo: <a href={m.credit!.sourceUrl} target="_blank" rel="noopener noreferrer">{m.credit!.author || "Wikimedia Commons"}</a>
              </p>
              <p>
                {m.credit!.licenseUrl ? (
                  <a href={m.credit!.licenseUrl} target="_blank" rel="noopener noreferrer">
                    {m.credit!.license}
                  </a>
                ) : (
                  m.credit!.license
                )}{" "}
                · {kindLabel[m.kind]}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </LegalPage>
  );
}
