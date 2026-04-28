'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import GalleryModal from './GalleryModal';

interface ProjectPhoto {
  image: string;
  alt: string;
  caption: string;
}

interface ProjectCategory {
  id: number;
  title: string;
  description: string;
  photos: ProjectPhoto[];
}

const ExperienceInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const projectCategories: ProjectCategory[] = [
  {
    id: 1,
    title: "Equipo de Manejo de Materiales",
    description: "Soluciones integrales para el transporte, almacenamiento y manipulación eficiente de materiales en procesos industriales.",
    photos: [
    {
      image: "/assets/imagenes/experience/equipo-manejo-materiales/GravityRollerConveyor.jpg",
      alt: "Gravity Roller Conveyor",
      caption:"Gravity Roller Conveyor"// "Sistema automatizado de transporte de materiales"
    },
    {
      image: "/assets/imagenes/experience/equipo-manejo-materiales/PhotoConveyor.jpg",
      alt: "Photo Conveyor",
      caption:"Photo Conveyor"// "Brazo robótico para manejo de materiales pesados"
    },
    {
      image: "/assets/imagenes/experience/equipo-manejo-materiales/PlasticBeltConveyor.jpg",
      alt: "Plastic Belt Conveyor",
      caption:"Plastic Belt Conveyor"// "Sistema automatizado de transporte de materiales"
    },
    {
      image: "/assets/imagenes/experience/equipo-manejo-materiales/PlasticBeltConveyor2.jpg",
      alt: "Plastic Belt Conveyor 2",
      caption:"Plastic Belt Conveyor 2"// "Sistema automatizado de transporte de materiales"
    },
    {
      image: "/assets/imagenes/experience/equipo-manejo-materiales/MiniConveyor.jpg",
      alt: "Mini Conveyor",
      caption:"Mini Conveyor"// "Sistema automatizado de transporte de materiales"
    }]

  },
  {
    id: 2,
    title: "Fabricaciones",
    description: "Fabricación de componentes y estructuras metálicas de precisión para aplicaciones industriales especializadas.",
    photos: [
    {
      image: "/assets/imagenes/aplicaciones/2fabricaciones/imagen-10.jpg",
      alt: "Metal fabrication workshop with welding equipment and steel structures",
      caption:""// "Taller de fabricación con equipos de soldadura"
    },
    {
      image: "/assets/imagenes/aplicaciones/2fabricaciones/imagen-10.jpg",
      alt: "Precision metal cutting and fabrication machinery in industrial setting",
      caption:""// "Maquinaria de corte y fabricación de precisión"
    }]

  },
  {
    id: 3,
    title: "Aplicaciones",
    description: "Desarrollo e implementación de aplicaciones industriales personalizadas para optimización de procesos y control.",
    photos: [
    {
      image: "/assets/imagenes/aplicaciones/3aplicaciones/untitled-6.jpg",
      alt: "Industrial control panel with touchscreen interface showing process data",
      caption:""// "Panel de control con interfaz táctil personalizada"
    },
    {
      image: "/assets/imagenes/aplicaciones/3aplicaciones/untitled-3.jpg",
      alt: "Engineer programming industrial automation system on laptop",
      caption:""// "Programación de sistemas de automatización industrial"
    }]

  },
  {
    id: 4,
    title: "Maquinado y Fabricacion de Maquinas",
    description: "Diseño, maquinado y fabricación de maquinaria industrial especializada y componentes de alta precisión.",
    photos: [
    {
      image: "/assets/imagenes/experience/maquinado/Img0427.png",
      alt: "",
      caption:""// "Panel de control con interfaz táctil personalizada"
    },
    {
      image: "/assets/imagenes/experience/maquinado/Img0472.jpg",
      alt: "",
      caption:""// "Ensamblaje de maquinaria industrial personalizada"
    },
    {
      image: "/assets/imagenes/experience/maquinado/Img0474.jpg",
      alt: "",
      caption:""// "Panel de control con interfaz táctil personalizada"
    },
    {
      image: "/assets/imagenes/experience/maquinado/Img4336.jpg",
      alt: "",
      caption:""// "Ensamblaje de maquinaria industrial personalizada"
    }]

  },
  {
    id: 5,
    title: "Tableros de Control",
    description: "Diseño y fabricación de tableros de control eléctrico y automatización con tecnología PLC de última generación.",
    photos: [
    {
      image: "/assets/imagenes/experience/tableros/Dsc03692.jpg",
      alt: "",
      caption:""// "Tablero de control con PLC y protecciones eléctricas"
    },
    {
      image: "/assets/imagenes/experience/tableros/Dsc04844.jpg",
      alt: "",
      caption:""// "Gabinete de control moderno con componentes digitales"
    },
    {
      image: "/assets/imagenes/experience/tableros/Dsc06333.jpg",
      alt: "",
      caption:""// "Tablero de control con PLC y protecciones eléctricas"
    },
    {
      image: "/assets/imagenes/experience/tableros/Dsc1006049.jpg",
      alt: "",
      caption:""// "Gabinete de control moderno con componentes digitales"
    }]

  },
  {
    id: 6,
    title: "Diseño y Fabricacion",
    description: "Servicios completos de diseño industrial, ingeniería y fabricación de soluciones mecatrónicas personalizadas.",
    photos: [
    {
      image: "/assets/imagenes/aplicaciones/6diseno/Imagen-2.jpg",
      alt: "Engineering team reviewing CAD designs on computer screens",
      caption:""// "Equipo de ingeniería revisando diseños CAD"
    },
    {
      image: "/assets/imagenes/aplicaciones/6diseno/Imagen-3.jpg",
      alt: "Manufacturing floor with custom fabricated industrial equipment",
      caption:""// "Piso de manufactura con equipos fabricados a medida"
    }]

  }];


  const openGalleryModal = (category: ProjectCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const closeGalleryModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCategory(null), 300);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 lg:px-8 py-24">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-surface rounded w-1/3" />
            <div className="h-64 bg-surface rounded" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) =>
              <div key={i} className="h-64 bg-surface rounded" />
              )}
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Nuestros Proyectos
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore nuestras categorías de proyectos especializados en automatización industrial, 
            fabricación y soluciones mecatrónicas personalizadas.
          </p>
        </div>

        {/* Project Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectCategories.map((category) =>
          <div
            key={category.id}
            className="bg-card rounded-lg shadow-brand border border-border overflow-hidden hover:shadow-brand-lg transition-all duration-300">
            
              {/* Category Header */}
              <div className="p-6 border-b border-border min-h-[180px]" >
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  {category.title}
                </h2>
                <p className="text-muted-foreground">
                  {category.description}
                </p>
              </div>

              {/* Photo Gallery */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {category.photos.slice(0, 2).map((photo, index) =>
                <div
                  key={index}
                  className="group relative aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer"
                  onClick={() => openGalleryModal(category)}>
                  
                      <AppImage
                    src={photo.image}
                    alt={photo.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white text-sm font-medium">
                            {photo.caption}
                          </p>
                        </div>
                      </div>
                    </div>
                )}
                </div>

                {/* View More Button */}
                <button
                onClick={() => openGalleryModal(category)}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-cta text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
                
                  <Icon
                  name="PhotoIcon"
                  size={20} />
                
                  Ver Galería Completa
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Gallery Modal */}
        <GalleryModal
          isOpen={isModalOpen}
          onClose={closeGalleryModal}
          category={selectedCategory}
        />

      </div>
    </div>);

};

export default ExperienceInteractive;