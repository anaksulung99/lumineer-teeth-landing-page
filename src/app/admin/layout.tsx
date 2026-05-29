import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-5">
            <MobileNav />
            <Link href="/admin" className="text-xl font-bold text-gray-800">
              Admin Panel
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <DesktopNav />
            <form action="/api/auth/logout" method="post">
              <button className="font-bold text-red-500 transition-colors hover:text-red-700">
                Logout
              </button>
            </form>
          </div>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-8">{children}</section>
    </main>
  );
}
