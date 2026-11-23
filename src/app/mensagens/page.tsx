import { MessageCard } from "@/components/blog/MessageCard";
import { Container } from "@/components/ui/Container";
import { ContentGrid } from "@/components/ui/ContentGrid";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { getMessages } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Mensagens",
  description:
    "Mensagens e reflexões da Nova Vida. Estrutura preparada para texto, áudio e vídeo.",
  path: "/mensagens",
  noIndex: true,
});

export default function MensagensPage() {
  const messages = getMessages();
  const [featured, ...rest] = messages;

  return (
    <>
      <PageHero
        eyebrow="Mensagens"
        title="Reflexões para o caminho"
        description="Espaço preparado para futuras mensagens em texto, áudio ou vídeo."
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Mensagens" },
        ]}
      />

      <section className="section-pad">
        <Container>
          <ContentNotice className="mb-8">
            Os exemplos abaixo ilustram o layout editorial. Players e publicações
            oficiais virão em etapas seguintes.
          </ContentNotice>

          {featured ? (
            <div className="mb-8">
              <MessageCard message={featured} featured />
            </div>
          ) : null}

          {rest.length > 0 ? (
            <ContentGrid>
              {rest.map((message) => (
                <div key={message.id} id={message.slug}>
                  <MessageCard message={message} />
                </div>
              ))}
            </ContentGrid>
          ) : !featured ? (
            <EmptyState
              title="Nenhuma mensagem publicada"
              description="Quando houver mensagens oficiais, elas aparecerão aqui com tema, resumo e mídia."
              action={<Button href="/blog">Ver o blog</Button>}
            />
          ) : null}
        </Container>
      </section>
    </>
  );
}
