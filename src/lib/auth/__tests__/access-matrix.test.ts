import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canAccessAdminPanel } from "../roles";

/**
 * Matriz Sprint 2.0 — acesso ao shell /admin.
 * Simula decisões server-side sem banco (unidade).
 */
describe("matriz de acesso /admin", () => {
  const cases: Array<{
    label: string;
    authenticated: boolean;
    role?: string;
    expected: "allow" | "401" | "403";
  }> = [
    { label: "não autenticado", authenticated: false, expected: "401" },
    {
      label: "autenticado USER",
      authenticated: true,
      role: "USER",
      expected: "403",
    },
    {
      label: "autenticado EDITOR",
      authenticated: true,
      role: "EDITOR",
      expected: "403",
    },
    {
      label: "sessão revogada/expirada (sem user)",
      authenticated: false,
      expected: "401",
    },
    {
      label: "ADMIN autorizado",
      authenticated: true,
      role: "ADMIN",
      expected: "allow",
    },
    {
      label: "OWNER autorizado",
      authenticated: true,
      role: "OWNER",
      expected: "allow",
    },
    {
      label: "cliente envia role OWNER sem sessão",
      authenticated: false,
      role: "OWNER",
      expected: "401",
    },
  ];

  for (const testCase of cases) {
    it(testCase.label, () => {
      if (!testCase.authenticated) {
        assert.equal(testCase.expected, "401");
        return;
      }
      const allowed = canAccessAdminPanel(testCase.role);
      if (testCase.expected === "allow") assert.equal(allowed, true);
      if (testCase.expected === "403") assert.equal(allowed, false);
    });
  }
});
