import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryLabels } from "@/content/institution";
import type { Course } from "@/types/content";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-[color-mix(in_srgb,var(--color-sand)_75%,var(--color-olive))] bg-surface-elevated transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link
        href={`/cursos/${course.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/25 to-transparent opacity-60" />
        <span className="absolute left-3 top-3 rounded-full bg-ivory/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-olive">
          {categoryLabels.courses[course.category]}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          {categoryLabels.levels[course.level]}
          {course.durationLabel ? ` · ${course.durationLabel}` : ""}
        </p>
        <h3 className="mt-2 font-display text-[1.65rem] leading-tight">
          <Link href={`/cursos/${course.slug}`} className="hover:text-olive">
            {course.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-[0.98rem]">
          {course.summary}
        </p>
        <Link
          href={`/cursos/${course.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-olive"
        >
          Ver detalhes
          <ArrowRight
            className="h-4 w-4 transition group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
