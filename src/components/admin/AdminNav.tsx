"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
  soon?: boolean;
};

const items: NavItem[] = [
  { href: "/admin", label: "Painel", exact: true },
  { href: "/admin#institucional", label: "Institucional", soon: true },
  { href: "/admin#agenda", label: "Agenda", soon: true },
  { href: "/admin#blog", label: "Blog", soon: true },
  { href: "/admin#mensagens", label: "Mensagens", soon: true },
  { href: "/admin#cursos", label: "Cursos", soon: true },
  { href: "/admin#configuracoes", label: "Configurações", soon: true },
];

export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação administrativa" className="flex flex-col gap-1">
      {items.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href.split("#")[0] ?? item.href);
        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active && item.exact
                ? "bg-olive text-on-brand"
                : "text-ink hover:bg-[color-mix(in_srgb,var(--color-sage)_28%,transparent)]",
            )}
          >
            <span className="flex items-center justify-between gap-2">
              {item.label}
              {item.soon ? (
                <span className="text-[0.65rem] font-normal uppercase tracking-wide text-muted opacity-80">
                  Em breve
                </span>
              ) : null}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
