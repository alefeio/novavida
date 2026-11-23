import { Button } from "@/components/ui/Button";
import { CallToAction } from "@/components/ui/CallToAction";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { institution } from "@/content/institution";
import { media } from "@/content/media";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Sobre nós",
  description:
    "Conheça a Nova Vida — Igreja do Renascimento: missão, valores e o convite a caminhar em comunhão.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre nós"
        title="Quem somos"
        description="Uma igreja centrada em Jesus Cristo, na Palavra e no acolhimento genuíno — sem pressão e com espaço para cada pessoa."
        image={media.welcome.src}
        imageAlt={media.welcome.alt}
        tone="photo"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Sobre nós" },
        ]}
      />

      <section className="section-pad">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              title="Apresentação institucional"
              description={institution.welcomeMessage}
            />
            <p className="mt-6 text-[length:var(--text-lg)] text-muted">
              A Nova Vida — Igreja do Renascimento existe para aproximar pessoas
              de Jesus Cristo e promover crescimento espiritual em comunhão.
              Nosso lema — <em>{institution.tagline}</em> — expressa a esperança
              de renovação que desejamos viver juntos.
            </p>
          </div>
          <QuoteBlock quote={institution.mission} attribution="Nossa missão" />
        </Container>
      </section>

      <section className="surface-sand section-pad">
        <Container>
          <SectionHeading
            eyebrow="Valores"
            title="Pilares da nossa convivência"
            description="Princípios que orientam a forma como acolhemos, ensinamos e caminhamos juntos."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {institution.values.map((value) => (
              <article
                key={value.id}
                className="rounded-[1.35rem] border border-sand bg-surface-elevated p-6"
              >
                <h3 className="font-display text-2xl">{value.title}</h3>
                <p className="mt-3 text-muted">{value.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CallToAction
        title="Venha caminhar conosco"
        description="Conheça nossa fé ou prepare uma visita com tranquilidade. Os canais oficiais de atendimento serão publicados quando confirmados."
        actions={
          <>
            <Button href="/nossa-fe" variant="onDark">
              Nossa fé
            </Button>
            <Button
              href="/visite-nos"
              variant="secondary"
              className="border-ivory/45 text-ivory hover:bg-ivory/10"
            >
              Visite-nos
            </Button>
          </>
        }
      />
    </>
  );
}
