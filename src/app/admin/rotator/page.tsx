import { supabaseAdmin } from "@/lib/supabase/admin";
import { RotatorAdmin } from "@/components/ui/admin/RotatorAdmin";

export default async function RotatorPage() {
  const { data: groups } = await supabaseAdmin
    .from("wa_rotator_groups")
    .select("*, wa_agents(*)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-3xl font-black">WhatsApp Rotator</h1>
      <RotatorAdmin groups={groups || []} />
    </div>
  );
}