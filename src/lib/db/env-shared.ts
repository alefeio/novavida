export type DatabaseEnv = "development" | "preview" | "production";

const ALLOWED_DATABASE_ENVS: readonly DatabaseEnv[] = [
  "development",
  "preview",
  "production",
] as const;

export class DatabaseConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseConfigError";
  }
}

export function parseDatabaseEnv(
  value: string | undefined,
): DatabaseEnv | null {
  if (!value) return null;
  if ((ALLOWED_DATABASE_ENVS as readonly string[]).includes(value)) {
    return value as DatabaseEnv;
  }
  return null;
}

/**
 * Valida presença e coerência das variáveis de banco sem revelar valores.
 * Não conecta ao banco. Migrations exigem DIRECT_URL explícita.
 */
export function assertDatabaseEnvForMigrations(options?: {
  allowProduction?: boolean;
  env?: NodeJS.ProcessEnv;
}): {
  databaseEnv: DatabaseEnv;
  hasDatabaseUrl: boolean;
  hasDirectUrl: boolean;
} {
  const env = options?.env ?? process.env;
  const databaseEnv = parseDatabaseEnv(env.DATABASE_ENV);
  const hasDatabaseUrl = Boolean(env.DATABASE_URL?.trim());
  const hasDirectUrl = Boolean(env.DIRECT_URL?.trim());

  if (!databaseEnv) {
    throw new DatabaseConfigError(
      "DATABASE_ENV ausente ou inválido. Use development | preview | production.",
    );
  }

  if (!hasDatabaseUrl) {
    throw new DatabaseConfigError(
      "DATABASE_URL ausente. Configure a conexão runtime do banco exclusivo da Nova Vida.",
    );
  }

  if (!hasDirectUrl) {
    throw new DatabaseConfigError(
      "DIRECT_URL ausente. Configure a conexão direta do MESMO banco para migrations (sem fallback).",
    );
  }

  if (databaseEnv === "production" && !options?.allowProduction) {
    throw new DatabaseConfigError(
      "Migrations de production estão bloqueadas nesta sprint (Gate B).",
    );
  }

  return { databaseEnv, hasDatabaseUrl, hasDirectUrl };
}

export function isAdminDatabaseConfigured(
  env: NodeJS.ProcessEnv = process.env,
): boolean {
  return Boolean(
    env.DATABASE_URL?.trim() &&
      env.BETTER_AUTH_SECRET?.trim() &&
      parseDatabaseEnv(env.DATABASE_ENV),
  );
}
