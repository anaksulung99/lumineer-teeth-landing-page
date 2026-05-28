import Image from "next/image";
import type { LandingPage, LandingSection } from "@/types/landing";
import { getWhatsappCtaUrl } from "@/lib/cta";

export function StorySection({
  page,
  section,
}: {
  page: LandingPage;
  section: LandingSection;
}) {
  const ctaUrl = getWhatsappCtaUrl({
    groupId: page.whatsapp_group_id,
    landingPageId: page.id,
    source: section.section_key,
  });

  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <Image
            src={section.image_url || "/images/story.webp"}
            alt={section.title || page.brand_name}
            width={700}
            height={700}
            className="rounded-[2rem] object-cover shadow-xl w-full h-auto"
          />
        </div>

        <div className="order-1 md:order-2">
          <p className="text-base font-bold uppercase tracking-widest text-cyan-600">
            Cerita Singkat
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl">
            {section.title}
          </h2>

          <p className="mt-5 text-xl font-semibold text-cyan-700">
            {section.subtitle}
          </p>

          <p className="mt-5 text-lg leading-relaxed text-slate-600">
            {section.body}
          </p>

          <a
            href={ctaUrl}
            className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-8 py-5 text-lg font-bold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            {section.button_text || "Chat WhatsApp Sekarang"}
          </a>
        </div>
      </div>
    </section>
  );
}