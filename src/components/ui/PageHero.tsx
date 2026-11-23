import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/utils";

export function PageHero({
  title,
  description,
  eyebrow,
  image,
  imageAlt,
  breadcrumbs,
  actions,
  compact = false,
  tone = "light",
}: {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  compact?: boolean;
  tone?: "light" | "photo";
}) {
  const onPhoto = Boolean(image) && tone === "photo";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-[color-mix(in_srgb,var(--color-sand)_80%,var(--color-olive))]",
        compact ? "py-14 sm:py-16" : "py-16 sm:py-20 lg:py-24",
      )}
    >
      {image ? (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div
            className={
              onPhoto
                ? "absolute inset-0 bg-[linear-gradient(105deg,color-mix(in_srgb,var(--color-graphite)_72%,transparent)_0%,color-mix(in_srgb,var(--color-graphite)_48%,transparent)_55%,color-mix(in_srgb,var(--color-olive)_40%,transparent)_100%)]"
                : "absolute inset-0 bg-[linear-gradient(105deg,color-mix(in_srgb,var(--color-ivory)_93%,transparent)_0%,color-mix(in_srgb,var(--color-ivory)_82%,transparent)_52%,color-mix(in_srgb,var(--color-graphite)_35%,transparent)_100%)]"
            }
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--color-sage)_28%,transparent),transparent_55%),linear-gradient(180deg,color-mix(in_srgb,var(--color-sand)_38%,var(--color-ivory)),var(--color-ivory))]"
        />
      )}

      <Container className="relative">
        {breadcrumbs ? (
          <Breadcrumb
            items={breadcrumbs}
            className={cn("mb-6", onPhoto && "text-ivory/75 [&_a]:text-sage [&_span]:text-ivory/90")}
          />
        ) : null}
        {eyebrow ? (
          <p
            className={cn(
              "mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] sm:text-xs",
              onPhoto ? "text-sage" : "text-olive",
            )}
          >
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={cn(
            "max-w-3xl font-display text-[length:var(--text-hero)]",
            onPhoto && "text-ivory",
          )}
        >
          {title}
        </h1>
        {description ? (
          <div
            className={cn(
              "mt-5 max-w-2xl text-[length:var(--text-lg)]",
              onPhoto ? "text-ivory/90" : "text-muted",
            )}
          >
            {description}
          </div>
        ) : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </Container>
    </section>
  );
}
