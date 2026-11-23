# Assets

## Documentos de referência (fora do repositório de código)

Localizados em `C:\AleFeio\Projetos\NovaVida\Arquivos\`:

| Arquivo | Status |
|---------|--------|
| `Manual_Identidade_Visual_Nova_Vida.pdf` | Disponível |
| `Planejamento aprofundado do site Nova Vida – Igreja do Renascimento.pdf` | Disponível |
| `IdentidadeVisual/01.png` … `04.png` | Páginas do manual |
| Logomarcas oficiais | Copiadas para `public/brand/` |

## Marca no projeto

| Arquivo | Uso |
|---------|-----|
| `public/brand/logo-oficial.png` | Logomarca oficial no header/footer |
| `public/brand/logo-alternativo.png` | Referência |
| `public/brand/logo-monocromatico.jpg` | Referência |

## Tipografia

- Cormorant Garamond (500/600/700 + itálico) via `next/font`
- Lato (400/700) via `next/font`

## Imagens demonstrativas — Fase 1.2

Fonte única de caminhos institucionais: `src/content/media.ts`.

Licença: **Unsplash** (uso permitido). Não são fotos reais da Nova Vida.

### Arquivos ativos

| Arquivo | Tema |
|---------|------|
| `home/hero-palavra.jpg` | Bíblia / Palavra |
| `home/welcome-acolhimento.jpg` | Comunhão / amizade |
| `home/family-lar.jpg` | Gerações / comunhão |
| `home/community-geracoes.jpg` | Família no lar |
| `home/hope-amanhecer.jpg` | Esperança / amanhecer |
| `home/invite-caminho.jpg` | Caminho / renovação |
| `demo/culto-sereno.jpg` | Quietude / adoração |
| `blog/cover-*.jpg` | Capas editoriais |

### Removidos na 1.2 (incoerentes)

Arquivos antigos foram **apagados** do diretório para evitar cache/referências residuais:

- Turismo com landmark / bondinho
- Escritório corporativo
- Festival / tela “JESUS”
- Mãos com tinta vermelha
- Retrato de estúdio
- Capas coworking / beer

### Causa do bug da 1.1

A homepage ainda apontava para nomes antigos (`hero.jpg`, `community.jpg`, etc.) cujos arquivos no disco tinham sido sobrescritos de forma inconsistente ou ainda servidos via cache do Next (`/.next/cache/images`). Na 1.2:

1. Novos nomes de arquivo
2. Fonte única `media.ts`
3. Remoção dos arquivos antigos
4. Limpeza do cache de imagens do Next
