import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { FormField, TextArea, TextInput } from "@/components/ui/FormField";
import { PageHero } from "@/components/ui/PageHero";
import { getContactInfo, getInstitution } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Contato",
  description:
    "Canais de contato da Nova Vida. Informações oficiais serão publicadas após confirmação institucional.",
  path: "/contato",
});

export default function ContatoPage() {
  const contact = getContactInfo();
  const institution = getInstitution();

  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Fale com a Nova Vida"
        description="Estamos preparando os canais oficiais com cuidado. Enquanto isso, esta página permanece pronta para receber as informações confirmadas."
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Contato" },
        ]}
      />

      <section className="section-pad">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl">Informações institucionais</h2>
            <p className="mt-4 text-[length:var(--text-lg)] text-muted">
              {institution.name}
            </p>
            <p className="mt-2 font-display text-xl italic text-olive">
              {institution.tagline}
            </p>
            <ContentNotice className="mt-8">{contact.notes}</ContentNotice>
            <p className="mt-6 text-sm text-muted">
              Não publicamos e-mail, telefone, WhatsApp ou redes sociais sem
              confirmação oficial.
            </p>
            <Button href="/visite-nos" variant="secondary" className="mt-8">
              Orientações para visitar
            </Button>
          </div>

          <div className="rounded-[1.5rem] border border-sand bg-surface-elevated p-6 sm:p-8">
            <fieldset disabled className="space-y-5">
              <legend className="font-display text-2xl">
                Mensagem (em preparação)
              </legend>
              <ContentNotice>
                O envio ainda não está disponível. Nenhum dado é coletado nesta
                fase.
              </ContentNotice>
              <FormField label="Nome" htmlFor="contato-nome">
                <TextInput id="contato-nome" name="nome" />
              </FormField>
              <FormField label="E-mail" htmlFor="contato-email">
                <TextInput id="contato-email" name="email" type="email" />
              </FormField>
              <FormField label="Mensagem" htmlFor="contato-mensagem">
                <TextArea id="contato-mensagem" name="mensagem" />
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
