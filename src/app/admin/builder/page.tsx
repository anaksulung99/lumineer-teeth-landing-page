import { supabaseAdmin } from "@/lib/supabase/admin";
import { LandingBuilder } from "@/components/ui/admin/LandingBuilder";

export default async function BuilderPage() {
  const { data: page } = await supabaseAdmin
    .from("landing_pages")
    .select("*, landing_sections(*)")
    .eq("slug", "home")
    .single();

  if (!page) return <p>Landing page tidak ditemukan.</p>;

  return <LandingBuilder page={page} />;
}