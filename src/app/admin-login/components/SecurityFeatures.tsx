import Icon from '@/components/ui/AppIcon';

interface SecurityFeature {
  icon: string;
  title: string;
  description: string;
}

const SecurityFeatures = () => {
  const features: SecurityFeature[] = [
    {
      icon: 'LockClosedIcon',
      title: 'Autenticación Segura',
      description: 'Sistema de autenticación con encriptación de contraseñas y protección contra ataques de fuerza bruta.'
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Protección SQL Injection',
      description: 'Validación de entrada y consultas parametrizadas para prevenir inyecciones SQL.'
    },
    {
      icon: 'FireIcon',
      title: 'Prevención XSS',
      description: 'Sanitización de datos y políticas de seguridad de contenido para proteger contra scripts maliciosos.'
    },
    {
      icon: 'ClockIcon',
      title: 'Gestión de Sesiones',
      description: 'Sesiones seguras con tiempo de expiración automático y tokens de autenticación renovables.'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
          Seguridad de Nivel Empresarial
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Nuestro sistema de administración implementa múltiples capas de seguridad para proteger su contenido y datos empresariales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-card rounded-lg shadow-brand-sm p-6 hover:shadow-brand transition-all duration-300 border border-border"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon
                    name={feature.icon as any}
                    size={24}
                    className="text-primary"
                  />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <Icon name="InformationCircleIcon" size={24} className="text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-base font-heading font-semibold text-text-primary mb-2">
              Monitoreo de Intentos de Acceso
            </h4>
            <p className="text-sm text-text-secondary mb-3">
              El sistema registra todos los intentos de inicio de sesión y bloquea automáticamente las cuentas después de 3 intentos fallidos durante 5 minutos.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                <Icon name="CheckCircleIcon" size={14} className="mr-1" />
                Bloqueo Automático
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-warning/10 text-warning text-xs font-semibold rounded-full">
                <Icon name="ClockIcon" size={14} className="mr-1" />
                Tiempo de Espera
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                <Icon name="DocumentTextIcon" size={14} className="mr-1" />
                Registro de Auditoría
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;