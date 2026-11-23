import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/sobre", "/nossa-fe", "/cultos-e-encontros", "/comunidade", "/oracao", "/visite-nos", "/contato"],
      disallow: ["/cursos", "/blog", "/mensagens"],
    },
  };
}
