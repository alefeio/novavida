import { BookOpen, Church, HeartHandshake, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { institution } from "@/content/institution";

const highlights = [
  {
    title: "Palavra",
    description: "Crescemos ouvindo e vivendo a Escritura com clareza e humildade.",
    icon: BookOpen,
  },
  {
    title: "Oração",
    description: "Cultivamos uma vida de oração serena, sincera e cuidadosa.",
    icon: HeartHandshake,
  },
  {
    title: "Comunhão",
    description: "Caminhamos juntos, com hospitalidade e pertencimento genuíno.",
    icon: Users,
  },
  {
    title: "Família",
    description: "Fortalecemos laços entre gerações com amor e presença.",
    icon: Church,
  },
];

export function MissionSection() {
  return (
    <section className="surface-sand section-pad">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-olive sm:text-xs">
              Nossa missão
            </p>
            <h2 className="mt-3 font-display text-[length:var(--text-4xl)]">
              Aproximar pessoas de Jesus Cristo
            </h2>
            <p className="mt-5 text-[length:var(--text-lg)] leading-relaxed text-muted">
              {institution.mission}
            </p>
            <QuoteBlock
              className="mt-8"
              quote={institution.tagline}
              attribution={institution.shortName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className={`rounded-[1.35rem] border border-[color-mix(in_srgb,var(--color-sand)_70%,var(--color-olive))] bg-surface-elevated p-5 ${
                  index % 2 === 1 ? "sm:translate-y-4" : ""
                }`}
              >
                <item.icon className="h-6 w-6 text-olive" aria-hidden />
                <h3 className="mt-4 font-display text-[length:var(--text-2xl)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
