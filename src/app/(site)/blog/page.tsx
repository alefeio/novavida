import { BlogFilters } from "@/components/blog/BlogFilters";
import { Container } from "@/components/ui/Container";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { PageHero } from "@/components/ui/PageHero";
import { getArticles } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Blog",
  description:
    "Artigos e reflexões da Nova Vida sobre fé, família, oração e comunhão.",
  path: "/blog",
  noIndex: true,
});

export default function BlogPage() {
  const articles = getArticles();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Leituras para o coração e o cotidiano"
        description="Um espaço editorial de reflexão e formação espiritual."
        image="/images/blog/cover-palavra.jpg"
        imageAlt="Imagem demonstrativa: leitura e reflexão"
        tone="photo"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Blog" },
        ]}
      />
      <section className="section-pad">
        <Container>
          <ContentNotice className="mb-8">
            As publicações desta fase são exemplos editoriais para validação
            visual e ainda não constituem conteúdo oficial indexável.
          </ContentNotice>
          <BlogFilters articles={articles} />
        </Container>
      </section>
    </>
  );
}
