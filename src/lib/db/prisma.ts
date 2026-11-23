import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";
import { isAdminDatabaseConfigured } from "@/lib/db/env";

const globalForPrisma = globalThis as unknown as {
  prismaNovaVida?: PrismaClient;
};

/**
 * Cliente Prisma lazy — só instancia quando o código administrativo/auth chama.
 * Páginas públicas não importam este módulo; build sem DATABASE_URL permanece válido.
 */
export function getPrisma(): PrismaClient {
  if (!isAdminDatabaseConfigured()) {
    throw new Error(
      "Banco administrativo não configurado. Defina DATABASE_URL, DATABASE_ENV e BETTER_AUTH_SECRET.",
    );
  }

  if (!globalForPrisma.prismaNovaVida) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });
    globalForPrisma.prismaNovaVida = new PrismaClient({ adapter });
  }

  return globalForPrisma.prismaNovaVida;
}

/** Uso interno Better Auth — proxy que adia a conexão até a primeira operação. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    const client = getPrisma();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});
