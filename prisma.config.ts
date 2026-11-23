import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7 — migrations usam SOMENTE DIRECT_URL (obrigatória).
 * Sem fallback silencioso para DATABASE_URL.
 */
const directUrl = process.env.DIRECT_URL?.trim() ?? "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // String vazia bloqueia migrate acidental sem DIRECT_URL configurada.
    url: directUrl,
  },
});
