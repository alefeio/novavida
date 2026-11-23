import type { Course } from "@/types/content";

/**
 * Catálogo demonstrativo de cursos.
 * Conteúdo de exemplo para avaliação de UI — não são ofertas oficiais.
 */
export const courses: Course[] = [
  {
    id: "curso-fundamentos",
    slug: "fundamentos-da-fe",
    title: "Fundamentos da fé",
    summary:
      "Uma introdução acolhedora aos pilares da vida cristã: Jesus, a Bíblia, a oração e a comunhão.",
    description:
      "Este curso demonstrativo apresenta um caminho inicial para quem deseja conhecer melhor a fé cristã. Os módulos foram estruturados para leitura serena, com linguagem acessível e espaço para reflexão pessoal. Em uma fase futura, este conteúdo poderá ser substituído por um curso oficial homologado pela liderança.",
    category: "fundamentos",
    level: "iniciante",
    image: "/images/courses/fundamentos.jpg",
    imageAlt:
      "Imagem demonstrativa: livro aberto sobre mesa de madeira com luz natural",
    objectives: [
      "Compreender o essencial da fé centrada em Jesus Cristo",
      "Familiarizar-se com a leitura da Bíblia de forma acessível",
      "Cultivar hábitos simples de oração e comunhão",
    ],
    modules: [
      {
        id: "mod-1",
        title: "Conhecendo Jesus",
        description: "Quem é Jesus e por que Ele está no centro da nossa fé.",
        order: 1,
        lessons: [
          {
            id: "l1",
            title: "Uma boa notícia para a vida",
            order: 1,
            durationMinutes: 18,
          },
          {
            id: "l2",
            title: "Graça, perdão e novo começo",
            order: 2,
            durationMinutes: 20,
          },
        ],
      },
      {
        id: "mod-2",
        title: "A Bíblia em nossa caminhada",
        order: 2,
        lessons: [
          {
            id: "l3",
            title: "Como começar a ler as Escrituras",
            order: 1,
            durationMinutes: 15,
          },
          {
            id: "l4",
            title: "A Palavra que renova",
            order: 2,
            durationMinutes: 22,
          },
        ],
      },
      {
        id: "mod-3",
        title: "Vida em comunhão",
        order: 3,
        lessons: [
          {
            id: "l5",
            title: "Oração no cotidiano",
            order: 1,
            durationMinutes: 16,
          },
          {
            id: "l6",
            title: "Caminhar com outros",
            order: 2,
            durationMinutes: 18,
          },
        ],
      },
    ],
    durationLabel: "6 aulas · cerca de 2 semanas",
    modality: "Presencial e online",
    status: "demo",
    featured: true,
  },
  {
    id: "curso-familia",
    slug: "familia-e-fe",
    title: "Família e fé",
    summary:
      "Reflexões práticas para fortalecer laços familiares com amor, escuta e Palavra.",
    description:
      "Conteúdo demonstrativo voltado a casais, pais e famílias que desejam crescer juntos na fé. Não representa um programa oficial já publicado pela Nova Vida; serve para validar a experiência do catálogo e da página de detalhes.",
    category: "familia",
    level: "todos",
    image: "/images/courses/familia.jpg",
    imageAlt: "Imagem demonstrativa: família reunida em momento de convivência",
    objectives: [
      "Cultivar diálogo e cuidado no lar",
      "Integrar oração e Palavra na rotina familiar",
      "Fortalecer vínculos entre gerações",
    ],
    modules: [
      {
        id: "fam-1",
        title: "Lar como espaço de graça",
        order: 1,
        lessons: [
          { id: "f1", title: "Acolhimento em casa", order: 1 },
          { id: "f2", title: "Escuta e perdão", order: 2 },
        ],
      },
      {
        id: "fam-2",
        title: "Fé compartilhada",
        order: 2,
        lessons: [
          { id: "f3", title: "Orações em família", order: 1 },
          { id: "f4", title: "Histórias de esperança", order: 2 },
        ],
      },
    ],
    durationLabel: "4 encontros",
    modality: "Presencial",
    status: "demo",
    featured: true,
  },
  {
    id: "curso-oracao",
    slug: "escola-de-oracao",
    title: "Escola de oração",
    summary:
      "Um caminho sereno para aprofundar a vida de oração individual e comunitária.",
    description:
      "Curso demonstrativo sobre práticas de oração, intercessão e silêncio diante de Deus. Preparado para ilustrar módulos, objetivos e futura área do aluno — sem matrícula real nesta fase.",
    category: "oracao",
    level: "iniciante",
    image: "/images/courses/oracao.jpg",
    imageAlt: "Imagem demonstrativa: horizonte iluminado ao amanhecer",
    objectives: [
      "Desenvolver uma rotina sustentável de oração",
      "Aprender a interceder com sensibilidade",
      "Experimentar momentos de quietude e gratidão",
    ],
    modules: [
      {
        id: "or-1",
        title: "Fundamentos da oração",
        order: 1,
        lessons: [
          { id: "o1", title: "Conversar com Deus", order: 1 },
          { id: "o2", title: "Gratidão e confiança", order: 2 },
        ],
      },
      {
        id: "or-2",
        title: "Oração em comunidade",
        order: 2,
        lessons: [
          { id: "o3", title: "Intercessão cuidadosa", order: 1 },
          { id: "o4", title: "Cuidado pastoral e limites", order: 2 },
        ],
      },
    ],
    durationLabel: "4 módulos",
    modality: "Híbrido",
    status: "demo",
    featured: true,
  },
  {
    id: "curso-discipulado",
    slug: "caminhando-no-discipulado",
    title: "Caminhando no discipulado",
    summary:
      "Para quem deseja aprofundar o seguimento de Jesus com consistência e comunhão.",
    description:
      "Material demonstrativo de discipulado contínuo. Em produção futura, poderá incluir acompanhamento, materiais e progresso do aluno. Nesta fase, a interface apenas apresenta a estrutura.",
    category: "discipulado",
    level: "intermediario",
    image: "/images/courses/discipulado.jpg",
    imageAlt: "Imagem demonstrativa: pessoa lendo em ambiente calmo",
    objectives: [
      "Aprofundar o compromisso com o seguimento de Jesus",
      "Praticar o discipulado em relacionamentos reais",
      "Integrar fé e vida cotidiana",
    ],
    modules: [
      {
        id: "d-1",
        title: "Seguir Jesus",
        order: 1,
        lessons: [
          { id: "d1", title: "Chamado e resposta", order: 1 },
          { id: "d2", title: "Hábitos que formam o caráter", order: 2 },
        ],
      },
      {
        id: "d-2",
        title: "Servir e crescer",
        order: 2,
        lessons: [
          { id: "d3", title: "Serviço com humildade", order: 1 },
          { id: "d4", title: "Crescimento em comunidade", order: 2 },
        ],
      },
    ],
    durationLabel: "8 semanas",
    modality: "Presencial",
    status: "demo",
    featured: false,
  },
];
