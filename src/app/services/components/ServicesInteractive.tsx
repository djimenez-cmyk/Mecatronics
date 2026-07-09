'use client';

import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import FilterBar from './FilterBar';
import ComparisonMatrix from './ComparisonMatrix';
import ServiceDetailModal from './ServiceDetailModal';
import ROICalculator from './ROICalculator';
import Icon from '@/components/ui/AppIcon';

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

const ServicesInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedIndustry, setSelectedIndustry] = useState('Todas');
  const [selectedComplexity, setSelectedComplexity] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [comparisonServices, setComparisonServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isROICalculatorOpen, setIsROICalculatorOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mockServices: Service[] = [
  {
    id: 1,
    title: 'Ingeniería',
    description:
    'Servicios completos de ingeniería mecatrónica para diseño, análisis y optimización de sistemas industriales. Soluciones integrales desde la conceptualización hasta la implementación.',
    image: "/assets/imagenes/services/Ingenieria.png",
    alt: 'Engineering team working on industrial automation design and technical drawings',
    features: [
    'Análisis y diseño de sistemas',
    'Ingeniería de detalle',
    'Estudios de factibilidad',
    'Optimización de procesos',
    'Documentación técnica completa',
    'Soporte técnico especializado'],

    category: 'Ingeniería',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '8-12 semanas',
    roi: '18-24 meses',
    industries: ['Manufactura', 'Automotriz', 'Médica'],
    technicalSpecs: [
    'Diseño CAD 3D avanzado',
    'Simulación de sistemas',
    'Análisis de elementos finitos',
    'Documentación según normas internacionales',
    'Gestión de proyectos certificada'],

    benefits: [
    'Soluciones técnicas optimizadas',
    'Reducción de riesgos en implementación',
    'Cumplimiento normativo garantizado',
    'Eficiencia en tiempo y costos'],

    caseStudyMetric:
    'Proyectos de ingeniería han optimizado procesos industriales logrando mejoras de eficiencia del 35% en promedio.'
  },
  {
    id: 2,
    title: 'Diseño de Tableros de Control',
    description:
    'Diseño y fabricación de tableros de control eléctrico personalizados según especificaciones y normativas internacionales. Soluciones completas de hardware y software para control preciso.',
    image: "/assets/imagenes/services/DisenoTableros.png",
    alt: 'Custom industrial control panel with organized electrical components and wiring',
    features: [
    'PLCs de marcas líderes',
    'HMI táctil integrado',
    'Diseño según normas NOM/IEC',
    'Selección de componentes certificados',
    'Diagramas eléctricos detallados',
    'Pruebas de funcionamiento',
    'Etiquetado y documentación',
    'Garantía de fabricación'],

    category: 'Control de Procesos',
    industry: 'Manufactura',
    complexity: 'Intermedia',
    implementationTime: '4-6 semanas',
    roi: '12-18 meses',
    industries: ['Manufactura', 'Automotriz', 'Médica'],
    technicalSpecs: [
    'Entradas/salidas digitales y analógicas',
    'Módulos de comunicación industrial',
    'Gabinetes NEMA 12/IP54',
    'Componentes Schneider/ABB/Siemens/Allen-Bradley',
    'Cableado estructurado',
    'Borneras identificadas',
    'Protecciones y seguridades'],

    benefits: [
    'Control preciso y confiable',
    'Interfaz de operación intuitiva',
    'Instalación plug & play',
    'Mantenimiento simplificado',
    'Seguridad eléctrica certificada',
    'Durabilidad y confiabilidad'],

    caseStudyMetric:
    'Tableros de control diseñados han reducido tiempos de instalación en 60% y eliminado errores de cableado.'
  },
  {
    id: 3,
    title: 'Desarrollo de Programas de PLC',
    description:
    'Programación especializada de controladores lógicos programables (PLC) de múltiples marcas: Allen-Bradley, Siemens, GE, Telemecanique, Omron y más. Soluciones de control adaptadas a cada aplicación industrial.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17d79d67b-1769467385611.png",
    alt: 'PLC programming workstation showing ladder logic code for industrial automation',
    features: [
    'Programación en Ladder, SCL, FBD',
    'Allen-Bradley (RSLogix, Studio 5000)',
    'Siemens (TIA Portal, Step 7)',
    'GE, Telemecanique, Omron',
    'HMI y SCADA integrados',
    'Documentación de código'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '6-10 semanas',
    roi: '15-20 meses',
    industries: ['Manufactura', 'Automotriz','Médica'],
    technicalSpecs: [
    'Soporte multi-marca de PLCs',
    'Comunicación industrial (Ethernet/IP, PROFINET, Modbus)',
    'Bloques de función reutilizables',
    'Diagnósticos integrados',
    'Respaldo y versionado de código'],

    benefits: [
    'Control preciso de procesos',
    'Flexibilidad para modificaciones',
    'Reducción de tiempos de ciclo',
    'Integración con sistemas existentes'],

    caseStudyMetric:
    'Programas de PLC desarrollados han mejorado eficiencia de líneas de producción en 40% y reducido paros en 75%.'
  },
  {
    id: 4,
    title: 'Maquinados',
    description:
    'Servicios integrales de diseño mecánico y fabricación de componentes y sistemas especiales. Desde el concepto hasta la entrega de equipos listos para operar.',
    image: "/assets/imagenes/services/Maquinados.png",
    alt: 'Precision manufacturing facility with CNC machines fabricating custom mechanical components',
    features: [
    'Diseño CAD 3D (SolidWorks, AutoCAD)',
    'Fabricación de piezas especiales',
    'Maquinado CNC de precisión',
    'Soldadura y ensamble',
    'Tratamientos superficiales',
    'Control de calidad dimensional'],

    category: 'Sistemas Mecatrónicos',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '10-16 semanas',
    roi: '24-30 meses',
    industries: ['Manufactura', 'Automotriz', 'Médica'],
    technicalSpecs: [
    'Tolerancias de ±0.05mm',
    'Materiales certificados',
    'Acabados industriales',
    'Pruebas de funcionamiento',
    'Certificación de calidad'],

    benefits: [
    'Componentes a medida',
    'Alta precisión y calidad',
    'Reducción de tiempos de entrega',
    'Soporte post-venta'],

    caseStudyMetric:
    'Sistemas diseñados y fabricados a medida han permitido a clientes implementar soluciones únicas con 100% de satisfacción.'
  },
  {
    id: 5,
    title: 'Integraciones Mecánico-Control',
    description:
    'Integración completa de sistemas mecánicos con sistemas de control automatizado. Sincronización perfecta entre hardware mecánico y software de control para máximo rendimiento.',
    image: "/assets/imagenes/services/Integraciones.png",
    alt: 'Integrated mechatronic system showing mechanical components synchronized with electronic controls',
    features: [
    'Integración mecánica-eléctrica',
    'Sincronización de movimientos',
    'Control de servomotores',
    'Sistemas de seguridad integrados',
    'Pruebas de funcionamiento',
    'Puesta en marcha asistida'],

    category: 'Sistemas Mecatrónicos',
    industry: 'Automotriz',
    complexity: 'Avanzada',
    implementationTime: '8-14 semanas',
    roi: '20-26 meses',
    industries: ['Automotriz', 'Manufactura', 'Médica'],
    technicalSpecs: [
    'Servomotores y drives industriales',
    'Sensores de posición y velocidad',
    'Controladores de movimiento',
    'Comunicación en tiempo real',
    'Sistemas de seguridad SIL'],

    benefits: [
    'Operación sincronizada',
    'Mayor precisión y repetibilidad',
    'Reducción de mantenimiento',
    'Optimización de ciclos'],

    caseStudyMetric:
    'Integraciones mecánico-control han logrado precisiones de ±0.02mm y aumentos de velocidad del 50% en aplicaciones críticas.'
  },
  {
    id: 6,
    title: 'Servicios de Ingeniería - Sistemas de Información',
    description:
    'Desarrollo e implementación de sistemas de información para manufactura. Integración de SCADA, bases de datos y reporteo en tiempo real para gestión inteligente de producción.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17749ac6b-1769467747428.png",
    alt: 'Manufacturing information system dashboard displaying real-time production data and analytics',
    features: [
    'Sistemas SCADA',
    'Bases de datos industriales',
    'Dashboards en tiempo real',
    'Reportes automatizados',
    'Integración ERP',
    'Análisis de datos (OEE, KPIs)'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '10-14 semanas',
    roi: '18-24 meses',
    industries: ['Manufactura', 'Automotriz', 'Farmacéutica'],
    technicalSpecs: [
    'Plataformas SCADA (WinCC, Ignition)',
    'Bases de datos SQL Server/MySQL',
    'Conectividad OPC UA',
    'Interfaces web responsive',
    'APIs REST para integración'],

    benefits: [
    'Visibilidad total de producción',
    'Toma de decisiones basada en datos',
    'Trazabilidad completa',
    'Mejora continua facilitada'],

    caseStudyMetric:
    'Sistemas de información implementados han mejorado OEE en 25% y reducido tiempo de respuesta a problemas en 80%.'
  },
  {
    id: 7,
    title: 'Control y Redes',
    description:
    'Instalación completa de infraestructura eléctrica de fuerza, sistemas de control y redes industriales. Cableado estructurado, canalizaciones y puesta en servicio según normativas.',
    image: "/assets/imagenes/services/ControlRedes.png",
    alt: 'Industrial electrical installation showing power distribution, control wiring and network infrastructure',
    features: [
    'Instalaciones eléctricas industriales',
    'Cableado de control y fuerza',
    'Redes industriales (Ethernet/IP, PROFINET)',
    'Canalizaciones y charolas',
    'Puesta a tierra y protecciones',
    'Certificación de instalaciones'],

    category: 'Control de Procesos',
    industry: 'Manufactura',
    complexity: 'Intermedia',
    implementationTime: '6-10 semanas',
    roi: '15-20 meses',
    industries: ['Manufactura', 'Automotriz', 'Médica'],
    technicalSpecs: [
    'Cumplimiento NOM-001-SEDE',
    'Cable certificado UL/CSA',
    'Switches industriales gestionados',
    'Fibra óptica para largas distancias',
    'Pruebas de continuidad y aislamiento'],

    benefits: [
    'Instalaciones seguras y confiables',
    'Comunicación industrial robusta',
    'Facilidad de mantenimiento',
    'Escalabilidad futura'],

    caseStudyMetric:
    'Instalaciones realizadas han garantizado 99.9% de disponibilidad de red y cero incidentes eléctricos en operación.'
  },
  {
    id: 8,
    title: 'Servicios de Outsourcing',
    description:
    'Servicios de outsourcing especializado en automatización y mantenimiento industrial. Personal técnico calificado para soporte continuo, mantenimiento preventivo y correctivo de sistemas automatizados.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_122daf91b-1764676753294.png",
    alt: 'Technical support team providing outsourcing services for industrial automation maintenance',
    features: [
    'Personal técnico especializado',
    'Mantenimiento preventivo programado',
    'Soporte técnico 24/7',
    'Gestión de refacciones',
    'Capacitación continua',
    'Reportes de desempeño'],

    category: 'Mantenimiento',
    industry: 'Manufactura',
    complexity: 'Intermedia',
    implementationTime: '2-4 semanas',
    roi: '12-18 meses',
    industries: ['Manufactura', 'Automotriz',  'Médica'],
    technicalSpecs: [
    'Técnicos certificados por fabricantes',
    'Herramientas de diagnóstico avanzadas',
    'Sistema de gestión de mantenimiento',
    'Inventario de refacciones críticas'],

    benefits: [
    'Reducción de costos operativos',
    'Mayor disponibilidad de equipos',
    'Enfoque en core business',
    'Experiencia especializada'],

    caseStudyMetric:
    'Servicios de outsourcing han reducido paros no planificados en 70% y costos de mantenimiento en 35% para clientes.'
  },
  {
    id: 9,
    title: 'Prensas',
    description:
    'Diseño, fabricación e integración de prensas industriales para aplicaciones de manufactura. Soluciones personalizadas desde prensas hidráulicas hasta sistemas automatizados de estampado.',
    image: "/assets/imagenes/services/Prensas.JPG",
    alt: 'Industrial hydraulic press machine for manufacturing and stamping operations',
    features: [
    'Prensas hidráulicas y mecánicas',
    'Sistemas de estampado automatizado',
    'Control de fuerza y posición',
    'Integración con robots',
    'Sistemas de seguridad certificados',
    'Mantenimiento y refacciones'],

    category: 'Sistemas Mecatrónicos',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '12-20 semanas',
    roi: '24-36 meses',
    industries: ['Automotriz', 'Manufactura', 'Metalmecánica'],
    technicalSpecs: [
    'Capacidades de 10 a 500 toneladas',
    'Control de presión y velocidad',
    'Sistemas hidráulicos proporcionales',
    'Monitoreo de ciclos y producción',
    'Cumplimiento normas de seguridad'],

    benefits: [
    'Alta precisión en formado',
    'Ciclos de producción optimizados',
    'Reducción de desperdicio',
    'Operación segura y confiable'],

    caseStudyMetric:
    'Prensas instaladas han mejorado calidad de piezas en 45% y aumentado productividad en 30%.'
  },
  {
    id: 10,
    title: 'Error Proofing (Sistemas Poka Yoke)',
    description:
    'Implementación de sistemas Poka Yoke para prevención de errores en procesos de manufactura. Dispositivos y controles que garantizan calidad y eliminan defectos.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_198c05922-1769468283348.png",
    alt: 'Poka Yoke error proofing system with sensors and verification devices on assembly line',
    features: [
    'Análisis de modos de falla',
    'Diseño de dispositivos Poka Yoke',
    'Sensores de verificación',
    'Sistemas de bloqueo inteligente',
    'Alertas visuales y sonoras',
    'Integración con líneas de producción'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Intermedia',
    implementationTime: '4-8 semanas',
    roi: '10-15 meses',
    industries: ['Automotriz', 'Manufactura', 'Electrónica', 'Médica'],
    technicalSpecs: [
    'Sensores de presencia y posición',
    'Sistemas de visión artificial',
    'Dispositivos mecánicos de guía',
    'Lógica de control integrada',
    'Registro de eventos y trazabilidad'],

    benefits: [
    'Cero defectos en producción',
    'Reducción de retrabajo',
    'Mejora en calidad del producto',
    'Disminución de costos de calidad'],

    caseStudyMetric:
    'Sistemas Poka Yoke implementados han reducido defectos en 95% y eliminado retrabajo en líneas críticas.'
  },
  {
    id: 11,
    title: 'Equipos para Manejo de Materiales',
    description:
    'Soluciones integrales para manejo automatizado de materiales en planta. Desde transportadores hasta sistemas AGV para optimización de flujo de materiales.',
    image: "/assets/imagenes/services/ManejoMateriales.jpg",
    alt: 'Automated material handling system with conveyors and AGV vehicles in warehouse',
    features: [
    'Transportadores de banda y rodillos',
    'Sistemas AGV (vehículos guiados)',
    'Elevadores y posicionadores',
    'Control de flujo de materiales',
    'Integración con WMS',
    'Sistemas de identificación RFID'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '10-16 semanas',
    roi: '20-28 meses',
    industries: ['Manufactura', 'Logística', 'Automotriz', 'Médica'],
    technicalSpecs: [
    'Capacidades de carga personalizadas',
    'Velocidades variables controladas',
    'Sistemas de navegación láser/magnética',
    'Gestión de tráfico automatizada',
    'Interfaces de comunicación industrial'],

    benefits: [
    'Optimización de flujo de materiales',
    'Reducción de tiempos de ciclo',
    'Eliminación de manejo manual',
    'Trazabilidad completa'],

    caseStudyMetric:
    'Sistemas de manejo de materiales han reducido tiempos de transporte en 60% y mejorado eficiencia logística en 40%.'
  },
  /*
  {
    id: 12,
    title: 'Electronic Pull System (EPS)',
    description:
    'Sistemas electrónicos de pull para manufactura esbelta. Señalización digital y control de flujo de materiales basado en demanda real de producción.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_188389fa7-1769468281035.png",
    alt: 'Electronic pull system display showing real-time material flow and kanban signals',
    features: [
    'Señalización electrónica Kanban',
    'Control de inventario en tiempo real',
    'Alertas automáticas de reabastecimiento',
    'Integración con ERP/MES',
    'Dashboards de visualización',
    'Reportes de consumo y tendencias'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Intermedia',
    implementationTime: '6-10 semanas',
    roi: '12-18 meses',
    industries: ['Automotriz', 'Manufactura', 'Electrónica'],
    technicalSpecs: [
    'Pantallas táctiles industriales',
    'Comunicación inalámbrica',
    'Software de gestión de pull',
    'Integración con código de barras/RFID',
    'Base de datos centralizada'],

    benefits: [
    'Reducción de inventario en proceso',
    'Eliminación de sobreproducción',
    'Flujo de materiales optimizado',
    'Visibilidad total de consumo'],

    caseStudyMetric:
    'Sistemas EPS han reducido inventario en proceso en 50% y mejorado tiempo de respuesta a demanda en 70%.'
  },
  */
  {
    id: 13,
    title: 'Pick and Place',
    description:
    'Sistemas automatizados de pick and place para ensamble y empaque. Soluciones robóticas y mecánicas para manipulación precisa de componentes y productos.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_15dc24cef-1767442270254.png",
    alt: 'Automated pick and place robotic system handling components on assembly line',
    features: [
    'Robots cartesianos y SCARA',
    'Sistemas de visión artificial',
    'Pinzas y efectores personalizados',
    'Control de posición de alta precisión',
    'Integración con líneas de producción',
    'Programación intuitiva'],

    category: 'Robótica Industrial',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '8-14 semanas',
    roi: '18-24 meses',
    industries: ['Electrónica', 'Manufactura', 'Médica'],
    technicalSpecs: [
    'Precisión de ±0.05mm',
    'Velocidades de hasta 120 ciclos/min',
    'Cargas de 0.5 a 50 kg',
    'Sistemas de visión 2D/3D',
    'Comunicación industrial estándar'],

    benefits: [
    'Alta velocidad y precisión',
    'Reducción de costos de mano de obra',
    'Calidad consistente',
    'Flexibilidad para múltiples productos'],

    caseStudyMetric:
    'Sistemas pick and place han aumentado velocidad de ensamble en 200% y reducido errores de colocación a cero.'
  },
  {
    id: 14,
    title: 'Sistemas Andon',
    description:
    'Sistemas de señalización visual Andon para comunicación en tiempo real del estado de producción. Alertas inmediatas de problemas y gestión de respuesta.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d12768e7-1769468282457.png",
    alt: 'Andon board system displaying production status and alerts in manufacturing facility',
    features: [
    'Tableros Andon LED de gran formato',
    'Estaciones de llamado inalámbricas',
    'Alertas visuales y sonoras',
    'Registro de eventos y tiempos',
    'Integración con sistemas de producción',
    'Reportes de desempeño'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Intermedia',
    implementationTime: '4-8 semanas',
    roi: '10-15 meses',
    industries: ['Automotriz', 'Manufactura', 'Electrónica', 'Médica'],
    technicalSpecs: [
    'Pantallas LED industriales',
    'Botones de llamado ergonómicos',
    'Software de gestión de eventos',
    'Comunicación inalámbrica/cableada',
    'Integración con bases de datos'],

    benefits: [
    'Respuesta rápida a problemas',
    'Reducción de tiempos de paro',
    'Mejora en comunicación de planta',
    'Cultura de mejora continua'],

    caseStudyMetric:
    'Sistemas Andon han reducido tiempo de respuesta a problemas en 75% y mejorado OEE en 15%.'
  },
  /*
  {
    id: 15,
    title: 'Energy Management System (EMS)',
    description:
    'Sistemas de gestión energética para monitoreo y optimización del consumo de energía en planta. Reducción de costos y mejora de eficiencia energética.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1817a88e5-1766517007062.png",
    alt: 'Energy management system dashboard showing power consumption monitoring and analytics',
    features: [
    'Monitoreo de consumo en tiempo real',
    'Medidores inteligentes',
    'Análisis de demanda y factor de potencia',
    'Alertas de consumo anormal',
    'Reportes de eficiencia energética',
    'Integración con sistemas de producción'],

    category: 'Control de Procesos',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '8-12 semanas',
    roi: '18-24 meses',
    industries: ['Manufactura', 'Automotriz',  'Médica'],
    technicalSpecs: [
    'Medidores de energía certificados',
    'Comunicación Modbus/Ethernet',
    'Software SCADA de energía',
    'Análisis de calidad de energía',
    'Cumplimiento ISO 50001'],

    benefits: [
    'Reducción de costos energéticos',
    'Identificación de desperdicios',
    'Optimización de demanda',
    'Cumplimiento normativo ambiental'],

    caseStudyMetric:
    'Sistemas EMS implementados han reducido consumo energético en 25% y costos de energía en 30%.'
  },
  */
 /*
  {
    id: 16,
    title: 'Tableros de Control por PLC',
    description:
    'Tableros de control basados en PLC para automatización de procesos industriales. ',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd7333d5-1767780920787.png",
    alt: 'PLC-based control panel with touchscreen HMI and industrial components',
    features: [
    'Programación personalizada',
    'Comunicación industrial',
    'Respaldos y redundancia',
    'Documentación completa'],

    category: 'Control de Procesos',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '6-10 semanas',
    roi: '15-20 meses',
    industries: ['Manufactura', 'Automotriz',  'Médica'],
    technicalSpecs: [
    'PLCs Allen-Bradley, Siemens, Omron',
    'HMI de 7" a 21"',
    'Entradas/salidas digitales y analógicas',
    'Módulos de comunicación industrial',
    'Fuentes de alimentación redundantes'],

    benefits: [
    'Control preciso y confiable',
    'Interfaz de operación intuitiva',
    'Fácil mantenimiento',
    'Escalabilidad y expansión'],

    caseStudyMetric:
    'Tableros de control por PLC han mejorado precisión de procesos en 40% y reducido paros en 65%.'
  },
  */
  /*
  {
    id: 17,
    title: 'Control Automático de Tableros de Alumbrado',
    description:
    'Sistemas de control automático para iluminación industrial. Optimización de consumo energético y gestión inteligente de alumbrado en plantas.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17c6fe5f9-1769468280523.png",
    alt: 'Automated lighting control system with sensors and smart switches in industrial facility',
    features: [
    'Control automático por horario',
    'Sensores de presencia y luz natural',
    'Atenuación inteligente',
    'Gestión remota y monitoreo',
    'Integración con sistemas de edificio',
    'Reportes de consumo'],

    category: 'Control de Procesos',
    industry: 'Manufactura',
    complexity: 'Intermedia',
    implementationTime: '4-8 semanas',
    roi: '12-18 meses',
    industries: ['Manufactura', 'Logística', 'Comercial'],
    technicalSpecs: [
    'Controladores programables',
    'Sensores de ocupación PIR',
    'Fotoceldas de luz natural',
    'Contactores y relés de estado sólido',
    'Comunicación KNX/DALI'],

    benefits: [
    'Ahorro energético hasta 60%',
    'Mejora en confort laboral',
    'Reducción de mantenimiento',
    'Control centralizado'],

    caseStudyMetric:
    'Sistemas de control de alumbrado han reducido consumo de iluminación en 55% y mejorado ambiente de trabajo.'
  },
  */
  /*
  {
    id: 18,
    title: 'Monitoreo y Control de Procesos',
    description:
    'Sistemas SCADA para monitoreo y control de procesos industriales en tiempo real. Supervisión completa de variables críticas y control remoto.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b0af91aa-1767117200576.png",
    alt: 'SCADA system monitoring industrial processes with real-time data visualization',
    features: [
    'Sistemas SCADA personalizados',
    'Monitoreo de variables en tiempo real',
    'Control remoto de procesos',
    'Alarmas y notificaciones',
    'Históricos y tendencias',
    'Reportes automatizados'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '10-16 semanas',
    roi: '20-26 meses',
    industries: ['Manufactura',  'Médica'],
    technicalSpecs: [
    'Plataformas WinCC, Ignition, FactoryTalk',
    'Comunicación OPC UA/DA',
    'Bases de datos SQL',
    'Interfaces web y móviles',
    'Redundancia de servidores'],

    benefits: [
    'Visibilidad total de procesos',
    'Control centralizado',
    'Toma de decisiones informada',
    'Reducción de incidentes'],

    caseStudyMetric:
    'Sistemas SCADA implementados han mejorado tiempo de respuesta en 80% y reducido paros no planificados en 60%.'
  },
  */
  {
    id: 19,
    title: 'Fabricaciones de Mecanización (Nuevos o Retrofits)',
    description:
    'Fabricación de componentes mecanizados y retrofits de maquinaria existente. Modernización de equipos con control automático y mejoras de desempeño.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c70f469e-1769468283834.png",
    alt: 'CNC machining and retrofit of industrial equipment with automated controls',
    features: [
    'Maquinado CNC de precisión',
    'Retrofit de maquinaria antigua',
    'Actualización de controles',
    'Mejoras de seguridad',
    'Integración de automatización',
    'Documentación y capacitación'],

    category: 'Sistemas Mecatrónicos',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '12-20 semanas',
    roi: '24-36 meses',
    industries: ['Manufactura', 'Automotriz', 'Metalmecánica'],
    technicalSpecs: [
    'Maquinado de alta precisión',
    'Controles CNC modernos',
    'Servomotores y drives',
    'Sistemas de seguridad actualizados',
    'Ingeniería inversa cuando necesario'],

    benefits: [
    'Extensión de vida útil de equipos',
    'Mejora de precisión y velocidad',
    'Reducción de costos vs. equipo nuevo',
    'Modernización tecnológica'],

    caseStudyMetric:
    'Retrofits realizados han extendido vida útil de equipos en 15 años y mejorado productividad en 50%.'
  },
  {
    id: 20,
    title: 'Sistemas de Visión',
    description:
    'Sistemas de visión artificial para inspección, verificación y guiado en procesos industriales. Detección de defectos y control de calidad automatizado.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ed525346-1767644603024.png",
    alt: 'Machine vision system inspecting products on production line with cameras and lighting',
    features: [
    'Cámaras industriales 2D y 3D',
    'Iluminación especializada',
    'Software de procesamiento de imágenes',
    'Inspección de calidad automatizada',
    'Guiado de robots',
    'Lectura de códigos y OCR'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '8-14 semanas',
    roi: '18-24 meses',
    industries: ['Automotriz', 'Electrónica', 'Médica'],
    technicalSpecs: [
    'Cámaras de alta resolución',
    'Procesamiento en tiempo real',
    'Algoritmos de deep learning',
    'Comunicación industrial',
    'Calibración automática'],

    benefits: [
    'Inspección 100% de producción',
    'Detección de defectos microscópicos',
    'Eliminación de inspección manual',
    'Trazabilidad completa'],

    caseStudyMetric:
    'Sistemas de visión han detectado defectos con 99.9% de precisión y eliminado productos defectuosos antes de envío.'
  },
  {
    id: 21,
    title: 'Sistemas de Tracking de Materiales y Productos',
    description:
    'Sistemas de rastreo y trazabilidad de materiales en planta. Seguimiento en tiempo real de componentes, productos y herramientas mediante RFID y código de barras.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12ce4ac9b-1764658762607.png",
    alt: 'Material tracking system with RFID readers and barcode scanners in warehouse',
    features: [
    'Tecnología RFID y código de barras',
    'Lectores fijos y portátiles',
    'Software de gestión de trazabilidad',
    'Integración con ERP/WMS',
    'Localización en tiempo real',
    'Reportes de movimientos'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Intermedia',
    implementationTime: '6-12 semanas',
    roi: '15-20 meses',
    industries: ['Automotriz', 'Manufactura', 'Logística', 'Farmacéutica'],
    technicalSpecs: [
    'Tags RFID pasivos y activos',
    'Lectores de largo alcance',
    'Base de datos centralizada',
    'APIs de integración',
    'Aplicaciones móviles'],

    benefits: [
    'Trazabilidad completa de materiales',
    'Reducción de pérdidas',
    'Optimización de inventario',
    'Cumplimiento normativo'],

    caseStudyMetric:
    'Sistemas de tracking han reducido pérdida de materiales en 90% y mejorado precisión de inventario a 99.5%.'
  },
  {
    id: 22,
    title: 'Sistemas de Escaneo de Producto en Línea',
    description:
    'Sistemas de escaneo automático de productos en líneas de producción. Verificación de códigos, etiquetas y datos de producto a alta velocidad.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12ed84cf6-1769265110538.png",
    alt: 'Inline product scanning system with barcode readers on high-speed production line',
    features: [
    'Escáneres de alta velocidad',
    'Verificación de códigos de barras',
    'Lectura de códigos 2D (QR, DataMatrix)',
    'OCR de texto',
    'Rechazo automático de productos',
    'Integración con sistemas de producción'],

    category: 'Automatización Industrial',
    industry: 'Manufactura',
    complexity: 'Intermedia',
    implementationTime: '6-10 semanas',
    roi: '12-18 meses',
    industries: ['Médica', 'Logística', 'Manufactura'],
    technicalSpecs: [
    'Velocidades de hasta 300 escaneos/min',
    'Lectura omnidireccional',
    'Verificación de calidad de código',
    'Comunicación Ethernet industrial',
    'Registro de datos en tiempo real'],

    benefits: [
    'Verificación 100% de productos',
    'Eliminación de errores de etiquetado',
    'Cumplimiento normativo garantizado',
    'Trazabilidad completa'],

    caseStudyMetric:
    'Sistemas de escaneo en línea han eliminado errores de etiquetado y mejorado velocidad de verificación en 300%.'
  },
  /*
  {
    id: 23,
    title: 'Proyectos de Velocidad Variable con Drives AC, CD y Servo',
    description:
    'Implementación de sistemas de velocidad variable para control preciso de motores. Drives AC, CD y servomotores para aplicaciones de alta precisión y eficiencia energética.',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d96edd16-1764927123227.png",
    alt: 'Variable frequency drives and servo systems for precise motor control in industrial applications',
    features: [
    'Drives de velocidad variable AC/CD',
    'Servomotores y servodrives',
    'Control de posición y velocidad',
    'Ahorro energético',
    'Integración con PLCs',
    'Parametrización y puesta en marcha'],

    category: 'Control de Procesos',
    industry: 'Manufactura',
    complexity: 'Avanzada',
    implementationTime: '6-12 semanas',
    roi: '15-22 meses',
    industries: ['Manufactura', 'Automotriz',  'Médica'],
    technicalSpecs: [
    'Drives ABB, Siemens, Allen-Bradley',
    'Potencias de 0.5 a 500 HP',
    'Control vectorial y DTC',
    'Comunicación industrial',
    'Funciones de seguridad integradas'],

    benefits: [
    'Ahorro energético hasta 50%',
    'Control preciso de procesos',
    'Arranque suave de motores',
    'Reducción de mantenimiento'],

    caseStudyMetric:
    'Proyectos de velocidad variable han reducido consumo energético en 45% y mejorado precisión de control en 60%.'
  }
    */];
  const filteredServices = mockServices.filter((service) => {
    const matchesCategory =
    selectedCategory === 'Todos' || service.category === selectedCategory;
    const matchesIndustry =
    selectedIndustry === 'Todas' || service.industry === selectedIndustry;
    const matchesComplexity =
    selectedComplexity === 'Todas' ||
    service.complexity === selectedComplexity;
    const matchesSearch =
    searchQuery === '' ||
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.features.some((f) =>
    f.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      matchesCategory && matchesIndustry && matchesComplexity && matchesSearch);

  });

  const handleClearFilters = () => {
    setSelectedCategory('Todos');
    setSelectedIndustry('Todas');
    setSelectedComplexity('Todas');
    setSearchQuery('');
  };

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDownloadSpec = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleAddToComparison = (service: Service) => {
    if (comparisonServices.length < 3) {
      if (!comparisonServices.find((s) => s.id === service.id)) {
        setComparisonServices([...comparisonServices, service]);
      }
    }
  };

  const handleRemoveFromComparison = (id: number) => {
    setComparisonServices(comparisonServices.filter((s) => s.id !== id));
  };

  const handleClearComparison = () => {
    setComparisonServices([]);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16" />
        <div className="w-full px-4 lg:px-8 py-24">
          <div className="max-w-7xl mx-auto">
            <div className="h-8 bg-surface rounded w-64 mb-4 animate-pulse" />
            <div className="h-4 bg-surface rounded w-96 mb-12 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) =>
              <div
                key={i}
                className="bg-card rounded-lg shadow-brand h-96 animate-pulse" />

              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      <div className="h-16" />

      <div className="w-full px-4 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              Especialidades
            </h1>
            <p className="text-lg text-text-secondary max-w-3xl">
              Desarrollamos soluciones de automatización industrial y mecatrónica diseñadas para mejorar la productividad, solucionar y prevenir problemas de calidad, asegurar la rastreabilidad del producto y fortalecer los sistemas de información.
            </p>
          </div>

          {/*
          <div className="mb-8 flex flex-wrap gap-4">
            <button
              onClick={() => setIsROICalculatorOpen(true)}
              className="px-6 py-3 bg-accent text-accent-foreground text-sm font-heading font-semibold rounded-md hover:bg-accent/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand flex items-center space-x-2">

              <Icon name="CalculatorIcon" size={20} variant="solid" />
              <span>Calculadora de ROI</span>
            </button>
          </div>*/}

          <FilterBar
            selectedCategory={selectedCategory}
            selectedIndustry={selectedIndustry}
            selectedComplexity={selectedComplexity}
            searchQuery={searchQuery}
            onCategoryChange={setSelectedCategory}
            onIndustryChange={setSelectedIndustry}
            onComplexityChange={setSelectedComplexity}
            onSearchChange={setSearchQuery}
            onClearFilters={handleClearFilters} />


          <ComparisonMatrix
            services={comparisonServices}
            onRemoveService={handleRemoveFromComparison}
            onClearComparison={handleClearComparison} />


          {showSuccessMessage &&
          <div className="fixed top-24 right-4 bg-success text-success-foreground px-6 py-3 rounded-md shadow-brand-lg flex items-center space-x-2 z-50 animate-smooth">
              <Icon name="CheckCircleIcon" size={20} variant="solid" />
              <span className="text-sm font-heading font-semibold">
                Especificaciones descargadas exitosamente
              </span>
            </div>
          }

          <div className="mb-6">
            <p className="text-sm text-text-secondary">
              Mostrando {filteredServices.length} de {mockServices.length}{' '}
              
            </p>
          </div>

          {filteredServices.length === 0 ?
          <div className="bg-card rounded-lg shadow-brand p-12 text-center">
              <Icon
              name="MagnifyingGlassIcon"
              size={48}
              className="text-text-secondary mx-auto mb-4" />

              <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                No se encontraron servicios
              </h3>
              <p className="text-sm text-text-secondary mb-6">
                Intente ajustar los filtros o realizar una búsqueda diferente
              </p>
              <button
              onClick={handleClearFilters}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-heading font-semibold rounded-md hover:bg-primary/90 transition-colors duration-300">

                Limpiar Filtros
              </button>
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) =>
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              alt={service.alt}
              features={service.features}
              category={service.category}
              onLearnMore={() => handleLearnMore(service)}
              onDownloadSpec={handleDownloadSpec} />

            )}
            </div>
          }

          <div className="mt-12 bg-primary/10 border border-primary/20 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                  ¿No encuentra lo que busca?
                </h3>
                <p className="text-sm text-text-secondary">
                  Desarrollamos soluciones personalizadas adaptadas a sus
                  necesidades específicas. Contáctenos para discutir su proyecto.
                </p>
              </div>
              <button className="px-8 py-3 bg-cta text-white text-sm font-heading font-semibold rounded-md hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand whitespace-nowrap">
                Solicitar Solución Personalizada
              </button>
            </div>
          </div>
        </div>
      </div>

      <ServiceDetailModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDownloadSpec={handleDownloadSpec}
        onRequestConsultation={() => {}}
        onAddToComparison={() => {
          if (selectedService) {
            handleAddToComparison(selectedService);
          }
        }} />


      <ROICalculator
        isOpen={isROICalculatorOpen}
        onClose={() => setIsROICalculatorOpen(false)} />

    </div>);

};

export default ServicesInteractive;