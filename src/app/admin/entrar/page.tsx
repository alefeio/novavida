import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { requireAdminAccess } from "@/lib/auth/session";
import { isAdminDatabaseConfigured } from "@/lib/db/env";
import { institution } from "@/content/institution";

export default async function AdminLoginPage() {
  if (isAdminDatabaseConfigured()) {
    const access = await requireAdminAccess();
    if (access.ok) {
      redirect("/admin");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,var(--color-ivory),color-mix(in_srgb,var(--color-sage)_22%,var(--color-ivory)),var(--color-sand))] px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-[var(--border-subtle)] bg-surface-elevated/95 p-8 shadow-soft backdrop-blur-sm">
        <p className="font-serif text-3xl font-semibold text-olive">
          {institution.shortName}
        </p>
        <h1 className="mt-2 font-serif text-2xl text-ink">Entrar na administração</h1>
        <p className="mt-2 text-sm text-muted">
          Acesso restrito a OWNER e ADMIN. Sessão validada no servidor.
        </p>

        {!isAdminDatabaseConfigured() ? (
          <p
            role="status"
            className="mt-6 rounded-md border border-[var(--border-subtle)] bg-ivory px-3 py-3 text-sm text-muted"
          >
            Ambiente administrativo ainda sem banco/secret configurados. O site
            público permanece disponível; configure as variáveis documentadas em
            <code className="mx-1 text-ink">.env.example</code>
            para habilitar o login.
          </p>
        ) : (
          <div className="mt-6">
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
}
