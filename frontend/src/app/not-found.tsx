import { ButtonLink } from "@/components/ui/Button";
import { ChinarLeaf } from "@/components/ui/Ornament";

export default function NotFound() {
  return (
    <section className="flex min-h-svh items-center justify-center bg-cream px-6 py-32 text-center">
      <div className="max-w-xl">
        <ChinarLeaf className="mx-auto size-12 text-gold" />
        <p className="mt-8 font-script text-6xl text-gold-deep">Lost on the lake?</p>
        <h1 className="mt-4 text-display-3">This page drifted away.</h1>
        <p className="mt-5 text-ink-soft">The page you were looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
