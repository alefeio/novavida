import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { assertNoPasswordArgv } from "../lib/secure-prompt";

describe("bootstrap senha segura", () => {
  it("rejeita --password= em argv", () => {
    assert.throws(
      () =>
        assertNoPasswordArgv([
          "node",
          "bootstrap-admin.ts",
          "--email=a@b.com",
          "--password=secreta12345",
        ]),
      /proibida/i,
    );
  });

  it("rejeita --pass e --secret", () => {
    assert.throws(() => assertNoPasswordArgv(["node", "--pass=x"]), /proibida/i);
    assert.throws(
      () => assertNoPasswordArgv(["node", "--secret=y"]),
      /proibida/i,
    );
  });

  it("permite argv sem senha", () => {
    assert.doesNotThrow(() =>
      assertNoPasswordArgv([
        "node",
        "bootstrap-admin.ts",
        "--email=a@b.com",
        "--name=Admin",
        "--role=OWNER",
      ]),
    );
  });
});
