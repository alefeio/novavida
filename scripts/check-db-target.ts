/**
 * Pré-flight de destino de migration — identidade explícita + coerência de URLs.
 * Exit 0 = elegível (DEV/PREVIEW). Exit 2 = BLOCKED.
 * Não revela credenciais.
 */

import "dotenv/config";
import { DatabaseConfigError } from "../src/lib/db/env-shared";
import {
  assertMigrationTargetReady,
  formatRedactedEndpoint,
} from "../src/lib/db/db-target";

async function main() {
  console.log("=== Gate B pré-flight (Nova Vida) ===");
  console.log(
    `BETTER_AUTH_SECRET: ${process.env.BETTER_AUTH_SECRET?.trim() ? "definido" : "ausente"}`,
  );

  try {
    const gate = assertMigrationTargetReady({ allowProduction: false });
    console.log(`DATABASE_ENV: ${gate.identity.environment}`);
    console.log(`NV_DB_PROJECT: ${gate.identity.project}`);
    console.log(`NV_DB_BRANCH: ${gate.identity.branch}`);
    console.log(`NV_DB_NAME: ${gate.identity.database}`);
    console.log(`DATABASE_URL: ${formatRedactedEndpoint(gate.runtime)}`);
    console.log(`DIRECT_URL: ${formatRedactedEndpoint(gate.direct)}`);
    console.log(
      `PASS: destino elegível para migrate (${gate.identity.environment}).`,
    );
    process.exit(0);
  } catch (error) {
    if (error instanceof DatabaseConfigError) {
      console.error(`BLOCKED: ${error.message}`);
      process.exit(2);
    }
    throw error;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
