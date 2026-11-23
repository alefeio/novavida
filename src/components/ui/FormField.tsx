import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function FormField({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="block text-sm font-bold text-ink">
        {label}
      </label>
      {children}
      {hint ? <p className="text-sm text-muted">{hint}</p> : null}
    </div>
  );
}

const fieldClass =
  "w-full rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-olive)_25%,var(--color-sand))] bg-surface-elevated px-4 py-3 text-ink placeholder:text-muted/70 transition focus:border-olive focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-60";

export function TextInput(props: ComponentPropsWithoutRef<"input">) {
  return <input className={cn(fieldClass, props.className)} {...props} />;
}

export function TextArea(props: ComponentPropsWithoutRef<"textarea">) {
  return (
    <textarea
      className={cn(fieldClass, "min-h-32 resize-y", props.className)}
      {...props}
    />
  );
}
