'use client';

import { useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

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

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: ProjectCategory | null;
}

const GalleryModal = ({ isOpen, onClose, category }: GalleryModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-card rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">
              {category.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {category.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            aria-label="Cerrar modal">
            <Icon name="XMarkIcon" size={24} className="text-muted-foreground" />
          </button>
        </div>

        {/* Gallery Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.photos.map((photo, index) => (
              <div
                key={index}
                className="group relative rounded-lg overflow-hidden bg-muted shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video relative">
                  <AppImage
                    src={photo.image}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-card">
                  <p className="text-foreground font-medium">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium">
            Cerrar Galería
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;