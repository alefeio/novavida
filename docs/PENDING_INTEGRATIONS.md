# Integrações e pendências

## Banco e CMS

- Provisionar Neon exclusivo Nova Vida (DEV/PREVIEW/PROD) — Gate B BLOCKED até lá.
- Aplicar migration `20261123120000_init_auth_audit` somente em DEV/HOMOL autorizado.
- Substituir arrays em `src/content/` por consultas reais via `src/lib/content/` (sprints 2.1+).
- Avaliar reaproveitamento seletivo de módulos do projeto Alexandre Feio (cursos, blog, admin) **após auditoria** — sem copiar layout/marca/banco.

## Cursos e aulas

- Catálogo oficial homologado
- Matrícula / área do aluno
- Progresso persistente
- Materiais (PDF, vídeo)
- Modalidades e regras de inscrição

## Blog e administração

- Fluxo editorial (shell admin já existe; módulos ainda “em breve”)
- Autores oficiais
- Publicação, agendamento e revisão teológica
- Indexação SEO após homologação

## Autenticação

- Fundação admin (Better Auth + RBAC) entregue na Sprint 2.0
- Bootstrap do primeiro OWNER/ADMIN em ambiente controlado
- Recuperação de senha — pendente provedor de e-mail
- Login de alunos / matrícula — sprints futuras

## Formulários

- Pedido de oração (privacidade, LGPD, retorno pastoral)
- Contato institucional
- Integração de e-mail / CRM

## Dados institucionais pendentes

Confirmados nesta fase:

- Nome, lema, missão
- Princípio de acolhimento sem pressão
- Paleta, tipografia e marca oficial
- Direção fotográfica do manual

Aguardando confirmação:

- Endereço e mapa
- Horários de cultos e encontros
- Telefone, WhatsApp, e-mail, redes
- Liderança e biografias
- História institucional
- Declaração de fé completa
- Ministérios e programação infantil
- Fotos reais autorizadas
- Domínio canônico, analytics, hospedagem
- Política de privacidade

## Mídia

- Players de áudio/vídeo
- Transcrições e dados estruturados (`VideoObject`, `Event`) quando houver conteúdo real
