import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import ExperienceInteractive from './components/ExperienceInteractive';



export const metadata: Metadata = {
  title: 'Experiencia y Casos de Éxito - Mecatronics Pro',
  description: 'Explore nuestros 250+ proyectos completados en automatización industrial, robótica y mecatrónica. Casos de éxito detallados con resultados medibles en eficiencia, reducción de costos y optimización de procesos.',
};

export default function ExperiencePage() {
  return (
    <>
      <ClientHeader />
      <main className="pt-16">
        <ExperienceInteractive />
      </main>
    </>
  );
}