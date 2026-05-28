import { supabasePublic } from "@/lib/supabase/public";
import type { LandingPage } from "@/types/landing";

export async function getLandingPage(slug = "home") {
  const { data, error } = await supabasePublic
    .from("landing_pages")
    .select(
      `
      *,
      landing_sections (*)
    `
    )
    .eq("slug", slug)
    .eq("is_active", true)
    .eq("landing_sections.is_active", true)
    .single();

  if (error || !data) {
    return null;
  }

  const page = data as LandingPage;

  return {
    ...page,
    landing_sections: page.landing_sections.sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  };
}