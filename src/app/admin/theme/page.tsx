import { supabaseAdmin } from "@/lib/supabase/admin";
import { ThemeCustomizer } from "@/components/ui/admin/ThemeCustomizer";

export default async function ThemePage() {
  const { data: page } = await supabaseAdmin
    .from("landing_pages")
    .select("*")
    .eq("slug", "home")
    .single();

  if (!page) return <p>Landing page tidak ditemukan.</p>;

  return <ThemeCustomizer page={page} />;
}