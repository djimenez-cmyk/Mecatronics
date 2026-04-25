import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const FeaturedProjects = () => {
  const projects: Project[] = [
  {
    id: 1,
    title: 'Equipo de Manejo de Materiales',
    category: 'Automatización Industrial',
    description: 'Soluciones integrales para el transporte, almacenamiento y manipulación eficiente de materiales en procesos industriales.',
    image: "/assets/imagenes/proyects-homepage/manejomateriales.jpg",
    alt: 'Automated material handling system with conveyor belts in modern warehouse',
    metrics: [
    { label: 'Eficiencia', value: '+45%' },
    { label: 'Reducción de Costos', value: '35%' }]

  },
  {
    id: 2,
    title: 'Fabricaciones',
    category: 'Manufactura',
    description: 'Fabricación de componentes y estructuras metálicas de precisión para aplicaciones industriales especializadas.',
    image: "/assets/imagenes/proyects-homepage/Fabricaciones.JPG",
    alt: 'Metal fabrication workshop with welding equipment and steel structures',
    metrics: [
    { label: 'Precisión', value: '±0.05mm' },
    { label: 'Calidad', value: '100%' }]

  },
  {
    id: 3,
    title: 'Aplicaciones',
    category: 'Control de Procesos',
    description: 'Desarrollo e implementación de aplicaciones industriales personalizadas para optimización de procesos y control.',
    image: "/assets/imagenes/proyects-homepage/Aplicaciones.JPG",
    alt: 'Industrial control panel with touchscreen interface showing process data',
    metrics: [
    { label: 'Optimización', value: '+50%' },
    { label: 'Tiempo Real', value: '99.9%' }]

  }];


  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="container mx-auto px-4 lg:px-8 " >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Casos de éxito que demuestran nuestra capacidad para transformar desafíos industriales en soluciones innovadoras.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project) =>
          <div
            key={project.id}
            className="bg-card rounded-xl overflow-hidden shadow-brand hover:shadow-brand-lg transition-all duration-300 group hover:-translate-y-1">

              <div className="relative h-64 overflow-hidden">
                <AppImage
                src={project.image}
                alt={project.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-heading font-semibold rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  {project.metrics.map((metric, index) =>
                <div key={index} className="text-center">
                      <div className="text-2xl font-heading font-bold text-success mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-text-secondary">{metric.label}</div>
                    </div>
                )}
                </div>
                <Link
                href="/experience"
                className="inline-flex items-center text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors duration-200">

                  Ver Caso Completo
                  <Icon name="ArrowRightIcon" size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>);

};

export default FeaturedProjects;