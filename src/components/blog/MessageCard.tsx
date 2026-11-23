import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import type { Message } from "@/types/content";
import { formatDate, cn } from "@/lib/utils";

export function MessageCard({
  message,
  featured = false,
  compact = false,
}: {
  message: Message;
  featured?: boolean;
  compact?: boolean;
}) {
  const date = formatDate(message.publishedAt);

  if (featured) {
    return (
      <article className="group relative min-h-[22rem] overflow-hidden rounded-[1.5rem]">
        {message.image ? (
          <Image
            src={message.image}
            alt={message.imageAlt ?? ""}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        ) : (
          <div className="absolute inset-0 bg-sand" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/80 via-graphite/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          {message.theme ? (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-sage">
              {message.theme}
            </p>
          ) : null}
          <h3 className="mt-2 font-display text-3xl text-ivory sm:text-4xl">
            <Link href={`/mensagens#${message.slug}`} className="hover:underline">
              {message.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-xl text-ivory/88">{message.summary}</p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "flex overflow-hidden rounded-[1.25rem] border border-[color-mix(in_srgb,var(--color-sand)_75%,var(--color-olive))] bg-surface-elevated",
        compact ? "flex-row" : "h-full flex-col",
      )}
    >
      {message.image ? (
        <div
          className={cn(
            "relative overflow-hidden",
            compact ? "w-28 shrink-0 sm:w-36" : "aspect-[16/9]",
          )}
        >
          <Image
            src={message.image}
            alt={message.imageAlt ?? ""}
            fill
            className="object-cover"
            sizes={compact ? "144px" : "(max-width: 768px) 100vw, 33vw"}
          />
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center justify-center bg-sand/50",
            compact ? "w-28 shrink-0 sm:w-36" : "aspect-[16/9]",
          )}
        >
          <BookOpen className="h-8 w-8 text-olive" aria-hidden />
        </div>
      )}
      <div className={cn("flex flex-1 flex-col", compact ? "p-4" : "p-5")}>
        {message.theme ? (
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-olive">
            {message.theme}
          </span>
        ) : null}
        <h3
          className={cn(
            "font-display leading-tight",
            compact ? "mt-1 text-xl" : "mt-2 text-2xl",
          )}
        >
          <Link href={`/mensagens#${message.slug}`} className="hover:text-olive">
            {message.title}
          </Link>
        </h3>
        {!compact ? (
          <p className="mt-3 flex-1 text-sm text-muted sm:text-base">
            {message.summary}
          </p>
        ) : null}
        <p className="mt-3 text-sm text-muted">
          {[message.format === "texto" ? "Texto" : message.format, message.durationLabel, date]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </article>
  );
}
