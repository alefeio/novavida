import { ImageTextSection } from "@/components/ui/ImageTextSection";
import { Button } from "@/components/ui/Button";
import { media } from "@/content/media";

export function WelcomeSection() {
  return (
    <ImageTextSection
      eyebrow="Boas-vindas"
      title="Um lugar para crescer na fé e caminhar em comunhão."
      description={
        <>
          <p>
            Na Nova Vida, desejamos que cada pessoa se sinta acolhida — com
            liberdade para perguntar, escutar e caminhar no seu ritmo.
          </p>
          <p>
            Aqui a Palavra de Deus, a oração e a comunhão se encontram para
            renovar vidas e fortalecer famílias, com respeito à história de
            cada visitante.
          </p>
        </>
      }
      image={media.welcome.src}
      imageAlt={media.welcome.alt}
      caption="Fotografia demonstrativa (Unsplash)"
    >
      <Button href="/comunidade" variant="secondary">
        Conhecer a comunidade
      </Button>
    </ImageTextSection>
  );
}
