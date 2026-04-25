'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  features: string[];
  category: string;
  industry: string;
  complexity: string;
  implementationTime: string;
  roi: string;
  industries: string[];
  technicalSpecs: string[];
  benefits: string[];
  caseStudyMetric: string;
}

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
  onDownloadSpec: () => void;
  onRequestConsultation: () => void;
  onAddToComparison: () => void;
}

const ServiceDetailModal = ({
  service,
  isOpen,
  onClose,
  onDownloadSpec,
  onRequestConsultation,
  onAddToComparison,
}: ServiceDetailModalProps) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card rounded-lg shadow-brand-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            {service.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="relative h-64 rounded-lg overflow-hidden mb-6">
            <AppImage
              src={service.image}
              alt={service.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-heading font-semibold rounded-full">
                {service.category}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon
                  name="ClockIcon"
                  size={20}
                  className="text-primary"
                  variant="solid"
                />
                <span className="text-sm font-heading font-semibold text-text-primary">
                  Implementación
                </span>
              </div>
              <p className="text-sm text-text-secondary">
                {service.implementationTime}
              </p>
            </div>
            {/*
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon
                  name="ChartBarIcon"
                  size={20}
                  className="text-success"
                  variant="solid"
                />
                <span className="text-sm font-heading font-semibold text-text-primary">
                  ROI Estimado
                </span>
              </div>
              <p className="text-sm text-success font-heading font-semibold">
                {service.roi}
              </p>
            </div>
            */}
            <div className="bg-surface rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon
                  name="CpuChipIcon"
                  size={20}
                  className="text-accent"
                  variant="solid"
                />
                <span className="text-sm font-heading font-semibold text-text-primary">
                  Complejidad
                </span>
              </div>
              <p className="text-sm text-text-secondary">{service.complexity}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-heading font-bold text-text-primary mb-3">
              Descripción
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-heading font-bold text-text-primary mb-3">
              Características Principales
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Icon
                    name="CheckCircleIcon"
                    size={20}
                    className="text-success mt-0.5 flex-shrink-0"
                    variant="solid"
                  />
                  <span className="text-sm text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-heading font-bold text-text-primary mb-3">
              Especificaciones Técnicas
            </h3>
            <ul className="space-y-2">
              {service.technicalSpecs.map((spec, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-sm text-text-secondary"
                >
                  <Icon
                    name="WrenchScrewdriverIcon"
                    size={16}
                    className="text-primary mt-0.5 flex-shrink-0"
                  />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-heading font-bold text-text-primary mb-3">
              Beneficios Clave
            </h3>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 text-sm text-text-secondary"
                >
                  <Icon
                    name="SparklesIcon"
                    size={16}
                    className="text-accent mt-0.5 flex-shrink-0"
                    variant="solid"
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-heading font-bold text-text-primary mb-3">
              Industrias Aplicables
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.industries.map((industry, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-surface text-text-primary text-sm font-heading font-medium rounded-full border border-border"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon
                name="TrophyIcon"
                size={24}
                className="text-success flex-shrink-0"
                variant="solid"
              />
              <div>
                <h4 className="text-sm font-heading font-bold text-success mb-1">
                  Caso de Éxito
                </h4>
                <p className="text-sm text-text-secondary">
                  {service.caseStudyMetric}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRequestConsultation}
              className="flex-1 px-6 py-3 bg-cta text-white text-sm font-heading font-semibold rounded-md hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand"
            >
              Solicitar Consulta
            </button>
            {/*
            <button
              onClick={onDownloadSpec}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground text-sm font-heading font-semibold rounded-md hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand flex items-center justify-center space-x-2"
            >
              <Icon name="ArrowDownTrayIcon" size={16} />
              <span>Descargar Especificaciones</span>
            </button>
            <button
              onClick={onAddToComparison}
              className="px-6 py-3 bg-surface text-text-primary border border-border text-sm font-heading font-semibold rounded-md hover:bg-muted transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <Icon name="PlusIcon" size={16} />
              <span>Comparar</span>
            </button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;