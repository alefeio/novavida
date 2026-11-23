/**
 * Identidade e coerência do destino de banco — sem revelar credenciais.
 */

import {
  DatabaseConfigError,
  parseDatabaseEnv,
  type DatabaseEnv,
} from "./env-shared";

export type RedactedDbEndpoint = {
  protocol: string;
  hostname: string;
  port: string;
  database: string;
};

export type DbTargetIdentity = {
  project: string;
  branch: string;
  database: string;
  environment: DatabaseEnv;
};

const REQUIRED_OWNER = "novavida";

export function redactEndpoint(url: string): RedactedDbEndpoint {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new DatabaseConfigError("URL de banco inválida (formato).");
  }

  if (!/^postgres(ql)?:$/i.test(parsed.protocol)) {
    throw new DatabaseConfigError(
      "Protocolo de banco inválido. Esperado postgresql://.",
    );
  }

  const database = decodeURIComponent(parsed.pathname.replace(/^\//, "")).trim();
  if (!database) {
    throw new DatabaseConfigError(
      "Nome do banco ausente na URL (pathname). Informe o database na connection string.",
    );
  }

  return {
    protocol: parsed.protocol.replace(":", ""),
    hostname: parsed.hostname,
    port: parsed.port || "(default)",
    database,
  };
}

export function formatRedactedEndpoint(endpoint: RedactedDbEndpoint): string {
  return `${endpoint.protocol}://${endpoint.hostname}:${endpoint.port}/${endpoint.database}`;
}

/**
 * Extrai identidade explícita das variáveis de ambiente (não da URL).
 * Exige marcadores Nova Vida — não basta ausência de nomes de outros projetos.
 */
type EnvLike = Record<string, string | undefined>;

export function readExplicitDbIdentity(
  env: EnvLike = process.env,
): DbTargetIdentity {
  const environment = parseDatabaseEnv(env.DATABASE_ENV);
  if (!environment) {
    throw new DatabaseConfigError(
      "DATABASE_ENV ausente ou inválido. Use development | preview | production.",
    );
  }

  const owner = (env.NV_DB_OWNER || env.DB_OWNER || "").trim().toLowerCase();
  if (owner !== REQUIRED_OWNER) {
    throw new DatabaseConfigError(
      `NV_DB_OWNER deve ser exatamente "${REQUIRED_OWNER}" para confirmar isolamento do projeto.`,
    );
  }

  const project = (
    env.NV_DB_PROJECT ||
    env.NEON_PROJECT_NAME ||
    env.DB_PROJECT_NAME ||
    ""
  ).trim();
  if (!project) {
    throw new DatabaseConfigError(
      "NV_DB_PROJECT (ou NEON_PROJECT_NAME) ausente. Identifique o projeto de banco exclusivo.",
    );
  }

  const projectNormalized = project.toLowerCase();
  if (
    !projectNormalized.includes("novavida") &&
    !projectNormalized.includes("nova-vida") &&
    projectNormalized !== "nova_vida"
  ) {
    throw new DatabaseConfigError(
      "NV_DB_PROJECT não identifica a Nova Vida. Use um nome de projeto exclusivo (ex.: novavida).",
    );
  }

  const branch = (
    env.NV_DB_BRANCH ||
    env.NEON_BRANCH_NAME ||
    env.DB_BRANCH_NAME ||
    ""
  ).trim();
  if (!branch) {
    throw new DatabaseConfigError(
      "NV_DB_BRANCH (ou NEON_BRANCH_NAME) ausente. Identifique a branch do banco.",
    );
  }

  const database = (env.NV_DB_NAME || env.DB_NAME || "").trim();
  if (!database) {
    throw new DatabaseConfigError(
      "NV_DB_NAME (ou DB_NAME) ausente. Identifique o nome lógico do banco.",
    );
  }

  return { project, branch, database, environment };
}

export function assertRuntimeAndDirectMatch(
  databaseUrl: string,
  directUrl: string,
): { runtime: RedactedDbEndpoint; direct: RedactedDbEndpoint } {
  const runtime = redactEndpoint(databaseUrl);
  const direct = redactEndpoint(directUrl);

  if (runtime.database !== direct.database) {
    throw new DatabaseConfigError(
      `DATABASE_URL e DIRECT_URL apontam para databases diferentes (${runtime.database} vs ${direct.database}).`,
    );
  }

  // Hosts podem diferir (pooler vs direto), mas devem pertencer ao mesmo provedor/host-base.
  const runtimeBase = normalizeHostBase(runtime.hostname);
  const directBase = normalizeHostBase(direct.hostname);
  if (runtimeBase !== directBase) {
    throw new DatabaseConfigError(
      "DATABASE_URL e DIRECT_URL não compartilham o mesmo host-base do provedor. Verifique o destino.",
    );
  }

  return { runtime, direct };
}

export function assertIdentityMatchesEndpoint(
  identity: DbTargetIdentity,
  endpoint: RedactedDbEndpoint,
): void {
  if (identity.database !== endpoint.database) {
    throw new DatabaseConfigError(
      `NV_DB_NAME (${identity.database}) diverge do database na URL (${endpoint.database}).`,
    );
  }
}

function normalizeHostBase(hostname: string): string {
  const lower = hostname.toLowerCase();
  // Neon: ep-xxx.region.aws.neon.tech ou pooler equivalente
  const neon = lower.match(/([a-z0-9-]+\.[a-z0-9-]+\.neon\.tech)$/);
  if (neon?.[1]) return neon[1];
  // Remove prefixos comuns de pooler
  return lower.replace(/^[^.]+\./, (prefix) =>
    prefix.includes("pooler") || prefix.startsWith("ep-") ? "" : prefix,
  ) || lower;
}

export function assertMigrationTargetReady(options?: {
  allowProduction?: boolean;
  env?: EnvLike;
}): {
  identity: DbTargetIdentity;
  runtime: RedactedDbEndpoint;
  direct: RedactedDbEndpoint;
} {
  const env = options?.env ?? process.env;
  const identity = readExplicitDbIdentity(env);

  if (identity.environment === "production" && !options?.allowProduction) {
    throw new DatabaseConfigError(
      "Migrations de production estão bloqueadas nesta sprint.",
    );
  }

  const databaseUrl = env.DATABASE_URL?.trim();
  const directUrl = env.DIRECT_URL?.trim();

  if (!databaseUrl) {
    throw new DatabaseConfigError(
      "DATABASE_URL ausente (runtime). Configure a conexão do banco exclusivo da Nova Vida.",
    );
  }
  if (!directUrl) {
    throw new DatabaseConfigError(
      "DIRECT_URL ausente. Migrations exigem conexão direta explícita (sem fallback para DATABASE_URL).",
    );
  }

  const { runtime, direct } = assertRuntimeAndDirectMatch(databaseUrl, directUrl);
  assertIdentityMatchesEndpoint(identity, runtime);
  assertIdentityMatchesEndpoint(identity, direct);

  return { identity, runtime, direct };
}

/** URL exclusiva para Prisma migrate — nunca cai para DATABASE_URL. */
export function getRequiredDirectUrl(env: EnvLike = process.env): string {
  const directUrl = env.DIRECT_URL?.trim();
  if (!directUrl) {
    throw new DatabaseConfigError(
      "DIRECT_URL é obrigatória para migrations. Não há fallback silencioso para DATABASE_URL.",
    );
  }
  return directUrl;
}
