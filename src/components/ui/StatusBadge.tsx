import type { ContentStatus } from "@/types/content";
import { statusLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Uso pontual em páginas de detalhe / validação editorial.
 * Preferir ContentNotice nas listagens para não poluir a UI.
 */
export function StatusBadge({
  status,
  className,
  force = false,
}: {
  status: ContentStatus;
  className?: string;
  force?: boolean;
}) {
  if (status === "confirmed") return null;
  if (!force && status === "demo") return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider",
        status === "demo" && "bg-sand/80 text-graphite",
        status === "pending" && "bg-sage/40 text-graphite",
        className,
      )}
    >
      {statusLabel(status)}
    </span>
  );
}
