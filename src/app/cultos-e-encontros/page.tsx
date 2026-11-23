import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import { getMeetings } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Cultos e encontros",
  description:
    "Saiba o que esperar em um encontro da Nova Vida. Horários e endereço serão publicados após confirmação oficial.",
  path: "/cultos-e-encontros",
});

export default function CultosPage() {
  const meetings = getMeetings();

  return (
    <>
      <PageHero
        eyebrow="Cultos e encontros"
        title="O que esperar quando nos visitar"
        description="Queremos reduzir a incerteza de quem vem pela primeira vez: ambiente acolhedor, Palavra, oração e comunhão — no seu ritmo."
        image={media.culto.src}
        imageAlt={media.culto.alt}
        tone="photo"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Cultos e encontros" },
        ]}
        actions={
          <>
            <Button href="/visite-nos" variant="onDark">
              Preparar visita
            </Button>
            <Button
              href="/contato"
              variant="secondary"
              className="border-ivory/45 text-ivory hover:bg-ivory/10"
            >
              Ver informações de contato
            </Button>
          </>
        }
      />

      <section className="section-pad">
        <Container>
          <SectionHeading
            eyebrow="Para visitantes"
            title="Um espaço seguro para conhecer"
            description="Você pode chegar, observar, participar e fazer perguntas. Não há pressão para decisão imediata."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Chegue com tranquilidade",
                text: "Será bem-vindo independentemente de sua história ou comunidade atual.",
              },
              {
                title: "Participe no seu ritmo",
                text: "Há espaço para escutar a Palavra, orar e simplesmente estar presente.",
              },
              {
                title: "Tire dúvidas depois",
                text: "Quando os canais oficiais estiverem disponíveis, será fácil falar conosco.",
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

      <section className="surface-sand section-pad">
        <Container>
          <SectionHeading
            eyebrow="Agenda"
            title="Programação"
            description="Encontros previstos na vida da igreja. Detalhes de horário e local serão publicados após confirmação."
          />
          <div className="mt-8 grid gap-4">
            {meetings.map((meeting) => (
              <article
                key={meeting.id}
                className="rounded-[1.35rem] border border-sand bg-surface-elevated p-6 sm:flex sm:items-start sm:justify-between sm:gap-8"
              >
                <div>
                  <h3 className="font-display text-2xl">{meeting.title}</h3>
                  <p className="mt-2 max-w-2xl text-muted">{meeting.description}</p>
                </div>
                <p className="mt-4 shrink-0 text-sm font-bold uppercase tracking-wider text-olive sm:mt-1">
                  Horário a confirmar
                </p>
              </article>
            ))}
          </div>
          <ContentNotice className="mt-8">
            Endereço, mapa e horários ainda não foram homologados. Não
            publicamos informações inventadas nesta fase.
          </ContentNotice>
        </Container>
      </section>
    </>
  );
}
