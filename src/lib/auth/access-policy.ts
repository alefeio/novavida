import { canAccessAdminPanel, resolveServerRole } from "./roles";

/**
 * Avalia acesso admin a partir do papel fresco do banco.
 * Papel em cache de sessão é deliberadamente ignorado.
 */
export function evaluateAdminAccessFromRoles(input: {
  authenticated: boolean;
  roleFromSessionCache?: string | null;
  roleFromDatabase?: string | null;
}): "allow" | "unauthenticated" | "forbidden" {
  if (!input.authenticated) return "unauthenticated";
  if (!input.roleFromDatabase) return "unauthenticated";
  const role = resolveServerRole(input.roleFromDatabase);
  void input.roleFromSessionCache;
  return canAccessAdminPanel(role) ? "allow" : "forbidden";
}
