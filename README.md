# Nova Vida — Igreja do Renascimento

Frontend institucional da primeira fase (UI/UX), construído com Next.js App Router, TypeScript e Tailwind CSS.

## Como instalar

```bash
npm install
```

## Como executar

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts úteis

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Estrutura do projeto

```text
src/
  app/                 # Rotas (App Router)
  components/
    layout/            # Header, footer, navegação
    home/              # Seções da homepage
    courses/           # Catálogo e cards de cursos
    blog/              # Cards editoriais e filtros
    ui/                # Design system
  content/             # Dados locais tipados
  lib/
    content/           # Camada de acesso a conteúdo
    seo/               # Metadados
    utils/             # Utilitários
  types/               # Tipos TypeScript
public/
  brand/               # Logomarca oficial
  images/              # Imagens demonstrativas
docs/                  # Design system e decisões
```

## Rotas disponíveis

| Rota | Descrição |
|------|-----------|
| `/` | Homepage |
| `/sobre` | Sobre nós |
| `/nossa-fe` | Nossa fé |
| `/cultos-e-encontros` | Cultos e encontros |
| `/comunidade` | Comunidade |
| `/mensagens` | Mensagens (demonstrativo) |
| `/cursos` | Catálogo de cursos (demonstrativo) |
| `/cursos/[slug]` | Detalhe do curso |
| `/blog` | Blog (demonstrativo) |
| `/blog/[slug]` | Artigo |
| `/oracao` | Pedido de oração (envio indisponível) |
| `/visite-nos` | Visite-nos |
| `/contato` | Contato |

## Observações desta fase

- Sem banco de dados, Prisma, autenticação, pagamentos ou envio de formulários.
- Conteúdo institucional confirmado está separado de conteúdo demonstrativo.
- Endereço, horários, telefones e redes sociais **não** foram inventados.
- Documentação complementar em `docs/`.

## Documentação

- `docs/DESIGN_SYSTEM.md`
- `docs/UI_UX_DECISIONS.md`
- `docs/PENDING_INTEGRATIONS.md`
- `docs/ASSETS.md`
