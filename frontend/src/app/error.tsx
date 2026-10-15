"use client";

import { useEffect } from "react";
import { primaryPhone } from "@/data/site";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-svh items-center justify-center bg-cream px-6 py-32 text-center">
      <div className="max-w-xl">
        <h1 className="text-display-3">Something went wrong.</h1>
        <p className="mt-5 text-ink-soft">
          Please try again. If you were making a request, you can also call us on{" "}
          <a href={`tel:${primaryPhone.tel}`} className="text-ink underline underline-offset-4">
            {primaryPhone.display}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ink px-8 text-[0.7rem] font-semibold tracking-[0.24em] text-cream uppercase hover:bg-walnut"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
