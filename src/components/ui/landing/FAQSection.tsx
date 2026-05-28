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
    <section className="px-5 py-14">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-600">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-extrabold text-slate-950 md:text-5xl">
            {section.title}
          </h2>

          <p className="mt-4 text-lg text-slate-600">{section.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4">
          {items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <summary className="cursor-pointer list-none text-lg font-bold text-slate-950">
                {item.q}
              </summary>

              <p className="mt-3 leading-7 text-slate-600">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={ctaUrl}
            className="inline-flex rounded-2xl bg-slate-950 px-8 py-4 text-lg font-bold text-white transition hover:bg-slate-800"
          >
            {section.button_text || "Tanya CS Sekarang"}
          </a>
        </div>
      </div>
    </section>
  );
}