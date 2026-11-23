import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { institution } from "@/content/institution";
import { media } from "@/content/media";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[min(88vh,52rem)] overflow-hidden sm:min-h-[min(92vh,56rem)]">
      <Image
        src={media.hero.src}
        alt={media.hero.alt}
        fill
        priority
        className="object-cover object-[center_45%] sm:object-[center_40%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,color-mix(in_srgb,var(--color-graphite)_80%,transparent)_0%,color-mix(in_srgb,var(--color-graphite)_58%,transparent)_48%,color-mix(in_srgb,var(--color-olive)_40%,transparent)_100%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ivory via-ivory/35 to-transparent sm:h-28"
      />

      <Container className="relative flex min-h-[min(88vh,52rem)] flex-col justify-end pb-12 pt-[calc(var(--header-height)+1.5rem)] sm:min-h-[min(92vh,56rem)] sm:pb-20 sm:pt-28 lg:justify-center lg:pb-28">
        <div className="max-w-[26rem] animate-fade-up text-ivory sm:max-w-[40rem]">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-sage sm:text-[0.7rem] sm:tracking-[0.24em]">
            {institution.shortName}
          </p>
          <p className="mt-3 font-display text-[clamp(1.2rem,4.2vw,1.85rem)] italic leading-snug text-ivory sm:mt-5">
            {institution.tagline}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.15rem,8vw,4.5rem)] leading-[1.08] sm:mt-5 sm:leading-[1.05]">
            Uma comunidade para crescer na fé e caminhar em comunhão.
          </h1>
          <p className="mt-4 max-w-xl text-[clamp(1rem,3.6vw,1.1875rem)] leading-relaxed text-ivory/92 sm:mt-6">
            Acolhemos com respeito, sem pressão. Aqui a Palavra, a oração e a
            comunhão encontram espaço para renovar vidas e fortalecer famílias.
          </p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center">
            <Button href="/sobre" variant="onDark" size="lg" className="w-full sm:w-auto">
              Conheça a Nova Vida
            </Button>
            <Button
              href="/visite-nos"
              variant="secondary"
              size="lg"
              className="w-full border-ivory/55 bg-transparent text-ivory hover:bg-ivory/12 sm:w-auto"
            >
              Visite-nos
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
