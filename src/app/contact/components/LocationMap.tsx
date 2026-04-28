'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const LocationMap: React.FC = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="w-full h-[400px] lg:h-[500px] bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center">
          <Icon name="MapPinIcon" size={48} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="location-map" className="space-y-6">
      <div>
        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-4">
          Nuestra Ubicación
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Visítenos en nuestras oficinas en San Nicolás de los Garza, Nuevo León. Contamos con instalaciones modernas equipadas con laboratorio de pruebas y sala de demostraciones para mostrarle nuestras soluciones en acción.
        </p>
      </div>

      <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-brand border border-border">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Ubicación de C&S Mecatronics Technologies en San Nicolás de los Garza"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=25.748777,-100.286144&z=15&output=embed"
          className="absolute inset-0"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="TruckIcon" size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-text-primary">
              Acceso en Vehículo
            </h3>
          </div>
          <p className="text-sm text-text-secondary">
            Estacionamiento disponible. Fácil acceso desde Av. Gonzalitos y principales vías del área metropolitana de Monterrey.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="BuildingOfficeIcon" size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-text-primary">
              Transporte Público
            </h3>
          </div>
          <p className="text-sm text-text-secondary">
            Rutas de transporte público cercanas. Ubicación céntrica en San Nicolás de los Garza con fácil acceso.
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="CalendarIcon" size={20} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-text-primary">
              Visitas Programadas
            </h3>
          </div>
          <p className="text-sm text-text-secondary">
            Recomendamos agendar su visita con anticipación para garantizar atención personalizada.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;