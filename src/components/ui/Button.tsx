import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-olive text-on-brand hover:bg-[color-mix(in_srgb,var(--color-olive)_88%,black)] shadow-[0_8px_24px_color-mix(in_srgb,var(--color-olive)_28%,transparent)]",
  secondary:
    "bg-transparent text-ink border border-[color-mix(in_srgb,var(--color-olive)_45%,var(--color-sand))] hover:bg-[color-mix(in_srgb,var(--color-sage)_22%,transparent)]",
  ghost:
    "bg-transparent text-olive hover:bg-[color-mix(in_srgb,var(--color-sage)_25%,transparent)]",
  onDark:
    "bg-ivory text-graphite hover:bg-white shadow-[0_8px_24px_color-mix(in_srgb,black_20%,transparent)]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm min-h-10",
  md: "px-5 py-2.5 text-sm min-h-11",
  lg: "px-6 py-3 text-base min-h-12",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--focus-ring)]";

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = Common &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = Common &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    ...rest
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const buttonRest = rest as ButtonAsButton;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
