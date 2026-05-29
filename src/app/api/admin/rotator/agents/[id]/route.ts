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
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();

  const { id } = await params;

  const { data: agent, error: agentError } = await supabaseAdmin
    .from("wa_agents")
    .select("id, group_id")
    .eq("id", id)
    .single();

  if (agentError || !agent) {
    return NextResponse.json(
      { message: "Agent tidak ditemukan" },
      { status: 404 }
    );
  }

  await supabaseAdmin
    .from("wa_rotator_groups")
    .update({ last_agent_id: null })
    .eq("id", agent.group_id)
    .eq("last_agent_id", id);

  const { error } = await supabaseAdmin
    .from("wa_agents")
    .delete()
    .eq("id", id);

  if (error) {
    if (error.code === "23503") {
      const { error: deactivateError } = await supabaseAdmin
        .from("wa_agents")
        .update({ is_active: false })
        .eq("id", id);

      if (!deactivateError) {
        return NextResponse.json({ success: true, deleted: false });
      }

      return NextResponse.json(
        { message: deactivateError.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
