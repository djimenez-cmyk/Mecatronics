import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Service {
  id: number;
  title: string;
  category: string;
  implementationTime: string;
  roi: string;
  complexity: string;
  industries: string[];
}

interface ComparisonMatrixProps {
  services: Service[];
  onRemoveService: (id: number) => void;
  onClearComparison: () => void;
}

const ComparisonMatrix = ({
  services,
  onRemoveService,
  onClearComparison,
}: ComparisonMatrixProps) => {
  if (services.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg shadow-brand p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          Matriz de Comparación ({services.length}/3)
        </h2>
        <button
          onClick={onClearComparison}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-heading font-semibold text-error hover:text-error/80 transition-colors duration-200"
        >
          <Icon name="XMarkIcon" size={16} />
          <span>Limpiar Comparación</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-heading font-semibold text-text-primary">
                Característica
              </th>
              {services.map((service) => (
                <th
                  key={service.id}
                  className="text-left py-3 px-4 text-sm font-heading font-semibold text-text-primary"
                >
                  <div className="flex items-center justify-between">
                    <span className="line-clamp-1">{service.title}</span>
                    <button
                      onClick={() => onRemoveService(service.id)}
                      className="ml-2 p-1 text-text-secondary hover:text-error transition-colors duration-200"
                    >
                      <Icon name="XMarkIcon" size={16} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border">
              <td className="py-3 px-4 text-sm font-heading font-medium text-text-secondary">
                Categoría
              </td>
              {services.map((service) => (
                <td
                  key={service.id}
                  className="py-3 px-4 text-sm text-text-primary"
                >
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-heading font-semibold rounded">
                    {service.category}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 text-sm font-heading font-medium text-text-secondary">
                Tiempo de Implementación
              </td>
              {services.map((service) => (
                <td
                  key={service.id}
                  className="py-3 px-4 text-sm text-text-primary"
                >
                  {service.implementationTime}
                </td>
              ))}
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 text-sm font-heading font-medium text-text-secondary">
                ROI Estimado
              </td>
              {services.map((service) => (
                <td
                  key={service.id}
                  className="py-3 px-4 text-sm text-success font-heading font-semibold"
                >
                  {service.roi}
                </td>
              ))}
            </tr>
            <tr className="border-b border-border">
              <td className="py-3 px-4 text-sm font-heading font-medium text-text-secondary">
                Complejidad
              </td>
              {services.map((service) => (
                <td
                  key={service.id}
                  className="py-3 px-4 text-sm text-text-primary"
                >
                  {service.complexity}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 text-sm font-heading font-medium text-text-secondary">
                Industrias Aplicables
              </td>
              {services.map((service) => (
                <td
                  key={service.id}
                  className="py-3 px-4 text-sm text-text-primary"
                >
                  <div className="flex flex-wrap gap-1">
                    {service.industries.map((industry, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-surface text-text-secondary text-xs rounded"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-6 py-2.5 bg-conversion text-conversion-foreground text-sm font-heading font-semibold rounded-md hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand">
          Solicitar Cotización Comparativa
        </button>
      </div>
    </div>
  );
};

export default ComparisonMatrix;