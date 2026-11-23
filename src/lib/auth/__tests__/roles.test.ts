import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  canAccessAdminPanel,
  resolveServerRole,
  stripClientPrivilegeFields,
} from "../permissions-test-exports";

describe("RBAC administrativo", () => {
  it("OWNER e ADMIN acessam o painel", () => {
    assert.equal(canAccessAdminPanel("OWNER"), true);
    assert.equal(canAccessAdminPanel("ADMIN"), true);
  });

  it("demais papéis não acessam o painel por padrão", () => {
    for (const role of ["USER", "EDITOR", "REVIEWER", "PASTORAL", null, undefined, ""]) {
      assert.equal(canAccessAdminPanel(role), false);
    }
  });

  it("role do servidor ignora valores desconhecidos", () => {
    assert.equal(resolveServerRole("ADMIN"), "ADMIN");
    assert.equal(resolveServerRole("hacker"), "USER");
    assert.equal(resolveServerRole(undefined), "USER");
  });

  it("remove campos privilegiados enviados pelo cliente", () => {
    const safe = stripClientPrivilegeFields({
      email: "a@b.com",
      role: "OWNER",
      isAdmin: true,
      permissions: ["*"],
      admin: true,
      name: "Teste",
    });
    assert.deepEqual(safe, { email: "a@b.com", name: "Teste" });
    assert.equal("role" in safe, false);
    assert.equal("isAdmin" in safe, false);
  });
});
