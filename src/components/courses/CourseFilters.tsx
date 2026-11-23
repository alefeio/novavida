"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { categoryLabels } from "@/content/institution";
import type { Course, CourseCategory } from "@/types/content";
import { cn } from "@/lib/utils";

const allCategories: Array<CourseCategory | "todos"> = [
  "todos",
  "fundamentos",
  "familia",
  "oracao",
  "discipulado",
  "biblia",
];

export function CourseFilters({ courses }: { courses: Course[] }) {
  const [category, setCategory] = useState<CourseCategory | "todos">("todos");

  const filtered = useMemo(() => {
    if (category === "todos") return courses;
    return courses.filter((course) => course.category === category);
  }, [category, courses]);

  const available = new Set(courses.map((c) => c.category));

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filtrar cursos por categoria"
        className="flex flex-wrap gap-2"
      >
        {allCategories
          .filter((item) => item === "todos" || available.has(item))
          .map((item) => {
            const selected = category === item;
            const label =
              item === "todos" ? "Todos" : categoryLabels.courses[item];
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={selected}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-semibold transition",
                  selected
                    ? "bg-olive text-on-brand"
                    : "bg-sand/70 text-ink hover:bg-sage/40",
                )}
                onClick={() => setCategory(item)}
              >
                {label}
              </button>
            );
          })}
      </div>

      {filtered.length > 0 ? (
        <div
          className={cn(
            "mt-8 grid grid-cols-1 gap-6 md:grid-cols-2",
            filtered.length === 1 && "md:max-w-xl",
          )}
        >
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-8"
          title="Nenhum curso nesta categoria"
          description="Tente outra categoria ou volte para a visão completa do catálogo."
        />
      )}
    </div>
  );
}
