"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Download } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { statusLabels } from "@/lib/booking-status";
import { downloadCsv } from "@/lib/csv";
import { services } from "@/lib/content/services";
import type { Booking, BookingStatus } from "@/lib/supabase/types";

const inputClass =
  "w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold-deep focus:bg-white/80";

const statusOptions: BookingStatus[] = [
  "pending",
  "accepted",
  "rescheduled",
  "completed",
  "rejected",
  "cancelled",
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BookingsTable({ bookings }: { bookings: Booking[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchesQuery =
        !q ||
        b.full_name.toLowerCase().includes(q) ||
        b.email.toLowerCase().includes(q) ||
        (b.booking_id ?? "").toLowerCase().includes(q);
      const matchesStatus = !statusFilter || b.status === statusFilter;
      const matchesService = !serviceFilter || b.service === serviceFilter;
      return matchesQuery && matchesStatus && matchesService;
    });
  }, [bookings, query, statusFilter, serviceFilter]);

  function handleExport() {
    downloadCsv(
      `bookings-${new Date().toISOString().slice(0, 10)}.csv`,
      filtered.map((b) => ({
        "Booking ID": b.booking_id ?? "",
        "Full Name": b.full_name,
        Email: b.email,
        Phone: b.phone,
        Company: b.company ?? "",
        Service: b.service,
        "Preferred Date": b.preferred_date,
        "Preferred Time": b.preferred_time,
        "Meeting Mode": b.meeting_mode,
        Status: statusLabels[b.status as BookingStatus] ?? b.status,
        "Created At": b.created_at,
      }))
    );
  }

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email or booking ID"
            className={`${inputClass} pl-10`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`${inputClass} w-auto`}
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>
              {statusLabels[s]}
            </option>
          ))}
        </select>
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className={`${inputClass} w-auto`}
        >
          <option value="">All services</option>
          {services.map((s) => (
            <option key={s.title} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleExport}
          disabled={filtered.length === 0}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-ivory transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>

      <p className="text-xs text-ink-soft">
        {filtered.length} of {bookings.length} bookings
      </p>

      {filtered.length === 0 ? (
        <GlassCard className="bg-white/70 py-10 text-center text-sm text-ink-soft">
          {bookings.length === 0
            ? "No bookings yet."
            : "No bookings match your filters."}
        </GlassCard>
      ) : (
        <div className="grid gap-3">
          {filtered.map((b) => (
            <Link key={b.id} href={`/admin/bookings/${b.id}`}>
              <GlassCard className="flex flex-col gap-3 hover:-translate-y-0.5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                    {b.booking_id}
                  </p>
                  <p className="mt-1 truncate font-heading text-base font-semibold text-ink">
                    {b.full_name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-ink-soft">
                    {b.email} · {b.service}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-soft">
                    {formatDate(b.preferred_date)} · {b.preferred_time}
                  </p>
                </div>
                <StatusBadge status={b.status as BookingStatus} />
              </GlassCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
