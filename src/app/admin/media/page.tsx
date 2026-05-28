import { supabaseAdmin } from "@/lib/supabase/admin";
import { MediaLibraryAdmin } from "@/components/ui/admin/MediaLibraryAdmin";

export default async function MediaPage() {
  const { data } = await supabaseAdmin
    .from("media_library")
    .select("*")
    .order("created_at", { ascending: false });

  return <MediaLibraryAdmin media={data || []} />;
}