'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const ServicesPreview = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const services: Service[] = [
    {
      id: 1,
      title: 'Ingeniería',
      description: 'Servicios completos de ingeniería mecatrónica para diseño, análisis y optimización de sistemas industriales. Soluciones integrales desde la conceptualización hasta la implementación.',
      icon: 'CogIcon',
      features: ['Análisis y diseño de sistemas', 'Ingeniería de detalle', 'Estudios de factibilidad', 'Optimización de procesos'],
    },
    {
      id: 2,
      title: 'Diseño de Tableros de Control',
      description: 'Diseño y fabricación de tableros de control eléctrico personalizados según especificaciones y normativas internacionales. Soluciones completas para control industrial.',
      icon: 'CpuChipIcon',
      features: ['Diseño según normas NOM/IEC', 'Selección de componentes certificados', 'Diagramas eléctricos detallados', 'Pruebas de funcionamiento'],
    },
    {
      id: 3,
      title: 'Desarrollo de Programas de PLC',
      description: 'Programación especializada de controladores lógicos programables (PLC) de múltiples marcas: Allen-Bradley, Siemens, GE, Telemecanique, Omron y más. Soluciones de control adaptadas a cada aplicación industrial.',
      icon: 'WrenchScrewdriverIcon',
      features: ['Programación en Ladder, SCL, FBD', 'Allen-Bradley (RSLogix, Studio 5000)', 'Siemens (TIA Portal, Step 7)', 'GE, Telemecanique, Omron'],
    },
    {
      id: 4,
      title: 'Diseño y Fabricación',
      description: 'Servicios integrales de diseño mecánico y fabricación de componentes y sistemas especiales. Desde el concepto hasta la entrega de equipos listos para operar.',
      icon: 'LightBulbIcon',
      features: ['Diseño CAD 3D (SolidWorks, AutoCAD)', 'Fabricación de piezas especiales', 'Maquinado CNC de precisión', 'Soldadura y ensamble'],
    },
  ];

  const handleMouseEnter = (id: number) => {
    if (isHydrated) {
      setHoveredCard(id);
    }
  };

  const handleMouseLeave = () => {
    if (isHydrated) {
      setHoveredCard(null);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Soluciones integrales de automatización y mecatrónica diseñadas para impulsar la eficiencia y competitividad de su industria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => handleMouseEnter(service.id)}
              onMouseLeave={handleMouseLeave}
              className={`bg-gradient-to-br from-white via-white to-[#A67C00]/10 rounded-lg p-6 border border-border transition-all duration-300 ${
                isHydrated && hoveredCard === service.id
                  ? 'shadow-brand-lg -translate-y-2'
                  : 'shadow-brand-sm'
              }`}
            >
              <div className="flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg mb-4">
                <Icon name={service.icon as any} size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm text-text-secondary">
                    <Icon name="CheckCircleIcon" size={16} className="text-success mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center px-8 py-3 bg-cta text-primary-foreground text-base font-heading font-semibold rounded-md hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand"
          >
            Ver Todos los Servicios
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;