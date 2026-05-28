import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: admin } = await supabaseAdmin
    .from("admin_users")
    .select("*")
    .eq("id", user.id)
    .eq("is_active", true)
    .single();

  if (!admin) redirect("/login");

  return { user, admin };
}