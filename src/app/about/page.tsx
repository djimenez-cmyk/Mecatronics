import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import CompanyStory from './components/CompanyStory';
import ProjectWorkflow from './components/ProjectWorkflow';
import CompanyValues from './components/CompanyValues';
import TeamSection from './components/TeamSection';
import CertificationsSection from './components/CertificationsSection';
import CompanyTimeline from './components/CompanyTimeline';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

export const metadata: Metadata = {
  title: 'Sobre Nosotros - Mecatronics Pro',
  description: 'Conozca a Mecatronics Pro: 15+ años liderando la automatización industrial con un equipo de 50+ ingenieros especializados. Nuestra historia, valores, certificaciones ISO 9001:2015 y compromiso con la excelencia en soluciones mecatrónicas.',
};

export default function AboutPage() {
  return (
    <>
      <ClientHeader />
      <main className="min-h-screen bg-background pt-16">
        <CompanyStory />
        <ProjectWorkflow />
        <CompanyValues />
        {/*<TeamSection />*/}
        {/*<CertificationsSection />*/}
        <CompanyTimeline />
        {/*<TestimonialsSection />*/}
        <CTASection />
      </main>
    </>
  );
}