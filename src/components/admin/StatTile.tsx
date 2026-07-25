import type { LucideIcon } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

export default function StatTile({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  icon: LucideIcon;
}) {
  return (
    <GlassCard className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold/40 text-gold-deep">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-semibold text-ink">{value}</p>
        <p className="text-xs text-ink-soft">{label}</p>
      </div>
    </GlassCard>
  );
}
