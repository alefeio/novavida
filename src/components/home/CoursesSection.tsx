import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ContentGrid } from "@/components/ui/ContentGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseCard } from "@/components/courses/CourseCard";
import { getFeaturedCourses } from "@/lib/content";

export function CoursesSection() {
  const courses = getFeaturedCourses(3);

  return (
    <section className="section-pad">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Cursos e formação"
            title="Crescer na Palavra com clareza e consistência"
            description="Uma amostra da área de formação espiritual. Os conteúdos abaixo ilustram a experiência futura do catálogo."
          />
          <Button href="/cursos" variant="secondary" className="shrink-0">
            Ver todos os cursos
          </Button>
        </div>
        <ContentGrid className="mt-10">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ContentGrid>
      </Container>
    </section>
  );
}
