import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdminAccess } from "@/lib/auth/session";
import { isAdminDatabaseConfigured } from "@/lib/db/env";
import { writeAuditLog } from "@/lib/auth/audit";

const upcomingModules = [
  {
    id: "institucional",
    title: "Institucional",
    description: "Perfil, contatos e valores oficiais — Sprint 2.1.",
  },
  {
    id: "agenda",
    title: "Agenda",
    description: "Cultos e encontros homologados — Sprint 2.1.",
  },
  {
    id: "blog",
    title: "Blog",
    description: "Fluxo editorial com revisão — Sprint 2.2.",
  },
  {
    id: "mensagens",
    title: "Mensagens",
    description: "Publicação de mensagens e mídia — Sprint 2.2.",
  },
  {
    id: "cursos",
    title: "Cursos",
    description: "Catálogo, módulos e progresso — Sprint 2.3.",
  },
  {
    id: "configuracoes",
    title: "Configurações",
    description: "Papéis, bootstrap e integrações — evolução contínua.",
  },
] as const;

export default async function AdminDashboardPage() {
  if (!isAdminDatabaseConfigured()) {
    redirect("/admin/entrar");
  }

  const access = await requireAdminAccess();
  if (!access.ok) {
    if (access.reason === "forbidden") {
      redirect("/admin/entrar?erro=sem-permissao");
    }
    redirect("/admin/entrar");
  }

  await writeAuditLog({
    action: "admin.panel_view",
    actorId: access.user.id,
    metadata: { panel: "dashboard" },
  });

  return (
    <AdminShell user={access.user}>
      <section className="rounded-xl border border-[var(--border-subtle)] bg-surface-elevated/90 p-6 shadow-soft sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-olive">
          Fundação Sprint 2.0
        </p>
        <h1 className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
          Painel administrativo
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Autenticação e autorização estão ativas. Os módulos editoriais abaixo
          estão previstos na arquitetura, mas ainda não possuem operações de
          gravação nesta sprint.
        </p>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        {upcomingModules.map((module) => (
          <article
            key={module.id}
            id={module.id}
            className="rounded-lg border border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--color-ivory)_70%,white)] p-5"
          >
            <h2 className="font-serif text-xl text-ink">{module.title}</h2>
            <p className="mt-2 text-sm text-muted">{module.description}</p>
            <p className="mt-4 text-xs font-medium uppercase tracking-wide text-olive">
              Indisponível nesta sprint
            </p>
          </article>
        ))}
      </section>
    </AdminShell>
  );
}
