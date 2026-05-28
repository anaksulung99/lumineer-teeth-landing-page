import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-slate-100">
      <nav className="border-b bg-white px-5 py-4">
        <div className="mx-auto flex max-w-6xl gap-5 font-bold">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/landing">Landing Page</Link>
          <Link href="/admin/rotator">WA Rotator</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-5 py-8">{children}</section>
    </main>
  );
}