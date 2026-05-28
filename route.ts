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
    .from("landing_sections")
    .update({
      title: body.title,
      subtitle: body.subtitle,
      body: body.body,
      image_url: body.image_url,
      button_text: body.button_text,
      metadata: body.metadata || {},
      is_active: body.is_active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}