import "server-only";

import { headers } from "next/headers";
import { getAuth } from "@/lib/auth/auth";
import {
  canAccessAdminPanel,
  resolveServerRole,
  type AppRole,
} from "@/lib/auth/roles";
import { writeAuditLog } from "@/lib/auth/audit";
import { isAdminDatabaseConfigured } from "@/lib/db/env";
import { prisma } from "@/lib/db/prisma";

export type AdminSessionUser = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
};

export type AdminAccessResult =
  | { ok: true; user: AdminSessionUser }
  | { ok: false; reason: "unauthenticated" | "forbidden" | "misconfigured" };

/**
 * Lê sessão no servidor via Better Auth. Não confia em cookies parseados
 * manualmente nem em atributos privilegiados do cliente.
 */
export async function getServerSession() {
  if (!isAdminDatabaseConfigured()) {
    return null;
  }
  const session = await getAuth().api.getSession({
    headers: await headers(),
  });
  return session;
}

/**
 * Autorização administrativa: o papel é sempre relido do banco.
 * Papel em cache de sessão/cookie NÃO é autoridade.
 */
export async function requireAdminAccess(): Promise<AdminAccessResult> {
  if (!isAdminDatabaseConfigured()) {
    return { ok: false, reason: "misconfigured" };
  }

  const session = await getServerSession();
  if (!session?.user) {
    return { ok: false, reason: "unauthenticated" };
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!dbUser) {
    await writeAuditLog({
      action: "auth.access_denied",
      actorId: session.user.id,
      metadata: { reason: "user_missing", path: "/admin" },
    });
    return { ok: false, reason: "unauthenticated" };
  }

  const role = resolveServerRole(dbUser.role);

  if (!canAccessAdminPanel(role)) {
    await writeAuditLog({
      action: "auth.access_denied",
      actorId: dbUser.id,
      metadata: {
        role,
        path: "/admin",
        reason: "role_revoked_or_insufficient",
      },
    });
    return { ok: false, reason: "forbidden" };
  }

  return {
    ok: true,
    user: {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role,
    },
  };
}

/**
 * Rejeita qualquer tentativa de elevar privilégios via payload do cliente.
 */
export function stripClientPrivilegeFields<T extends Record<string, unknown>>(
  body: T,
): Omit<T, "role" | "isAdmin" | "permissions" | "admin"> {
  const safe = { ...body };
  delete safe.role;
  delete safe.isAdmin;
  delete safe.permissions;
  delete safe.admin;
  return safe;
}
