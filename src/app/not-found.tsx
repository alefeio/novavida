import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-olive">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl sm:text-5xl">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted">
        O endereço acessado não existe ou foi movido. Volte à página inicial
        para continuar navegando.
      </p>
      <Button href="/" className="mt-8">
        Ir para o início
      </Button>
    </Container>
  );
}
