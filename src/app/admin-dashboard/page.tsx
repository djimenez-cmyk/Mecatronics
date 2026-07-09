import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ClientHeader from '@/components/common/ClientHeader';
import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Panel de Administración - Mecatronics Pro',
  description: 'Panel de control administrativo para gestionar contenido, proyectos, usuarios y configuraciones del sitio web de Mecatronics Pro.',
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin-login');
  }

  return (
    <>
      <ClientHeader />
      <main className="pt-16">
        <DashboardInteractive />
      </main>
    </>
  );
}