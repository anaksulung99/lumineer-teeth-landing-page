import Image from "next/image";
import { Star } from "lucide-react";
import type { LandingPage, LandingSection } from "@/types/landing";
import { getWhatsappCtaUrl } from "@/lib/cta";

type Testimonial = {
  name: string;
  rating: number;
  text: string;
};

export function TestimonialsSection({
  page,
  section,
}: {
  page: LandingPage;
  section: LandingSection;
}) {
  const items = (section.metadata?.items || []) as Testimonial[];

  const ctaUrl = getWhatsappCtaUrl({
    groupId: page.whatsapp_group_id,
    landingPageId: page.id,
    source: section.section_key,
  });

  return (
    <section className="bg-slate-950 px-5 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">
              Testimonial
            </p>

            <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">
              {section.title}
            </h2>

            <p className="mt-4 text-lg text-slate-300">{section.subtitle}</p>

            <a
              href={ctaUrl}
              className="mt-7 inline-flex rounded-2xl bg-cyan-500 px-6 py-4 font-bold text-white transition hover:bg-cyan-600"
            >
              {section.button_text || "Chat CS Sekarang"}
            </a>
          </div>

          <Image
            src={section.image_url || "/images/testimonial.webp"}
            alt={section.title || page.brand_name}
            width={700}
            height={700}
            className="rounded-[2rem] object-cover shadow-xl"
          />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.name} className="rounded-3xl bg-white p-6 text-slate-900">
              <div className="flex gap-1">
                {Array.from({ length: item.rating || 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-cyan-500 text-cyan-500"
                  />
                ))}
              </div>

              <p className="mt-4 leading-7 text-slate-600">“{item.text}”</p>

              <p className="mt-5 font-bold text-slate-950">— {item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}