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
 * Não conecta ao banco.
 */
export function assertDatabaseEnvForMigrations(options?: {
  allowProduction?: boolean;
}): {
  databaseEnv: DatabaseEnv;
  hasDatabaseUrl: boolean;
  hasDirectUrl: boolean;
} {
  const databaseEnv = parseDatabaseEnv(process.env.DATABASE_ENV);
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL?.trim());
  const hasDirectUrl = Boolean(process.env.DIRECT_URL?.trim());

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
      "DIRECT_URL ausente. Configure a conexão direta do MESMO banco para migrations.",
    );
  }

  if (databaseEnv === "production" && !options?.allowProduction) {
    throw new DatabaseConfigError(
      "Migrations de production estão bloqueadas nesta sprint (Gate B).",
    );
  }

  return { databaseEnv, hasDatabaseUrl, hasDirectUrl };
}

export function isAdminDatabaseConfigured(): boolean {
  return Boolean(
    process.env.DATABASE_URL?.trim() &&
      process.env.BETTER_AUTH_SECRET?.trim() &&
      parseDatabaseEnv(process.env.DATABASE_ENV),
  );
}

export function getAuthPublicUrl(): string {
  return (
    process.env.BETTER_AUTH_URL?.trim() ||
    process.env.APP_URL?.trim() ||
    "http://localhost:3000"
  );
}
