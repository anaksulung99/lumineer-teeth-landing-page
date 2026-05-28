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
    <section className="px-5 py-14">
      <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <Image
            src={section.image_url || "/images/story.webp"}
            alt={section.title || page.brand_name}
            width={700}
            height={700}
            className="rounded-[2rem] object-cover shadow-xl"
          />
        </div>

        <div className="order-1 md:order-2">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-600">
            Cerita Singkat
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-5xl">
            {section.title}
          </h2>

          <p className="mt-4 text-lg font-semibold text-cyan-700">
            {section.subtitle}
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            {section.body}
          </p>

          <a
            href={ctaUrl}
            className="mt-7 inline-flex rounded-2xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800"
          >
            {section.button_text || "Chat WhatsApp Sekarang"}
          </a>
        </div>
      </div>
    </section>
  );
}