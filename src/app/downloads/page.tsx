import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import DownloadsInteractive from './components/DownloadsInteractive';

export const metadata: Metadata = {
  title: 'Recursos y Descargas - Mecatronics Pro',
  description: 'Acceda a catálogos técnicos, manuales de usuario, fichas técnicas, guías de instalación y recursos educativos sobre automatización industrial y soluciones mecatrónicas.',
};

export default function DownloadsPage() {
  return (
    <>
      <ClientHeader />
      <main className="pt-16">
        <DownloadsInteractive />
      </main>
    </>
  );
}