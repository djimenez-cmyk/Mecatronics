import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Value {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface CompanyValuesProps {
  className?: string;
}

const CompanyValues = ({ className = '' }: CompanyValuesProps) => {
  const values: Value[] = [
    {
      id: 1,
      icon: 'LightBulbIcon',
      title: 'Innovación Continua',
      description: 'Adoptamos las últimas tecnologías y metodologías para ofrecer soluciones de vanguardia que mantienen a nuestros clientes a la delantera de su industria.',
    },
    {
      id: 2,
      icon: 'ShieldCheckIcon',
      title: 'Calidad Garantizada',
      description: 'Cada proyecto cumple con los más altos estándares de calidad, respaldado por certificaciones internacionales y procesos rigurosos de control.',
    },
    {
      id: 3,
      icon: 'UserGroupIcon',
      title: 'Enfoque en el Cliente',
      description: 'Construimos relaciones a largo plazo basadas en la confianza, transparencia y resultados medibles que superan las expectativas.',
    },
    {
      id: 4,
      icon: 'AcademicCapIcon',
      title: 'Excelencia Técnica',
      description: 'Nuestro equipo de ingenieros altamente capacitados se mantiene actualizado con las últimas tendencias y certificaciones de la industria.',
    },
  ];

  return (
    <section className={`py-16 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-md mb-4">
            <span className="text-sm font-heading font-semibold text-primary">
              Nuestros Valores
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Los Principios que Nos Guían
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Estos valores fundamentales definen cómo trabajamos, cómo nos relacionamos con nuestros clientes y cómo construimos soluciones que transforman industrias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.id}
              className="bg-card p-6 rounded-lg shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Icon name={value.icon as any} size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;