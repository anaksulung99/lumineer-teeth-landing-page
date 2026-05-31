"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, AlertTriangle } from "lucide-react";

export function WhatsappRedirectLoading({
  rotateUrl,
}: {
  rotateUrl: string | null;
}) {
  const [error, setError] = useState<string | null>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!rotateUrl) return;
    const url = rotateUrl;

    async function processRedirect() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Gagal mengambil data agen CS");

        const data = await res.json();
        if (!data.phone) throw new Error("Nomor agen tidak ditemukan");

        const rawMessage =
          "Halo kak, saya tertarik promo Lumineers Teeth Beli 1 Gratis 1 + Diskon 50%. Apakah masih tersedia?\nnama: \nalamat: ";
        const message = encodeURIComponent(rawMessage);

        const whatsappUrl = `https://wa.me/${data.phone}?text=${message}`;
        setFallbackUrl(whatsappUrl);

        window.location.replace(whatsappUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      }
    }

    processRedirect();
  }, [rotateUrl]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f0f2f5] px-4 py-10 text-slate-900">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl shadow-slate-900/10">
        {error ? (
          // UI jika terjadi error sistem
          <>
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600">
              <AlertTriangle className="size-8" />
            </div>
            <h1 className="mt-6 text-xl font-bold text-slate-950">
              Gagal Menghubungkan
            </h1>
            <p className="mt-2 text-sm text-slate-600">{error}</p>
          </>
        ) : (
          // UI Utama Loading yang disukai Google Ads (User Experience Jelas)
          <>
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
          </>
        )}

        {/* Tombol Bantuan Manual (PENTING untuk In-App Browser YouTube jika redirect otomatisnya macet) */}
        {fallbackUrl && (
          <a
            href={fallbackUrl}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#25d366] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#20ba56]"
          >
            Klik di sini jika tidak otomatis beralih
          </a>
        )}

        {(!rotateUrl || error) && (
          <Link
            href="/"
            className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
          >
            Kembali ke halaman utama
          </Link>
        )}
      </div>
    </main>
  );
}
