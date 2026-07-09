import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import PageManagementNew from './components/PageManagementNew';

export const metadata: Metadata = {
  title: 'Gestión de Páginas - Mecatronics Pro',
  description: 'Panel de gestión completo para crear, editar y administrar páginas del sitio web.',
};

export default function PageManagementDashboardPage() {
  return (
    <>
      <ClientHeader />
      <main className="pt-16">
        <PageManagementNew />
      </main>
    </>
  );
}