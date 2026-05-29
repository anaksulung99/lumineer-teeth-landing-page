import Image from "next/image";
import { Gift, ShieldCheck, Sparkles } from "lucide-react";
import type { LandingPage, LandingSection } from "@/types/landing";
import { getWhatsappCtaUrl } from "@/lib/cta";

export function PricingSection({
  page,
  section,
}: {
  page: LandingPage;
  section: LandingSection;
}) {
  const meta = section.metadata || {};
  const badges = (meta.badges || []) as string[];

  const ctaUrl = getWhatsappCtaUrl({
    groupId: page.whatsapp_group_id,
    landingPageId: page.id,
    source: section.section_key,
  });

  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-base font-bold uppercase tracking-widest text-cyan-600">
            Promo Terbatas
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl">
            {section.title}
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {section.body}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-cyan-100 bg-white p-8 shadow-xl">
            <div className="flex items-center gap-4">
              <Gift className="h-8 w-8 text-cyan-600" />
              <p className="text-xl font-bold text-slate-950">
                {meta.bonus || "Beli 1 Gratis 1"}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-base font-semibold text-slate-400 line-through">
                Harga Normal {meta.normal_price || "Rp398.000"}
              </p>

              <p className="mt-2 text-6xl font-black text-cyan-600">
                {meta.sale_price || "Rp99.000"}
              </p>

              <p className="mt-2 text-base font-bold text-red-500">
                Hemat {meta.discount || "50%"} khusus hari ini
              </p>
            </div>

            <div className="mt-8 grid gap-4 text-base text-slate-600">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-cyan-600" />
                <span>Pembelian langsung diarahkan ke CS resmi.</span>
              </div>

              <div className="flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-cyan-600" />
                <span>Tanpa register dan tanpa checkout form.</span>
              </div>
            </div>

            <a
              href={ctaUrl}
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-8 py-5 text-lg font-bold text-white transition hover:bg-cyan-700"
            >
              {section.button_text || "Ambil Promo Sekarang"}
            </a>
          </div>
        </div>

        <div className="order-first md:order-last rounded-[2rem] bg-cyan-50 p-4">
          <Image
            src="/images/image-03.png"
            alt={section.title || page.brand_name}
            width={700}
            height={700}
            className="rounded-[1.5rem] object-cover shadow-xl w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
