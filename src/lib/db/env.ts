import "server-only";

export {
  assertDatabaseEnvForMigrations,
  DatabaseConfigError,
  getAuthPublicUrl,
  isAdminDatabaseConfigured,
  parseDatabaseEnv,
  type DatabaseEnv,
} from "@/lib/db/env-shared";
