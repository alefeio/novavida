"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { signOut } from "@/lib/auth/client";
import { Button } from "@/components/ui/Button";
import { AdminNav } from "@/components/admin/AdminNav";
import type { AppRole } from "@/lib/auth/roles";

type Props = {
  user: { name: string; email: string; role: AppRole };
};

export function AdminHeader({ user }: Props) {
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/admin/entrar";
          },
        },
      });
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="border-b border-[var(--border-subtle)] bg-[color-mix(in_srgb,var(--color-ivory)_92%,white)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-subtle)] text-ink lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div>
            <Link
              href="/admin"
              className="font-serif text-xl font-semibold text-olive"
            >
              Nova Vida
            </Link>
            <p className="text-xs text-muted">Área administrativa</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-ink">{user.name}</p>
            <p className="text-xs text-muted">
              {user.email} · {user.role}
            </p>
          </div>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={loggingOut}
            onClick={handleLogout}
          >
            {loggingOut ? "Saindo…" : "Sair"}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--border-subtle)] px-4 py-3 lg:hidden">
          <p className="mb-2 text-xs text-muted sm:hidden">
            {user.name} · {user.role}
          </p>
          <AdminNav onNavigate={() => setOpen(false)} />
        </div>
      ) : null}
    </header>
  );
}
