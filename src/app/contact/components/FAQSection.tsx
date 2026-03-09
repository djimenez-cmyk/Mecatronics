'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQ[] = [
    {
      question: '¿Cuál es el tiempo de respuesta para una consulta?',
      answer: 'Nos comprometemos a responder todas las consultas dentro de las 24 horas hábiles. Para proyectos urgentes, ofrecemos un servicio de respuesta prioritaria que puede contactarse directamente por teléfono.',
    },
    {
      question: '¿Ofrecen consultas técnicas gratuitas?',
      answer: 'Sí, ofrecemos una consulta inicial gratuita de hasta 1 hora donde evaluamos sus necesidades, discutimos posibles soluciones y proporcionamos una estimación preliminar del proyecto sin ningún compromiso.',
    },
    {
      question: '¿Trabajan con empresas de cualquier tamaño?',
      answer: 'Absolutamente. Trabajamos con empresas desde pequeñas operaciones hasta grandes corporaciones industriales. Nuestras soluciones son escalables y se adaptan a las necesidades específicas de cada cliente.',
    },
    {
      question: '¿Cuánto tiempo toma implementar un proyecto típico?',
      answer: 'El tiempo de implementación varía según la complejidad del proyecto. Proyectos pequeños pueden completarse en 2-4 semanas, mientras que implementaciones más complejas pueden tomar de 3 a 6 meses. Durante la consulta inicial, proporcionamos un cronograma detallado.',
    },
    {
      question: '¿Ofrecen soporte post-implementación?',
      answer: 'Sí, todos nuestros proyectos incluyen soporte técnico durante el período de garantía. Además, ofrecemos contratos de mantenimiento preventivo y soporte continuo para asegurar el óptimo funcionamiento de sus sistemas.',
    },
    {
      question: '¿Pueden trabajar con equipos existentes de otras marcas?',
      answer: 'Sí, tenemos experiencia integrando y modernizando sistemas de múltiples fabricantes. Nuestro equipo está capacitado en diversas plataformas y puede trabajar con su infraestructura existente.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-4">
          Preguntas Frecuentes
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Encuentre respuestas rápidas a las preguntas más comunes sobre nuestros servicios y procesos.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-brand"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-muted/50 transition-colors duration-200"
            >
              <span className="font-heading font-semibold text-text-primary">
                {faq.question}
              </span>
              <Icon
                name="ChevronDownIcon"
                size={20}
                className={`flex-shrink-0 text-primary transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-4 pt-2">
                <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-primary/5 to-brand-secondary/5 border border-primary/20 rounded-lg p-6 text-center">
        <Icon name="QuestionMarkCircleIcon" size={48} className="text-primary mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
          ¿No encuentra su respuesta?
        </h3>
        <p className="text-text-secondary mb-4">
          Nuestro equipo está disponible para responder cualquier pregunta adicional que pueda tener.
        </p>
        <a
          href="#contact-form"
          className="inline-flex items-center gap-2 px-6 py-3 bg-cta text-white font-heading font-semibold rounded-md hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand"
        >
          Hacer una Pregunta
          <Icon name="ChatBubbleLeftRightIcon" size={20} />
        </a>
      </div>
    </div>
  );
};

export default FAQSection;