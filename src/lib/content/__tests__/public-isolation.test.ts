import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("isolamento do site público", () => {
  it("lib/content não importa prisma nem auth", () => {
    const source = readFileSync(
      join(process.cwd(), "src/lib/content/index.ts"),
      "utf8",
    );
    assert.equal(/prisma|better-auth|getPrisma|DATABASE_URL/i.test(source), false);
  });

  it("navegação pública não expõe Admin", () => {
    const source = readFileSync(
      join(process.cwd(), "src/content/navigation.ts"),
      "utf8",
    );
    assert.equal(/\/admin/i.test(source), false);
  });

  it(".env.example não contém segredos reais", () => {
    const source = readFileSync(join(process.cwd(), ".env.example"), "utf8");
    assert.equal(/postgresql:\/\/.+@.+\//i.test(source), false);
    assert.equal(/sk_live|neon\.tech\/[a-z0-9]/i.test(source), false);
    assert.match(source, /DATABASE_URL=/);
    assert.match(source, /BETTER_AUTH_SECRET=/);
  });
});
