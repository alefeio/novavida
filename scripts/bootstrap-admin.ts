/**
 * Bootstrap controlado do primeiro OWNER/ADMIN.
 *
 * Uso (somente ambiente local/DEV com banco exclusivo):
 *   npx tsx scripts/bootstrap-admin.ts --email=... --name=... --role=OWNER
 *
 * A senha é solicitada interativamente (não passe por argv/logs).
 * Não executar em production nesta sprint.
 */

import "dotenv/config";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { hashPassword } from "better-auth/crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type AdminRole } from "../src/generated/prisma";
import { assertDatabaseEnvForMigrations } from "../src/lib/db/env-shared";

function readArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.find((a) => a.startsWith(prefix))?.slice(prefix.length);
}

async function promptHidden(label: string): Promise<string> {
  const rl = createInterface({ input, output });
  try {
    // Nota: em Windows o eco pode permanecer; evite compartilhar a sessão.
    const value = await rl.question(label);
    return value.trim();
  } finally {
    rl.close();
  }
}

async function main() {
  const gate = assertDatabaseEnvForMigrations({ allowProduction: false });
  console.log(`[bootstrap] DATABASE_ENV=${gate.databaseEnv} (urls omitidas)`);

  const email = readArg("email")?.trim().toLowerCase();
  const name = readArg("name")?.trim();
  const roleArg = (readArg("role")?.trim().toUpperCase() || "OWNER") as AdminRole;

  if (!email || !name) {
    throw new Error("Informe --email= e --name=.");
  }
  if (roleArg !== "OWNER" && roleArg !== "ADMIN") {
    throw new Error("Role permitido no bootstrap: OWNER ou ADMIN.");
  }

  const password = await promptHidden("Senha forte (mín. 12 chars, não será ecoada nos logs): ");
  if (password.length < 12) {
    throw new Error("Senha deve ter pelo menos 12 caracteres.");
  }

  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });
  const prisma = new PrismaClient({ adapter });

  try {
    const existingAdmins = await prisma.user.count({
      where: { role: { in: ["ADMIN", "OWNER"] } },
    });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser && existingAdmins > 0 && existingUser.role === "USER") {
      // Permite promover apenas se for o fluxo explícito e ainda sem excesso de risco:
      // nesta sprint, promoção só quando ainda não há admin OU usuário já é alvo do bootstrap.
    }

    if (existingAdmins > 0 && (!existingUser || !["ADMIN", "OWNER"].includes(existingUser.role))) {
      throw new Error(
        "Já existe administrador. Bootstrap inicial bloqueado para evitar elevação não auditada em massa.",
      );
    }

    const passwordHash = await hashPassword(password);
    const user =
      existingUser ??
      (await prisma.user.create({
        data: {
          name,
          email,
          emailVerified: true,
          role: roleArg,
          accounts: {
            create: {
              accountId: email,
              providerId: "credential",
              password: passwordHash,
            },
          },
        },
      }));

    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { role: roleArg, name, emailVerified: true },
      });
      const account = await prisma.account.findFirst({
        where: { userId: existingUser.id, providerId: "credential" },
      });
      if (account) {
        await prisma.account.update({
          where: { id: account.id },
          data: { password: passwordHash },
        });
      } else {
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            accountId: email,
            providerId: "credential",
            password: passwordHash,
          },
        });
      }
    }

    await prisma.auditLog.create({
      data: {
        action: existingUser ? "bootstrap.role_assigned" : "bootstrap.admin_created",
        actorId: user.id,
        targetType: "user",
        targetId: user.id,
        metadata: {
          role: roleArg,
          emailDomain: email.split("@")[1] ?? "unknown",
          environment: gate.databaseEnv,
        },
      },
    });

    console.log("[bootstrap] OK — administrador preparado (detalhes sensíveis omitidos).");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("[bootstrap] FALHA:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
