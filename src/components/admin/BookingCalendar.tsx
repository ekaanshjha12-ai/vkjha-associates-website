"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { statusChartColors } from "@/lib/chart-colors";
import { statusLabels } from "@/lib/booking-status";
import type { Booking, BookingStatus } from "@/lib/supabase/types";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toDateKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function BookingCalendar({ bookings }: { bookings: Booking[] }) {
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const byDate = useMemo(() => {
    const map = new Map<string, Booking[]>();
    for (const b of bookings) {
      const key = b.preferred_date;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    }
    return map;
  }, [bookings]);

  const cells = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = firstOfMonth.getDay();
    const gridStart = new Date(year, month, 1 - startOffset);

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(gridStart);
      date.setDate(gridStart.getDate() + i);
      return date;
    });
  }, [cursor]);

  const todayKey = toDateKey(new Date());

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-heading text-lg font-semibold text-ink">
          {cursor.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
            className="rounded-full p-2 text-ink-soft transition-colors hover:bg-white/50 hover:text-ink"
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
            className="rounded-full p-2 text-ink-soft transition-colors hover:bg-white/50 hover:text-ink"
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-medium text-ink-soft">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1.5">
        {cells.map((date) => {
          const key = toDateKey(date);
          const inMonth = date.getMonth() === cursor.getMonth();
          const dayBookings = byDate.get(key) ?? [];
          const isToday = key === todayKey;

          return (
            <div
              key={key}
              className={`min-h-[92px] rounded-xl p-1.5 ${
                inMonth ? "bg-white/50" : "bg-white/20"
              } ${isToday ? "ring-1 ring-gold-deep" : ""}`}
            >
              <p className={`text-xs ${inMonth ? "text-ink" : "text-ink-soft/50"}`}>
                {date.getDate()}
              </p>
              <div className="mt-1 grid gap-1">
                {dayBookings.slice(0, 3).map((b) => (
                  <Link
                    key={b.id}
                    href={`/admin/bookings/${b.id}`}
                    className="flex items-center gap-1 truncate rounded-md bg-white/70 px-1.5 py-0.5 text-[11px] text-ink hover:bg-white"
                    title={`${b.full_name} · ${statusLabels[b.status as BookingStatus]}`}
                  >
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: statusChartColors[b.status as BookingStatus] }}
                    />
                    <span className="truncate">{b.full_name}</span>
                  </Link>
                ))}
                {dayBookings.length > 3 && (
                  <p className="px-1.5 text-[11px] text-ink-soft">
                    +{dayBookings.length - 3} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
