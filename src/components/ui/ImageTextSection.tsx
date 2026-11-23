import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function ImageTextSection({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  reverse = false,
  children,
  caption,
}: {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  image: string;
  imageAlt: string;
  reverse?: boolean;
  children?: ReactNode;
  caption?: string;
}) {
  return (
    <section className="section-pad">
      <Container>
        <div
          className={cn(
            "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
            reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-[color-mix(in_srgb,var(--color-sage)_25%,transparent)] blur-sm" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:aspect-[5/4]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {caption ? (
              <p className="mt-3 text-xs font-medium uppercase tracking-wider text-muted">
                {caption}
              </p>
            ) : null}
          </div>
          <div>
            {eyebrow ? (
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-olive">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="font-display text-balance text-3xl sm:text-4xl">
              {title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {description}
            </div>
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
