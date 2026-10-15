"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BedDouble, Phone, UtensilsCrossed } from "lucide-react";
import { primaryPhone } from "@/data/site";
import { cn } from "@/lib/cn";

/** Persistent thumb-reach actions on phones and tablets; appears after the hero. */
export function MobileActionBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The booking pages already are the action.
  if (pathname === "/book-stay" || pathname === "/reserve-table") return null;

  const item = "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[0.58rem] font-semibold tracking-[0.16em] uppercase";

  return (
    <nav
      aria-label="Quick actions"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-500 ease-(--ease-luxe) lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex divide-x divide-line">
        <a href={`tel:${primaryPhone.tel}`} className={cn(item, "text-ink")} tabIndex={visible ? 0 : -1}>
          <Phone aria-hidden="true" className="size-4 text-gold-deep" /> Call
        </a>
        <Link href="/reserve-table" className={cn(item, "text-ink")} tabIndex={visible ? 0 : -1}>
          <UtensilsCrossed aria-hidden="true" className="size-4 text-gold-deep" /> Reserve Table
        </Link>
        <Link href="/book-stay" className={cn(item, "bg-ink text-cream")} tabIndex={visible ? 0 : -1}>
          <BedDouble aria-hidden="true" className="size-4 text-gold-light" /> Book a Stay
        </Link>
      </div>
    </nav>
  );
}
