import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("media_library")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  await requireAdmin();

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ message: "File wajib diupload" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const filePath = `landing/${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabaseAdmin.storage
    .from("landing-media")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ message: uploadError.message }, { status: 400 });
  }

  const { data: publicUrl } = supabaseAdmin.storage
    .from("landing-media")
    .getPublicUrl(filePath);

  const { data, error } = await supabaseAdmin
    .from("media_library")
    .insert({
      file_name: file.name,
      file_url: publicUrl.publicUrl,
      file_path: filePath,
      file_size: file.size,
      mime_type: file.type,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}