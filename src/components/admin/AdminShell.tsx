import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminNav } from "@/components/admin/AdminNav";
import type { AppRole } from "@/lib/auth/roles";

type Props = {
  user: { name: string; email: string; role: AppRole };
  children: React.ReactNode;
};

export function AdminShell({ user, children }: Props) {
  return (
    <div className="min-h-screen bg-[linear-gradient(165deg,var(--color-ivory)_0%,color-mix(in_srgb,var(--color-sand)_35%,var(--color-ivory))_48%,var(--color-ivory)_100%)]">
      <AdminHeader user={user} />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-lg border border-[var(--border-subtle)] bg-surface-elevated/80 p-3 shadow-soft backdrop-blur-sm">
            <AdminNav />
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
