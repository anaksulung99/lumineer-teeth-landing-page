import type { LandingPage } from "@/types/landing";
import { getWhatsappCtaUrl } from "@/lib/cta";

export function StickyCTA({ page }: { page: LandingPage }) {
  const ctaUrl = getWhatsappCtaUrl({
    groupId: page.whatsapp_group_id,
    landingPageId: page.id,
    source: "sticky-cta",
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 px-4 py-3 shadow-2xl backdrop-blur md:hidden">
      <a
        href={ctaUrl}
        className="flex w-full items-center justify-center rounded-2xl bg-cyan-600 px-5 py-4 text-base font-black text-white shadow-lg"
      >
        Klaim Diskon 50% + Beli 1 Gratis 1
      </a>
    </div>
  );
}