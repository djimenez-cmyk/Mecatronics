import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactHeroProps {
  className?: string;
}

const ContactHero: React.FC<ContactHeroProps> = ({ className = '' }) => {
  return (
    <section className={`relative bg-gradient-to-br from-primary via-primary/95 to-brand-secondary py-20 lg:py-28 ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
            <Icon name="ChatBubbleLeftRightIcon" size={32} className="text-white" />
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            Hablemos de Su Proyecto
          </h1>
          
          <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-8">
            Nuestro equipo de expertos está listo para transformar sus desafíos de automatización en soluciones inteligentes. Contáctenos hoy y descubra cómo podemos impulsar su eficiencia operativa.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Icon name="ClockIcon" size={20} />
              <span className="text-sm font-medium">Respuesta en 24 horas</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={20} />
              <span className="text-sm font-medium">Consulta sin compromiso</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="UserGroupIcon" size={20} />
              <span className="text-sm font-medium">Expertos certificados</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;