import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { SideQuestsSection } from '@/components/sections/SideQuestsSection'
import { InternshipSection } from '@/components/sections/InternshipSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { FooterSection } from '@/components/sections/FooterSection'
import { Header } from '@/components/common/Header'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <SideQuestsSection />
      <InternshipSection />
      <ContactSection />
      <FooterSection />
    </main>
  )
}
