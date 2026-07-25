import { AlertTriangle } from "lucide-react";

export default function LegalDisclaimer() {
  return (
    <div className="mb-10 flex gap-3 rounded-2xl bg-amber-50 px-5 py-4 text-sm text-amber-900 ring-1 ring-amber-200">
      <AlertTriangle size={18} className="mt-0.5 shrink-0" />
      <p>
        <strong>Draft document.</strong> This page is a general-purpose
        template and has not been reviewed by a lawyer. Have it reviewed by
        qualified legal counsel before relying on it, and update the
        placeholder details (effective date, jurisdiction, etc.) for your
        firm.
      </p>
    </div>
  );
}
