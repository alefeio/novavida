import { cn } from "@/lib/utils";

/**
 * Aviso discreto e único por página — evita repetir badges em cada card.
 */
export function ContentNotice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      role="note"
      className={cn(
        "rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-sage)_45%,var(--color-sand))] bg-[color-mix(in_srgb,var(--color-sage)_18%,white)] px-4 py-3 text-sm leading-relaxed text-ink",
        className,
      )}
    >
      {children}
    </aside>
  );
}
