import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { legalLinks, navLinks, siteConfig } from "@/lib/site-config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/60 bg-white/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-heading text-xl font-semibold text-ink">
            {siteConfig.shortName}
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Navigate</p>
          <ul className="mt-4 grid gap-2">
            {navLinks.slice(0, 6).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Contact</p>
          <ul className="mt-4 grid gap-3 text-sm text-ink-soft">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-gold-deep" />
              <span>{siteConfig.contact.addressLines.join(", ")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-gold-deep" />
              <a href={`tel:+91${siteConfig.contact.phoneRaw}`} className="hover:text-ink">
                {siteConfig.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-gold-deep" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-ink">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-white/60 px-6 py-5 text-center text-xs text-ink-soft sm:flex-row sm:justify-between">
        <span>© {year} {siteConfig.shortName}. All rights reserved.</span>
        <div className="flex gap-4">
          {legalLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-ink">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
