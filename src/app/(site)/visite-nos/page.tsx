import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { media } from "@/content/media";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Visite-nos",
  description:
    "Orientações para a primeira visita à Nova Vida — Igreja do Renascimento. Endereço e horários serão publicados após confirmação.",
  path: "/visite-nos",
});

export default function VisiteNosPage() {
  return (
    <>
      <PageHero
        eyebrow="Visite-nos"
        title="Sua primeira visita, com tranquilidade"
        description="Queremos que você se sinta bem-vindo desde o primeiro contato — com clareza, respeito e sem pressão."
        image={media.welcome.src}
        imageAlt={media.welcome.alt}
        tone="photo"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Visite-nos" },
        ]}
        actions={
          <>
            <Button href="/cultos-e-encontros" variant="onDark">
              Cultos e encontros
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
            eyebrow="O que esperar"
            title="Orientações simples para quem chega"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Chegue como está",
                text: "Não há código de vestimenta rígido. O importante é sua presença.",
              },
              {
                title: "Participe no seu ritmo",
                text: "Você pode apenas acompanhar, ouvir e observar com liberdade.",
              },
              {
                title: "Traga perguntas",
                text: "Dúvidas sobre fé, comunidade ou encontros são bem-vindas.",
              },
              {
                title: "Sem pressão",
                text: "Respeitamos sua história e sua comunidade religiosa atual.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-[1.35rem] border border-sand bg-surface-elevated p-5"
              >
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="surface-sand section-pad">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="Local e horários"
            title="Informações em confirmação"
            description="Em breve, esta página reunirá endereço, orientações de chegada e a programação confirmada."
          />
          <ContentNotice className="mt-8">
            Não exibimos localização inventada. Quando endereço, estacionamento,
            acessibilidade e horários forem homologados, esta página será
            atualizada.
          </ContentNotice>
          <div className="mt-8">
            <Button href="/contato" variant="secondary">
              Ver página de contato
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
