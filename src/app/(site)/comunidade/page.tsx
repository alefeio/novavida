import { ImageTextSection } from "@/components/ui/ImageTextSection";
import { Button } from "@/components/ui/Button";
import { CallToAction } from "@/components/ui/CallToAction";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Comunidade",
  description:
    "Vida comunitária na Nova Vida: família, oração, comunhão e acolhimento genuíno.",
  path: "/comunidade",
});

export default function ComunidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Comunidade"
        title="Vida compartilhada com fé e cuidado"
        description="A comunidade é o lugar onde a Palavra encontra o cotidiano: escuta, oração, famílias e amizades que edificam."
        image={media.community.src}
        imageAlt={media.community.alt}
        tone="photo"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Comunidade" },
        ]}
      />

      <ImageTextSection
        eyebrow="Comunhão"
        title="Caminhar juntos, sem pressa"
        description={
          <>
            <p>
              Queremos ser uma comunidade hospitaleira, onde cada pessoa possa
              pertencer com liberdade. O acolhimento não compete com outras
              igrejas — serve a Cristo e cuida de pessoas.
            </p>
            <p>
              Iniciativas e ministérios específicos serão apresentados somente
              quando estiverem confirmados.
            </p>
          </>
        }
        image={media.family.src}
        imageAlt={media.family.alt}
        caption="Fotografia demonstrativa (Unsplash)"
      />

      <section className="surface-sand section-pad">
        <Container>
          <SectionHeading
            eyebrow="Dimensões"
            title="O que cultivamos juntos"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Família",
                text: "Fortalecer laços entre gerações com amor, escuta e Palavra.",
              },
              {
                title: "Oração",
                text: "Interceder uns pelos outros com sensibilidade e respeito.",
              },
              {
                title: "Comunhão",
                text: "Construir amizades e presença genuína no dia a dia da fé.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.35rem] border border-sand bg-surface-elevated p-6"
              >
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CallToAction
        title="Quer conhecer de perto?"
        description="Prepare sua visita ou acompanhe conteúdos que ajudam a crescer na fé."
        actions={
          <>
            <Button href="/visite-nos" variant="onDark">
              Visite-nos
            </Button>
            <Button
              href="/cursos"
              variant="secondary"
              className="border-ivory/45 text-ivory hover:bg-ivory/10"
            >
              Ver cursos
            </Button>
          </>
        }
      />
    </>
  );
}
