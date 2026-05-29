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
    <section className="bg-slate-950 px-4 py-16 text-white md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-base font-bold uppercase tracking-widest text-cyan-300">
              Testimonial
            </p>

            <h2 className="mt-4 text-4xl font-extrabold sm:text-5xl">
              {section.title}
            </h2>

            <p className="mt-5 text-xl text-slate-300">{section.subtitle}</p>

            <a
              href={ctaUrl}
              className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-8 py-5 text-lg font-bold text-white transition hover:bg-cyan-600 sm:w-auto"
            >
              {section.button_text || "Chat CS Sekarang"}
            </a>
          </div>

          <Image
            src="/images/image-04.png"
            alt={section.title || page.brand_name}
            width={700}
            height={700}
            className="rounded-[2rem] object-cover shadow-xl w-full h-auto"
          />
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.name}
              className="rounded-3xl bg-white p-8 text-slate-900"
            >
              <div className="flex gap-1">
                {Array.from({ length: item.rating || 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-6 w-6 fill-cyan-500 text-cyan-500"
                  />
                ))}
              </div>

              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                “{item.text}”
              </p>

              <p className="mt-6 font-bold text-slate-950">— {item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
