'use client';

import { useState, useEffect } from 'react';
import TimelineItem from './TimelineItem';
import ValueCard from './ValueCard';
import VisionGoal from './VisionGoal';
import AchievementBadge from './AchievementBadge';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

interface Goal {
  icon: string;
  title: string;
  description: string;
  metric: string;
}

interface Achievement {
  icon: string;
  title: string;
  value: string;
  description: string;
}

export default function MissionVisionInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const timelineEvents: TimelineEvent[] = [
  {
    year: '2010',
    title: 'Fundación de Mecatronics',
    description: 'Inicio de operaciones con un equipo de 5 ingenieros especializados en automatización industrial, estableciendo las bases de nuestra excelencia técnica.',
    icon: 'RocketLaunchIcon'
  },
  {
    year: '2013',
    title: 'Primera Certificación ISO',
    description: 'Obtención de certificación ISO 9001, consolidando nuestros procesos de calidad y estableciendo estándares internacionales en nuestros servicios.',
    icon: 'ShieldCheckIcon'
  },
  {
    year: '2016',
    title: 'Expansión Regional',
    description: 'Apertura de oficinas en tres ciudades principales, ampliando nuestra cobertura de servicio y fortaleciendo la presencia en el mercado industrial.',
    icon: 'BuildingOfficeIcon'
  },
  {
    year: '2019',
    title: 'Innovación en IoT Industrial',
    description: 'Implementación de soluciones IoT en sistemas de automatización, posicionándonos como líderes en transformación digital industrial.',
    icon: 'CpuChipIcon'
  },
  {
    year: '2022',
    title: 'Reconocimiento Internacional',
    description: 'Premio a la Excelencia en Automatización Industrial otorgado por la Asociación Internacional de Ingeniería Mecatrónica.',
    icon: 'TrophyIcon'
  },
  {
    year: '2026',
    title: 'Visión Futura',
    description: 'Consolidación como referente en automatización inteligente con más de 500 proyectos exitosos y presencia en 10 países de Latinoamérica.',
    icon: 'SparklesIcon'
  }];


  const coreValues: CoreValue[] = [
  {
    icon: 'LightBulbIcon',
    title: 'Innovación Continua',
    description: 'Investigamos y adoptamos las últimas tecnologías en automatización para ofrecer soluciones de vanguardia que transforman la industria.'
  },
  {
    icon: 'UserGroupIcon',
    title: 'Compromiso con el Cliente',
    description: 'Construimos relaciones duraderas basadas en la confianza, entendiendo las necesidades específicas de cada cliente y superando expectativas.'
  },
  {
    icon: 'AcademicCapIcon',
    title: 'Excelencia Técnica',
    description: 'Mantenemos los más altos estándares de calidad en cada proyecto, respaldados por certificaciones internacionales y capacitación continua.'
  },
  {
    icon: 'ShieldCheckIcon',
    title: 'Integridad Profesional',
    description: 'Actuamos con transparencia y ética en todas nuestras operaciones, garantizando soluciones confiables y sostenibles para nuestros clientes.'
  },
  {
    icon: 'GlobeAmericasIcon',
    title: 'Responsabilidad Ambiental',
    description: 'Diseñamos sistemas de automatización eficientes que optimizan recursos y reducen el impacto ambiental de los procesos industriales.'
  },
  {
    icon: 'ChartBarIcon',
    title: 'Mejora Continua',
    description: 'Evaluamos constantemente nuestros procesos y resultados para implementar mejoras que beneficien a nuestros clientes y al equipo.'
  }];


  const visionGoals: Goal[] = [
  {
    icon: 'GlobeAltIcon',
    title: 'Expansión Internacional',
    description: 'Consolidar presencia en 15 países de América Latina y establecer alianzas estratégicas con líderes tecnológicos globales.',
    metric: 'Meta 2028'
  },
  {
    icon: 'CpuChipIcon',
    title: 'Liderazgo en IA Industrial',
    description: 'Desarrollar soluciones de automatización inteligente con inteligencia artificial y machine learning para optimización predictiva.',
    metric: 'Inversión 30%'
  },
  {
    icon: 'AcademicCapIcon',
    title: 'Centro de Formación',
    description: 'Crear academia de automatización industrial para capacitar a 1,000 profesionales anuales en tecnologías mecatrónicas avanzadas.',
    metric: '1,000 profesionales/año'
  },
  {
    icon: 'BoltIcon',
    title: 'Eficiencia Energética',
    description: 'Implementar sistemas que reduzcan el consumo energético industrial en un 40% mediante automatización inteligente y sostenible.',
    metric: 'Reducción 40%'
  }];


  const achievements: Achievement[] = [
  {
    icon: 'CheckBadgeIcon',
    title: 'Proyectos Completados',
    value: '500+',
    description: 'Implementaciones exitosas'
  },
  {
    icon: 'UserGroupIcon',
    title: 'Clientes Satisfechos',
    value: '200+',
    description: 'Empresas confían en nosotros'
  },
  {
    icon: 'TrophyIcon',
    title: 'Años de Experiencia',
    value: '16+',
    description: 'Liderando la industria'
  },
  /*
  {
    icon: 'GlobeAmericasIcon',
    title: 'Países con Presencia',
    value: '8',
    description: 'Cobertura regional'
  }*/
  ];


  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full h-96 bg-muted animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-8">
            <div className="h-12 bg-muted rounded w-64 mx-auto" />
            <div className="h-4 bg-muted rounded w-96 mx-auto" />
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <AppImage
            src="https://img.rocket.new/generatedImages/rocket_gen_img_16477f56d-1766833435615.png"
            alt="Modern industrial automation facility with robotic arms and control systems in blue lighting"
            className="w-full h-full object-cover" />

          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              Misión y Visión
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Transformando la industria a través de automatización inteligente y soluciones innovadoras
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Toggle */}
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-card rounded-lg p-1 shadow-brand">
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-8 py-3 rounded-md font-heading font-semibold transition-all duration-300 ${
                activeTab === 'mission' ? 'bg-primary text-primary-foreground shadow-brand-sm' : 'text-text-primary hover:text-primary'}`
                }>

                Nuestra Misión
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-8 py-3 rounded-md font-heading font-semibold transition-all duration-300 ${
                activeTab === 'vision' ? 'bg-primary text-primary-foreground shadow-brand-sm' : 'text-text-primary hover:text-primary'}`
                }>

                Nuestra Visión
              </button>
            </div>
          </div>

          {activeTab === 'mission' ?
          <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-brand-lg">
                <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1675e2019-1769295251046.png"
                alt="Team of engineers collaborating on industrial automation project with blueprints and laptop"
                className="w-full h-full object-cover" />

              </div>
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <Icon name="TargetIcon" size={20} className="text-primary mr-2" />
                  <span className="text-sm font-heading font-semibold text-primary">
                    Nuestra Misión
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-6">
                  Misión
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  Proveer de soluciones integrales a las necesidades de automatización, control y adquisición de información; que genera la industria del territorio nacional e internacional. Esto con el empleo de la tecnología de vanguardia y personal multidisciplinario altamente capacitado.
                </p>
                <div className="flex items-start space-x-3 p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
                  <Icon name="LightBulbIcon" size={24} className="text-accent flex-shrink-0 mt-1" />
                  <p className="text-sm text-text-primary font-medium">
                    "Cada proyecto es una oportunidad para demostrar que la automatización avanzada puede ser accesible, confiable y transformadora para empresas de todos los tamaños."
                  </p>
                </div>
              </div>
            </div> :

          <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full mb-6">
                  <Icon name="SparklesIcon" size={20} className="text-accent mr-2" />
                  <span className="text-sm font-heading font-semibold text-accent">
                    Nuestra Visión
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-6">
                  Visión
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  Como proveedores en servicios de automatización para las diversas industrias existentes; C&S Mecatronics Technologies S.A. de C.V. se establecerá como la primera línea de consignatarios en la que confíen y piensen nuestros clientes al momentos de surgir una necesidad en automatización y sistemas de información. Manteniendo la calidad de nuestro servicio e implementar la mejora continua del día a día, esto con la finalidad de ofrecer en tiempos venideros la confiabilidad y el excelente servicio que nos respaldan hoy en día.
                </p>
                <div className="flex items-start space-x-3 p-4 bg-success/10 rounded-lg border-l-4 border-success">
                  <Icon name="RocketLaunchIcon" size={24} className="text-success flex-shrink-0 mt-1" />
                  <p className="text-sm text-text-primary font-medium">
                    "Para 2030, habremos implementado más de 1,000 proyectos de automatización inteligente, estableciendo nuevos estándares de excelencia en la industria."
                  </p>
                </div>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-brand-lg order-1 md:order-2">
                <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_188781ca2-1765292778598.png"
                alt="Futuristic industrial control room with multiple monitors displaying automation data and analytics"
                className="w-full h-full object-cover" />

              </div>
            </div>
          }
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Icon name="HeartIcon" size={20} className="text-primary mr-2" />
              <span className="text-sm font-heading font-semibold text-primary">
                Nuestros Valores
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Principios que Nos Guían
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Los valores fundamentales que definen nuestra cultura organizacional y guían cada decisión que tomamos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) =>
            <ValueCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              index={index} />

            )}
          </div>
        </div>
      </section>

      {/* Timeline 
      <section className="py-16 bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full mb-4">
              <Icon name="ClockIcon" size={20} className="text-accent mr-2" />
              <span className="text-sm font-heading font-semibold text-accent">
                Nuestra Historia
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Trayectoria de Excelencia
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Un recorrido de 16 años marcado por innovación, crecimiento y compromiso con la excelencia
            </p>
          </div>

          <div className="relative">
            {timelineEvents.map((event, index) =>
            <TimelineItem
              key={index}
              year={event.year}
              title={event.title}
              description={event.description}
              icon={event.icon}
              isLeft={index % 2 === 0}
              index={index} />

            )}
          </div>
        </div>
      </section>
      */}

      {/* Vision Goals */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full mb-4">
              <Icon name="FlagIcon" size={20} className="text-accent mr-2" />
              <span className="text-sm font-heading font-semibold text-accent">
                Objetivos Estratégicos
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Metas para el Futuro
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Objetivos ambiciosos que nos impulsan hacia la excelencia y el liderazgo en automatización industrial
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {visionGoals.map((goal, index) =>
            <VisionGoal
              key={index}
              icon={goal.icon}
              title={goal.title}
              description={goal.description}
              metric={goal.metric}
              index={index} />

            )}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Logros que Nos Definen
            </h2>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Números que reflejan nuestro compromiso con la excelencia y la satisfacción del cliente
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) =>
            <AchievementBadge
              key={index}
              icon={achievement.icon}
              title={achievement.title}
              value={achievement.value}
              description={achievement.description}
              index={index} />

            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-card rounded-lg p-8 md:p-12 shadow-brand-lg">
            <Icon name="SparklesIcon" size={48} className="text-accent mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Únete a Nuestra Visión
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Descubre cómo nuestras soluciones de automatización inteligente pueden transformar tu operación industrial y llevarla al siguiente nivel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-cta text-conversion-foreground font-heading font-semibold rounded-md hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand hover:shadow-brand-lg">

                Solicitar Consultoría
                <Icon name="ArrowRightIcon" size={20} className="ml-2" />
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center px-8 py-3 bg-card text-primary border-2 border-primary font-heading font-semibold rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300">

                Ver Servicios
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>);

}