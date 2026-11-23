import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { media } from "@/content/media";

export function InviteSection() {
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-28">
      <Image
        src={media.invite.src}
        alt={media.invite.alt}
        fill
        className="object-cover object-[center_40%]"
        sizes="100vw"
      />
      {/* Overlay mais denso para WCAG AA sobre áreas claras/escuras da foto */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-graphite)_72%,transparent)_0%,color-mix(in_srgb,var(--color-graphite)_68%,transparent)_45%,color-mix(in_srgb,var(--color-olive)_70%,transparent)_100%)]" />
      <div className="absolute inset-0 bg-graphite/25" />
      <Container className="relative text-center text-ivory">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-sage sm:text-xs">
          Convite
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-[length:var(--text-4xl)] text-ivory sm:text-[length:var(--text-5xl)]">
          Há espaço para você caminhar conosco.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[length:var(--text-lg)] text-ivory">
          Venha conhecer a Nova Vida. Seja para uma visita, um estudo ou um
          momento de oração — você é bem-vindo.
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Button href="/visite-nos" variant="onDark" size="lg" className="w-full sm:w-auto">
            Planejar uma visita
          </Button>
          <Button
            href="/sobre"
            variant="secondary"
            size="lg"
            className="w-full border-ivory/65 bg-transparent text-ivory hover:bg-ivory/15 sm:w-auto"
          >
            Conhecer a igreja
          </Button>
        </div>
      </Container>
    </section>
  );
}
