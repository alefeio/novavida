/**
 * Wrapper de migrate que bloqueia production e exige pré-flight.
 * Uso: npx tsx scripts/migrate-guard.ts dev --name init-auth
 */

import { spawnSync } from "node:child_process";
import "dotenv/config";
import {
  assertDatabaseEnvForMigrations,
  DatabaseConfigError,
} from "../src/lib/db/env-shared";

const args = process.argv.slice(2);
const mode = args[0]; // dev | deploy | status
const rest = args.slice(1);

async function main() {
  try {
    assertDatabaseEnvForMigrations({ allowProduction: false });
  } catch (error) {
    if (error instanceof DatabaseConfigError) {
      console.error(`[migrate-guard] BLOCKED: ${error.message}`);
      process.exit(2);
    }
    throw error;
  }

  if (mode !== "dev" && mode !== "deploy" && mode !== "status") {
    console.error("Uso: tsx scripts/migrate-guard.ts <dev|deploy|status> [...args]");
    process.exit(1);
  }

  const prismaArgs =
    mode === "status"
      ? ["prisma", "migrate", "status"]
      : mode === "deploy"
        ? ["prisma", "migrate", "deploy"]
        : ["prisma", "migrate", "dev", ...rest];

  const result = spawnSync("npx", prismaArgs, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
  process.exit(result.status ?? 1);
}

main();
