import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { landingSectionSchema } from "@/lib/validations";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();

  const { id } = await params;
  const body = await req.json();
  const parsed = landingSectionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message || "Data section tidak valid" },
      { status: 422 }
    );
  }

  const { error } = await supabaseAdmin
    .from("landing_sections")
    .update({
      title: parsed.data.title,
      subtitle: parsed.data.subtitle,
      body: parsed.data.body,
      image_url: parsed.data.image_url,
      button_text: parsed.data.button_text,
      metadata: parsed.data.metadata,
      is_active: parsed.data.is_active,
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
