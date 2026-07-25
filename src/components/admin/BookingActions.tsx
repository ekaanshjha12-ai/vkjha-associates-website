"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  CalendarClock,
  BadgeCheck,
  Trash2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { BookingStatus } from "@/lib/supabase/types";
import type { TablesUpdate } from "@/lib/supabase/database.types";

const inputClass =
  "w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold-deep focus:bg-white/80";

type Panel = "none" | "reject" | "reschedule" | "delete";

export default function BookingActions({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: BookingStatus;
}) {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>("none");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [rejectionReason, setRejectionReason] = useState("");
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleTime, setRescheduleTime] = useState("");

  async function updateStatus(payload: TablesUpdate<"bookings">) {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.from("bookings").update(payload).eq("id", bookingId);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setPanel("none");
    router.refresh();
  }

  async function handleDelete() {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.from("bookings").delete().eq("id", bookingId);
    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/admin/bookings");
    router.refresh();
  }

  const buttonBase =
    "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading || currentStatus === "accepted"}
          onClick={() => updateStatus({ status: "accepted" })}
          className={`${buttonBase} bg-emerald-600 text-white`}
        >
          <CheckCircle2 size={15} />
          Accept
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => setPanel(panel === "reject" ? "none" : "reject")}
          className={`${buttonBase} bg-red-600 text-white`}
        >
          <XCircle size={15} />
          Reject
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => setPanel(panel === "reschedule" ? "none" : "reschedule")}
          className={`${buttonBase} bg-amber-500 text-white`}
        >
          <CalendarClock size={15} />
          Reschedule
        </button>
        <button
          type="button"
          disabled={loading || currentStatus === "completed"}
          onClick={() => updateStatus({ status: "completed" })}
          className={`${buttonBase} bg-ink text-ivory`}
        >
          <BadgeCheck size={15} />
          Complete
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => setPanel(panel === "delete" ? "none" : "delete")}
          className={`${buttonBase} ring-1 ring-red-300 text-red-700 hover:bg-red-50`}
        >
          <Trash2 size={15} />
          Delete
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {panel === "reject" && (
        <div className="grid gap-3 rounded-2xl bg-red-50/60 p-4">
          <label htmlFor="rejectionReason" className="text-sm font-medium text-ink">
            Reason for rejection
          </label>
          <textarea
            id="rejectionReason"
            rows={3}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className={inputClass}
            placeholder="Let the client know why this booking can't proceed as requested."
          />
          <button
            type="button"
            disabled={loading || !rejectionReason.trim()}
            onClick={() =>
              updateStatus({ status: "rejected", rejection_reason: rejectionReason.trim() })
            }
            className={`${buttonBase} w-fit bg-red-600 text-white`}
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            Confirm rejection
          </button>
        </div>
      )}

      {panel === "reschedule" && (
        <div className="grid gap-3 rounded-2xl bg-amber-50/60 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor="rescheduleDate" className="mb-1.5 block text-sm font-medium text-ink">
                New date
              </label>
              <input
                id="rescheduleDate"
                type="date"
                value={rescheduleDate}
                onChange={(e) => setRescheduleDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="rescheduleTime" className="mb-1.5 block text-sm font-medium text-ink">
                New time
              </label>
              <input
                id="rescheduleTime"
                type="time"
                value={rescheduleTime}
                onChange={(e) => setRescheduleTime(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <button
            type="button"
            disabled={loading || !rescheduleDate || !rescheduleTime}
            onClick={() =>
              updateStatus({
                status: "rescheduled",
                reschedule_date: rescheduleDate,
                reschedule_time: rescheduleTime,
              })
            }
            className={`${buttonBase} w-fit bg-amber-500 text-white`}
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            Confirm new time
          </button>
        </div>
      )}

      {panel === "delete" && (
        <div className="grid gap-3 rounded-2xl bg-red-50/60 p-4">
          <p className="text-sm text-ink">
            This permanently deletes the booking. This can&apos;t be undone.
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={handleDelete}
              className={`${buttonBase} w-fit bg-red-600 text-white`}
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              Yes, delete permanently
            </button>
            <button
              type="button"
              onClick={() => setPanel("none")}
              className={`${buttonBase} w-fit ring-1 ring-ink/15`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
