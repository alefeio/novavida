import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { media } from "@/content/media";

export function PrayerSection() {
  return (
    <section className="section-pad">
      <Container>
        <div className="grid overflow-hidden rounded-[1.75rem] border border-sand bg-surface-elevated lg:grid-cols-2">
          <div className="relative min-h-64 lg:min-h-full">
            <Image
              src={media.hope.src}
              alt={media.hope.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-olive sm:text-xs">
              Pedido de oração
            </p>
            <h2 className="mt-3 font-display text-[length:var(--text-3xl)] sm:text-[length:var(--text-4xl)]">
              Podemos orar com você?
            </h2>
            <p className="mt-4 text-[length:var(--text-lg)] text-muted">
              Se há algo em seu coração, queremos caminhar em oração com
              sensibilidade e respeito. O envio digital ainda será integrado;
              a página explica como o cuidado funcionará.
            </p>
            <div className="mt-8">
              <Button href="/oracao">Conhecer o espaço de oração</Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
