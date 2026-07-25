import GlassCard from "@/components/ui/GlassCard";
import ServiceIcon from "@/components/sections/ServiceIcon";
import type { Service } from "@/lib/content/services";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <GlassCard className="group h-full hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(31,42,46,0.1)]">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/40 text-gold-deep">
        <ServiceIcon icon={service.icon} />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-ink">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {service.description}
      </p>
    </GlassCard>
  );
}
