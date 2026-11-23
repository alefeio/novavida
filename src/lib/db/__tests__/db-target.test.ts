import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { DatabaseConfigError } from "../env-shared";
import {
  assertMigrationTargetReady,
  assertRuntimeAndDirectMatch,
  getRequiredDirectUrl,
  readExplicitDbIdentity,
} from "../db-target";

describe("destino de banco Nova Vida", () => {
  it("exige identidade explícita NV_DB_*", () => {
    assert.throws(
      () => readExplicitDbIdentity({ DATABASE_ENV: "development" }),
      (err: unknown) =>
        err instanceof DatabaseConfigError && /NV_DB_OWNER/.test(err.message),
    );
  });

  it("rejeita owner que não é novavida", () => {
    assert.throws(
      () =>
        readExplicitDbIdentity({
          DATABASE_ENV: "development",
          NV_DB_OWNER: "alexandrefeio",
          NV_DB_PROJECT: "novavida",
          NV_DB_BRANCH: "dev",
          NV_DB_NAME: "neondb",
        }),
      /NV_DB_OWNER/,
    );
  });

  it("aceita identidade Nova Vida completa", () => {
    const identity = readExplicitDbIdentity({
      DATABASE_ENV: "development",
      NV_DB_OWNER: "novavida",
      NV_DB_PROJECT: "novavida",
      NV_DB_BRANCH: "dev",
      NV_DB_NAME: "neondb",
    });
    assert.equal(identity.project, "novavida");
    assert.equal(identity.branch, "dev");
    assert.equal(identity.database, "neondb");
  });

  it("detecta databases divergentes entre runtime e direct", () => {
    assert.throws(
      () =>
        assertRuntimeAndDirectMatch(
          "postgresql://u:p@ep-x.us-east-2.aws.neon.tech/db_a",
          "postgresql://u:p@ep-x.us-east-2.aws.neon.tech/db_b",
        ),
      /databases diferentes/,
    );
  });

  it("aceita pooler e direct do mesmo endpoint Neon", () => {
    const result = assertRuntimeAndDirectMatch(
      "postgresql://u:p@ep-cool-name-pooler.us-east-2.aws.neon.tech/neondb",
      "postgresql://u:p@ep-cool-name.us-east-2.aws.neon.tech/neondb",
    );
    assert.equal(result.runtime.database, "neondb");
    assert.equal(result.direct.database, "neondb");
  });

  it("bloqueia production migrate", () => {
    assert.throws(
      () =>
        assertMigrationTargetReady({
          allowProduction: false,
          env: {
            DATABASE_ENV: "production",
            NV_DB_OWNER: "novavida",
            NV_DB_PROJECT: "novavida",
            NV_DB_BRANCH: "main",
            NV_DB_NAME: "neondb",
            DATABASE_URL:
              "postgresql://u:p@ep-x.us-east-2.aws.neon.tech/neondb",
            DIRECT_URL:
              "postgresql://u:p@ep-x.us-east-2.aws.neon.tech/neondb",
          },
        }),
      /production/,
    );
  });

  it("exige DIRECT_URL sem fallback", () => {
    assert.throws(() => getRequiredDirectUrl({}), /DIRECT_URL é obrigatória/);
  });

  it("PASS com destino coerente em development", () => {
    const gate = assertMigrationTargetReady({
      allowProduction: false,
      env: {
        DATABASE_ENV: "development",
        NV_DB_OWNER: "novavida",
        NV_DB_PROJECT: "novavida",
        NV_DB_BRANCH: "dev",
        NV_DB_NAME: "neondb",
        DATABASE_URL:
          "postgresql://u:p@ep-cool-pooler.us-east-2.aws.neon.tech/neondb",
        DIRECT_URL: "postgresql://u:p@ep-cool.us-east-2.aws.neon.tech/neondb",
      },
    });
    assert.equal(gate.identity.environment, "development");
  });
});
