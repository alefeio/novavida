import "server-only";

import type { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db/prisma";

export type AuditAction =
  | "auth.sign_in"
  | "auth.sign_out"
  | "auth.sign_in_denied"
  | "auth.access_denied"
  | "bootstrap.admin_created"
  | "bootstrap.role_assigned"
  | "admin.panel_view";

type AuditInput = {
  action: AuditAction;
  actorId?: string | null;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string | null;
  userAgent?: string | null;
};

/**
 * Registra auditoria sem senhas, tokens ou dados pastorais.
 * Falhas de auditoria não devem derrubar o fluxo principal em produção.
 */
export async function writeAuditLog(input: AuditInput): Promise<void> {
  try {
    const safeMetadata = sanitizeMetadata(input.metadata);
    await prisma.auditLog.create({
      data: {
        action: input.action,
        actorId: input.actorId ?? null,
        targetType: input.targetType ?? null,
        targetId: input.targetId ?? null,
        metadata: (safeMetadata ?? undefined) as
          | Prisma.InputJsonValue
          | undefined,
        ipAddress: input.ipAddress ?? null,
        userAgent: input.userAgent ?? null,
      },
    });
  } catch (error) {
    console.error("[audit] falha ao registrar evento", {
      action: input.action,
      reason: error instanceof Error ? error.message : "unknown",
    });
  }
}

const FORBIDDEN_KEYS = [
  "password",
  "token",
  "secret",
  "authorization",
  "cookie",
  "session",
  "hash",
];

function sanitizeMetadata(
  metadata?: Record<string, unknown>,
): Record<string, unknown> | null {
  if (!metadata) return null;
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(metadata)) {
    const lower = key.toLowerCase();
    if (FORBIDDEN_KEYS.some((f) => lower.includes(f))) continue;
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      out[key] = value;
    } else if (value === null) {
      out[key] = null;
    } else if (Array.isArray(value) && value.every((v) => typeof v === "string")) {
      out[key] = value.slice(0, 20);
    }
  }
  return out;
}
