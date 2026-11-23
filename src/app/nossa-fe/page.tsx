import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { institution } from "@/content/institution";
import { media } from "@/content/media";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Nossa fé",
  description:
    "Princípios da fé cristã na Nova Vida: centralidade em Jesus Cristo e na Bíblia, com acolhimento e renovação.",
  path: "/nossa-fe",
});

export default function NossaFePage() {
  const confirmed = institution.faithPrinciples.filter(
    (item) => item.status === "confirmed",
  );
  const pending = institution.faithPrinciples.filter(
    (item) => item.status === "pending",
  );

  return (
    <>
      <PageHero
        eyebrow="Nossa fé"
        title="Centrados em Jesus e na Palavra"
        description="Compartilhamos a fé cristã com clareza e humildade, em um ambiente de acolhimento e renovação."
        image={media.bible.src}
        imageAlt={media.bible.alt}
        tone="photo"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Nossa fé" },
        ]}
      />

      <section className="section-pad">
        <Container narrow className="editorial-prose">
          <h2>A fé que professamos</h2>
          <p>
            Cremos em Jesus Cristo como Senhor e Salvador. A Bíblia é nossa
            referência para crer, viver e servir. Desejamos que a Palavra
            renove vidas, fortaleça famílias e inspire comunhão marcada pelo
            amor.
          </p>
          <p>
            Esta página apresenta princípios já confirmados no material
            institucional. Uma declaração doutrinária completa será publicada
            após homologação da liderança.
          </p>
        </Container>
      </section>

      <section className="surface-sand section-pad">
        <Container>
          <SectionHeading
            eyebrow="Princípios"
            title="O que já podemos afirmar com clareza"
          />
          <div className="mt-10 grid gap-5">
            {confirmed.map((item, index) => (
              <article
                key={item.id}
                className="grid gap-4 rounded-[1.35rem] border border-sand bg-surface-elevated p-6 sm:grid-cols-[auto_1fr] sm:gap-6"
              >
                <span
                  aria-hidden
                  className="font-display text-4xl text-sage/80"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl">{item.title}</h3>
                  <p className="mt-3 text-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          {pending.length > 0 ? (
            <ContentNotice className="mt-8">
              Declaração de fé ampliada e outros detalhes doutrinários ainda
              aguardam validação institucional antes da publicação completa.
            </ContentNotice>
          ) : null}
        </Container>
      </section>

      <section className="section-pad">
        <Container narrow>
          <SectionHeading
            title="Perguntas frequentes"
            description="Respostas introdutórias para quem deseja conhecer melhor a Nova Vida."
          />
          <div className="mt-8">
            <Accordion
              items={[
                {
                  title: "Vocês acolhem visitantes de outras comunidades?",
                  content:
                    "Sim. Respeitamos a liberdade de cada pessoa. O objetivo é aproximar pessoas de Jesus Cristo, não pressionar ninguém a abandonar sua comunidade atual.",
                },
                {
                  title: "A Bíblia é importante na Nova Vida?",
                  content:
                    "Sim. A Escritura orienta nossa fé, nossa convivência e o caminho de renovação que desejamos viver juntos.",
                },
                {
                  title: "Haverá uma declaração de fé mais completa?",
                  content:
                    "Sim. Uma declaração doutrinária oficial ampliada ainda aguarda validação institucional antes da publicação.",
                },
              ]}
            />
          </div>
          <div className="mt-10">
            <Button href="/sobre" variant="secondary">
              Voltar para Sobre nós
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
