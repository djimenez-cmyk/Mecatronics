import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import ContactHero from './components/ContactHero';
import ContactInteractive from './components/ContactInteractive';

export const metadata: Metadata = {
  title: 'Contacto - Mecatronics Pro',
  description: 'Contáctenos para consultas sobre automatización industrial, robótica y soluciones mecatrónicas. Nuestro equipo de expertos está listo para transformar sus desafíos en soluciones inteligentes con respuesta en 24 horas.',
};

export default function ContactPage() {
  return (
    <>
      <ClientHeader />
      <main className="min-h-screen bg-background pt-16">
        <ContactHero />
        <ContactInteractive />
      </main>
    </>
  );
}