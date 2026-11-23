import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  priority = false,
  size = "header",
}: {
  className?: string;
  priority?: boolean;
  size?: "header" | "footer" | "compact";
}) {
  const dims =
    size === "footer"
      ? { width: 220, height: 220, className: "max-h-[5.5rem] sm:max-h-24" }
      : size === "compact"
        ? { width: 160, height: 160, className: "max-h-[3.75rem]" }
        : { width: 210, height: 210, className: "max-h-[4.25rem] sm:max-h-[4.85rem] lg:max-h-[5.15rem]" };

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--focus-ring)]",
        className,
      )}
      aria-label="Nova Vida — Igreja do Renascimento, página inicial"
    >
      <Image
        src="/brand/logo-oficial.png"
        alt="Nova Vida — Igreja do Renascimento"
        width={dims.width}
        height={dims.height}
        priority={priority}
        className={cn("h-auto w-auto object-contain", dims.className)}
      />
    </Link>
  );
}
