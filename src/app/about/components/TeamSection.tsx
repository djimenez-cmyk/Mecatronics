'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  specialization: string;
  image: string;
  alt: string;
  certifications: string[];
  experience: string;
  bio: string;
}

interface TeamSectionProps {
  className?: string;
}

const TeamSection = ({ className = '' }: TeamSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Dr. Carlos Mendoza',
    position: 'Director Técnico',
    specialization: 'Automatización Industrial',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f66440b1-1763299894525.png",
    alt: 'Professional Hispanic man in his 50s with gray hair wearing navy suit and glasses in modern office',
    certifications: ['PMP', 'Six Sigma Black Belt', 'ISA Certified Automation Professional'],
    experience: '20+ años en automatización industrial',
    bio: 'Líder visionario con más de dos décadas de experiencia en la implementación de sistemas de automatización complejos. Ha dirigido proyectos de transformación digital para empresas Fortune 500 y es reconocido internacionalmente por su expertise en Industry 4.0.'
  },
  {
    id: 2,
    name: 'Ing. María Rodríguez',
    position: 'Jefa de Ingeniería',
    specialization: 'Sistemas Mecatrónicos',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c07ec798-1763300690257.png",
    alt: 'Professional Hispanic woman in her 40s with dark hair wearing white blouse in industrial setting',
    certifications: ['Certified Control Systems Technician', 'LEED AP', 'Robotics Engineer'],
    experience: '15+ años en diseño mecatrónico',
    bio: 'Experta en integración de sistemas mecánicos y electrónicos con más de 100 proyectos exitosos. Especializada en robótica industrial y sistemas de control avanzado, ha desarrollado soluciones innovadoras que han mejorado la eficiencia operativa en un 40% promedio.'
  },
  {
    id: 3,
    name: 'Ing. Javier Torres',
    position: 'Especialista en Control',
    specialization: 'PLC y SCADA',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd00c4f7-1763295308851.png",
    alt: 'Professional Hispanic man in his 30s with short dark hair wearing blue shirt working with industrial equipment',
    certifications: ['Siemens Certified Programmer', 'Allen-Bradley Expert', 'SCADA Specialist'],
    experience: '12+ años en programación industrial',
    bio: 'Maestro en programación de sistemas de control con certificaciones en las principales plataformas industriales. Ha optimizado más de 200 líneas de producción y es reconocido por su capacidad para resolver problemas complejos de automatización.'
  },
  {
    id: 4,
    name: 'Ing. Ana Martínez',
    position: 'Gerente de Proyectos',
    specialization: 'Gestión de Implementación',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_10e904e15-1763299810876.png",
    alt: 'Professional Hispanic woman in her 30s with long dark hair wearing gray blazer holding tablet in modern office',
    certifications: ['PMP', 'Agile Certified Practitioner', 'Lean Six Sigma Green Belt'],
    experience: '10+ años en gestión de proyectos',
    bio: 'Experta en la gestión de proyectos complejos de automatización con un historial impecable de entregas a tiempo y dentro del presupuesto. Su enfoque metodológico y habilidades de comunicación aseguran la satisfacción del cliente en cada proyecto.'
  }];


  const handleToggleExpand = (memberId: number) => {
    if (!isHydrated) return;
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  if (!isHydrated) {
    return (
      <section className={`py-16 bg-background ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-md mb-4">
              <span className="text-sm font-heading font-semibold text-primary">
                Nuestro Equipo
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Expertos en Automatización
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) =>
            <div key={i} className="bg-card rounded-lg shadow-brand overflow-hidden border border-border">
                <div className="aspect-[3/4] bg-muted animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>);

  }

  return (
    <section className={`py-16 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-md mb-4">
            <span className="text-sm font-heading font-semibold text-primary">
              Nuestro Equipo
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Expertos en Automatización
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Profesionales altamente capacitados con certificaciones internacionales y años de experiencia en la industria de automatización.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) =>
          <div
            key={member.id}
            className="bg-card rounded-lg shadow-brand hover:shadow-brand-lg transition-all duration-300 overflow-hidden border border-border">

              <div className="aspect-[3/4] overflow-hidden">
                <img
                src={member.image}
                alt={member.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />

              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-sm font-heading font-semibold text-primary mb-2">
                  {member.position}
                </p>
                <p className="text-sm text-text-secondary mb-4">
                  {member.specialization}
                </p>

                <button
                onClick={() => handleToggleExpand(member.id)}
                className="flex items-center space-x-2 text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors duration-200">

                  <span>{expandedMember === member.id ? 'Ver Menos' : 'Ver Más'}</span>
                  <Icon
                  name="ChevronDownIcon"
                  size={16}
                  className={`transition-transform duration-300 ${
                  expandedMember === member.id ? 'rotate-180' : ''}`
                  } />

                </button>

                {expandedMember === member.id &&
              <div className="mt-4 pt-4 border-t border-border space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <p className="text-xs font-heading font-semibold text-text-primary mb-2">
                        Experiencia:
                      </p>
                      <p className="text-sm text-text-secondary">{member.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs font-heading font-semibold text-text-primary mb-2">
                        Certificaciones:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {member.certifications.map((cert, index) =>
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-success/10 text-xs font-heading font-medium text-success rounded">

                            {cert}
                          </span>
                    )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-heading font-semibold text-text-primary mb-2">
                        Biografía:
                      </p>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
              }
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default TeamSection;