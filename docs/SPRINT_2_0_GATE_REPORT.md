# Sprint 2.0 — Relatório de Gates

**Branch:** `feature/sprint-2-0-foundation`  
**Base SHA:** `03e852799a5e5700f37295c34f69483129e4870b`  
**HEAD:** `3811a0868f778d454aff66bfa375bf98d06cbd0e`  
**Data:** 2026-03-23

## Gate A — Arquitetura — PASS

| Critério | Estado | Evidência |
| --- | --- | --- |
| Prisma 7 + adapter-pg + `prisma.config.ts` | PASS | deps `7.10.1`, `prisma/schema.prisma`, `prisma.config.ts` |
| Schema só auth + auditoria | PASS | `User`, `Session`, `Account`, `Verification`, `AuditLog`, `AdminRole` |
| Better Auth integrado | PASS | `src/lib/auth/auth.ts`, `/api/auth/[...all]` |
| Isolamento site público | PASS | `src/lib/content/index.ts` intacto; build público sem DB |
| `.env.example` sem segredos | PASS | versionado |
| UI pública preservada | PASS | rotas públicas em `(site)`; mesmas URLs; admin fora do menu |

## Gate B — Banco — BLOCKED (migrate apply)

| Critério | Estado | Evidência |
| --- | --- | --- |
| Banco Neon exclusivo identificado | BLOCKED | Sem `.env` / Vercel link / projeto Neon no workspace |
| Migration SQL versionada | PASS | `prisma/migrations/20261123120000_init_auth_audit/migration.sql` |
| Migration aplicada em DEV/HOMOL | BLOCKED | `npm run db:check` → `DATABASE_ENV ausente` |
| Production migrate | BLOCKED (intencional) | `migrate-guard` + `assertDatabaseEnvForMigrations` |

**Justificativa:** não há PostgreSQL exclusivo da Nova Vida configurado. Código e SQL prontos; aplicar somente após provisionar Neon DEV e `db:check` = PASS.

## Gate C — Autenticação — PASS (código) / BLOCKED (E2E banco)

| Critério | Estado | Evidência |
| --- | --- | --- |
| Login / logout / sessão server-side | PASS | `/admin/entrar`, Better Auth, `requireAdminAccess` |
| RBAC ADMIN/OWNER | PASS | `roles.ts` + hook `session.create.before` |
| Bootstrap auditado | PASS | `scripts/bootstrap-admin.ts` |
| Cadastro público off | PASS | `disableSignUp` + bloqueio rota |
| Teste E2E com banco real | BLOCKED | Depende do Gate B |

## Gate D — Homologação — PASS (local) / Preview pendente push

| Critério | Estado | Evidência |
| --- | --- | --- |
| `npm run typecheck` | PASS | exit 0 |
| `npm run lint` | PASS | exit 0 (sem erros) |
| `npm run build` | PASS | exit 0; rotas públicas estáticas; `/admin` dynamic |
| `prisma validate` | PASS | schema valid |
| `npm test` | PASS | 20/20 |
| Preview URL | pendente | após push da branch |
| PR draft | pendente | após push |

## Modelos Prisma criados

- `User` (+ `role: AdminRole`)
- `Session`
- `Account`
- `Verification`
- `AuditLog`

## Pendências

1. Provisionar Neon exclusivo Nova Vida (dev + preview).
2. Configurar secrets Preview Vercel.
3. `db:check` → `db:migrate` → `db:bootstrap-admin` em DEV.
4. Validar login real e URL Preview.
