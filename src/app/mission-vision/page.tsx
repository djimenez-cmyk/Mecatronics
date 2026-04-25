import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import MissionVisionInteractive from './components/MissionVisionInteractive';

export const metadata: Metadata = {
  title: 'Misión y Visión - Mecatronics Pro',
  description: 'Nuestra misión es transformar la industria mediante soluciones mecatrónicas innovadoras. Visión: ser líderes globales en automatización industrial sostenible con tecnología de vanguardia.',
};

export default function MissionVisionPage() {
  return (
    <>
      <ClientHeader />
      <main className="pt-16">
        <MissionVisionInteractive />
      </main>
    </>
  );
}