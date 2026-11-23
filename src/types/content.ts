/**
 * Tipos de conteúdo da Nova Vida.
 * Preparados para futura substituição de fontes locais por banco/CMS.
 */

export type ContentStatus = "confirmed" | "demo" | "pending";

export interface InstitutionalContent {
  name: string;
  shortName: string;
  tagline: string;
  mission: string;
  welcomeMessage: string;
  values: InstitutionalValue[];
  faithPrinciples: FaithPrinciple[];
  pendingNote: string;
}

export interface InstitutionalValue {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
}

export interface FaithPrinciple {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
}

export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
}

export interface ContactInfo {
  status: ContentStatus;
  address?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  social?: {
    platform: string;
    url: string;
    label: string;
  }[];
  notes: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  day?: string;
  time?: string;
  location?: string;
  audience?: string;
  status: ContentStatus;
}

export type CourseLevel = "iniciante" | "intermediario" | "avancado" | "todos";
export type CourseCategory =
  | "fundamentos"
  | "familia"
  | "oracao"
  | "discipulado"
  | "biblia";

export interface Lesson {
  id: string;
  title: string;
  summary?: string;
  durationMinutes?: number;
  order: number;
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  image: string;
  imageAlt: string;
  objectives: string[];
  modules: CourseModule[];
  durationLabel?: string;
  modality?: string;
  status: ContentStatus;
  featured?: boolean;
}

export type ArticleCategory =
  | "biblia"
  | "familia"
  | "vida-crista"
  | "oracao"
  | "comunhao";

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  image: string;
  imageAlt: string;
  publishedAt?: string;
  readingMinutes?: number;
  authorLabel?: string;
  status: ContentStatus;
  featured?: boolean;
}

export type MessageFormat = "texto" | "audio" | "video";

export interface Message {
  id: string;
  slug: string;
  title: string;
  summary: string;
  theme?: string;
  scripture?: string;
  format: MessageFormat;
  durationLabel?: string;
  publishedAt?: string;
  image?: string;
  imageAlt?: string;
  status: ContentStatus;
}

export interface SeoPageMeta {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}
