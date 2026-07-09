import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import AdminLoginInteractive from './components/AdminLoginInteractive';

export const metadata: Metadata = {
  title: 'Acceso Administrativo - Mecatronics Pro',
  description: 'Portal de inicio de sesión seguro para administradores de Mecatronics Pro. Acceda al sistema de gestión de contenido con autenticación protegida para administrar páginas, menús, medios y contenido del sitio web.',
};

export default function AdminLoginPage() {
  return (
    <>
      <ClientHeader />
      <main className="pt-16">
        <AdminLoginInteractive />
      </main>
    </>
  );
}