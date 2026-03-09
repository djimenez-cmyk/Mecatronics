import React from 'react';

interface CompanyStoryProps {
  className?: string;
}

const CompanyStory = ({ className = '' }: CompanyStoryProps) => {
  return (
    <section className={`py-16 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-md">
              <span className="text-sm font-heading font-semibold text-primary">
                Nuestra Historia
              </span>
            </div>
            <h2 className="text-4xl font-heading font-bold text-text-primary leading-tight">SOMOS SUS SOCIOS EN SUS PROYECTOS DE AUTOMATIZACIÓN

            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>C&S Mecatronics Technologies S.A. de C.V. es una empresa capaz de integrar hardware así como proporcionar servicios en mecanización, sistemas de automatización e información.

              </p>
              <p>Gracias a una estructura flexible podemos ofrecer precios competitivos sin descuidar la calidad en nuestros productos y servicios.

              </p>
              <p>La práctica de finanzas sanas nos posiciona como un proveedor altamente confiable y proporciona seguridad a nuestros clientes al momento de delegar proyectos de gran importancia en el crecimiento y mejora continua de las diversas ramas de la industria.

              </p>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-brand-lg">
              <img
                src="/assets/imagenes/recepcion.png"
                alt="Modern industrial automation facility with robotic arms and control systems in operation"
                className="w-full h-full object-cover" />

            </div>
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-lg shadow-brand-lg border border-border max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-heading font-bold text-success">
                      15+
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-heading font-semibold text-text-primary">
                    Años de Experiencia
                  </p>
                  <p className="text-xs text-text-secondary">
                    En Automatización Industrial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default CompanyStory;