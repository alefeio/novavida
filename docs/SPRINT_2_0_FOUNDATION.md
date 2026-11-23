# Sprint 2.0 — Fundação administrativa Nova Vida

**Estado:** DESIGN / READY FOR CURSOR IMPLEMENTATION  
**Base auditada:** main `03e852799a5e5700f37295c34f69483129e4870b`  
**Branch:** `feature/sprint-2-0-foundation`

## Objetivo

Introduzir a fundação segura de dados e administração da Nova Vida sem alterar a experiência pública atual. O projeto continua sendo `alefeio/novavida`, Next.js App Router / TypeScript / Tailwind, hospedado em Vercel. Não copiar banco, credenciais, conteúdo, layout nem módulos inteiros de `alefeio/lp-alexandrefeio`.

## Diagnóstico (confirmado no repositório)

- Código público lê arrays locais em `src/content/` por meio de `src/lib/content/index.ts`.
- Entidades locais já tipadas: `InstitutionalContent`, `ContactInfo`, `Meeting`, `Course`, `CourseModule`, `Lesson`, `BlogArticle` e `Message`.
- O projeto ainda não tem Prisma, auth, login, tabelas ou backend persistente.
- Páginas públicas não devem passar a depender de banco nesta sprint.
- Conteúdo demonstrativo não representa oferta ou publicação oficial; permanecer como está.

## Decisões

1. **Banco exclusivo da Nova Vida:** PostgreSQL em projeto Neon independente, com isolamento entre desenvolvimento, homologação/preview e produção. Usar os envs e branches conforme configuração real da Neon; jamais banco AF.
2. **ORM:** Prisma 7 compatível com versão Node do projeto e driver adapter PostgreSQL, configuração `prisma.config.ts` de acordo com documentação atual; instanciar cliente somente no servidor.
3. **Auth:** Better Auth com adapter Prisma, login e sessão persistente. Cadastro público desligado. Primeiro admin apenas por fluxo seguro de bootstrap local autenticado (nunca endpoint público ou credenciais fixas).
4. **Permissões:** `USER`, `EDITOR`, `REVIEWER`, `ADMIN`, `OWNER`, `PASTORAL` como vocabulário do domínio, com RBAC verificado em servidor. Para a Sprint 2.0, somente `ADMIN` e `OWNER` precisam acessar a área administrativa básica; demais papéis são planejados, sem acesso implícito.
5. **Área administrativa inicial:** login administrativo e shell protegido (`/admin`) com páginas de apresentação/pendências reais, sem falsa gestão funcional. Navegação pública não exibe Admin.
6. **Auditoria:** ações de autenticação/permissão e bootstrap que mudem dados são auditadas sem registrar senha, tokens nem dados pastorais.
7. **Dados editoriais:** permanecem locais até Sprint 2.1/2.2/2.3. Construir fronteira DAL / repositories `server-only`; preparar adaptação gradual, não trocar tudo de uma vez.
8. **Infra:** Preview apenas para branch feature; PR sem merge automático. Production permanece na UI/UX 1.2 até gate formal.

## Gates de implementação

### Gate A — Segurança e arquitetura
- Verificar SHA de base, configuração e lockfile; nenhuma alteração na main.
- Documentar e identificar DB exclusivo; sem credenciais no código ou no chat.
- Criar `docs/DATA_MODEL_V1.md` e ADR de isolamento/autenticação.
- Pré-flight de destino: banco, branch, database, ambiente (sem exibir URL ou segredos).
- Não usar segredos compartilhados entre ambientes.

### Gate B — Prisma e migração isolada
- Configurar Prisma/driver com cliente singleton server-only e sem conexão durante importação de páginas públicas.
- Criar schema inicialmente só com tabelas exigidas para auth e auditoria; modelo completo editorial permanece desenho de domínio.
- Gerar migration versionada; aplicar **somente em banco dev ou preview comprovadamente exclusivo**, nunca em production.
- Não executar `db push` como substituto de migrations nem `migrate reset` em qualquer base remota.
- Usar confirmação explícita adicional e gate separado para migração de produção.

### Gate C — Autenticação e RBAC
- Better Auth integrado; `/admin/entrar` e `/admin`; sessão validada no servidor.
- Sem cadastro público, conta demo, senha hardcoded, bypass em produção, auto promoção de papel ou admin via parâmetro de URL.
- Proteção em layout de /admin e, sobretudo, em cada consulta/escrita sensível no servidor (DAL/actions/route handlers).
- Bootstrap de primeiro ADMIN/OWNER somente via processo local controlado, reversível e auditado; política de senha forte, nenhum segredo nos logs.
- Desabilitar recuperação de senha até existir serviço de e-mail confiável; documentar operação segura.

### Gate D — Regressão e revisão
- `typecheck`, `lint`, `build`, `prisma validate`, testes para autenticação/RBAC, isolamento de DB e exposição pública.
- Sem DB/env real, o site público deve continuar compilando e não fazer consultas.
- Provar: não autorizado recebe 401/redirect; papel insuficiente recebe 403; privilégios não são aceitos do cliente.
- Confirmar rotas públicas, sitemap/robots e conteúdo local idênticos ao baseline.
- Entrega: SHA, PR draft, Preview URL, lista de migrations e resultado dos testes; **não fazer merge, release ou migration prod**.

## Variáveis esperadas (nomes propostos, sem valores)

- `DATABASE_URL` — conexão runtime com pooler, para DB Nova Vida do ambiente.
- `DIRECT_URL` — conexão direta para migrações, do MESMO ambiente e banco.
- `DATABASE_ENV` — `development` | `preview` | `production`; bloquear migrations incompatíveis.
- `BETTER_AUTH_SECRET` — segredo exclusivo por ambiente.
- `BETTER_AUTH_URL` — URL exata do ambiente de auth, respeitando Preview.
- `APP_URL` — URL pública do ambiente, para validação de origem e metadata.
- Outras variáveis apenas se a implementação realmente exigir; documentá-las em `.env.example` sem valores reais.

**Não instalar Neon/Vercel integrando automaticamente à produção sem revisão das credenciais, custos e ambientes.**

## Critério de aprovação

A fundação está pronta quando a área administrativa autentica e verifica permissão em DEV/HOMOL, o banco é exclusivo e as migrações são reversíveis, **enquanto a produção pública permanece intacta**. A edição real dos conteúdos será abordada depois.

## Próximas sprints

- 2.1: perfil institucional, contatos verificados, encontros, páginas e imagens oficiais.
- 2.2: blog e mensagens com editor, revisão, publicação, SEO, mídias.
- 2.3: cursos, módulos, aulas, materiais, matrículas e progresso.
- 2.4: formulários, pedido de oração com políticas LGPD, retenção e acesso pastoral restrito.
