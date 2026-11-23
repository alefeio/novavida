import "server-only";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/db/prisma";
import { getAuthPublicUrl, isAdminDatabaseConfigured } from "@/lib/db/env";
import { canAccessAdminPanel } from "@/lib/auth/roles";
import { writeAuditLog } from "@/lib/auth/audit";

function createAuth() {
  const secret =
    process.env.BETTER_AUTH_SECRET?.trim() ||
    // Placeholder apenas para tipagem/build; rotas reais exigem isAdminDatabaseConfigured.
    "build-time-placeholder-not-for-runtime-use-32b";

  return betterAuth({
    appName: "Nova Vida Admin",
    baseURL: getAuthPublicUrl(),
    secret,
    database: prismaAdapter(prisma, {
      provider: "postgresql",
    }),
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 12,
    },
    user: {
      additionalFields: {
        role: {
          type: [
            "USER",
            "EDITOR",
            "REVIEWER",
            "ADMIN",
            "OWNER",
            "PASTORAL",
          ],
          required: false,
          defaultValue: "USER",
          input: false,
        },
      },
    },
    session: {
      expiresIn: 60 * 60 * 8,
      updateAge: 60 * 30,
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5,
      },
    },
    trustedOrigins: buildTrustedOrigins(),
    plugins: [nextCookies()],
    databaseHooks: {
      session: {
        create: {
          before: async (session) => {
            if (!isAdminDatabaseConfigured()) {
              throw new Error("Autenticação indisponível neste ambiente.");
            }
            const user = await prisma.user.findUnique({
              where: { id: session.userId },
              select: { role: true, email: true },
            });
            if (!user || !canAccessAdminPanel(user.role)) {
              await writeAuditLog({
                action: "auth.sign_in_denied",
                actorId: session.userId,
                metadata: {
                  reason: "insufficient_role",
                  role: user?.role ?? "missing",
                },
              });
              throw new Error(
                "Acesso administrativo não autorizado para este usuário.",
              );
            }
            return { data: session };
          },
          after: async (session) => {
            await writeAuditLog({
              action: "auth.sign_in",
              actorId: session.userId,
              metadata: { sessionId: session.id },
            });
          },
        },
      },
    },
  });
}

type AuthInstance = ReturnType<typeof createAuth>;

const globalForAuth = globalThis as unknown as {
  novaVidaAuth?: AuthInstance;
};

/** Instância lazy — evita custo na análise de build sem env de admin. */
export function getAuth(): AuthInstance {
  if (!globalForAuth.novaVidaAuth) {
    globalForAuth.novaVidaAuth = createAuth();
  }
  return globalForAuth.novaVidaAuth;
}

export type AuthSession = AuthInstance["$Infer"]["Session"];

function buildTrustedOrigins(): string[] {
  const origins = new Set<string>();
  const candidates = [
    process.env.BETTER_AUTH_URL,
    process.env.APP_URL,
    "http://localhost:3000",
  ];
  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;
    try {
      origins.add(new URL(value).origin);
    } catch {
      // ignora URL inválida
    }
  }
  return [...origins];
}
