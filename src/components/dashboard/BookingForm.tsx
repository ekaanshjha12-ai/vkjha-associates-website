"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { services } from "@/lib/content/services";

const inputClass =
  "w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold-deep focus:bg-white/80";

export default function BookingForm({
  defaultFullName,
  defaultEmail,
}: {
  defaultFullName: string;
  defaultEmail: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      fullName: String(form.get("fullName") || "").trim(),
      company: String(form.get("company") || "").trim() || undefined,
      phone: String(form.get("phone") || "").trim(),
      email: String(form.get("email") || "").trim(),
      service: String(form.get("service") || ""),
      preferredDate: String(form.get("preferredDate") || ""),
      preferredTime: String(form.get("preferredTime") || ""),
      meetingMode: String(form.get("meetingMode") || "online") as
        | "online"
        | "offline",
      notes: String(form.get("notes") || "").trim() || undefined,
    };

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => ({}));

    setLoading(false);

    if (!res.ok) {
      setError(body.error || "Could not create the booking. Please try again.");
      return;
    }

    router.push(`/dashboard/bookings/${body.id}`);
    router.refresh();
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-ink">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            defaultValue={defaultFullName}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={defaultEmail}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="+91 90000 00000" />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-ink">
            Company
          </label>
          <input id="company" name="company" className={inputClass} placeholder="Optional" />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-ink">
          Service
        </label>
        <select id="service" name="service" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            Select a service
          </option>
          {services.map((s) => (
            <option key={s.title} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="preferredDate" className="mb-1.5 block text-sm font-medium text-ink">
            Preferred Date
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={today}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="preferredTime" className="mb-1.5 block text-sm font-medium text-ink">
            Preferred Time
          </label>
          <input id="preferredTime" name="preferredTime" type="time" required className={inputClass} />
        </div>
      </div>

      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink">Meeting Mode</span>
        <div className="flex gap-3">
          {[
            { value: "online", label: "Online" },
            { value: "offline", label: "In-person" },
          ].map((opt) => (
            <label
              key={opt.value}
              className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 text-sm font-medium text-ink has-[:checked]:border-gold-deep has-[:checked]:bg-white/80"
            >
              <input
                type="radio"
                name="meetingMode"
                value={opt.value}
                defaultChecked={opt.value === "online"}
                className="accent-gold-deep"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-1.5 block text-sm font-medium text-ink">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className={inputClass}
          placeholder="Anything specific we should know before the consultation?"
        />
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory shadow-sm transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
    </form>
  );
}
