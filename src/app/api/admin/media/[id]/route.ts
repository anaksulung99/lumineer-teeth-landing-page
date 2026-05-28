import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();

  const { id } = await params;

  const { data: media } = await supabaseAdmin
    .from("media_library")
    .select("*")
    .eq("id", id)
    .single();

  if (!media) {
    return NextResponse.json({ message: "Media tidak ditemukan" }, { status: 404 });
  }

  await supabaseAdmin.storage.from("landing-media").remove([media.file_path]);

  const { error } = await supabaseAdmin
    .from("media_library")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}