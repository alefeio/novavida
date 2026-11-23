import { CourseFilters } from "@/components/courses/CourseFilters";
import { Container } from "@/components/ui/Container";
import { ContentNotice } from "@/components/ui/ContentNotice";
import { PageHero } from "@/components/ui/PageHero";
import { getCourses } from "@/lib/content";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "Cursos",
  description:
    "Formação e estudos da Nova Vida. Catálogo demonstrativo preparado para futura integração.",
  path: "/cursos",
  noIndex: true,
});

export default function CursosPage() {
  const courses = getCourses();

  return (
    <>
      <PageHero
        eyebrow="Cursos"
        title="Formação para crescer na Palavra"
        description="Uma proposta de crescimento contínuo: fundamentos, família, oração e discipulado."
        image="/images/courses/fundamentos.jpg"
        imageAlt="Imagem demonstrativa de estudo e leitura"
        tone="photo"
        breadcrumbs={[
          { label: "Início", href: "/" },
          { label: "Cursos" },
        ]}
      />

      <section className="section-pad">
        <Container>
          <ContentNotice className="mb-8">
            Os cursos desta fase ilustram a experiência do catálogo e ainda não
            representam ofertas oficiais da Nova Vida.
          </ContentNotice>
          <CourseFilters courses={courses} />
        </Container>
      </section>
    </>
  );
}
