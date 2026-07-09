import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
  category: string;
  onLearnMore: () => void;
  onDownloadSpec: () => void;
}

const ServiceCard = ({
  title,
  description,
  image,
  alt,
  features,
  category,
  onLearnMore,
  onDownloadSpec,
}: ServiceCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-brand overflow-hidden hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden">
        <AppImage
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-heading font-semibold rounded-full">
            {category}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
          {title}
        </h3>
        <p className="text-sm text-text-secondary mb-4 line-clamp-3">
          {description}
        </p>

        <div className="mb-6 flex-1">
          <h4 className="text-sm font-heading font-semibold text-text-primary mb-2">
            Características Clave:
          </h4>
          <ul className="space-y-2">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon
                  name="CheckCircleIcon"
                  size={16}
                  className="text-success mt-0.5 flex-shrink-0"
                  variant="solid"
                />
                <span className="text-sm text-text-secondary">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <button
            onClick={onLearnMore}
            className="flex-1 px-4 py-2.5 bg-cta text-primary-foreground text-sm font-heading font-semibold rounded-md hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand"
          >
            Ver Detalles
          </button>
          {/*
          <button
            onClick={onDownloadSpec}
            className="flex-1 px-4 py-2.5 bg-surface text-text-primary border border-border text-sm font-heading font-semibold rounded-md hover:bg-muted transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <Icon name="ArrowDownTrayIcon" size={16} />
            <span>Especificaciones</span>
          </button>
          */}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;