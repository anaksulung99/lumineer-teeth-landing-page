import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { LandingPage } from "@/types/landing";
import { getWhatsappCtaUrl } from "@/lib/cta";
import { sendGTMEvent } from "@next/third-parties/google";

export function HeroSection({ page }: { page: LandingPage }) {
  const ctaUrl = getWhatsappCtaUrl({
    groupId: page.whatsapp_group_id,
    landingPageId: page.id,
    source: "hero",
  });

  return (
    <section className="relative bg-linear-to-b from-cyan-50 to-white px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <div>
          <div className="mb-5 inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Diskon 50% + Beli 1 Gratis 1
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl md:text-6xl">
            {page.title}
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            {page.description}
          </p>

          <div className="mt-8 grid gap-4 text-base font-medium text-slate-700">
            {[
              "Gigi palsu elastis berbahan silikon",
              "Praktis tanpa cetak gigi yang rumit",
              "Cocok untuk gigi ompong sebagian maupun banyak",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-cyan-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <a
            href={ctaUrl}
            className="mt-10 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-8 py-5 text-lg font-bold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700 sm:w-auto"
            onClick={() =>
              sendGTMEvent({
                event: "whatsapp_cta_click",
                category: "hero",
                action: "whatsapp",
                label: "klaim_promo",
              })
            }
          >
            Klaim Promo via WhatsApp
          </a>

          <p className="mt-4 text-sm text-slate-500">
            Tanpa register, tanpa checkout form. Langsung chat CS.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] bg-white p-4 shadow-2xl">
            <Image
              src="/images/hero-img.png"
              alt={page.brand_name}
              width={800}
              height={800}
              className="rounded-[1.5rem] object-cover w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
