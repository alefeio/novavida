import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { FormField, TextArea, TextInput } from "@/components/ui/FormField";
import { PageHero } from "@/components/ui/PageHero";
import { media } from "@/content/media";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Pedido de oração",
  description:
    "Um espaço acolhedor para pedidos de oração. O envio digital ainda não está disponível nesta fase.",
  path: "/oracao",
});

export default function OracaoPage() {
  return (
    <>
      <PageHero
        eyebrow="Oração"
        title="Podemos orar com você"
        description="Este é um espaço de cuidado espiritual, sereno e confidencial. Não substitui acompanhamento médico, psicológico ou assistência social."
        image={media.hope.src}
        imageAlt={media.hope.alt}
        tone="photo"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Pedido de oração" },
        ]}
      />

      <section className="section-pad">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-3xl">Como funciona</h2>
            <p className="mt-4 text-[length:var(--text-lg)] leading-relaxed text-muted">
              Em uma próxima etapa, você poderá compartilhar um pedido breve.
              Coletaremos apenas o necessário, com transparência sobre
              privacidade e prazo de retorno pastoral.
            </p>
            <ul className="mt-6 space-y-3 text-muted">
              <li>• Oração com sensibilidade e respeito.</li>
              <li>• Sem exposição pública do seu pedido.</li>
              <li>• Sem promessas exageradas ou linguagem de pressão.</li>
            </ul>
            <ContentNotice className="mt-8">
              O envio digital ainda não está ativo. O formulário ao lado é uma
              prévia visual — nenhum dado é coletado ou armazenado nesta fase.
            </ContentNotice>
          </div>

          <div className="rounded-[1.5rem] border border-sand bg-surface-elevated p-6 sm:p-8">
            <fieldset disabled className="space-y-5">
              <legend className="font-display text-2xl text-ink">
                Pedido de oração
              </legend>
              <FormField label="Nome" htmlFor="nome" hint="Opcional">
                <TextInput id="nome" name="nome" autoComplete="name" />
              </FormField>
              <FormField
                label="Seu pedido"
                htmlFor="pedido"
                hint="Compartilhe apenas o que se sentir à vontade."
              >
                <TextArea id="pedido" name="pedido" />
              </FormField>
              <FormField
                label="Contato para retorno"
                htmlFor="contato"
                hint="Disponível quando a integração estiver ativa."
              >
                <TextInput id="contato" name="contato" />
              </FormField>
              <Button type="button" disabled>
                Envio indisponível no momento
              </Button>
            </fieldset>
          </div>
        </Container>
      </section>
    </>
  );
}
