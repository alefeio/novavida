import type { Meeting, Message } from "@/types/content";

/**
 * Mensagens demonstrativas — estrutura pronta para áudio/vídeo futuros.
 */
export const messages: Message[] = [
  {
    id: "msg-1",
    slug: "uma-nova-manha-na-palavra",
    title: "Uma nova manhã na Palavra",
    summary:
      "Reflexão demonstrativa sobre esperança renovada e confiança cotidiana em Deus.",
    theme: "Esperança",
    scripture: "Lamentações 3:22-23",
    format: "texto",
    durationLabel: "Leitura · 8 min",
    publishedAt: "2026-10-20",
    image: "/images/home/hero-palavra.jpg",
    imageAlt: "Imagem demonstrativa: Bíblia aberta",
    status: "demo",
  },
  {
    id: "msg-2",
    slug: "acolher-como-jesus-acolhe",
    title: "Acolher como Jesus acolhe",
    summary:
      "Sobre hospitalidade, respeito à liberdade do outro e comunhão sem pressão.",
    theme: "Acolhimento",
    scripture: "Romanos 15:7",
    format: "texto",
    durationLabel: "Leitura · 10 min",
    publishedAt: "2026-09-15",
    image: "/images/home/welcome-acolhimento.jpg",
    imageAlt: "Imagem demonstrativa: pessoas em comunhão",
    status: "demo",
  },
  {
    id: "msg-3",
    slug: "familias-que-oram-juntas",
    title: "Famílias que oram juntas",
    summary:
      "Um convite sereno para cultivar oração e diálogo no lar, no ritmo de cada família.",
    theme: "Família",
    scripture: "Josué 24:15",
    format: "texto",
    durationLabel: "Leitura · 7 min",
    publishedAt: "2026-08-02",
    image: "/images/home/family-lar.jpg",
    imageAlt: "Imagem demonstrativa: família reunida",
    status: "demo",
  },
];

/**
 * Encontros: estrutura pronta; dados reais ainda pendentes de confirmação.
 */
export const meetings: Meeting[] = [
  {
    id: "meeting-celebration",
    title: "Culto de celebração",
    description:
      "Encontro comunitário de adoração, Palavra e comunhão. Horário e local serão publicados após confirmação oficial.",
    status: "pending",
  },
  {
    id: "meeting-study",
    title: "Estudo bíblico",
    description:
      "Espaço para leitura e reflexão da Escritura em grupo. Programação aguarda homologação.",
    status: "pending",
  },
  {
    id: "meeting-prayer",
    title: "Encontro de oração",
    description:
      "Momento dedicado à intercessão e ao cuidado espiritual mútuo. Detalhes em breve.",
    status: "pending",
  },
];
