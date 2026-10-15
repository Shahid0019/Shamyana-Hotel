"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, Phone, Sun, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { primaryPhone, site } from "@/data/site";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { SrinagarClock } from "./SrinagarClock";

/** Routes whose first section is a full-bleed dark hero */
const transparentRoutes = new Set([
  "/",
  "/about",
  "/hotel",
  "/rooms",
  "/restaurant",
  "/gallery",
  "/experiences",
  "/contact",
]);

const leftNav = mainNav.filter((l) => ["/hotel", "/rooms", "/restaurant", "/experiences"].includes(l.href));
const rightNav = [...mainNav.filter((l) => ["/gallery", "/contact"].includes(l.href)), { href: "/book-stay", label: "Book Now" }];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const overHero = transparentRoutes.has(pathname) || pathname.startsWith("/rooms/");
  const solid = scrolled || !overHero || open;

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide while reading downwards, reveal as soon as the visitor scrolls up.
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 320);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer when the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Transient UI: make sure the drawer is closed if this tree is hidden by Activity.
  useLayoutEffect(() => () => setOpen(false), []);

  // Lock scroll, trap focus and support Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const toggle = toggleRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () =>
      Array.from(drawer?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  const tone = solid ? "dark" : "light";
  const linkCls = (href: string) =>
    cn(
      "relative py-2 text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-300",
      "after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 hover:after:scale-x-100",
      isActive(pathname, href) && "after:scale-x-100",
      tone === "light" ? "text-cream/90 hover:text-cream" : "text-ink/80 hover:text-ink",
    );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color,transform] duration-500 ease-(--ease-luxe)",
          hidden && !open ? "-translate-y-full focus-within:translate-y-0" : "translate-y-0",
          solid ? "bg-cream/95 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-gradient-to-b from-night/55 to-transparent",
        )}
      >
        <div className="container-x grid h-(--header-h) grid-cols-[1fr_auto_1fr] items-center gap-4 xl:gap-10">
          {/* Left */}
          <div className="flex items-center gap-7 xl:justify-end">
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-drawer"
              className={cn(
                "-ml-2 inline-flex min-h-11 min-w-11 items-center gap-2 px-2 xl:hidden",
                tone === "light" ? "text-cream" : "text-ink",
              )}
            >
              {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
              <span className="hidden text-[0.68rem] font-semibold tracking-[0.2em] uppercase sm:inline">
                {open ? "Close" : "Menu"}
              </span>
            </button>
            <nav aria-label="Primary" className="ml-auto hidden items-center gap-8 xl:flex">
              {leftNav.map((l) => (
                <Link key={l.href} href={l.href} className={linkCls(l.href)} aria-current={isActive(pathname, l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Centre */}
          <Logo tone={tone} />

          {/* Right */}
          <div className="flex items-center justify-end gap-6 xl:justify-start">
            <nav aria-label="Secondary" className="hidden items-center gap-8 xl:flex">
              {rightNav.map((l) => (
                <Link key={l.href} href={l.href} className={linkCls(l.href)} aria-current={isActive(pathname, l.href) ? "page" : undefined}>
                  {l.label}
                </Link>
              ))}
              <span aria-hidden="true" className={cn("h-4 w-px", tone === "light" ? "bg-cream/40" : "bg-ink/25")} />
              <span className={cn("flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.2em] uppercase", tone === "light" ? "text-cream/90" : "text-ink/80")}>
                <Sun aria-hidden="true" className="size-3.5 text-gold" />
                <span className="sr-only">Local time in </span>Srinagar <SrinagarClock />
              </span>
            </nav>
            <Link
              href="/book-stay"
              className={cn(buttonClasses(solid ? "solid" : "ghost-light", "min-h-9 rounded-full px-4 py-2 text-[0.62rem] xl:hidden"))}
            >
              Book
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile / tablet drawer */}
      <div
        id="site-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-cream pt-(--header-h) xl:hidden"
      >
        <div className="lattice-bg pointer-events-none absolute inset-0 opacity-[0.07]" />
        <div className="container-x relative flex min-h-full flex-col justify-between gap-10 py-8">
          <nav aria-label="Mobile">
            <ol className="divide-y divide-line border-y border-line">
              {mainNav.map((l, i) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(pathname, l.href) ? "page" : undefined}
                    className="group flex min-h-11 items-baseline gap-5 py-4"
                  >
                    <span className="w-6 text-[0.65rem] font-semibold text-gold-deep tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[clamp(1.9rem,8vw,2.6rem)] leading-none transition-colors group-hover:text-gold-deep",
                        isActive(pathname, l.href) && "italic text-gold-deep",
                      )}
                    >
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/book-stay" className={buttonClasses("solid")}>
              Book a Stay
            </Link>
            <Link href="/reserve-table" className={buttonClasses("outline")}>
              Reserve a Table
            </Link>
          </div>

          <div className="border-t border-line pt-6 text-sm text-ink-soft">
            <p className="eyebrow mb-2 text-gold-deep">Ghat No. 2 · Boulevard Road</p>
            <p>{site.address.locality}, Kashmir</p>
            <a href={`tel:${primaryPhone.tel}`} className="mt-3 inline-flex min-h-11 items-center gap-2 text-ink">
              <Phone aria-hidden="true" className="size-4 text-gold-deep" />
              {primaryPhone.display}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
