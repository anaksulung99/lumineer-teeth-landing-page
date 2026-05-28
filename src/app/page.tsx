import { getLandingPage } from "@/lib/landing";
import { HeroSection } from "@/components/landing/HeroSection";
import { StorySection } from "@/components/landing/StorySection";
import { BenefitsSection } from "@/components/landing/BenefitsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { StickyCTA } from "@/components/landing/StickyCTA";

export const revalidate = 60;

export default async function HomePage() {
  const page = await getLandingPage("home");

  if (!page) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Landing page belum tersedia.</p>
      </main>
    );
  }

  return (
    <main className="bg-white text-slate-900">
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

      <StickyCTA page={page} />
    </main>
  );
}