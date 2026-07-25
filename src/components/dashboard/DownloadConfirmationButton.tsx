"use client";

import { Printer } from "lucide-react";

export default function DownloadConfirmationButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ivory shadow-sm transition-transform hover:scale-[1.03]"
    >
      <Printer size={16} />
      Download / Print Confirmation
    </button>
  );
}
