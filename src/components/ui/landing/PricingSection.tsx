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
    <section className="px-5 py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-600">
            Promo Terbatas
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-5xl">
            {section.title}
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            {section.body}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border border-cyan-100 bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <Gift className="h-7 w-7 text-cyan-600" />
              <p className="text-lg font-bold text-slate-950">
                {meta.bonus || "Beli 1 Gratis 1"}
              </p>
            </div>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-400 line-through">
                Harga Normal {meta.normal_price || "Rp398.000"}
              </p>

              <p className="mt-1 text-5xl font-black text-cyan-600">
                {meta.sale_price || "Rp199.000"}
              </p>

              <p className="mt-2 text-sm font-bold text-red-500">
                Hemat {meta.discount || "50%"} khusus hari ini
              </p>
            </div>

            <div className="mt-6 grid gap-3 text-sm text-slate-600">
              <div className="flex gap-2">
                <ShieldCheck className="h-5 w-5 text-cyan-600" />
                <span>Pembelian langsung diarahkan ke CS resmi.</span>
              </div>

              <div className="flex gap-2">
                <Sparkles className="h-5 w-5 text-cyan-600" />
                <span>Tanpa register dan tanpa checkout form.</span>
              </div>
            </div>

            <a
              href={ctaUrl}
              className="mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-cyan-700"
            >
              {section.button_text || "Ambil Promo Sekarang"}
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-cyan-50 p-4">
          <Image
            src={section.image_url || "/images/pricing.webp"}
            alt={section.title || page.brand_name}
            width={700}
            height={700}
            className="rounded-[1.5rem] object-cover shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}