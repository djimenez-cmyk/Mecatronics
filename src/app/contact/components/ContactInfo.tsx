import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ContactMethod {
  icon: string;
  title: string;
  details: string[];
  action?: {
    label: string;
    href: string;
  };
}

const ContactInfo: React.FC = () => {
  const contactMethods: ContactMethod[] = [
    {
      icon: 'PhoneIcon',
      title: 'Teléfono',
      details: ['01(81) 8383-9460', '01(81) 8330-0717'],
      action: {
        label: 'Llamar ahora',
        href: 'tel:018183839460',
      },
    },
    {
      icon: 'EnvelopeIcon',
      title: 'Correo Electrónico',
      details: ['informes@mecatronics.com.mx'],
      action: {
        label: 'Enviar email',
        href: 'mailto:informes@mecatronics.com.mx',
      },
    },
    {
      icon: 'MapPinIcon',
      title: 'Oficina Principal',
      details: [
        'C&S MECATRONICS TECHNOLOGIES S.A. DE C.V.',
        'Gonzalitos #410 ote.',
        'Col. Centro',
        'San Nicolás de los Garza, N.L.',
        'C.P. 66400',
      ],
      action: {
        label: 'Ver en mapa',
        href: '#location-map',
      },
    },
    {
      icon: 'ClockIcon',
      title: 'Horario de Atención',
      details: [
        'Lunes - Viernes: 8:00 - 18:00',
        'Sábado: 9:00 - 14:00',
        'Domingo: Cerrado',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-4">
          Información de Contacto
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Estamos disponibles para atender sus consultas y proyectos. Nuestro equipo de expertos está listo para ayudarle a encontrar la mejor solución de automatización para su empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-brand transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={method.icon as any} size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  {method.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {method.details.map((detail, idx) => (
                    <p key={idx} className="text-text-secondary text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                {method.action && (
                  <a
                    href={method.action.href}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
                  >
                    {method.action.label}
                    <Icon name="ArrowRightIcon" size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Signals 
      <div className="bg-gradient-to-br from-primary/5 to-brand-secondary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="ShieldCheckIcon" size={24} className="text-primary" />
          Garantía de Calidad
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: 'CheckBadgeIcon', text: 'Certificación ISO 9001' },
            { icon: 'AcademicCapIcon', text: 'Ingenieros Certificados' },
            { icon: 'ClockIcon', text: 'Respuesta en 24h' },
            { icon: 'ChatBubbleLeftRightIcon', text: 'Soporte Continuo' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <Icon name={item.icon as any} size={20} className="text-primary" />
              <span className="text-sm font-medium text-text-primary">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      */}
    </div>
  );
};

export default ContactInfo;