import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { LandingPage } from "@/types/landing";
import { getWhatsappCtaUrl } from "@/lib/cta";

export function HeroSection({ page }: { page: LandingPage }) {
  const ctaUrl = getWhatsappCtaUrl({
    groupId: page.whatsapp_group_id,
    landingPageId: page.id,
    source: "hero",
  });

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50 to-white px-5 py-10 md:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-700">
            Diskon 50% + Beli 1 Gratis 1
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 md:text-6xl">
            {page.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            {page.description}
          </p>

          <div className="mt-6 grid gap-3 text-sm font-medium text-slate-700">
            {[
              "Gigi palsu elastis berbahan silikon",
              "Praktis tanpa cetak gigi yang rumit",
              "Cocok untuk gigi ompong sebagian maupun banyak",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-cyan-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <a
            href={ctaUrl}
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-6 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700 md:w-auto"
          >
            Klaim Promo via WhatsApp
          </a>

          <p className="mt-3 text-xs text-slate-500">
            Tanpa register, tanpa checkout form. Langsung chat CS.
          </p>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] bg-white p-4 shadow-2xl">
            <Image
              src={page.hero_image_url || "/images/product-main.webp"}
              alt={page.brand_name}
              width={800}
              height={800}
              className="rounded-[1.5rem] object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}