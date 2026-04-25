'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  companyLogo: string;
  logoAlt: string;
  testimonial: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
}

const TestimonialsCarousel = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    position: 'Director de Operaciones',
    company: 'AutoParts Manufacturing',
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1c76f98b4-1769467388916.png",
    logoAlt: 'Logo de AutoParts Manufacturing con diseño moderno en azul y gris',
    testimonial: 'La implementación del sistema de automatización de Mecatronics transformó completamente nuestra línea de producción. Aumentamos la eficiencia en un 45% y redujimos los errores de calidad significativamente. Su equipo técnico es excepcional.',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10484dedb-1763295719548.png",
    avatarAlt: 'Hombre hispano de mediana edad con cabello corto negro y traje azul marino sonriendo profesionalmente',
    rating: 5
  },
  {
    id: 2,
    name: 'María González',
    position: 'Gerente de Planta',
    company: 'ChemTech Industries',
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_17256be84-1769467384085.png",
    logoAlt: 'Logo de ChemTech Industries con símbolo químico estilizado en verde',
    testimonial: 'El sistema SCADA que desarrollaron para nuestra planta química superó todas nuestras expectativas. La capacidad de monitoreo en tiempo real y las alertas predictivas nos han permitido operar con mayor seguridad y eficiencia.',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_111abcb38-1763299293929.png",
    avatarAlt: 'Mujer profesional con cabello castaño largo y blazer gris sonriendo en oficina moderna',
    rating: 5
  },
  {
    id: 3,
    name: 'Roberto Martínez',
    position: 'Director Técnico',
    company: 'FoodTech Solutions',
    companyLogo: "https://img.rocket.new/generatedImages/rocket_gen_img_1d854e4d6-1767791667679.png",
    logoAlt: 'Logo de FoodTech Solutions con diseño minimalista en naranja y blanco',
    testimonial: 'La solución IoT de mantenimiento predictivo ha revolucionado nuestra operación. Hemos reducido el tiempo de inactividad en un 70% y los ahorros anuales superan los $250,000. Altamente recomendados.',
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ca25004e-1763293937670.png",
    avatarAlt: 'Hombre de negocios con barba y camisa blanca en ambiente industrial moderno',
    rating: 5
  }];


  const handlePrevious = () => {
    if (isHydrated) {
      setCurrentIndex((prev) => prev === 0 ? testimonials.length - 1 : prev - 1);
    }
  };

  const handleNext = () => {
    if (isHydrated) {
      setCurrentIndex((prev) => prev === testimonials.length - 1 ? 0 : prev + 1);
    }
  };

  const handleDotClick = (index: number) => {
    if (isHydrated) {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (!isHydrated) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => prev === testimonials.length - 1 ? 0 : prev + 1);
    }, 6000);

    return () => clearInterval(timer);
  }, [isHydrated, testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            La confianza de nuestros clientes es nuestro mayor logro. Descubra cómo hemos ayudado a transformar sus operaciones.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg shadow-brand-lg p-8 md:p-12 relative">
            <div className="absolute top-8 left-8 text-primary/20">
              <Icon name="ChatBubbleLeftIcon" size={48} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, index) =>
                <Icon
                  key={index}
                  name="StarIcon"
                  variant="solid"
                  size={24}
                  className="text-accent" />

                )}
              </div>

              <p className="text-lg md:text-xl text-text-primary text-center mb-8 leading-relaxed italic">
                "{currentTestimonial.testimonial}"
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary">
                    <AppImage
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.avatarAlt}
                      className="w-full h-full object-cover" />

                  </div>
                  <div className="text-left">
                    <div className="font-heading font-bold text-text-primary">
                      {currentTestimonial.name}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {currentTestimonial.position}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-border"></div>

                <div className="w-32 h-16 flex items-center justify-center">
                  <AppImage
                    src={currentTestimonial.companyLogo}
                    alt={currentTestimonial.logoAlt}
                    className="max-w-full max-h-full object-contain opacity-60" />

                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrevious}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Testimonio anterior">

                <Icon name="ChevronLeftIcon" size={20} />
              </button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) =>
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ?
                  'bg-primary w-8' : 'bg-border hover:bg-primary/50'}`
                  }
                  aria-label={`Ir al testimonio ${index + 1}`} />

                )}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                aria-label="Siguiente testimonio">

                <Icon name="ChevronRightIcon" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsCarousel;