import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { media } from "@/content/media";
import { getMeetings } from "@/lib/content";

export function MeetingsSection() {
  const meetings = getMeetings();

  return (
    <section className="relative isolate overflow-hidden section-pad">
      <Image
        src={media.culto.src}
        alt=""
        fill
        className="object-cover opacity-[0.14]"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--color-sand)_45%,var(--color-ivory))]" />

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-olive sm:text-xs">
              Cultos e encontros
            </p>
            <h2 className="mt-3 font-display text-[length:var(--text-4xl)]">
              Espaços para adorar, aprender e caminhar juntos
            </h2>
            <p className="mt-4 text-[length:var(--text-lg)] text-muted">
              Quando horários e local forem confirmados, esta seção apresentará
              a programação com clareza para quem visita pela primeira vez.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/cultos-e-encontros">O que esperar</Button>
              <Button href="/visite-nos" variant="secondary">
                Preparar uma visita
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {meetings.map((meeting) => (
              <article
                key={meeting.id}
                className="rounded-[1.25rem] border border-[color-mix(in_srgb,var(--color-sand)_75%,var(--color-olive))] bg-surface-elevated/95 px-5 py-5 backdrop-blur-sm"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl">{meeting.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-olive">
                    Em breve
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {meeting.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
