/**
 * Reexporta helpers puros para testes Node sem puxar server-only/Prisma.
 */
export {
  canAccessAdminPanel,
  resolveServerRole,
  isKnownRole,
  type AppRole,
} from "./roles";

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
