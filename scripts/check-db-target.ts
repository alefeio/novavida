/**
 * Pré-flight de destino de migration — sem revelar credenciais.
 * Exit 0 = ambiente elegível (DEV/PREVIEW com vars). Exit 2 = BLOCKED.
 */

import "dotenv/config";
import {
  assertDatabaseEnvForMigrations,
  DatabaseConfigError,
  parseDatabaseEnv,
} from "../src/lib/db/env-shared";

function redactHost(url: string | undefined): string {
  if (!url) return "(ausente)";
  try {
    const parsed = new URL(url);
    return `${parsed.protocol}//${parsed.hostname}${parsed.pathname}`;
  } catch {
    return "(url-inválida)";
  }
}

function looksLikeSharedForeignProject(url: string | undefined): boolean {
  if (!url) return false;
  const lower = url.toLowerCase();
  // Heurística defensiva: nomes tipicamente associados a outros projetos.
  return (
    lower.includes("alexandrefeio") ||
    lower.includes("lp-alexandre") ||
    lower.includes("afeio")
  );
}

async function main() {
  const databaseEnv = parseDatabaseEnv(process.env.DATABASE_ENV);
  console.log("=== Gate B pré-flight (Nova Vida) ===");
  console.log(`DATABASE_ENV: ${databaseEnv ?? "(ausente)"}`);
  console.log(`DATABASE_URL host: ${redactHost(process.env.DATABASE_URL)}`);
  console.log(`DIRECT_URL host: ${redactHost(process.env.DIRECT_URL)}`);
  console.log(
    `BETTER_AUTH_SECRET: ${process.env.BETTER_AUTH_SECRET?.trim() ? "definido" : "ausente"}`,
  );

  if (
    looksLikeSharedForeignProject(process.env.DATABASE_URL) ||
    looksLikeSharedForeignProject(process.env.DIRECT_URL)
  ) {
    console.error(
      "BLOCKED: conexão parece pertencer a outro projeto. Use banco exclusivo da Nova Vida.",
    );
    process.exit(2);
  }

  try {
    const gate = assertDatabaseEnvForMigrations({ allowProduction: false });
    if (gate.databaseEnv === "production") {
      console.error("BLOCKED: production migrations bloqueadas nesta sprint.");
      process.exit(2);
    }
    console.log(`PASS: destino elegível para migrate (${gate.databaseEnv}).`);
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
