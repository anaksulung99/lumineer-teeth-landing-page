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
    .from("landing_pages")
    .update({
      brand_name: body.brand_name,
      title: body.title,
      description: body.description,
      hero_image_url: body.hero_image_url,
      logo_url: body.logo_url,
      theme: body.theme,
      whatsapp_group_id: body.whatsapp_group_id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}


export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();

  const { id } = await params;

  const { error } = await supabaseAdmin
    .from("landing_sections")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}