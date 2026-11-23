import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { institution } from "@/content/institution";
import { createPageMetadata, defaultDescription } from "@/lib/seo/metadata";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  ...createPageMetadata({
    title: institution.name,
    description: defaultDescription,
    path: "/",
  }),
  applicationName: institution.shortName,
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png" }],
    apple: [{ url: "/brand/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${lato.variable} antialiased`}>
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-olive focus:px-4 focus:py-2 focus:text-on-brand"
        >
          Ir para o conteúdo principal
        </a>
        <SiteHeader />
        <main id="conteudo-principal">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
