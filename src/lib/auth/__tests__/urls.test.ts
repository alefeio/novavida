import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildTrustedOrigins, getAuthPublicUrl } from "../urls";
import { PRODUCTION_CANONICAL_ORIGIN } from "../../site/canonical";

describe("URLs de autenticação", () => {
  it("não usa localhost em Preview Vercel", () => {
    const url = getAuthPublicUrl({
      VERCEL: "1",
      VERCEL_ENV: "preview",
      VERCEL_URL: "novavida-git-feature.vercel.app",
    });
    assert.equal(url, "https://novavida-git-feature.vercel.app");
    assert.equal(url.includes("localhost"), false);
  });

  it("usa canônico em production Vercel sem APP_URL", () => {
    const url = getAuthPublicUrl({
      VERCEL: "1",
      VERCEL_ENV: "production",
    });
    assert.equal(url, PRODUCTION_CANONICAL_ORIGIN);
  });

  it("respeita BETTER_AUTH_URL explícita", () => {
    const url = getAuthPublicUrl({
      BETTER_AUTH_URL: "https://custom.example",
      VERCEL_ENV: "preview",
      VERCEL_URL: "ignored.vercel.app",
    });
    assert.equal(url, "https://custom.example");
  });

  it("trusted origins inclui localhost só fora da Vercel", () => {
    const local = buildTrustedOrigins({
      NODE_ENV: "development",
    });
    assert.ok(local.includes("http://localhost:3000"));

    const preview = buildTrustedOrigins({
      VERCEL: "1",
      VERCEL_ENV: "preview",
      VERCEL_URL: "novavida-git-feature.vercel.app",
      NODE_ENV: "production",
    });
    assert.equal(preview.includes("http://localhost:3000"), false);
    assert.ok(preview.includes("https://novavida-git-feature.vercel.app"));
  });
});
