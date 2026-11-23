# Nova Vida — Modelo de dados v1 (proposto)

**Status:** proposta de arquitetura, não uma migration aplicada.  
**Fonte:** interfaces existentes em `src/types/content.ts` e conteúdos tipados de `src/content/`, auditados na base `03e8527`.  
**Distinção:** o projeto ainda exibe dados `confirmed`, `demo` e `pending`; não transformar `demo` em publicação oficial.

## Convenções

- Identificadores opacos (UUID/cuid), `createdAt`, `updatedAt`; campos `deletedAt` apenas se fizerem sentido para o fluxo.
- FKs reais, `onDelete` deliberado, `slug` único quando necessário, `order` único dentro do pai, índices de status/publicação e data.
- Conteúdos editoriais têm **dois eixos independentes**: `origin = DEMO | OFFICIAL` e `publicationStatus = DRAFT | IN_REVIEW | PUBLISHED | ARCHIVED`. Só `OFFICIAL + PUBLISHED` validado pela regra de publicação chega ao site e à indexação. Não inferir publicação de `publishedAt` isoladamente.
- `confirmed / pending` são estados dos dados institucionais da UI atual, não substituem a revisão editorial.
- Timestamps armazenados em UTC; encontros com timezone explícito `America/Belem`, recorrência e exceções modeladas posteriormente.
- Texto rich/Markdown sanitizado na renderização e na entrada; URLs de imagens por referência a asset, nunca blobs em entidades textuais.
- Evitar dados sensíveis em logs, rastreamento, analytics e buscas públicas.

## Entidades de fundação — Sprint 2.0

| Entidade | Responsabilidade | Relações |
| --- | --- | --- |
| `User` | Identidade local da Nova Vida, nomes, e-mail, e-mail verificado, papel restrito. Compatibilizar campos com Better Auth e futuro aluno. | 1:N com `Session`, `Account`; 1:N ações auditadas |
| `Session` | Sessões Better Auth com expiração e revogação. | N:1 User |
| `Account` | Credenciais/conexões por usuário segundo schema oficial Better Auth. | N:1 User |
| `Verification` | Tokens de verificação/reset conforme gerador Better Auth. | Independente ou conforme adapter |
| `AuditLog` | Auditoria de bootstrap, atribuição de papéis e futuras alterações editoriais (sem tokens/senhas). | N:1 User opcional |
| `InstitutionProfile` | Identidade institucional aprovada, lema, missão, texto de boas-vindas. | Singleton lógico; só persistir na Sprint 2.1 salvo necessidade fundamentada |

**Auth:** preferir nomes/colunas efetivamente gerados pela versão do Better Auth escolhida. Não copiar esquema de outra aplicação por memória. Papel não é controlado por payload de cadastro/login; default sem privilégio. ADMIN/OWNER são atribuídos apenas por bootstrap/gestão autenticada auditável.

## Entidades editoriais — blueprint para Sprints 2.1–2.3

| Entidade | Campos/intenções principais | Relações |
| --- | --- | --- |
| `InstitutionValue` | título, descrição, ordenação, status/validação | N:1 InstitutionProfile |
| `FaithPrinciple` | título, texto, ordenação, aprovado/pendente | N:1 InstitutionProfile |
| `ContactChannel` | tipo, valor, label, published, ordem | N:1 InstitutionProfile |
| `MeetingSeries` | título, descrição, dia, hora local, local, público, publicado | N:1 InstitutionProfile |
| `MeetingOccurrence` | ocorrência excepcional, alteração de horário, cancelamento | N:1 MeetingSeries |
| `MediaAsset` | storageKey, URL pública, alt, crédito/licença, tipo, tamanho, dimensão | 1:N para conteúdo referenciador (política de remoção) |
| `BlogArticle` | slug, título, resumo, Markdown, category, imagem, SEO, origem, status, publishedAt | N:1 autor User; N:1 MediaAsset; N:1 categoria opcional |
| `Message` | slug, título, resumo, tema, referência bíblica, formato, conteúdo/link mídia, status | N:1 autor User opcional; N:1 MediaAsset |
| `Course` | slug, título, resumo, descrição, categoria, nível, objetivos, modalidade, origin/status | 1:N CourseModule; N:1 MediaAsset |
| `CourseModule` | título, descrição, ordem | N:1 Course, 1:N Lesson |
| `Lesson` | título, resumo, duração, ordem, tipo e conteúdo opcional | N:1 CourseModule |
| `Enrollment` | estudante, curso, status, datas, origem/consentimento | N:1 User e N:1 Course |
| `LessonProgress` | estudante/matrícula, aula, situação, último acesso | N:1 Enrollment e N:1 Lesson |

