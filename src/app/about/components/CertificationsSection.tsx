import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Certification {
  id: number;
  name: string;
  issuer: string;
  year: string;
  icon: string;
  description: string;
}

interface CertificationsSectionProps {
  className?: string;
}

const CertificationsSection = ({ className = '' }: CertificationsSectionProps) => {
  const certifications: Certification[] = [
    {
      id: 1,
      name: 'ISO 9001:2015',
      issuer: 'International Organization for Standardization',
      year: '2024',
      icon: 'CheckBadgeIcon',
      description: 'Certificación de Sistema de Gestión de Calidad que garantiza procesos estandarizados y mejora continua.',
    },
    {
      id: 2,
      name: 'ISA Certified',
      issuer: 'International Society of Automation',
      year: '2023',
      icon: 'CpuChipIcon',
      description: 'Reconocimiento como profesionales certificados en automatización industrial y sistemas de control.',
    },
    {
      id: 3,
      name: 'Siemens Solution Partner',
      issuer: 'Siemens AG',
      year: '2024',
      icon: 'BuildingOffice2Icon',
      description: 'Socio certificado para implementación de soluciones Siemens en automatización industrial.',
    },
    {
      id: 4,
      name: 'Rockwell Automation Partner',
      issuer: 'Rockwell Automation',
      year: '2023',
      icon: 'WrenchScrewdriverIcon',
      description: 'Partner autorizado para sistemas Allen-Bradley y soluciones de control industrial.',
    },
    {
      id: 5,
      name: 'OHSAS 18001',
      issuer: 'Occupational Health and Safety',
      year: '2024',
      icon: 'ShieldCheckIcon',
      description: 'Certificación en Seguridad y Salud Ocupacional para garantizar ambientes de trabajo seguros.',
    },
    {
      id: 6,
      name: 'Industry 4.0 Certified',
      issuer: 'German Engineering Federation',
      year: '2023',
      icon: 'CloudIcon',
      description: 'Certificación en implementación de tecnologías de la Cuarta Revolución Industrial.',
    },
  ];

  return (
    <section className={`py-16 bg-surface ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-md mb-4">
            <span className="text-sm font-heading font-semibold text-primary">
              Certificaciones y Acreditaciones
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Respaldados por Estándares Internacionales
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Nuestras certificaciones demuestran nuestro compromiso con la excelencia, calidad y cumplimiento de los más altos estándares de la industria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-card p-6 rounded-lg shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 border border-border"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name={cert.icon as any} size={24} className="text-success" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-heading font-bold text-text-primary mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-sm font-heading font-medium text-primary mb-2">
                    {cert.issuer}
                  </p>
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="CalendarIcon" size={14} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">
                      Certificado en {cert.year}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary/5 rounded-lg p-8 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex-1">
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                Compromiso con la Excelencia
              </h3>
              <p className="text-text-secondary">
                Mantenemos y renovamos nuestras certificaciones anualmente para garantizar que nuestros servicios cumplan con los estándares más actuales de la industria.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-primary mb-1">
                    6+
                  </div>
                  <div className="text-sm text-text-secondary">
                    Certificaciones
                  </div>
                </div>
                <div className="w-px h-12 bg-border" />
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-primary mb-1">
                    100%
                  </div>
                  <div className="text-sm text-text-secondary">
                    Cumplimiento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;