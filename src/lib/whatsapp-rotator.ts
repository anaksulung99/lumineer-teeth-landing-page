import { after } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type Strategy = "round_robin" | "equal" | "percentage";

export async function getNextWhatsappAgent({
  groupId,
  landingPageId,
  source,
  userAgent,
  ip,
}: {
  groupId: string;
  landingPageId?: string | null;
  source?: string | null;
  userAgent?: string | null;
  ip?: string | null;
}) {
  const { data: group, error: groupError } = await supabaseAdmin
    .from("wa_rotator_groups")
    .select("*")
    .eq("id", groupId)
    .eq("is_active", true)
    .single();

  if (groupError || !group) {
    throw new Error("WhatsApp group tidak ditemukan");
  }

  const { data: agents, error: agentsError } = await supabaseAdmin
    .from("wa_agents")
    .select("*")
    .eq("group_id", groupId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (agentsError || !agents || agents.length === 0) {
    throw new Error("Agent WhatsApp belum tersedia");
  }

  let selectedAgent = agents[0];
  const strategy = group.strategy as Strategy;

  if (strategy === "round_robin") {
    const lastIndex = agents.findIndex((a) => a.id === group.last_agent_id);
    const nextIndex = lastIndex === -1 ? 0 : (lastIndex + 1) % agents.length;
    selectedAgent = agents[nextIndex];
  }

  if (strategy === "equal") {
    selectedAgent = agents.reduce((lowest, current) => {
      return current.total_leads < lowest.total_leads ? current : lowest;
    }, agents[0]);
  }

  if (strategy === "percentage") {
    const weightedAgents = agents.flatMap((agent) =>
      Array(Math.max(agent.percentage || 1, 1)).fill(agent)
    );

    selectedAgent =
      weightedAgents[Math.floor(Math.random() * weightedAgents.length)];
  }

  after(async () => {
    await Promise.allSettled([
      supabaseAdmin
        .from("wa_rotator_groups")
        .update({ last_agent_id: selectedAgent.id })
        .eq("id", groupId),
      supabaseAdmin
        .from("wa_agents")
        .update({ total_leads: Number(selectedAgent.total_leads || 0) + 1 })
        .eq("id", selectedAgent.id),
      supabaseAdmin.from("wa_leads").insert({
        group_id: groupId,
        agent_id: selectedAgent.id,
        landing_page_id: landingPageId || null,
        source: source || null,
        user_agent: userAgent || null,
        customer_ip: ip || null,
      }),
    ]);
  });

  return selectedAgent;
}
