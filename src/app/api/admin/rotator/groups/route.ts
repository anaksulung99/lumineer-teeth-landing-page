import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  await requireAdmin();

  const body = await req.json();

  const { error, data } = await supabaseAdmin
    .from("wa_rotator_groups")
    .insert({
      name: body.name,
      strategy: body.strategy || "round_robin",
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(data);
}