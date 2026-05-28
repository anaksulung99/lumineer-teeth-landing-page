import { createMiddlewareClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({
    req: request,
    res: res,
  });

  await supabase.auth.getSession();

  return res;
}
