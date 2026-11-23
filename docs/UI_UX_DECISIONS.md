# Decisões de UI/UX

## Fase 1.2 — Correções finais

- Homepage passou a usar `src/content/media.ts` (fonte única) com novos nomes de arquivo.
- Arquivos antigos incoerentes foram removidos do `public/images`.
- `/cursos`: grid fixo em 2 colunas no desktop/tablet.
- `/blog`: destaque + grade 2×2 dos secundários.
- Convite final: overlay mais denso e texto 100% marfim.
- Hero mobile: altura, tipografia fluida e CTAs em coluna full-width.
- Menu mobile: fechamento explícito no clique, foco de retorno e `max-w-[100vw]`.

## Fase 1.1 — Refinamento visual

- Header com marca mais presente e navegação de maior legibilidade.
- Hero com tipografia ampliada, overlay revisado e fotografia humana serena.
- Ritmo editorial variado (imagem+texto, missão em mosaico, agenda em lista, destaque de mensagem, blog com featured).
- Badges “demonstrativo” removidos dos cards; avisos concentrados em `ContentNotice`.
- CTAs alinhados à disponibilidade real (contato/oração sem prometer atendimento ativo).
- QuoteBlock usa borda oliva (melhor coerência e contraste que dourado em leitura).

## Narrativa da homepage

A homepage foi organizada como narrativa editorial, não como mural de banners:

1. Hero com lema e CTAs
2. Boas-vindas
3. Missão
4. Comunidade
5. Cultos e encontros (estado pendente)
6. Cursos (demonstrativo)
7. Mensagens (demonstrativo)
8. Blog (demonstrativo)
9. Oração
10. Convite final

## Hierarquia de navegação

**Header desktop:** Início, Sobre nós, Nossa fé, Cultos e encontros, Comunidade, Cursos, Blog, Contato + CTA **Visite-nos**.

**Acessos secundários:** Mensagens e Pedido de oração via menu mobile, footer e seções contextuais — evitando sobrecarregar o header.

## Responsividade

- Mobile-first, com verificação mental em 320–1440px.
- Menu mobile com foco, Escape, bloqueio de scroll e fechamento ao navegar.
- Logo com altura máxima controlada para preservar proporção e área de proteção.
- Cards em coluna única no mobile; grades em tablet/desktop.
- Hero com overlay para legibilidade sobre fotografia.

## Acessibilidade

- HTML semântico e hierarquia de headings.
- Skip link para conteúdo principal.
- Contraste orientado a WCAG 2.2 AA (oliva/grafite sobre marfim).
- Foco visível em links, botões e campos.
- `prefers-reduced-motion` respeitado nas animações.
- Alt text descritivo; imagens demonstrativas identificadas.
- Formulários com labels; envio desabilitado e comunicado.

## Conteúdo honesto

- Dados pendentes usam `EmptyState` e badges (`demo` / `pending`).
- Sem depoimentos, estatísticas ou contatos inventados.
- Sem mapas com localização fictícia.
- Sem mensagens falsas de envio concluído.

## Fotografia

Prioridade futura: fotos reais autorizadas da comunidade. Nesta fase: imagens Unsplash claramente marcadas como demonstração.
