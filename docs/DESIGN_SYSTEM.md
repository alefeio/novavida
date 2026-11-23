# Design System — Nova Vida

Fonte principal: Manual de Identidade Visual Nova Vida + planejamento do site.

## Paleta

| Token | Hex | Uso |
|-------|-----|-----|
| Verde oliva (`brand-primary`) | `#6B7A2F` | Cor principal, botões, destaques |
| Verde sálvia (`brand-soft`) | `#A8B58A` | Apoio, estados suaves |
| Dourado (`brand-accent`) | `#C9A55A` | Detalhes, divisores, ênfases |
| Marfim (`surface-main`) | `#F6F2E8` | Fundo predominante |
| Areia (`surface-secondary`) | `#DCCFB8` | Superfícies secundárias |
| Grafite (`text-main`) | `#3F4338` | Textos |

### Regras

- Privilegiar oliva em botões primários (alto contraste sobre marfim).
- Usar dourado com moderação: bordas, microdetalhes e citações.
- Evitar texto dourado pequeno sobre marfim sem verificar contraste.
- Espaços claros e legibilidade prevalecem sobre proporções literais de cor.

## Tipografia

- **Cormorant Garamond** — títulos, lema, citações e destaques editoriais.
- **Lato** — textos, menus, formulários, botões e metadados.

Escala fluida (CSS variables com `clamp()`):

- `--text-hero` → H1 / aberturas
- `--text-3xl` / `--text-4xl` → H2
- `--text-2xl` → H3
- `--text-lg` → leads e apoio
- Corpo: `--text-base`, line-height ~1.7

Texto muted usa `#4F5549` para contraste AA sobre marfim. Em blocos oliva, títulos e corpo usam marfim (`--text-on-brand`).

## Componentes

- `SiteHeader` / `MobileNavigation` / `SiteFooter`
- `Container`, `SectionHeading`, `PageHero`, `SectionDivider`
- `Button`, `TextLink`, `Breadcrumb`
- `EditorialCard`, `CourseCard`, `MessageCard`
- `ImageTextSection`, `QuoteBlock`, `CallToAction`
- `EmptyState`, `Accordion`, `FormField`, `ContentGrid`, `StatusBadge`

### Estados

- Hover: escurecimento suave ou fundo sálvia.
- Focus: anel visível (`--focus-ring`).
- Disabled: opacidade reduzida e `pointer-events: none`.

## Espaçamento e forma

- Seções: `py-16` / `py-20`.
- Raios: 0.375–1.5rem (evitar “pills” excessivos fora de CTAs).
- Grid máximo: `max-w-6xl`; leitura longa: `max-w-3xl`.

## Grafismos

Inspirados no manual (arco, raios, folhas, linhas de acolhimento), aplicados com discrição: gradientes, divisores e halos — nunca competindo com a marca.
