# SEO e compartilhamento social — Nova Vida

## Canônico

Produção pública atual: `https://novavida-navy.vercel.app`  
(Não usar `novavida.vercel.app` — outro projeto.)

Configuração central: `src/lib/site/canonical.ts`  
Override opcional: `NEXT_PUBLIC_SITE_URL` / `CANONICAL_SITE_URL`.

## Open Graph

- Imagem: `public/images/social/novavida-og.jpg` (1200×630)
- Helper: `createPageMetadata()` em `src/lib/seo/metadata.ts`
- Homepage: título institucional + descrição de compartilhamento + OG institucional
- Artigos/cursos: usam capa quando disponível; mantêm `noIndex` enquanto demo

## Favicon

- `public/brand/favicon.png` e `apple-touch-icon.png` (derivados da logomarca oficial)
- Declarados em `src/app/layout.tsx` via Metadata API

## Cache de prévia

WhatsApp/Facebook podem cachear a prévia antiga. Após deploy, pode ser necessário invalidar o cache do depurador da Meta ou alterar o nome do arquivo da imagem OG.
