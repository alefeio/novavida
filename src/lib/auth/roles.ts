export type AppRole =
  | "USER"
  | "EDITOR"
  | "REVIEWER"
  | "ADMIN"
  | "OWNER"
  | "PASTORAL";

export const ADMIN_PANEL_ROLES: readonly AppRole[] = [
  "ADMIN",
  "OWNER",
] as const;

export function canAccessAdminPanel(role: string | null | undefined): boolean {
  if (!role) return false;
  return (ADMIN_PANEL_ROLES as readonly string[]).includes(role);
}

export function isKnownRole(role: string): role is AppRole {
  return (
    role === "USER" ||
    role === "EDITOR" ||
    role === "REVIEWER" ||
    role === "ADMIN" ||
    role === "OWNER" ||
    role === "PASTORAL"
  );
}

/**
 * Nunca confiar em role vinda do cliente. Esta função só normaliza
 * valores já lidos do banco/sessão server-side.
 */
export function resolveServerRole(
  roleFromDatabase: string | null | undefined,
): AppRole {
  if (roleFromDatabase && isKnownRole(roleFromDatabase)) {
    return roleFromDatabase;
  }
  return "USER";
}
