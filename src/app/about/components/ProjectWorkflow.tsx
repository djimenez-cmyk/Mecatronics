import React from 'react';
import AppImage from '@/components/ui/AppImage';

interface ProjectWorkflowProps {
  className?: string;
}

const ProjectWorkflow = ({ className = '' }: ProjectWorkflowProps) => {
  return (
    <section className={`py-16 bg-card ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-md mb-4">
            <span className="text-sm font-heading font-semibold text-primary">
              Nuestro Proceso
            </span>
          </div>
          <h2 className="text-4xl font-heading font-bold text-text-primary mb-4">Nuestra Metodología de Admin. de Proyectos

          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Desde la solicitud de cotización hasta el run off final, nuestro proceso estructurado garantiza la excelencia en cada etapa del proyecto.
          </p>
        </div>

        <div className="mt-12 max-w-xl mx-auto rounded-2xl border border-border/10 shadow-lg bg-white">
            <AppImage
              src="/assets/images/proyectos-1770738936740.jpg"
              alt="Diagrama de flujo del proceso de proyectos de C&S Mecatronics: Solicitud de Cotización, Levantamientos de Campo, Cotización, Revisión con Cliente, Orden de Compra, Kick-off, Revisión de Spects, Diseño, Juntas de Revisión, Instalaciones y fabricaciones, Implementación, Comisionamiento y arranque, Debugging, Buy off, Run off"
              className="w-full h-auto " />

        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl p-6 bg-gradient-to-br from-white to-[#BFBFBF]/20 shadow-brand-sm hover:shadow-brand-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              Planificación
            </h3>
            <p className="text-sm text-text-secondary">
              Desde la solicitud inicial hasta la orden de compra, aseguramos una planificación detallada y transparente.
            </p>
          </div>

          <div className="rounded-xl p-6 bg-gradient-to-br from-white to-[#BFBFBF]/20 shadow-brand-sm hover:shadow-brand-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              Ejecución
            </h3>
            <p className="text-sm text-text-secondary">
              Diseño, fabricación e implementación con revisiones continuas para garantizar la calidad.
            </p>
          </div>

          <div className="rounded-xl p-6 bg-gradient-to-br from-white to-[#BFBFBF]/20 shadow-brand-sm hover:shadow-brand-lg hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              Validación
            </h3>
            <p className="text-sm text-text-secondary">
              Comisionamiento, debugging y pruebas finales (buy off y run off) para asegurar el éxito del proyecto.
            </p>
          </div>
        </div>

      </div>
    </section>);

};

export default ProjectWorkflow;