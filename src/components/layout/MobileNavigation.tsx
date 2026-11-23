"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  primaryNavigation,
  secondaryNavigation,
  visitCta,
} from "@/content/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        openRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const items = [
    ...primaryNavigation,
    ...secondaryNavigation.filter(
      (item) => !primaryNavigation.some((p) => p.href === item.href),
    ),
  ];

  return (
    <div className="lg:hidden">
      <button
        ref={openRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-olive)_30%,var(--color-sand))] text-ink"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        <span className="sr-only">Abrir menu</span>
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 max-w-[100vw] overflow-x-hidden">
          <button
            type="button"
            className="absolute inset-0 bg-graphite/45"
            aria-label="Fechar menu"
            onClick={() => {
              setOpen(false);
              openRef.current?.focus();
            }}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="absolute inset-y-0 right-0 flex w-[min(100%,24rem)] max-w-[100vw] flex-col bg-ivory shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-sand px-4 py-4">
              <p className="font-display text-xl text-ink">Menu</p>
              <button
                ref={closeRef}
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-sand"
                onClick={() => {
                  setOpen(false);
                  openRef.current?.focus();
                }}
              >
                <span className="sr-only">Fechar menu</span>
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
              <ul className="space-y-1">
                {items.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-[var(--radius-md)] px-3 py-3 text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
                          active
                            ? "bg-sage/35 text-olive"
                            : "text-ink hover:bg-sand/50",
                        )}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6">
                <Button
                  href={visitCta.href}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {visitCta.label}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
