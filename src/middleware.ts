import { NextResponse } from "next/server";

/**
 * Placeholder de borda de rede. Autorização administrativa ocorre no servidor
 * (layouts/pages/actions), não neste middleware.
 */
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
