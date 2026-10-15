import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "light" | "ghost-light" | "olive";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] transition-[background-color,color,border-color] duration-500 ease-(--ease-luxe) select-none";

const variants: Record<Variant, string> = {
  solid: "bg-ink text-cream hover:bg-walnut",
  olive: "bg-olive text-cream hover:bg-olive-deep",
  outline: "border border-gold-deep/60 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  light: "bg-cream text-ink hover:bg-gold-light",
  "ghost-light": "border border-cream/50 text-cream hover:border-cream hover:bg-cream hover:text-ink",
};

export function buttonClasses(variant: Variant = "solid", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant = "solid", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, className)} {...props}>
      {children}
    </Link>
  );
}

/** Understated underlined text link with an arrow, used for secondary actions. */
export function TextLink({
  className,
  children,
  tone = "dark",
  external,
  ...props
}: Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  children: ReactNode;
  tone?: "dark" | "light";
  external?: boolean;
}) {
  const cls = cn(
    "group inline-flex items-center gap-2 border-b pb-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] transition-colors duration-300",
    tone === "dark"
      ? "border-ink/30 text-ink hover:border-ink"
      : "border-cream/40 text-cream hover:border-cream",
    className,
  );
  const content = (
    <>
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </>
  );
  if (external) {
    return (
      <a className={cls} href={String(props.href)} target="_blank" rel="noopener noreferrer">
        {content}
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className={cls} {...props}>
      {content}
    </Link>
  );
}
