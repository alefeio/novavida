import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditorialCard } from "@/components/blog/EditorialCard";
import { Container } from "@/components/ui/Container";
import { ContentGrid } from "@/components/ui/ContentGrid";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { categoryLabels } from "@/content/institution";
import {
  getArticleBySlug,
  getArticles,
  getRelatedArticles,
} from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";
import { formatDate, readingTimeLabel } from "@/lib/utils";

function renderContent(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, index) => {
    if (block.startsWith("### ")) {
      return (
        <h3 key={index} className="mt-8 font-display text-2xl">
          {block.replace(/^### /, "")}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2 key={index} className="mt-10 font-display text-3xl">
          {block.replace(/^## /, "")}
        </h2>
      );
    }
    if (block.match(/^\d+\./m) && block.includes("\n")) {
      const items = block.split("\n");
      return (
        <ol key={index} className="mt-4 list-decimal space-y-2 pl-5 text-muted">
          {items.map((item) => (
            <li key={item}>{item.replace(/^\d+\.\s*/, "")}</li>
          ))}
        </ol>
      );
    }
    const html = block
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
    return (
      <p
        key={index}
        className="mt-4 text-muted leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}

export function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return createPageMetadata({
      title: "Artigo não encontrado",
      description: "O artigo solicitado não está disponível.",
      noIndex: true,
    });
  }
  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    noIndex: true,
    imagePath: article.image,
    imageAlt: article.imageAlt ?? article.title,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug);
  const date = formatDate(article.publishedAt);
  const reading = readingTimeLabel(article.readingMinutes);

  return (
    <>
      <article>
        <Container className="py-10 sm:py-14">
          <p className="text-sm">
            <Link href="/blog" className="font-semibold text-olive hover:underline">
              ← Voltar ao blog
            </Link>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-olive">
              {categoryLabels.articles[article.category]}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-[length:var(--text-hero)]">
            {article.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            {[article.authorLabel, date, reading].filter(Boolean).join(" · ")}
          </p>
          {article.status === "demo" ? (
            <ContentNotice className="mt-6 max-w-2xl">
              Artigo de exemplo para validação editorial — ainda não é publicação
              oficial da Nova Vida.
            </ContentNotice>
          ) : null}
        </Container>

        <div className="relative mx-auto aspect-[21/9] w-full max-w-6xl overflow-hidden sm:rounded-[1.5rem]">
          <Image
            src={article.image}
            alt={article.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <Container narrow className="py-12 sm:py-16">
          <div className="editorial-prose">{renderContent(article.content)}</div>
        </Container>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-sand bg-[color-mix(in_srgb,var(--color-sand)_22%,var(--color-ivory))] py-16">
          <Container>
            <h2 className="font-display text-3xl">Artigos relacionados</h2>
            <ContentGrid className="mt-8">
              {related.map((item) => (
                <EditorialCard key={item.id} article={item} />
              ))}
            </ContentGrid>
          </Container>
        </section>
      ) : null}
    </>
  );
}
