import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { media } from "@/content/media";

const frames = [
  {
    src: media.welcome.src,
    alt: media.welcome.alt,
    label: "Comunhão",
  },
  {
    src: media.family.src,
    alt: media.family.alt,
    label: "Família",
  },
  {
    src: media.hope.src,
    alt: media.hope.alt,
    label: "Esperança",
  },
];

export function CommunitySection() {
  return (
    <section className="section-pad">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-olive sm:text-xs">
              Nossa comunidade
            </p>
            <h2 className="mt-3 font-display text-[length:var(--text-4xl)]">
              Pessoas reais, fé viva e acolhimento genuíno
            </h2>
            <p className="mt-4 text-[length:var(--text-lg)] text-muted">
              Queremos ser um espaço onde diferentes gerações se encontram,
              oram e crescem juntas — com respeito e esperança.
            </p>
            <Button href="/comunidade" variant="secondary" className="mt-7">
              Ver a vida comunitária
            </Button>
          </div>
          <p className="max-w-md text-sm text-muted lg:justify-self-end lg:text-right">
            As fotografias são demonstrativas e não representam registros
            oficiais da Nova Vida.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {frames.map((frame, index) => (
            <figure
              key={`${frame.src}-${frame.label}`}
              className={`relative overflow-hidden rounded-[1.35rem] ${
                index === 1 ? "sm:translate-y-5" : ""
              }`}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-graphite/10 to-transparent" />
                <figcaption className="absolute bottom-4 left-4 font-display text-2xl text-ivory">
                  {frame.label}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
