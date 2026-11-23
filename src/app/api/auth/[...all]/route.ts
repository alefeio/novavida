import { getAuth } from "@/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { isAdminDatabaseConfigured } from "@/lib/db/env";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function guard(request: Request, method: "GET" | "POST") {
  if (!isAdminDatabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "Autenticação administrativa indisponível neste ambiente (banco/secret não configurados).",
      },
      { status: 503 },
    );
  }

  const url = new URL(request.url);
  if (url.pathname.endsWith("/sign-up") || url.pathname.includes("/sign-up/")) {
    return NextResponse.json(
      { error: "Cadastro público desabilitado." },
      { status: 403 },
    );
  }

  const handlers = toNextJsHandler(getAuth());
  return method === "GET" ? handlers.GET(request) : handlers.POST(request);
}

export async function GET(request: Request) {
  return guard(request, "GET");
}

export async function POST(request: Request) {
  return guard(request, "POST");
}
