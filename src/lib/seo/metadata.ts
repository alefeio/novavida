import type { Metadata } from "next";
import { institution } from "@/content/institution";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_IMAGE_WIDTH,
  getMetadataBaseUrl,
} from "@/lib/site/canonical";

const siteName = institution.name;

/** Descrição institucional para compartilhamento social (WhatsApp/OG). */
export const defaultDescription =
  "Renovando Vidas pela Palavra. Um lugar de fé, acolhimento e comunhão para crescer em Jesus e fortalecer famílias.";

export function createPageMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  imagePath,
  imageAlt,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  /** Caminho público relativo (ex.: /images/blog/cover.jpg). Fallback: OG institucional. */
  imagePath?: string;
  imageAlt?: string;
}): Metadata {
  const fullTitle =
    title === siteName ? title : `${title} | ${institution.shortName}`;
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const pageUrl = absoluteUrl(canonicalPath);
  const ogImagePath = imagePath?.trim() || DEFAULT_OG_IMAGE_PATH;
  const ogImageUrl = absoluteUrl(ogImagePath);
  const ogAlt = imageAlt?.trim() || DEFAULT_OG_IMAGE_ALT;

  const ogImage = {
    url: ogImageUrl,
    secureUrl: ogImageUrl,
    width: DEFAULT_OG_IMAGE_WIDTH,
    height: DEFAULT_OG_IMAGE_HEIGHT,
    type: "image/jpeg" as const,
    alt: ogAlt,
  };

  return {
    metadataBase: getMetadataBaseUrl(),
    title: fullTitle,
    description,
    applicationName: institution.shortName,
    alternates: {
      canonical: pageUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      locale: "pt_BR",
      type: "website",
      siteName,
      url: pageUrl,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
