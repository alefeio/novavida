import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] sm:text-xs",
            tone === "light" ? "text-sage" : "text-olive",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-[length:var(--text-3xl)] sm:text-[length:var(--text-4xl)]",
          tone === "light" ? "text-ivory" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <div
          className={cn(
            "mt-4 text-[length:var(--text-lg)] leading-relaxed",
            tone === "light" ? "text-ivory/90" : "text-muted",
          )}
        >
          {description}
        </div>
      ) : null}
      {actions ? <div className="mt-7">{actions}</div> : null}
    </div>
  );
}
