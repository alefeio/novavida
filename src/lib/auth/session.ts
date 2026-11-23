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

export async function requireAdminAccess(): Promise<AdminAccessResult> {
  if (!isAdminDatabaseConfigured()) {
    return { ok: false, reason: "misconfigured" };
  }

  const session = await getServerSession();
  if (!session?.user) {
    return { ok: false, reason: "unauthenticated" };
  }

  const role = resolveServerRole(
    (session.user as { role?: string }).role,
  );

  if (!canAccessAdminPanel(role)) {
    await writeAuditLog({
      action: "auth.access_denied",
      actorId: session.user.id,
      metadata: { role, path: "/admin" },
    });
    return { ok: false, reason: "forbidden" };
  }

  return {
    ok: true,
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role,
    },
  };
}

/**
 * Rejeita qualquer tentativa de elevar privilégios via payload do cliente.
 * Usado em actions/handlers que recebem body JSON.
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
