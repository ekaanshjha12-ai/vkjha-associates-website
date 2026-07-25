"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminNotesForm({
  bookingId,
  initialNotes,
}: {
  bookingId: string;
  initialNotes: string;
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(initialNotes);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setLoading(true);
    setSaved(false);
    const supabase = createClient();
    const { error } = await supabase
      .from("bookings")
      .update({ admin_notes: notes })
      .eq("id", bookingId);
    setLoading(false);

    if (!error) {
      setSaved(true);
      router.refresh();
    }
  }

  return (
    <div className="grid gap-2">
      <textarea
        rows={3}
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setSaved(false);
        }}
        className="w-full rounded-xl border border-white/70 bg-white/60 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 outline-none transition-colors focus:border-gold-deep focus:bg-white/80"
        placeholder="Internal notes — not visible to the client."
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink ring-1 ring-ink/15 transition-colors hover:bg-white/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          Save notes
        </button>
        {saved && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
            <CheckCircle2 size={13} />
            Saved
          </span>
        )}
      </div>
    </div>
  );
}
