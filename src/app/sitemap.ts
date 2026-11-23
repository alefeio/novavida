import type { MetadataRoute } from "next";

/**
 * Sitemap apenas com rotas institucionais públicas válidas.
 * Cursos, blog e mensagens demonstrativos ficam de fora até homologação.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/sobre",
    "/nossa-fe",
    "/cultos-e-encontros",
    "/comunidade",
    "/oracao",
    "/visite-nos",
    "/contato",
  ];

  return routes.map((path) => ({
    url: path,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
