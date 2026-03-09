'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  image: string;
  alt: string;
  quote: string;
  rating: number;
  projectType: string;
}

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection = ({ className = '' }: TestimonialsSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Roberto Sánchez',
    position: 'Director de Operaciones',
    company: 'Industrias Manufactureras SA',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19fe69446-1763294812929.png",
    alt: 'Professional Hispanic man in his 50s with gray hair wearing dark suit in modern office',
    quote: 'Mecatronics Pro transformó completamente nuestra línea de producción. La eficiencia aumentó un 45% y el ROI se alcanzó en menos de 18 meses. Su equipo técnico es excepcional y el soporte post-implementación ha sido impecable.',
    rating: 5,
    projectType: 'Automatización de Línea de Producción'
  },
  {
    id: 2,
    name: 'Laura Fernández',
    position: 'Gerente de Planta',
    company: 'Alimentos del Valle',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c07ec798-1763300690257.png",
    alt: 'Professional Hispanic woman in her 40s with dark hair wearing white blouse in industrial setting',
    quote: 'La implementación del sistema SCADA fue perfecta. El equipo de Mecatronics demostró un profundo conocimiento técnico y una capacidad excepcional para adaptarse a nuestras necesidades específicas. Altamente recomendados.',
    rating: 5,
    projectType: 'Sistema SCADA Industrial'
  },
  {
    id: 3,
    name: 'Miguel Ángel Torres',
    position: 'Director Técnico',
    company: 'Química Industrial del Norte',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1432bafcd-1763299943485.png",
    alt: 'Professional Hispanic man in his 30s with short dark hair wearing blue shirt in industrial facility',
    quote: 'Trabajar con Mecatronics Pro ha sido una experiencia extraordinaria. Su enfoque metodológico y atención al detalle garantizaron una implementación sin contratiempos. Los resultados superaron nuestras expectativas.',
    rating: 5,
    projectType: 'Control de Procesos Químicos'
  }];


  const handlePrevious = () => {
    if (!isHydrated) return;
    setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
  };

  const handleNext = () => {
    if (!isHydrated) return;
    setCurrentIndex((prev) => prev === testimonials.length - 1 ? 0 : prev + 1);
  };

  if (!isHydrated) {
    return (
      <section className={`py-16 bg-surface ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-md mb-4">
              <span className="text-sm font-heading font-semibold text-primary">
                Testimonios
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Lo Que Dicen Nuestros Clientes
            </h2>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-brand">
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
      </section>);

  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`py-16 bg-surface ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-md mb-4">
            <span className="text-sm font-heading font-semibold text-primary">
              Testimonios
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor logro. Estas son algunas de sus experiencias trabajando con nosotros.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-card p-8 md:p-12 rounded-lg shadow-brand-lg border border-border">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.alt}
                    className="w-full h-full object-cover" />

                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-4">
                  {[...Array(currentTestimonial.rating)].map((_, i) =>
                  <Icon
                    key={i}
                    name="StarIcon"
                    size={20}
                    variant="solid"
                    className="text-accent" />

                  )}
                </div>

                <blockquote className="text-lg text-text-primary leading-relaxed mb-6 italic">
                  &ldquo;{currentTestimonial.quote}&rdquo;
                </blockquote>

                <div className="space-y-2">
                  <div className="font-heading font-bold text-text-primary text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {currentTestimonial.position}
                  </div>
                  <div className="text-sm font-heading font-semibold text-primary">
                    {currentTestimonial.company}
                  </div>
                  <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-xs font-heading font-medium text-primary mt-2">
                    {currentTestimonial.projectType}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={handlePrevious}
              className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-brand-sm hover:shadow-brand"
              aria-label="Previous testimonial">

              <Icon name="ChevronLeftIcon" size={20} />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) =>
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ?
                'bg-primary w-8' : 'bg-border hover:bg-primary/50'}`
                }
                aria-label={`Go to testimonial ${index + 1}`} />

              )}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 flex items-center justify-center bg-card border border-border rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-brand-sm hover:shadow-brand"
              aria-label="Next testimonial">

              <Icon name="ChevronRightIcon" size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;