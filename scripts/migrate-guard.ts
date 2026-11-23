/**
 * Wrapper de migrate que exige DIRECT_URL, identidade Nova Vida e bloqueia production.
 * Uso: npx tsx scripts/migrate-guard.ts dev --name init-auth
 */

import { spawnSync } from "node:child_process";
import "dotenv/config";
import { DatabaseConfigError } from "../src/lib/db/env-shared";
import {
  assertMigrationTargetReady,
  getRequiredDirectUrl,
} from "../src/lib/db/db-target";

const args = process.argv.slice(2);
const mode = args[0]; // dev | deploy | status
const rest = args.slice(1);

async function main() {
  let directUrl: string;
  try {
    const gate = assertMigrationTargetReady({ allowProduction: false });
    directUrl = getRequiredDirectUrl();
    console.log(
      `[migrate-guard] OK preflight env=${gate.identity.environment} project=${gate.identity.project} branch=${gate.identity.branch}`,
    );
  } catch (error) {
    if (error instanceof DatabaseConfigError) {
      console.error(`[migrate-guard] BLOCKED: ${error.message}`);
      process.exit(2);
    }
    throw error;
  }

  if (mode !== "dev" && mode !== "deploy" && mode !== "status") {
    console.error(
      "Uso: tsx scripts/migrate-guard.ts <dev|deploy|status> [...args]",
    );
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
    env: {
      ...process.env,
      // Garante que o Prisma use somente a conexão direta para migrate.
      DATABASE_URL: directUrl,
      DIRECT_URL: directUrl,
    },
  });
  process.exit(result.status ?? 1);
}

main();
