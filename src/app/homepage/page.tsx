import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import HeroSection from './components/HeroSection';
import ServicesPreview from './components/ServicesPreview';
import FeaturedProjects from './components/FeaturedProjects';
import TestimonialsCarousel from './components/TestimonialsCarousel';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Inicio - Mecatronics Pro',
};

export default function HomePage() {
  return (
    <>
      <ClientHeader />
      <main className="min-h-screen bg-background pt-[84px]">
        <HeroSection />
        <ServicesPreview />
        <FeaturedProjects />
        {/*<TestimonialsCarousel />*/}
        <CTASection />
      </main>
      <Footer />
    </>
  );
}