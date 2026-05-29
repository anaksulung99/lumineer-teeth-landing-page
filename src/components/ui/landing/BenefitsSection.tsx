import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import type { LandingPage, LandingSection } from "@/types/landing";
import { getWhatsappCtaUrl } from "@/lib/cta";
import { sendGTMEvent } from "@next/third-parties/google";

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
    <section className="bg-cyan-50 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-base font-bold uppercase tracking-widest text-cyan-600">
            Keunggulan Produk
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl">
            {section.title}
          </h2>

          <p className="mt-5 text-xl text-slate-600">{section.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="grid gap-5">
            {items.map((item) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-cyan-600" />
                <p className="text-lg font-semibold text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          <div className="rounded-[2rem] bg-white p-4 shadow-xl">
            <Image
              src="/images/image-01.png"
              alt={section.title || page.brand_name}
              width={700}
              height={700}
              className="rounded-[1.5rem] object-cover w-full h-auto"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href={ctaUrl}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-8 py-5 text-lg font-bold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-700 sm:w-auto"
            onClick={() =>
              sendGTMEvent({
                event: "whatsapp_cta_click",
                category: "benefits",
                action: "whatsapp",
                label: section.section_key || "klaim_promo",
              })
            }
          >
            {section.button_text || "Klaim Promo Sekarang"}
          </a>
        </div>
      </div>
    </section>
  );
}
