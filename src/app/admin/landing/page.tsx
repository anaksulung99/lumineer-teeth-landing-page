import { supabaseAdmin } from "@/lib/supabase/admin";
import { LandingSectionForm } from "@/components/admin/LandingSectionForm";

export default async function AdminLandingPage() {
  const { data: page } = await supabaseAdmin
    .from("landing_pages")
    .select("*, landing_sections(*)")
    .eq("slug", "home")
    .single();

  if (!page) return <p>Landing page belum tersedia.</p>;

  const sections = [...page.landing_sections].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return (
    <div>
      <h1 className="text-3xl font-black">Edit Landing Page</h1>

      <div className="mt-6 grid gap-5">
        {sections.map((section) => (
          <LandingSectionForm key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}