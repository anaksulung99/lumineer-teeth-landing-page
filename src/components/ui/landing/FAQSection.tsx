import type { LandingPage, LandingSection } from "@/types/landing";
import { getWhatsappCtaUrl } from "@/lib/cta";

type FAQ = {
  q: string;
  a: string;
};

export function FAQSection({
  page,
  section,
}: {
  page: LandingPage;
  section: LandingSection;
}) {
  const items = (section.metadata?.items || []) as FAQ[];

  const ctaUrl = getWhatsappCtaUrl({
    groupId: page.whatsapp_group_id,
    landingPageId: page.id,
    source: section.section_key,
  });

  return (
    <section className="px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-base font-bold uppercase tracking-widest text-cyan-600">
            FAQ
          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-slate-950 sm:text-5xl">
            {section.title}
          </h2>

          <p className="mt-5 text-xl text-slate-600">{section.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <summary className="cursor-pointer list-none text-xl font-bold text-slate-950">
                {item.q}
              </summary>

              <p className="mt-4 text-lg leading-relaxed text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={ctaUrl}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-8 py-5 text-lg font-bold text-white transition hover:bg-slate-800 sm:w-auto"
          >
            {section.button_text || "Tanya CS Sekarang"}
          </a>
        </div>
      </div>
    </section>
  );
}
