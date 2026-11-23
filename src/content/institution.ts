import type {
  ContactInfo,
  FaithPrinciple,
  InstitutionalContent,
  InstitutionalValue,
} from "@/types/content";

/**
 * Conteúdo institucional confirmado no briefing e no planejamento.
 * Campos pendentes ficam explícitos — não inventamos dados.
 */
export const institution: InstitutionalContent = {
  name: "Nova Vida — Igreja do Renascimento",
  shortName: "Nova Vida",
  tagline: "Renovando Vidas pela Palavra",
  mission:
    "Aproximar pessoas de Jesus Cristo, promover o crescimento espiritual e fortalecer famílias por meio do amor, da Palavra de Deus, da oração e da comunhão.",
  welcomeMessage:
    "Seja bem-vindo. Aqui você encontra um espaço para crescer na fé, ser acolhido com respeito e caminhar em comunhão — no seu tempo, sem pressão.",
  values: [
    {
      id: "palavra",
      title: "Palavra de Deus",
      description:
        "A Bíblia orienta nossa fé, nossa convivência e o caminho de renovação que desejamos viver juntos.",
      status: "confirmed",
    },
    {
      id: "oracao",
      title: "Oração",
      description:
        "Cultivamos a oração como expressão de confiança em Deus e de cuidado uns pelos outros.",
      status: "confirmed",
    },
    {
      id: "comunhao",
      title: "Comunhão",
      description:
        "Valorizamos relações genuínas, hospitalidade e uma vida comunitária marcada pelo amor.",
      status: "confirmed",
    },
    {
      id: "familia",
      title: "Família",
      description:
        "Buscamos fortalecer famílias e gerações, oferecendo apoio, escuta e crescimento espiritual.",
      status: "confirmed",
    },
    {
      id: "acolhimento",
      title: "Acolhimento sem pressão",
      description:
        "Respeitamos a liberdade de cada visitante. Você é bem-vindo independentemente de sua comunidade religiosa atual.",
      status: "confirmed",
    },
  ] satisfies InstitutionalValue[],
  faithPrinciples: [
    {
      id: "jesus",
      title: "Centralidade em Jesus Cristo",
      description:
        "Confessamos Jesus Cristo como Senhor e Salvador, centro da nossa fé e da nossa missão.",
      status: "confirmed",
    },
    {
      id: "biblia",
      title: "Autoridade da Bíblia",
      description:
        "A Escritura Sagrada é nossa referência para crer, viver e servir.",
      status: "confirmed",
    },
    {
      id: "renovacao",
      title: "Renovação pela Palavra",
      description:
        "Cremos que Deus renova vidas pela Palavra, pelo Espírito e pela comunhão do povo.",
      status: "confirmed",
    },
    {
      id: "declaracao",
      title: "Declaração de fé completa",
      description:
        "Uma declaração doutrinária oficial mais ampla ainda aguarda validação institucional antes da publicação.",
      status: "pending",
    },
  ] satisfies FaithPrinciple[],
  pendingNote:
    "Endereço, horários, contatos, liderança, história institucional e declaração de fé completa aguardam confirmação oficial.",
};

export const contactInfo: ContactInfo = {
  status: "pending",
  notes:
    "Telefone, e-mail, WhatsApp, redes sociais e endereço ainda não foram homologados. Esta página permanece preparada para receber os canais oficiais.",
};

export const categoryLabels = {
  courses: {
    fundamentos: "Fundamentos",
    familia: "Família",
    oracao: "Oração",
    discipulado: "Discipulado",
    biblia: "Bíblia",
  },
  articles: {
    biblia: "Bíblia",
    familia: "Família",
    "vida-crista": "Vida cristã",
    oracao: "Oração",
    comunhao: "Comunhão",
  },
  levels: {
    iniciante: "Iniciante",
    intermediario: "Intermediário",
    avancado: "Avançado",
    todos: "Todos os níveis",
  },
} as const;
