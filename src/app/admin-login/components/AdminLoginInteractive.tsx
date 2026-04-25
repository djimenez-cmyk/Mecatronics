'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from './LoginForm';
import SecurityFeatures from './SecurityFeatures';

const AdminLoginInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Redirect if already authenticated
    if (!loading && user) {
      router.push('/admin-dashboard');
    }
  }, [user, loading, router]);

  const handleLogin = (email: string, password: string) => {
    // Redirect to admin dashboard after successful login
    router.push('/admin-dashboard');
  };

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-muted rounded-lg"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render login form if user is already authenticated
  /*
  if (user) {
    return null;
  }*/

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Login Form */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-brand-secondary/5">
        <div className="container mx-auto px-4">
          <LoginForm onSubmit={handleLogin} />
        </div>
      </section>

      {/* Security Features Section 
      <section className="py-16 lg:py-24 bg-surface">
        <div className="container mx-auto px-4">
          <SecurityFeatures />
        </div>
      </section>
      */}

      {/* Additional Information */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-heading font-bold text-text-primary mb-6">
              Sistema de Gestión de Contenido
            </h3>
            <p className="text-text-secondary mb-8 leading-relaxed">
              Acceda al panel de administración para gestionar todo el contenido del sitio web de Mecatronics Pro. El sistema permite crear y modificar páginas dinámicamente, gestionar menús de navegación, administrar la biblioteca de medios con fotos de proyectos y documentos técnicos, y actualizar información de servicios y productos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-card rounded-lg shadow-brand-sm p-6 border border-border">
                <div className="text-3xl font-heading font-bold text-primary mb-2">
                  100%
                </div>
                <div className="text-sm text-text-secondary">
                  Seguro y Encriptado
                </div>
              </div>
              <div className="bg-card rounded-lg shadow-brand-sm p-6 border border-border">
                <div className="text-3xl font-heading font-bold text-primary mb-2">
                  24/7
                </div>
                <div className="text-sm text-text-secondary">
                  Acceso Disponible
                </div>
              </div>
              <div className="bg-card rounded-lg shadow-brand-sm p-6 border border-border">
                <div className="text-3xl font-heading font-bold text-primary mb-2">
                  3+
                </div>
                <div className="text-sm text-text-secondary">
                  Niveles de Seguridad
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLoginInteractive;