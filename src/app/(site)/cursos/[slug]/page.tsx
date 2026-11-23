import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { categoryLabels } from "@/content/institution";
import { getCourseBySlug, getCourses } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) {
    return createPageMetadata({
      title: "Curso não encontrado",
      description: "O curso solicitado não está disponível.",
      noIndex: true,
    });
  }
  return createPageMetadata({
    title: course.title,
    description: course.summary,
    path: `/cursos/${course.slug}`,
    noIndex: true,
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-sand">
        <div className="absolute inset-0">
          <Image
            src={course.image}
            alt={course.imageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,color-mix(in_srgb,var(--color-ivory)_94%,transparent)_0%,color-mix(in_srgb,var(--color-ivory)_78%,transparent)_55%,color-mix(in_srgb,var(--color-graphite)_40%,transparent)_100%)]" />
        </div>
        <Container className="relative py-16 sm:py-20">
          <p className="text-sm">
            <Link href="/cursos" className="font-semibold text-olive hover:underline">
              ← Voltar aos cursos
            </Link>
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-olive px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-brand">
              {categoryLabels.courses[course.category]}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-[length:var(--text-hero)]">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[length:var(--text-lg)] text-muted">
            {course.summary}
          </p>
          <p className="mt-4 text-sm text-muted">
            {[
              categoryLabels.levels[course.level],
              course.durationLabel,
              course.modality,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </Container>
      </section>

      <section className="section-pad">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <ContentNotice className="mb-8">
              Este conteúdo ilustra a experiência da página de curso e ainda
              aguarda homologação como oferta oficial.
            </ContentNotice>
            <h2 className="font-display text-3xl">Sobre este curso</h2>
            <p className="mt-4 text-muted leading-relaxed">{course.description}</p>

            <h3 className="mt-10 font-display text-2xl">Objetivos</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-muted">
              {course.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-2xl">Módulos e aulas</h3>
            <div className="mt-4 space-y-4">
              {course.modules.map((module) => (
                <article
                  key={module.id}
                  className="rounded-[1.25rem] border border-sand bg-surface-elevated p-5"
                >
                  <h4 className="font-display text-xl">
                    {module.order}. {module.title}
                  </h4>
                  {module.description ? (
                    <p className="mt-2 text-sm text-muted">{module.description}</p>
                  ) : null}
                  <ul className="mt-4 space-y-2">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-start justify-between gap-3 border-t border-sand/80 pt-2 text-sm"
                      >
                        <span>
                          {lesson.order}. {lesson.title}
                        </span>
                        {lesson.durationMinutes ? (
                          <span className="shrink-0 text-muted">
                            {lesson.durationMinutes} min
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[1.25rem] border border-sand bg-[color-mix(in_srgb,var(--color-sand)_30%,white)] p-6">
            <h2 className="font-display text-2xl">Área do aluno</h2>
            <p className="mt-3 text-sm text-muted">
              Em uma fase futura, esta área poderá oferecer acesso às aulas,
              progresso e materiais. Nesta etapa não há autenticação, matrícula
              ou progresso persistente.
            </p>
            <Button disabled className="mt-6 w-full" aria-disabled="true">
              Matrícula indisponível
            </Button>
          </aside>
        </Container>
      </section>
    </>
  );
}
