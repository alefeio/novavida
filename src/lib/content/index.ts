import { articles } from "@/content/articles";
import { courses } from "@/content/courses";
import { contactInfo, institution } from "@/content/institution";
import { meetings, messages } from "@/content/messages";
import type {
  ArticleCategory,
  BlogArticle,
  Course,
  CourseCategory,
  Message,
} from "@/types/content";

/**
 * Camada de acesso a conteúdo.
 * Hoje lê arrays locais; no futuro pode consultar banco/CMS sem alterar as páginas.
 */

export function getInstitution() {
  return institution;
}

export function getContactInfo() {
  return contactInfo;
}

export function getCourses(options?: {
  category?: CourseCategory | "todos";
  featured?: boolean;
}): Course[] {
  let list = [...courses];
  if (options?.featured) {
    list = list.filter((course) => course.featured);
  }
  if (options?.category && options.category !== "todos") {
    list = list.filter((course) => course.category === options.category);
  }
  return list;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}

export function getCourseCategories(): CourseCategory[] {
  return Array.from(new Set(courses.map((course) => course.category)));
}

export function getArticles(options?: {
  category?: ArticleCategory | "todos";
  query?: string;
  featured?: boolean;
  limit?: number;
}): BlogArticle[] {
  let list = [...articles].sort((a, b) => {
    const da = a.publishedAt ?? "";
    const db = b.publishedAt ?? "";
    return db.localeCompare(da);
  });

  if (options?.featured) {
    list = list.filter((article) => article.featured);
  }

  if (options?.category && options.category !== "todos") {
    list = list.filter((article) => article.category === options.category);
  }

  if (options?.query?.trim()) {
    const q = options.query.trim().toLowerCase();
    list = list.filter(
      (article) =>
        article.title.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.content.toLowerCase().includes(q),
    );
  }

  if (options?.limit) {
    list = list.slice(0, options.limit);
  }

  return list;
}

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getRelatedArticles(
  slug: string,
  limit = 3,
): BlogArticle[] {
  const current = getArticleBySlug(slug);
  if (!current) return getArticles({ limit });
  return getArticles()
    .filter(
      (article) =>
        article.slug !== slug && article.category === current.category,
    )
    .slice(0, limit);
}

export function getArticleCategories(): ArticleCategory[] {
  return Array.from(new Set(articles.map((article) => article.category)));
}

export function getMessages(): Message[] {
  return [...messages].sort((a, b) => {
    const da = a.publishedAt ?? "";
    const db = b.publishedAt ?? "";
    return db.localeCompare(da);
  });
}

export function getMessageBySlug(slug: string): Message | undefined {
  return messages.find((message) => message.slug === slug);
}

export function getMeetings() {
  return meetings;
}

export function getFeaturedCourses(limit = 3) {
  const featured = getCourses({ featured: true });
  if (featured.length >= limit) return featured.slice(0, limit);
  return getCourses().slice(0, limit);
}
