import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function AdminPage() {
  const [{ count: leads }, { count: agents }, { count: sections }] =
    await Promise.all([
      supabaseAdmin.from("wa_leads").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("wa_agents").select("*", { count: "exact", head: true }),
      supabaseAdmin
        .from("landing_sections")
        .select("*", { count: "exact", head: true }),
    ]);

  return (
    <div>
      <h1 className="text-3xl font-black">Dashboard</h1>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card title="Total Leads" value={leads || 0} />
        <Card title="Total CS Agent" value={agents || 0} />
        <Card title="Landing Sections" value={sections || 0} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <p className="text-slate-500">{title}</p>
      <p className="mt-2 text-4xl font-black">{value}</p>
    </div>
  );
}