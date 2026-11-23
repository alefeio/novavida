import type { ContentStatus } from "@/types/content";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(iso?: string) {
  if (!iso) return null;
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function statusLabel(status: ContentStatus) {
  switch (status) {
    case "confirmed":
      return "Conteúdo confirmado";
    case "demo":
      return "Conteúdo demonstrativo";
    case "pending":
      return "Aguardando confirmação";
    default:
      return "";
  }
}

export function readingTimeLabel(minutes?: number) {
  if (!minutes) return null;
  return `${minutes} min de leitura`;
}
