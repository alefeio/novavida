# Arquitetura de autenticação — Nova Vida

**Status:** implementado na Sprint 2.0 (fundação)  
**Stack:** Better Auth `1.7.x` + Prisma 7 + PostgreSQL (adapter `pg`)

## Princípios

1. Cadastro público **desabilitado** (`emailAndPassword.disableSignUp` + bloqueio de rota `/sign-up`).
2. Sessão persistida no banco; verificação sempre no **servidor** (`auth.api.getSession`).
3. Papel (`role`) é campo adicional do usuário com `input: false` — o cliente **não** pode definir.
4. Acesso ao painel `/admin` somente para `ADMIN` e `OWNER`.
5. Middleware **não** autentica; apenas propaga pathname. Autorização ocorre em páginas/actions.
6. Auditoria registra login, negações e bootstrap **sem** senhas/tokens.

## Fluxos

### Login administrativo

1. Usuário acessa `/admin/entrar`.
2. Credenciais enviadas ao Better Auth (`/api/auth/*`).
3. Hook `session.create.before` consulta `role` no banco; se insuficiente, nega e audita.
4. Cookie de sessão emitido; redirect para `/admin`.
5. `/admin` chama `requireAdminAccess()` e redireciona se não autenticado/autorizado.

### Logout

- Cliente chama `signOut`; cookie/sessão invalidados; retorno a `/admin/entrar`.

### Bootstrap do primeiro administrador

- Script local: `npm run db:bootstrap-admin -- --email=... --name=... --role=OWNER`
- Senha pedida interativamente (não via argv/logs).
- Bloqueado se `DATABASE_ENV=production` ou se já existir ADMIN/OWNER (exceto atualização do próprio alvo inicial).
- Gera `AuditLog` (`bootstrap.admin_created` / `bootstrap.role_assigned`).

## Pendências

- Recuperação de senha: **pendente** até haver provedor de e-mail confiável.
- Convites e gestão de papéis na UI: sprints futuras.
- Acesso pastoral a pedidos de oração: política separada (não implícita por OWNER).

## Variáveis

Ver `.env.example`: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `APP_URL`, banco.
