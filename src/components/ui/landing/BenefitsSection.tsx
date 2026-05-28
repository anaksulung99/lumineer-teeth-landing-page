import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { LandingPage, LandingSection } from "@/types/landing";
import { getWhatsappCtaUrl } from "@/lib/cta";

export function BenefitsSection({
  page,
  section,
}: {
  page: LandingPage;
  section: LandingSection;
}) {
  const items = (section.metadata?.items || []) as string[];

  const ctaUrl = getWhatsappCtaUrl({
    groupId: page.whatsapp_group_id,
    landingPageId: page.id,
    source: section.section_key,
  });

  return (
    <section className="bg-cyan-50 px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-600">
            Keunggulan Produk
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-5xl">
            {section.title}
          </h2>

          <p className="mt-4 text-lg text-slate-600">{section.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div className="grid gap-4">
            {items.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-cyan-600" />
                <p className="font-semibold text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-xl">
            <Image
              src={section.image_url || "/images/benefits.webp"}
              alt={section.title || page.brand_name}
              width={700}
              height={700}
              className="rounded-[1.5rem] object-cover"
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href={ctaUrl}
            className="inline-flex rounded-2xl bg-cyan-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700"
          >
            {section.button_text || "Klaim Promo Sekarang"}
          </a>
        </div>
      </div>
    </section>
  );
}