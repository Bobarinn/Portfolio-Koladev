import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import {
  AboutSection,
  WhatIDoSection,
  WhyWorkSection,
  ToolsSection,
  FinalCtaSection,
} from '@/components/sections/BubbleFocusSections';
import { ContactSection } from '@/components/sections/ContactSection';
import { FooterSection } from '@/components/sections/FooterSection';
import { Header } from '@/components/common/Header';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhatIDoSection />
      <ProjectsSection />
      <WhyWorkSection />
      <ToolsSection />
      <FinalCtaSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