**Dados locais:** manter `src/lib/content/index.ts` como fronteira de leitura atual; preparar repositories adaptáveis, sem mudar assinatura pública nessa sprint.

## Entidades sensíveis — apenas projeto para Sprint 2.4

- `ContactSubmission`: nome, meio de contato, mensagem, consentimento/aviso, restrição, retenção, eventos de tratamento.
- `PrayerRequest`: pedido potencialmente sensível, política própria de acesso pastoral, retenção mínima e prazo de exclusão, sem publicação automática.
- Não criar tabelas, formulários conectados, seeds nem APIs de pedidos de oração na Sprint 2.0.
- Antes da implementação, definir base legal, finalidade, segurança, transparência e retenção conforme LGPD; dados de crença religiosa são sensíveis.

## Matriz de autorização pretendida

| Ação | OWNER | ADMIN | EDITOR | REVIEWER | PASTORAL | USER |
| --- | --- | --- | --- | --- | --- | --- |
| Acesso ao shell admin (Sprint 2.0) | Sim | Sim | Não | Não | Não | Não |
| Alterar papéis (futuro) | Sim | Condicional | Não | Não | Não | Não |
| Editar rascunho (futuro) | Sim | Sim | Sim | Condicional | Não | Não |
| Aprovar publicação (futuro) | Sim | Sim | Não | Sim | Não | Não |
| Acessar pedidos de oração (futuro) | Somente se também autorizado pastoralmente | Somente se autorizado | Não | Não | Sim | Não |
| Matrícula/progresso próprio (futuro) | Conforme política | Conforme política | Conforme política | Conforme política | Conforme política | Sim |

**Nota:** mesmo OWNER não ganha acesso automático a pedidos de oração. O acesso pastoral deve ser verificado em política separada (privilégios mínimos).

## Restrições que impedem vazamento do demo

1. Importação de dados demonstrativos: no máximo DEV/HOMOL e identificados como `DEMO`, sem auto publicação.
2. API pública consulta exclusivamente registros oficiais aprovados/publicados (quando a integração ocorrer).
3. Routes de cursos e blog continuam noindex enquanto são demonstrativos.
4. Na Sprint 2.0, **não alterar consultas das páginas públicas**.

## Decisões pendentes (não inventar)

- Quais pessoas receberão OWNER/ADMIN; convites e recuperação de conta.
- Seleção e custos do provedor de e-mail.
- Datas/horários/local reais, documentos doutrinários e fotos oficiais.
- Modalidades oficiais de cursos e modelo de acesso.
- Política LGPD e retenção de oração/contato.
- Domínio canônico definitivo.

## Regras de integridade a implementar nas sprints correspondentes

- `BlogArticle.slug`, `Course.slug`, `Message.slug` únicos.
- `CourseModule(courseId, order)` único; `Lesson(moduleId, order)` único.
- `Enrollment(userId, courseId)` único quando modelo permitir uma matrícula ativa.
- `LessonProgress(enrollmentId, lessonId)` único; verificar que aula pertence ao curso matriculado.
- Revisão editorial não pode ser autodeclarada por usuário não autorizado; registrar `approvedBy` e `approvedAt`.
- Não publicar contato, agenda, documento de fé ou mídia sem validação institucional.
