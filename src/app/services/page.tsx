import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import ServicesInteractive from './components/ServicesInteractive';

export const metadata: Metadata = {
  title: 'Servicios y Productos - Mecatronics Pro',
  description:
    'Catálogo completo de soluciones de automatización industrial y mecatrónica. Sistemas PLC, robótica, control de procesos, visión artificial y mantenimiento predictivo para optimizar su producción.',
};

export default function ServicesPage() {
  return (
    <>
      <ClientHeader />
      <ServicesInteractive />
    </>
  );
}