import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PUT(req: NextRequest) {
  await requireAdmin();

  const body = await req.json();

  const updates = body.sections as {
    id: string;
    sort_order: number;
  }[];

  for (const item of updates) {
    await supabaseAdmin
      .from("landing_sections")
      .update({ sort_order: item.sort_order })
      .eq("id", item.id);
  }

  return NextResponse.json({ success: true });
}