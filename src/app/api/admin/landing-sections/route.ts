import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  await requireAdmin();

  const body = await req.json();

  const { data, error } = await supabaseAdmin
    .from("landing_sections")
    .insert({
      landing_page_id: body.landing_page_id,
      section_key: body.section_key,
      section_type: body.section_type,
      title: body.title,
      subtitle: body.subtitle || "",
      body: body.body || "",
      image_url: body.image_url || "",
      button_text: body.button_text || "Klaim Promo Sekarang",
      sort_order: body.sort_order || 0,
      is_active: true,
      metadata: body.metadata || {},
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}