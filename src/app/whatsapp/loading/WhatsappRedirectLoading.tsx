"use client";

import { useEffect } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsappRedirectLoading({
  rotateUrl,
}: {
  rotateUrl: string | null;
}) {
  useEffect(() => {
    if (!rotateUrl) return;

    window.location.replace(rotateUrl);
  }, [rotateUrl]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f2f5] px-4 py-10 text-slate-900">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl shadow-slate-900/10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#25d366] text-white">
          <MessageCircle className="size-8" />
        </div>

        <div className="mx-auto mt-6 size-9 animate-spin rounded-full border-4 border-slate-200 border-t-[#25d366]" />

        <h1 className="mt-6 text-2xl font-black text-slate-950">
          Menghubungkan ke WhatsApp
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          Tunggu sebentar, kamu akan segera dialihkan ke CS yang tersedia.
        </p>

        {!rotateUrl && (
          <Link
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#25d366] px-5 py-3 text-sm font-bold text-white"
          >
            Kembali ke halaman utama
          </Link>
        )}
      </div>
    </main>
  );
}
