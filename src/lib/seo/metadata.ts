import type { Metadata } from "next";
import { institution } from "@/content/institution";

const siteName = institution.name;

export function createPageMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle =
    title === siteName ? title : `${title} | ${institution.shortName}`;

  return {
    title: fullTitle,
    description,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      locale: "pt_BR",
      type: "website",
      siteName,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export const defaultDescription =
  "Nova Vida — Igreja do Renascimento. Renovando vidas pela Palavra. Um espaço de acolhimento, fé, comunhão e crescimento espiritual.";
