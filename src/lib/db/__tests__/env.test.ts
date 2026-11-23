import assert from "node:assert/strict";
import { describe, it, beforeEach, afterEach } from "node:test";
import {
  assertDatabaseEnvForMigrations,
  DatabaseConfigError,
  isAdminDatabaseConfigured,
  parseDatabaseEnv,
} from "../env-shared";

const KEYS = [
  "DATABASE_URL",
  "DIRECT_URL",
  "DATABASE_ENV",
  "BETTER_AUTH_SECRET",
] as const;

describe("configuração de banco", () => {
  const backup: Record<string, string | undefined> = {};

  beforeEach(() => {
    for (const key of KEYS) {
      backup[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of KEYS) {
      if (backup[key] === undefined) delete process.env[key];
      else process.env[key] = backup[key];
    }
  });

  it("parseDatabaseEnv valida valores", () => {
    assert.equal(parseDatabaseEnv("development"), "development");
    assert.equal(parseDatabaseEnv("preview"), "preview");
    assert.equal(parseDatabaseEnv("production"), "production");
    assert.equal(parseDatabaseEnv("staging"), null);
    assert.equal(parseDatabaseEnv(undefined), null);
  });

  it("bloqueia ausência de variáveis obrigatórias", () => {
    assert.throws(
      () => assertDatabaseEnvForMigrations(),
      (err: unknown) => err instanceof DatabaseConfigError,
    );
  });

  it("bloqueia migrations em production nesta sprint", () => {
    process.env.DATABASE_ENV = "production";
    process.env.DATABASE_URL = "postgresql://user:pass@host/db";
    process.env.DIRECT_URL = "postgresql://user:pass@host/db";
    assert.throws(
      () => assertDatabaseEnvForMigrations({ allowProduction: false }),
      (err: unknown) =>
        err instanceof DatabaseConfigError && /production/.test(err.message),
    );
  });

  it("aceita development com urls presentes (sem revelar valores)", () => {
    process.env.DATABASE_ENV = "development";
    process.env.DATABASE_URL = "postgresql://user:pass@host/db";
    process.env.DIRECT_URL = "postgresql://user:pass@host/db";
    const gate = assertDatabaseEnvForMigrations();
    assert.equal(gate.databaseEnv, "development");
    assert.equal(gate.hasDatabaseUrl, true);
    assert.equal(gate.hasDirectUrl, true);
  });

  it("site público pode operar sem banco admin configurado", () => {
    assert.equal(isAdminDatabaseConfigured(), false);
  });

  it("exige secret além do banco para auth admin", () => {
    process.env.DATABASE_ENV = "development";
    process.env.DATABASE_URL = "postgresql://user:pass@host/db";
    assert.equal(isAdminDatabaseConfigured(), false);
    process.env.BETTER_AUTH_SECRET = "x".repeat(32);
    assert.equal(isAdminDatabaseConfigured(), true);
  });
});
