import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createPageMetadata, defaultDescription } from "../metadata";
import { PRODUCTION_CANONICAL_ORIGIN } from "../../site/canonical";

describe("metadados Open Graph", () => {
  it("homepage usa descrição institucional e imagem absoluta", () => {
    const previous = process.env.VERCEL;
    process.env.VERCEL = "1";
    try {
      const meta = createPageMetadata({
        title: "Nova Vida — Igreja do Renascimento",
        description: defaultDescription,
        path: "/",
      });
      assert.equal(meta.openGraph?.siteName, "Nova Vida — Igreja do Renascimento");
      assert.equal(
        (meta.openGraph as { url?: string })?.url,
        `${PRODUCTION_CANONICAL_ORIGIN}/`,
      );
      const images = meta.openGraph?.images;
      assert.ok(Array.isArray(images) && images.length > 0);
      const first = images[0] as { url?: string | URL; width?: number; height?: number };
      assert.match(String(first.url), /^https:\/\/novavida-navy\.vercel\.app\/images\/social\/novavida-og\.jpg$/);
      assert.equal(first.width, 1200);
      assert.equal(first.height, 630);
      const twitter = meta.twitter as { card?: string } | undefined;
      assert.equal(twitter?.card, "summary_large_image");
    } finally {
      if (previous === undefined) delete process.env.VERCEL;
      else process.env.VERCEL = previous;
    }
  });

  it("descrição padrão bate com o texto de compartilhamento", () => {
    assert.match(defaultDescription, /Renovando Vidas pela Palavra/);
    assert.match(defaultDescription, /acolhimento/);
  });
});
