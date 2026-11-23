import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7 — configuração de schema e datasource.
 * Migrations preferem DIRECT_URL (mesmo banco, conexão direta).
 * Nunca aplicar migrate em production nesta sprint.
 */
const migrationUrl =
  process.env.DIRECT_URL?.trim() || process.env.DATABASE_URL?.trim() || "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: migrationUrl,
  },
});
