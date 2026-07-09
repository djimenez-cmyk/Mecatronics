'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Metric {
  label: string;
  value: string;
  icon: string;
}

interface TechnicalSpec {
  category: string;
  details: string[];
}

interface CaseStudy {
  id: number;
  title: string;
  client: string;
  industry: string;
  duration: string;
  completionDate: string;
  heroImage: string;
  heroImageAlt: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: Metric[];
  technicalSpecs: TechnicalSpec[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
    company: string;
    avatar: string;
    avatarAlt: string;
  };
  gallery: Array<{
    image: string;
    alt: string;
    caption: string;
  }>;
  tags: string[];
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const CaseStudyCard = ({ caseStudy }: CaseStudyCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const handlePrevImage = () => {
    setActiveGalleryIndex((prev) => 
      prev === 0 ? caseStudy.gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveGalleryIndex((prev) => 
      prev === caseStudy.gallery.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-card rounded-lg shadow-brand overflow-hidden border border-border">
      {/* Hero Image */}
      <div className="relative h-80 overflow-hidden">
        <AppImage
          src={caseStudy.heroImage}
          alt={caseStudy.heroImageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {caseStudy.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary/20 text-primary text-xs font-heading font-semibold rounded-full backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
            {caseStudy.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="BuildingOfficeIcon" size={16} />
              {caseStudy.client}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="BriefcaseIcon" size={16} />
              {caseStudy.industry}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="CalendarIcon" size={16} />
              {caseStudy.completionDate}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {caseStudy.metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-surface rounded-lg p-4 text-center border border-border"
            >
              <Icon
                name={metric.icon as any}
                size={32}
                className="mx-auto mb-2 text-primary"
              />
              <div className="text-2xl font-heading font-bold text-primary mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Challenge & Solution Preview */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-lg font-heading font-bold text-foreground mb-2 flex items-center gap-2">
              <Icon name="ExclamationTriangleIcon" size={20} className="text-warning" />
              Desafío
            </h4>
            <p className="text-text-secondary leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-heading font-bold text-foreground mb-2 flex items-center gap-2">
              <Icon name="LightBulbIcon" size={20} className="text-accent" />
              Solución
            </h4>
            <p className="text-text-secondary leading-relaxed">
              {caseStudy.solution}
            </p>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:bg-primary/90 transition-all duration-300"
        >
          <span>{isExpanded ? 'Ver Menos' : 'Ver Detalles Completos'}</span>
          <Icon
            name="ChevronDownIcon"
            size={20}
            className={`transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-6 space-y-6 border-t border-border pt-6">
            {/* Results */}
            <div>
              <h4 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                <Icon name="ChartBarIcon" size={20} className="text-success" />
                Resultados
              </h4>
              <p className="text-text-secondary leading-relaxed">
                {caseStudy.results}
              </p>
            </div>

            {/* Technical Specifications */}
            <div>
              <h4 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                <Icon name="CogIcon" size={20} className="text-primary" />
                Especificaciones Técnicas
              </h4>
              <div className="space-y-4">
                {caseStudy.technicalSpecs.map((spec, index) => (
                  <div key={index} className="bg-surface rounded-lg p-4 border border-border">
                    <h5 className="font-heading font-semibold text-foreground mb-2">
                      {spec.category}
                    </h5>
                    <ul className="space-y-1">
                      {spec.details.map((detail, detailIndex) => (
                        <li
                          key={detailIndex}
                          className="text-sm text-text-secondary flex items-start gap-2"
                        >
                          <Icon
                            name="CheckCircleIcon"
                            size={16}
                            className="text-success mt-0.5 flex-shrink-0"
                          />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Gallery */}
            <div>
              <h4 className="text-lg font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                <Icon name="PhotoIcon" size={20} className="text-brand-secondary" />
                Galería del Proyecto
              </h4>
              <div className="relative">
                <div className="relative h-96 overflow-hidden rounded-lg">
                  <AppImage
                    src={caseStudy.gallery[activeGalleryIndex].image}
                    alt={caseStudy.gallery[activeGalleryIndex].alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                    <p className="text-sm text-foreground font-medium">
                      {caseStudy.gallery[activeGalleryIndex].caption}
                    </p>
                  </div>
                </div>

                {/* Gallery Navigation */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-card/90 backdrop-blur-sm rounded-full shadow-brand hover:bg-card transition-colors duration-200"
                  aria-label="Previous image"
                >
                  <Icon name="ChevronLeftIcon" size={24} className="text-foreground" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-card/90 backdrop-blur-sm rounded-full shadow-brand hover:bg-card transition-colors duration-200"
                  aria-label="Next image"
                >
                  <Icon name="ChevronRightIcon" size={24} className="text-foreground" />
                </button>

                {/* Gallery Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {caseStudy.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveGalleryIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === activeGalleryIndex
                          ? 'bg-primary w-8' :'bg-border hover:bg-muted'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Client Testimonial */}
            <div className="bg-surface rounded-lg p-6 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={caseStudy.testimonial.avatar}
                    alt={caseStudy.testimonial.avatarAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Icon
                    name="ChatBubbleLeftRightIcon"
                    size={24}
                    className="text-primary mb-2"
                  />
                  <p className="text-text-primary italic leading-relaxed mb-4">
                    "{caseStudy.testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-heading font-semibold text-foreground">
                      {caseStudy.testimonial.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {caseStudy.testimonial.position}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {caseStudy.testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download & Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-heading font-semibold rounded-md hover:bg-secondary/90 transition-colors duration-300">
                <Icon name="ArrowDownTrayIcon" size={20} />
                <span>Descargar Especificaciones</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-conversion text-conversion-foreground font-heading font-semibold rounded-md hover:bg-conversion/90 transition-colors duration-300">
                <Icon name="ChatBubbleLeftEllipsisIcon" size={20} />
                <span>Solicitar Proyecto Similar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudyCard;