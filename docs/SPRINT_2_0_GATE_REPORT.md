# Sprint 2.0 / 2.0.1 — Relatório de Gates

**Branch:** `feature/sprint-2-0-foundation`  
**Base SHA:** `03e852799a5e5700f37295c34f69483129e4870b`  
**PR:** https://github.com/alefeio/novavida/pull/1 (draft)  
**Data:** 2026-11-23  
**HEAD:** (ver tip após commits 2.0.1)

## Gate A — Arquitetura — PASS

| Critério | Estado | Evidência |
| --- | --- | --- |
| Prisma 7 + adapter-pg + `prisma.config.ts` | PASS | deps `7.10.1`, schema auth/audit |
| Better Auth + RBAC server-side | PASS | role sempre relida do banco (2.0.1) |
| Isolamento site público | PASS | content local; build sem DB |
| Open Graph institucional | PASS (2.0.1) | `/images/social/novavida-og.jpg` + metadata |

## Gate B — Banco — BLOCKED (migrate apply)

| Critério | Estado | Evidência |
| --- | --- | --- |
| Banco Neon exclusivo | BLOCKED | Sem provisionamento no workspace |
| Identidade explícita `NV_DB_*` | PASS (código) | `db-target.ts` + `db:check` |
| `DIRECT_URL` obrigatória | PASS (código) | sem fallback para `DATABASE_URL` |
| Migration aplicada | BLOCKED | depende de Neon DEV |

## Gate C — Autenticação — PASS (código) / BLOCKED (E2E)

| Critério | Estado | Evidência |
| --- | --- | --- |
| Login/logout/sessão | PASS (código) | Better Auth + `/admin` |
| Revogação de papel | PASS (unitário) | `revocation.test.ts` |
| Bootstrap senha sem eco | PASS (código/unit) | `secure-prompt` + testes argv |
| E2E com banco real | BLOCKED | sem Neon |

## Gate D — Homologação

| Critério | Estado | Evidência |
| --- | --- | --- |
| typecheck / lint / build / test | (após 2.0.1) | ver comentário no PR |
| Preview | pendente deploy | branch feature |
| PR draft | #1 | sem merge |

## Hardening 2.0.1

- Prompt de senha sem eco (Windows/Unix TTY); argv `--password` rejeitado.
- Pré-flight de banco com `NV_DB_OWNER/PROJECT/BRANCH/NAME` + match runtime/direct.
- Autorização admin ignora papel em cache de sessão.
- Auth URLs sem fallback localhost em Vercel Preview.
- Open Graph + favicon oficiais; canônico `https://novavida-navy.vercel.app`.

## Pendências

1. Provisionar Neon exclusivo Nova Vida (DEV/PREVIEW).
2. Configurar secrets Preview (não habilitar auth Preview sem banco próprio).
3. `db:check` → migrate → bootstrap em DEV.
4. Validar prévia WhatsApp após deploy (cache de plataformas pode atrasar).
