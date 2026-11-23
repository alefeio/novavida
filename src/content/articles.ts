import type { BlogArticle } from "@/types/content";

/**
 * Artigos demonstrativos do blog.
 * Identificados como demo — não são publicações oficiais da Nova Vida.
 */
export const articles: BlogArticle[] = [
  {
    id: "art-1",
    slug: "renovar-a-esperanca-pela-palavra",
    title: "Renovar a esperança pela Palavra",
    excerpt:
      "Quando a vida parece cansada, a Escritura nos convida a respirar de novo — com fé, paciência e confiança.",
    content: `
## Um convite à renovação

Há estações em que o coração precisa ser lembrado de que a esperança não depende apenas do nosso ânimo. A Palavra de Deus sustenta, orienta e reconduz.

## Ler com o coração aberto

Não é necessário compreender tudo de uma vez. Comece com um texto curto, uma oração simples e espaço para silêncio. A renovação muitas vezes chega aos poucos.

### Sugestão prática

1. Escolha um salmo curto.
2. Leia em voz baixa.
3. Peça a Deus luz para o dia.
4. Compartilhe um verso com alguém de confiança.

## Caminhar em comunidade

A fé floresce melhor quando não estamos sozinhos. Se desejar, visite um encontro da Nova Vida e permita-se ser acolhido no seu ritmo.
    `.trim(),
    category: "biblia",
    image: "/images/blog/cover-palavra.jpg",
    imageAlt: "Imagem demonstrativa: mãos segurando um livro aberto",
    publishedAt: "2026-10-12",
    readingMinutes: 5,
    authorLabel: "Equipe editorial",
    status: "demo",
    featured: true,
  },
  {
    id: "art-2",
    slug: "comunhao-que-acolhe",
    title: "Comunhão que acolhe",
    excerpt:
      "A comunidade cristã pode ser um lugar de escuta, cuidado e pertencimento — sem pressa e sem cobrança.",
    content: `
## Mais do que um encontro

Comunhão não é apenas estar no mesmo espaço. É aprender a olhar o outro com gentileza, a orar uns pelos outros e a caminhar juntos.

## Sem pressão

A Nova Vida valoriza o acolhimento genuíno. Você pode conhecer a igreja, fazer perguntas e participar no seu tempo. Ninguém precisa abandonar sua história para ser bem-vindo.

## Pequenos gestos

Um café compartilhado, uma mensagem de cuidado, uma oração silenciosa: gestos simples constroem confiança.
    `.trim(),
    category: "comunhao",
    image: "/images/blog/cover-comunhao.jpg",
    imageAlt: "Imagem demonstrativa: pessoas reunidas em gesto de acolhimento",
    publishedAt: "2026-09-28",
    readingMinutes: 4,
    authorLabel: "Equipe editorial",
    status: "demo",
    featured: false,
  },
  {
    id: "art-3",
    slug: "orar-com-serenidade",
    title: "Orar com serenidade",
    excerpt:
      "A oração não precisa ser perfeita. Pode ser um sussurro sincero, um agradecimento ou um pedido simples.",
    content: `
## Oração sem performance

Muitas pessoas se afastam da oração por sentir que “não sabem orar”. A Escritura, porém, nos mostra orações honestas, curtas e humanas.

## Um caminho possível

Comece com gratidão. Em seguida, apresente a Deus o que pesa no coração. Encerre pedindo paz e direção. Não há fórmula mágica — há relacionamento.

## Quando pedir ajuda

Se você deseja que alguém ore com você, a página de pedido de oração da Nova Vida estará disponível para isso.
    `.trim(),
    category: "oracao",
    image: "/images/blog/cover-esperanca.jpg",
    imageAlt: "Imagem demonstrativa: amanhecer sugerindo esperança e quietude",
    publishedAt: "2026-09-05",
    readingMinutes: 4,
    authorLabel: "Equipe editorial",
    status: "demo",
  },
  {
    id: "art-4",
    slug: "fe-e-familia-no-cotidiano",
    title: "Fé e família no cotidiano",
    excerpt:
      "Pequenas práticas no lar — escuta, oração e presença — podem fortalecer vínculos entre gerações.",
    content: `
## Fé que habita a casa

A vida espiritual da família não precisa ser elaborada. Pode nascer de conversas à mesa, de perdão oferecido e de orações breves antes do dia começar.

## Respeito aos ritmos

Cada lar tem sua história. O importante é cultivar abertura, amor e consistência — sem comparar-se a modelos irreais.

## Um convite

Se sua família busca um espaço de crescimento e acolhimento, a Nova Vida deseja caminhar com você.
    `.trim(),
    category: "familia",
    image: "/images/blog/cover-familia.jpg",
    imageAlt: "Imagem demonstrativa: família em momento de proximidade",
    publishedAt: "2026-08-18",
    readingMinutes: 5,
    authorLabel: "Equipe editorial",
    status: "demo",
  },
  {
    id: "art-5",
    slug: "viver-a-fe-com-integridade",
    title: "Viver a fé com integridade",
    excerpt:
      "Integridade cristã é alinhar o que cremos com o modo como tratamos as pessoas no dia a dia.",
    content: `
## Fé e caráter

Seguir Jesus envolve mais do que palavras. Envolve honestidade, misericórdia e coerência nos relacionamentos.

## No trabalho e na comunidade

A vida cristã se revela nas escolhas pequenas: como falamos, como servimos e como pedimos desculpas.

## Crescimento contínuo

Ninguém alcança maturidade da noite para o dia. A graça de Deus nos acompanha enquanto aprendemos.
    `.trim(),
    category: "vida-crista",
    image: "/images/home/hero-palavra.jpg",
    imageAlt: "Imagem demonstrativa: Bíblia aberta com luz natural",
    publishedAt: "2026-07-30",
    readingMinutes: 6,
    authorLabel: "Equipe editorial",
    status: "demo",
  },
];
