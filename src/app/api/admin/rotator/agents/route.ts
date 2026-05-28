import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  await requireAdmin();

  const body = await req.json();

  const { error, data } = await supabaseAdmin
    .from("wa_agents")
    .insert({
      group_id: body.group_id,
      name: body.name,
      phone: body.phone,
      percentage: body.percentage || 0,
      sort_order: body.sort_order || 0,
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