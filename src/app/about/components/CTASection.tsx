import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface CTASectionProps {
  className?: string;
}

const CTASection = ({ className = '' }: CTASectionProps) => {
  return (
    <section className={`py-16 bg-primary ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
            ¿Listo para Transformar su Operación?
          </h2>
          <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Únase a más de 300 empresas que han confiado en Mecatronics para llevar su automatización industrial al siguiente nivel.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-cta text-white text-base font-heading font-semibold rounded-md hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand hover:shadow-brand-lg"
            >
              <span>Solicitar Consultoría</span>
              <Icon name="ArrowRightIcon" size={20} />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-foreground text-primary text-base font-heading font-semibold rounded-md hover:bg-primary-foreground/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand hover:shadow-brand-lg"
            >
              <span>Ver Servicios</span>
              <Icon name="ArrowRightIcon" size={20} />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <Icon name="PhoneIcon" size={32} className="text-primary-foreground" />
              <div className="text-primary-foreground/90 text-sm">
                Respuesta en 24 horas
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Icon name="ShieldCheckIcon" size={32} className="text-primary-foreground" />
              <div className="text-primary-foreground/90 text-sm">
                Garantía de calidad
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Icon name="UserGroupIcon" size={32} className="text-primary-foreground" />
              <div className="text-primary-foreground/90 text-sm">
                Soporte dedicado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;