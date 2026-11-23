"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNavigation, visitCta } from "@/content/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[color-mix(in_srgb,var(--color-sand)_65%,transparent)] bg-[color-mix(in_srgb,var(--color-ivory)_92%,transparent)] backdrop-blur-md">
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-3 lg:gap-6">
        <BrandLogo priority size="header" />

        <nav aria-label="Principal" className="hidden min-w-0 lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {primaryNavigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "rounded-full px-2.5 py-2 text-[0.8125rem] font-bold tracking-wide transition xl:px-3 xl:text-sm",
                      active
                        ? "bg-sage/40 text-olive"
                        : "text-ink hover:bg-sand/55 hover:text-olive",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Button
            href={visitCta.href}
            size="sm"
            className="hidden sm:inline-flex"
            variant="primary"
          >
            {visitCta.label}
          </Button>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
