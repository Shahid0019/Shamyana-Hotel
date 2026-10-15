"use client";

import { useState } from "react";
import { roomFilters, rooms, type RoomFilterId } from "@/data/rooms";
import { RoomCard } from "./RoomCard";
import { cn } from "@/lib/cn";

/** Room listing with filters derived from real room data (tags). */
export function RoomsBrowser() {
  const [filter, setFilter] = useState<RoomFilterId>("all");
  const available = roomFilters.filter((f) => f.id === "all" || rooms.some((r) => r.tags.includes(f.id)));
  const visible = filter === "all" ? rooms : rooms.filter((r) => r.tags.includes(filter));

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter rooms" className="no-scrollbar flex gap-2 overflow-x-auto">
          {available.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "min-h-11 shrink-0 border px-5 text-[0.68rem] font-semibold tracking-[0.2em] uppercase transition-colors",
                filter === f.id ? "border-ink bg-ink text-cream" : "border-line text-ink-soft hover:border-ink hover:text-ink",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-ink-soft" aria-live="polite">
          Showing {visible.length} of {rooms.length} room {rooms.length === 1 ? "type" : "types"}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
        {visible.map((room) => (
          <RoomCard key={room.slug} room={room} index={rooms.indexOf(room)} />
        ))}
      </div>
    </div>
  );
}
