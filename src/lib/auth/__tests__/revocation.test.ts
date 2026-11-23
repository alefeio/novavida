import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { evaluateAdminAccessFromRoles } from "../access-policy";

describe("revogação de permissões administrativas", () => {
  it("ADMIN na sessão em cache é ignorado se o banco revogou para USER", () => {
    const result = evaluateAdminAccessFromRoles({
      authenticated: true,
      roleFromSessionCache: "ADMIN",
      roleFromDatabase: "USER",
    });
    assert.equal(result, "forbidden");
  });

  it("OWNER revogado para EDITOR perde acesso", () => {
    const result = evaluateAdminAccessFromRoles({
      authenticated: true,
      roleFromSessionCache: "OWNER",
      roleFromDatabase: "EDITOR",
    });
    assert.equal(result, "forbidden");
  });

  it("papel fresco ADMIN no banco autoriza mesmo com cache USER", () => {
    const result = evaluateAdminAccessFromRoles({
      authenticated: true,
      roleFromSessionCache: "USER",
      roleFromDatabase: "ADMIN",
    });
    assert.equal(result, "allow");
  });

  it("usuário sem registro no banco é tratado como não autenticado", () => {
    const result = evaluateAdminAccessFromRoles({
      authenticated: true,
      roleFromSessionCache: "OWNER",
      roleFromDatabase: null,
    });
    assert.equal(result, "unauthenticated");
  });
});
