import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentGrid } from "@/components/ui/ContentGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EditorialCard } from "@/components/blog/EditorialCard";
import { getArticles } from "@/lib/content";

export function BlogSection() {
  const [featured, ...rest] = getArticles({ limit: 5 });
  const secondary = rest.slice(0, 4);

  return (
    <section className="section-pad">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Blog"
            title="Leituras para alimentar a fé no cotidiano"
            description="Reflexões com linguagem editorial — um espaço para formação e esperança."
          />
          <Button href="/blog" variant="secondary" className="shrink-0">
            Ir ao blog
          </Button>
        </div>

        {featured ? (
          <div className="mt-10">
            <EditorialCard article={featured} featured />
          </div>
        ) : null}

        {secondary.length > 0 ? (
          <ContentGrid className="mt-6" cols={2}>
            {secondary.map((article) => (
              <EditorialCard key={article.id} article={article} />
            ))}
          </ContentGrid>
        ) : null}
      </Container>
    </section>
  );
}
