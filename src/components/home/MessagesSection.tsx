import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MessageCard } from "@/components/blog/MessageCard";
import { getMessages } from "@/lib/content";

export function MessagesSection() {
  const [featured, ...rest] = getMessages();

  return (
    <section className="surface-sand section-pad">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-olive sm:text-xs">
              Mensagens e reflexões
            </p>
            <h2 className="mt-3 font-display text-[length:var(--text-4xl)]">
              Palavra para o coração e para o caminho
            </h2>
            <p className="mt-4 text-[length:var(--text-lg)] text-muted">
              Um espaço editorial preparado para futuras mensagens em texto,
              áudio ou vídeo.
            </p>
          </div>
          <Button href="/mensagens" variant="secondary" className="shrink-0">
            Ver mensagens
          </Button>
        </div>

        {featured ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <MessageCard message={featured} featured />
            <div className="grid gap-6">
              {rest.slice(0, 2).map((message) => (
                <MessageCard key={message.id} message={message} compact />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
