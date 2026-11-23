import type { NavigationItem } from "@/types/content";

/** Navegação principal do header (desktop). */
export const primaryNavigation: NavigationItem[] = [
  { label: "Início", href: "/" },
  { label: "Sobre nós", href: "/sobre" },
  { label: "Nossa fé", href: "/nossa-fe" },
  { label: "Cultos e encontros", href: "/cultos-e-encontros" },
  { label: "Comunidade", href: "/comunidade" },
  { label: "Cursos", href: "/cursos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

/** CTA destacado no header. */
export const visitCta: NavigationItem = {
  label: "Visite-nos",
  href: "/visite-nos",
  description: "Orientações para a primeira visita",
};

/** Links secundários (menu mobile expandido / footer). */
export const secondaryNavigation: NavigationItem[] = [
  { label: "Mensagens", href: "/mensagens" },
  { label: "Pedido de oração", href: "/oracao" },
  { label: "Visite-nos", href: "/visite-nos" },
];

export const footerNavigation: {
  title: string;
  items: NavigationItem[];
}[] = [
  {
    title: "Conheça",
    items: [
      { label: "Sobre nós", href: "/sobre" },
      { label: "Nossa fé", href: "/nossa-fe" },
      { label: "Comunidade", href: "/comunidade" },
      { label: "Visite-nos", href: "/visite-nos" },
    ],
  },
  {
    title: "Participe",
    items: [
      { label: "Cultos e encontros", href: "/cultos-e-encontros" },
      { label: "Cursos", href: "/cursos" },
      { label: "Pedido de oração", href: "/oracao" },
      { label: "Contato", href: "/contato" },
    ],
  },
  {
    title: "Conteúdos",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Mensagens", href: "/mensagens" },
    ],
  },
];
