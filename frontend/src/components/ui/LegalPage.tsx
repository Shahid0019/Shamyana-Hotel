import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";

/** Calm reading layout for policy-style pages. */
export function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-paper pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="container-x mx-auto max-w-3xl">
        <Breadcrumbs tone="dark" items={[{ name: title, path }]} />
        <h1 className="mt-10 text-display-2">{title}</h1>
        {updated && <p className="mt-4 text-sm text-ink-soft">Last updated: {updated}</p>}
        <div className="mt-12 space-y-6 leading-[1.9] text-ink-soft [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:pt-6 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </div>
    </article>
  );
}
