import { Metadata } from 'next'
import { getPageMetadata } from '@/config/metadata'
import { HeroSection } from '@/components/layout/sections/hero/hero-section'
import { ActionButtons } from "@/components/layout/sections/action/action-buttons";
import { TechnologiesSection } from "@/components/layout/sections/technologies/technologies-section";
import { LanguagesSection } from '@/components/layout/sections/languages/languages-section';
import { DescriptionSection } from "@/components/layout/sections/description/description-section";

export const metadata: Metadata = getPageMetadata('home')

export default function HomePage() {
  return (
    <main className="flex-1 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
      </div>
      <DescriptionSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TechnologiesSection />
        <LanguagesSection />
      </div>
    </main>
  );
}
