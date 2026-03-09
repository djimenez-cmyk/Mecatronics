'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'achievement' | 'expansion';
}

interface CompanyTimelineProps {
  className?: string;
}

const CompanyTimeline = ({ className = '' }: CompanyTimelineProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const timelineEvents: TimelineEvent[] = [
    {
      id: 1,
      year: '2010',
      title: 'Fundación de Mecatronics Pro',
      description: 'Inicio de operaciones con un equipo de 5 ingenieros especializados en automatización industrial, enfocados en soluciones para pequeñas y medianas empresas.',
      icon: 'RocketLaunchIcon',
      category: 'milestone',
    },
    /*
    {
      id: 2,
      year: '2013',
      title: 'Primera Certificación ISO 9001',
      description: 'Obtención de la certificación ISO 9001, marcando nuestro compromiso con la calidad y procesos estandarizados en todos nuestros proyectos.',
      icon: 'CheckBadgeIcon',
      category: 'achievement',
    },*/
    {
      id: 3,
      year: '2015',
      title: 'Expansión Regional',
      description: 'Apertura de oficinas en tres ciudades principales, ampliando nuestra capacidad de servicio y alcance a nivel nacional con un equipo de 25 profesionales.',
      icon: 'BuildingOffice2Icon',
      category: 'expansion',
    },
    {
      id: 4,
      year: '2017',
      title: 'Proyecto Hito: 100 Implementaciones',
      description: 'Completamos nuestro proyecto número 100, consolidándonos como líderes en automatización industrial con clientes en múltiples sectores.',
      icon: 'TrophyIcon',
      category: 'achievement',
    },
    {
      id: 5,
      year: '2019',
      title: 'Certificación Industry 4.0',
      description: 'Reconocimiento como expertos en tecnologías de la Cuarta Revolución Industrial, incluyendo IoT, Big Data y sistemas ciber-físicos.',
      icon: 'CpuChipIcon',
      category: 'achievement',
    },
    {
      id: 6,
      year: '2021',
      title: 'Alianzas Estratégicas Globales',
      description: 'Establecimiento de partnerships con Siemens y Rockwell Automation, fortaleciendo nuestra capacidad técnica y acceso a tecnologías de vanguardia.',
      icon: 'GlobeAltIcon',
      category: 'expansion',
    },
    {
      id: 7,
      year: '2023',
      title: 'Centro de Innovación',
      description: 'Inauguración de nuestro Centro de Innovación y Capacitación, un espacio dedicado a I+D y formación continua de nuestro equipo y clientes.',
      icon: 'LightBulbIcon',
      category: 'milestone',
    },
    {
      id: 8,
      year: '2024',
      title: 'Líderes en Sostenibilidad',
      description: 'Reconocimiento por implementar soluciones de automatización que han reducido el consumo energético de nuestros clientes en un promedio del 35%.',
      icon: 'SparklesIcon',
      category: 'achievement',
    },
  ];

  const handleEventClick = (eventId: number) => {
    if (!isHydrated) return;
    setActiveEvent(activeEvent === eventId ? null : eventId);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'milestone':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'achievement':
        return 'bg-success/10 text-success border-success/20';
      case 'expansion':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  if (!isHydrated) {
    return (
      <section className={`py-16 bg-white ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-md mb-4">
              <span className="text-sm font-heading font-semibold text-primary">
                Nuestra Trayectoria
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              15 Años de Innovación y Crecimiento
            </h2>
          </div>
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-muted rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 bg-muted rounded animate-pulse w-1/4" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 bg-surface ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-md mb-4">
            <span className="text-sm font-heading font-semibold text-primary">
              Nuestra Trayectoria
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            15 Años de Innovación y Crecimiento
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Desde nuestros inicios hasta convertirnos en líderes de la industria, cada hito representa nuestro compromiso con la excelencia y la innovación.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot - Desktop */}
                <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-primary rounded-full border-4 border-background z-10" />

                {/* Content */}
                <div className="w-full lg:w-5/12">
                  <div
                    className={`bg-card p-6 rounded-lg shadow-brand hover:shadow-brand-lg transition-all duration-300 border ${getCategoryColor(
                      event.category
                    )} cursor-pointer`}
                    onClick={() => handleEventClick(event.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(
                            event.category
                          )}`}
                        >
                          <Icon name={event.icon as any} size={24} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-heading font-bold text-primary">
                            {event.year}
                          </span>
                          <Icon
                            name="ChevronDownIcon"
                            size={20}
                            className={`text-text-secondary transition-transform duration-300 ${
                              activeEvent === event.id ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                          {event.title}
                        </h3>
                        {activeEvent === event.id && (
                          <p className="text-text-secondary leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block w-2/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-primary mb-2">
              300+
            </div>
            <div className="text-sm text-text-secondary">
              Proyectos Completados
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-primary mb-2">
              50+
            </div>
            <div className="text-sm text-text-secondary">
              Profesionales Certificados
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-primary mb-2">
              98%
            </div>
            <div className="text-sm text-text-secondary">
              Satisfacción del Cliente
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-primary mb-2">
              15+
            </div>
            <div className="text-sm text-text-secondary">
              Años de Experiencia
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyTimeline;