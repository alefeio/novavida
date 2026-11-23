import { cn } from "@/lib/utils";

export function QuoteBlock({
  quote,
  attribution,
  className,
}: {
  quote: string;
  attribution?: string;
  className?: string;
}) {
  return (
    <blockquote
      className={cn(
        "relative rounded-[var(--radius-lg)] border-l-4 border-olive bg-[color-mix(in_srgb,var(--color-sand)_40%,white)] px-6 py-6 sm:px-8",
        className,
      )}
    >
      <p className="font-display text-2xl italic leading-snug text-ink sm:text-3xl">
        “{quote}”
      </p>
      {attribution ? (
        <footer className="mt-4 text-sm font-semibold uppercase tracking-wider text-muted">
          {attribution}
        </footer>
      ) : null}
    </blockquote>
  );
}
