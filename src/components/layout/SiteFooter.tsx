import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/ui/Container";
import { institution } from "@/content/institution";
import { footerNavigation } from "@/content/navigation";
import { getContactInfo } from "@/lib/content";

export function SiteFooter() {
  const contact = getContactInfo();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--color-sand)_80%,var(--color-olive))] bg-[color-mix(in_srgb,var(--color-sand)_35%,var(--color-ivory))]">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <BrandLogo size="footer" />
            <p className="mt-5 max-w-sm font-display text-xl italic text-ink">
              {institution.tagline}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {institution.mission}
            </p>
          </div>

          {footerNavigation.map((group) => (
            <div key={group.title}>
              <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-olive">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-ink hover:text-olive"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 border-t border-sand pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="text-sm text-muted">
            <p className="font-semibold text-ink">Contato institucional</p>
            <p className="mt-2 max-w-xl">{contact.notes}</p>
          </div>
          <p className="text-sm text-muted">
            © {year} {institution.shortName}. Todos os direitos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
