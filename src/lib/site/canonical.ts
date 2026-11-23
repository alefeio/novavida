/**
 * URL canônica centralizada da Nova Vida.
 * Produção pública atual: novavida-navy.vercel.app (não usar novavida.vercel.app).
 */

export const PRODUCTION_CANONICAL_ORIGIN = "https://novavida-navy.vercel.app";

/**
 * Base para Metadata API / Open Graph.
 * - Local (não Vercel): localhost
 * - Ambientes públicos (Vercel production/preview): canônico de produção
 * - Override: NEXT_PUBLIC_SITE_URL ou CANONICAL_SITE_URL
 */
export function getMetadataBaseUrl(): URL {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.CANONICAL_SITE_URL?.trim();

  if (configured) {
    return new URL(configured);
  }

  const onVercel = Boolean(process.env.VERCEL);
  if (onVercel) {
    return new URL(PRODUCTION_CANONICAL_ORIGIN);
  }

  if (process.env.NODE_ENV === "development") {
    return new URL("http://localhost:3000");
  }

  return new URL(PRODUCTION_CANONICAL_ORIGIN);
}

export function absoluteUrl(path: string): string {
  const base = getMetadataBaseUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, base).toString();
}

export const DEFAULT_OG_IMAGE_PATH = "/images/social/novavida-og.jpg";
export const DEFAULT_OG_IMAGE_ALT =
  "Nova Vida — Igreja do Renascimento. Renovando Vidas pela Palavra.";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;
