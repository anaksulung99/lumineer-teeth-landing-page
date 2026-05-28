import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();

  const { id } = await params;
  const body = await req.json();

  const { error } = await supabaseAdmin
    .from("wa_agents")
    .update({
      name: body.name,
      phone: body.phone,
      percentage: body.percentage,
      sort_order: body.sort_order,
      is_active: body.is_active,
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();

  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("wa_agents")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}