import Image from "next/image";
import Link from "next/link";
import { categoryLabels } from "@/content/institution";
import type { BlogArticle } from "@/types/content";
import { formatDate, readingTimeLabel } from "@/lib/utils";

export function EditorialCard({
  article,
  featured = false,
}: {
  article: BlogArticle;
  featured?: boolean;
}) {
  const date = formatDate(article.publishedAt);
  const reading = readingTimeLabel(article.readingMinutes);

  if (featured) {
    return (
      <article className="grid overflow-hidden rounded-[1.5rem] border border-[color-mix(in_srgb,var(--color-sand)_75%,var(--color-olive))] bg-surface-elevated lg:grid-cols-2">
        <Link href={`/blog/${article.slug}`} className="relative min-h-72">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </Link>
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-olive">
            Em destaque · {categoryLabels.articles[article.category]}
          </span>
          <h2 className="mt-3 font-display text-[length:var(--text-3xl)] sm:text-[length:var(--text-4xl)]">
            <Link href={`/blog/${article.slug}`} className="hover:text-olive">
              {article.title}
            </Link>
          </h2>
          <p className="mt-4 text-[length:var(--text-lg)] text-muted">
            {article.excerpt}
          </p>
          <p className="mt-5 text-sm text-muted">
            {[date, reading].filter(Boolean).join(" · ")}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[color-mix(in_srgb,var(--color-sand)_75%,var(--color-olive))] bg-surface-elevated transition hover:-translate-y-1 hover:shadow-soft">
      <Link
        href={`/blog/${article.slug}`}
        className="relative aspect-[16/10] overflow-hidden"
      >
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-olive">
          {categoryLabels.articles[article.category]}
        </span>
        <h3 className="mt-2 font-display text-[1.65rem] leading-tight">
          <Link href={`/blog/${article.slug}`} className="hover:text-olive">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm text-muted sm:text-[0.98rem]">
          {article.excerpt}
        </p>
        <p className="mt-4 text-sm text-muted">
          {[date, reading].filter(Boolean).join(" · ")}
        </p>
      </div>
    </article>
  );
}
