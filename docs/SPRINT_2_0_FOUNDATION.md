# Sprint 2.0 — Fundação administrativa Nova Vida

**Estado:** IMPLEMENTADO (Gate B migrate = BLOCKED sem Neon exclusivo)  
**Base auditada:** main `03e852799a5e5700f37295c34f69483129e4870b`  
**Branch:** `feature/sprint-2-0-foundation`

## Objetivo

Introduzir a fundação segura de dados e administração da Nova Vida sem alterar a experiência pública atual. O projeto continua sendo `alefeio/novavida`, Next.js App Router / TypeScript / Tailwind, hospedado em Vercel. Não copiar banco, credenciais, conteúdo, layout nem módulos inteiros de `alefeio/lp-alexandrefeio`.

## Diagnóstico (confirmado no repositório)

- Código público lê arrays locais em `src/content/` por meio de `src/lib/content/index.ts`.
- Entidades locais já tipadas: `InstitutionalContent`, `ContactInfo`, `Meeting`, `Course`, `CourseModule`, `Lesson`, `BlogArticle` e `Message`.
- Páginas públicas não dependem de banco nesta sprint.
- Conteúdo demonstrativo permanece como está.

## Entregue nesta sprint

1. Prisma 7 + `@prisma/adapter-pg` + `prisma.config.ts` + cliente em `src/generated/prisma`.
2. Schema mínimo: `User` (com `role`), `Session`, `Account`, `Verification`, `AuditLog`.
3. Migration versionada `prisma/migrations/20261123120000_init_auth_audit` (**não aplicada** — Gate B BLOCKED).
4. Better Auth com login/senha, `disableSignUp`, sessão server-side, hooks de RBAC.
5. Shell admin: `/admin/entrar`, `/admin`, header/nav, logout.
6. Bootstrap auditado: `npm run db:bootstrap-admin`.
7. Guardrails de ambiente: `npm run db:check`, `npm run db:migrate`.
8. Testes unitários de RBAC, env e isolamento público.
9. Documentação: `AUTH_ARCHITECTURE.md`, `DATABASE_ENVIRONMENTS.md`, `SPRINT_2_0_GATE_REPORT.md`.

## Decisões

1. **Banco exclusivo da Nova Vida:** PostgreSQL Neon independente. Sem banco AF.
2. **ORM:** Prisma 7 + adapter PostgreSQL; cliente só no servidor; lazy init.
3. **Auth:** Better Auth + Prisma; cadastro público off; bootstrap local apenas.
4. **Permissões:** vocabulário completo no enum; painel só `ADMIN`/`OWNER`.
5. **Área administrativa:** shell protegido sem falsa gestão editorial.
6. **Auditoria:** login, negações, bootstrap — sem senhas/tokens.
7. **Dados editoriais:** permanecem locais até 2.1+.
8. **Infra:** Preview da feature; sem merge automático; production migrate bloqueado.

## Gates

Ver `docs/SPRINT_2_0_GATE_REPORT.md`.

## Variáveis

Ver `.env.example`: `DATABASE_URL`, `DIRECT_URL`, `DATABASE_ENV`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `APP_URL`.

## Critério de aprovação

Fundação administrativa segura e testável em ambiente isolado, produção pública intacta. Migração real depende de Neon exclusivo provisionado.

## Próximas sprints

- 2.1: institucional, contatos, encontros.
- 2.2: blog e mensagens.
- 2.3: cursos e progresso.
- 2.4: formulários / oração (LGPD).
