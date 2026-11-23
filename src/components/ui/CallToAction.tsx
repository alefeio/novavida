import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function CallToAction({
  title,
  description,
  actions,
  className,
}: {
  title: string;
  description: string;
  actions: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("section-pad", className)}>
      <Container>
        <div className="relative overflow-hidden rounded-[1.75rem] bg-olive px-6 py-12 text-on-brand sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-12 h-52 w-52 rounded-full bg-[color-mix(in_srgb,var(--color-gold)_28%,transparent)] blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-8 h-44 w-44 rounded-full bg-sage/25 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-ivory/25 to-transparent"
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-[length:var(--text-3xl)] text-ivory sm:text-[length:var(--text-4xl)]">
              {title}
            </h2>
            <p className="mt-4 text-[length:var(--text-lg)] leading-relaxed text-ivory/92">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
