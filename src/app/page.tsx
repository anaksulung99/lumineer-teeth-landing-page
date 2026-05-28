import { getLandingPage } from "@/lib/landing";
import { HeroSection } from "@/components/ui/landing/HeroSection";
import { StorySection } from "@/components/ui/landing/StorySection";
import { BenefitsSection } from "@/components/ui/landing/BenefitsSection";
import { PricingSection } from "@/components/ui/landing/PricingSection";
import { TestimonialsSection } from "@/components/ui/landing/TestimonialsSection";
import { FAQSection } from "@/components/ui/landing/FAQSection";
import { StickyCTA } from "@/components/ui/landing/StickyCTA";

export const revalidate = 60;

export default async function HomePage() {
  const page = await getLandingPage("home");

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Landing page belum tersedia.</p>
      </main>
    )
  }

  return (
    <main className="text-slate-900"
    style={{
      backgroundColor: page.theme?.background_color || "#ffffff",
      fontFamily: page.theme?.font_family || "Inter",
      ["--primary" as any]: page.theme?.primary_color || "#0891b2",
      ["--secondary" as any]: page.theme?.secondary_color || "#0f172a",
    }}>
      <HeroSection page={page} />

      {page.landing_sections.map((section) => {
        if (section.section_type === "story") {
          return <StorySection key={section.id} page={page} section={section} />;
        }

        if (section.section_type === "benefits") {
          return (
            <BenefitsSection key={section.id} page={page} section={section} />
          );
        }

        if (section.section_type === "pricing") {
          return (
            <PricingSection key={section.id} page={page} section={section} />
          );
        }

        if (section.section_type === "testimonials") {
          return (
            <TestimonialsSection
              key={section.id}
              page={page}
              section={section}
            />
          );
        }

        if (section.section_type === "faq") {
          return <FAQSection key={section.id} page={page} section={section} />;
        }

        return null;
      })}

      <StickyCTA page={page} style={{ backgroundColor: page.theme?.primary_color || "#0891b2" }}/>
    </main>
  );
}