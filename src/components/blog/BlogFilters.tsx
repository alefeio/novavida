"use client";

import { useMemo, useState } from "react";
import { EditorialCard } from "@/components/blog/EditorialCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { TextInput } from "@/components/ui/FormField";
import { categoryLabels } from "@/content/institution";
import type { ArticleCategory, BlogArticle } from "@/types/content";
import { cn } from "@/lib/utils";

export function BlogFilters({ articles }: { articles: BlogArticle[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ArticleCategory | "todos">("todos");

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))),
    [articles],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((article) => {
      const matchCategory =
        category === "todos" || article.category === category;
      const matchQuery =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [articles, category, query]);

  const featured = filtered.find((a) => a.featured) ?? filtered[0];
  const rest = filtered.filter((a) => a.id !== featured?.id);

  return (
    <div>
      <div className="rounded-[1.35rem] border border-sand bg-surface-elevated p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="min-w-0">
            <label htmlFor="blog-search" className="text-sm font-bold text-ink">
              Buscar artigos
            </label>
            <TextInput
              id="blog-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Busque por título ou tema"
              className="mt-2 w-full"
            />
          </div>
          <div
            role="tablist"
            aria-label="Filtrar por categoria"
            className="flex flex-wrap gap-2 lg:justify-end"
          >
            {(["todos", ...categories] as Array<ArticleCategory | "todos">).map(
              (item) => {
                const selected = category === item;
                const label =
                  item === "todos" ? "Todos" : categoryLabels.articles[item];
                return (
                  <button
                    key={item}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold",
                      selected
                        ? "bg-olive text-on-brand"
                        : "bg-sand/70 text-ink hover:bg-sage/40",
                    )}
                    onClick={() => setCategory(item)}
                  >
                    {label}
                  </button>
                );
              },
            )}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-10"
          title="Nenhum artigo encontrado"
          description="Ajuste a busca ou a categoria para ver outras publicações."
        />
      ) : (
        <div className="mt-10 space-y-8">
          {featured ? <EditorialCard article={featured} featured /> : null}
          {rest.length > 0 ? (
            <div
              className={cn(
                "grid grid-cols-1 gap-6 md:grid-cols-2",
                rest.length === 1 && "md:max-w-xl",
              )}
            >
              {rest.map((article) => (
                <EditorialCard key={article.id} article={article} />
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
