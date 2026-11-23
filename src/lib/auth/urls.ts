import { PRODUCTION_CANONICAL_ORIGIN } from "@/lib/site/canonical";
import { parseDatabaseEnv } from "@/lib/db/env-shared";

/**
 * Resolve a URL pública do Better Auth sem misturar Preview e localhost.
 * - Preferência: BETTER_AUTH_URL → APP_URL
 * - Vercel Preview: https://$VERCEL_URL (nunca localhost)
 * - Vercel Production: canônico Nova Vida
 * - Local: localhost apenas fora da Vercel
 */
type EnvLike = Record<string, string | undefined>;

export function getAuthPublicUrl(env: EnvLike = process.env): string {
  const explicit =
    env.BETTER_AUTH_URL?.trim() || env.APP_URL?.trim() || "";
  if (explicit) {
    return stripTrailingSlash(explicit);
  }

  const vercelEnv = env.VERCEL_ENV;
  if (vercelEnv === "preview" && env.VERCEL_URL?.trim()) {
    return `https://${env.VERCEL_URL.trim()}`;
  }
  if (vercelEnv === "production") {
    return PRODUCTION_CANONICAL_ORIGIN;
  }

  if (env.VERCEL) {
    // Ambiente Vercel sem URL explícita — não cair em localhost.
    if (env.VERCEL_URL?.trim()) {
      return `https://${env.VERCEL_URL.trim()}`;
    }
    return PRODUCTION_CANONICAL_ORIGIN;
  }

  return "http://localhost:3000";
}

export function buildTrustedOrigins(env: EnvLike = process.env): string[] {
  const origins = new Set<string>();
  const candidates = [env.BETTER_AUTH_URL, env.APP_URL];

  if (env.VERCEL_ENV === "preview" && env.VERCEL_URL?.trim()) {
    candidates.push(`https://${env.VERCEL_URL.trim()}`);
  }
  if (env.VERCEL_ENV === "production" || env.NODE_ENV === "production") {
    candidates.push(PRODUCTION_CANONICAL_ORIGIN);
  }

  // localhost somente em desenvolvimento local (fora da Vercel)
  const isLocalDev =
    !env.VERCEL &&
    (env.NODE_ENV === "development" ||
      parseDatabaseEnv(env.DATABASE_ENV) === "development" ||
      !env.NODE_ENV);
  if (isLocalDev) {
    candidates.push("http://localhost:3000");
  }

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    try {
      origins.add(new URL(value).origin);
    } catch {
      // ignora
    }
  }

  return [...origins];
}

function stripTrailingSlash(url: string): string {
  return url.replace(/\/+$/, "");
}
