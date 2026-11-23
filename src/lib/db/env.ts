import "server-only";

export {
  assertDatabaseEnvForMigrations,
  DatabaseConfigError,
  isAdminDatabaseConfigured,
  parseDatabaseEnv,
  type DatabaseEnv,
} from "@/lib/db/env-shared";

export { getAuthPublicUrl, buildTrustedOrigins } from "@/lib/auth/urls";
