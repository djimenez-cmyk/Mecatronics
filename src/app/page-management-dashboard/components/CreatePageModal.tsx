'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CreatePageModalProps {
  onClose: () => void;
  onCreate: (pageData: { title: string; route: string; template: string }) => void;
}

export default function CreatePageModal({ onClose, onCreate }: CreatePageModalProps) {
  const [title, setTitle] = useState('');
  const [route, setRoute] = useState('');
  const [template, setTemplate] = useState('basic');
  const [errors, setErrors] = useState<{ title?: string; route?: string }>({});

  const templates = [
    { id: 'homepage', name: 'Homepage', description: 'Página principal con hero, servicios y testimonios' },
    { id: 'services', name: 'Services', description: 'Catálogo de servicios con filtros y comparación' },
    { id: 'about', name: 'About', description: 'Información de la empresa, equipo y valores' },
    { id: 'contact', name: 'Contact', description: 'Formulario de contacto y ubicación' },
    { id: 'experience', name: 'Experience', description: 'Casos de estudio y proyectos realizados' },
    { id: 'mission-vision', name: 'Mission Vision', description: 'Misión, visión y valores corporativos' },
    { id: 'downloads', name: 'Downloads', description: 'Centro de descargas de documentos PDF' },
  ];

  const handleTitleChange = (value: string) => {
    setTitle(value);
    // Auto-generate route from title
    const generatedRoute = '/' + value.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setRoute(generatedRoute);
  };

  const validateForm = () => {
    const newErrors: { title?: string; route?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!route.trim()) {
      newErrors.route = 'La ruta es obligatoria';
    } else if (!route.startsWith('/')) {
      newErrors.route = 'La ruta debe comenzar con /';
    } else if (!/^[a-z0-9\/\-]+$/.test(route)) {
      newErrors.route = 'La ruta solo puede contener letras minúsculas, números, guiones y barras';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const selectedTemplate = templates.find((t) => t.id === template);
      onCreate({
        title,
        route,
        template: selectedTemplate?.name || 'Plantilla Básica',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Crear Nueva Página</h2>
            <p className="text-sm text-gray-600 mt-1">Configura los detalles de tu nueva página</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon name="XMarkIcon" className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título de la Página *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.title ? 'border-error' : 'border-gray-300'
              }`}
              placeholder="Ej: Acerca de Nosotros"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-error">{errors.title}</p>
            )}
          </div>

          {/* Route */}
          <div>
            <label htmlFor="route" className="block text-sm font-medium text-gray-700 mb-2">
              Ruta URL *
            </label>
            <input
              type="text"
              id="route"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.route ? 'border-error' : 'border-gray-300'
              }`}
              placeholder="/acerca-de-nosotros"
            />
            {errors.route && (
              <p className="mt-1 text-sm text-error">{errors.route}</p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              La ruta se genera automáticamente desde el título, pero puedes personalizarla
            </p>
          </div>

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Seleccionar Plantilla *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => setTemplate(tmpl.id)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    template === tmpl.id
                      ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${
                      template === tmpl.id ? 'text-primary' : 'text-gray-400'
                    }`}>
                      <Icon name="DocumentTextIcon" className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        template === tmpl.id ? 'text-primary' : 'text-gray-900'
                      }`}>
                        {tmpl.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{tmpl.description}</p>
                    </div>
                    {template === tmpl.id && (
                      <Icon name="CheckCircleIcon" className="w-5 h-5 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Crear Página
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}