import { Metadata } from 'next'
import { getPageMetadata } from '@/config/metadata'
import { HeroSection } from '@/components/layout/sections/hero/hero-section'
import { TechnologiesSection } from "@/components/layout/sections/technologies/technologies-section";
import { LanguagesSection } from '@/components/layout/sections/languages/languages-section';
import { DescriptionSection } from "@/components/layout/sections/description/description-section";
import { SocialProofSection } from "@/components/layout/sections/social-proof/social-proof-section";
import { BenefitsSection } from "@/components/layout/sections/benefits/benefits-section";
import { FAQSection } from "@/components/layout/sections/faq/faq-section";
// import { TestimonialsSection } from "@/components/layout/sections/testimonials/testimonials-section";
import { FinalCTASection } from "@/components/layout/sections/cta/final-cta-section";

export const metadata: Metadata = getPageMetadata('home');

export default function HomePage() {
  return (
    <main className="flex-1 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </div>
      <DescriptionSection />
      <SocialProofSection />
      <BenefitsSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnologiesSection />
        <LanguagesSection />
      </div>
      <FAQSection />
      {/* <TestimonialsSection /> */}
      <FinalCTASection />
    </main>
  );
}
