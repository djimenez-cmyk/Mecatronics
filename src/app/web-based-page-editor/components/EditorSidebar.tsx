'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PageData {
  id: string;
  title: string;
  route: string;
  status: 'published' | 'draft' | 'scheduled';
  template: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  customCSS: string;
  lastSaved: string;
}

interface EditorSidebarProps {
  pageData: PageData;
  activeTab: 'content' | 'seo' | 'settings';
  onTabChange: (tab: 'content' | 'seo' | 'settings') => void;
  onSEOChange: (field: string, value: string) => void;
  onCSSChange: (css: string) => void;
}

export default function EditorSidebar({
  pageData,
  activeTab,
  onTabChange,
  onSEOChange,
  onCSSChange,
}: EditorSidebarProps) {
  const [showCSSEditor, setShowCSSEditor] = useState(false);

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => onTabChange('content')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'content' ?'text-primary border-b-2 border-primary' :'text-gray-600 hover:text-gray-900'
          }`}
        >
          Contenido
        </button>
        <button
          onClick={() => onTabChange('seo')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'seo' ?'text-primary border-b-2 border-primary' :'text-gray-600 hover:text-gray-900'
          }`}
        >
          SEO
        </button>
        <button
          onClick={() => onTabChange('settings')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'settings' ?'text-primary border-b-2 border-primary' :'text-gray-600 hover:text-gray-900'
          }`}
        >
          Ajustes
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Información de Página</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Título</label>
                  <p className="text-sm text-gray-900">{pageData.title}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Ruta</label>
                  <code className="text-xs text-gray-900 bg-gray-100 px-2 py-1 rounded">{pageData.route}</code>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Plantilla</label>
                  <p className="text-sm text-gray-900">{pageData.template}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Estado</label>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    pageData.status === 'published' ? 'bg-success/10 text-success' :
                    pageData.status === 'draft'? 'bg-warning/10 text-warning' : 'bg-accent/10 text-accent'
                  }`}>
                    {pageData.status === 'published' ? 'Publicada' :
                     pageData.status === 'draft' ? 'Borrador' : 'Programada'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Componentes</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Icon name="DocumentTextIcon" className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Bloque de Texto</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Icon name="PhotoIcon" className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Imagen</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Icon name="RectangleGroupIcon" className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">Sección</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-4">
            <div>
              <label htmlFor="seoTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Título SEO
              </label>
              <input
                type="text"
                id="seoTitle"
                value={pageData.seoTitle}
                onChange={(e) => onSEOChange('seoTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="Título para motores de búsqueda"
              />
              <p className="mt-1 text-xs text-gray-500">{pageData.seoTitle.length}/60 caracteres</p>
            </div>

            <div>
              <label htmlFor="seoDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción SEO
              </label>
              <textarea
                id="seoDescription"
                value={pageData.seoDescription}
                onChange={(e) => onSEOChange('seoDescription', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="Descripción para motores de búsqueda"
              />
              <p className="mt-1 text-xs text-gray-500">{pageData.seoDescription.length}/160 caracteres</p>
            </div>

            <div>
              <label htmlFor="seoKeywords" className="block text-sm font-medium text-gray-700 mb-2">
                Palabras Clave
              </label>
              <input
                type="text"
                id="seoKeywords"
                value={pageData.seoKeywords}
                onChange={(e) => onSEOChange('seoKeywords', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                placeholder="palabra1, palabra2, palabra3"
              />
              <p className="mt-1 text-xs text-gray-500">Separadas por comas</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Vista Previa en Google</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-lg text-blue-600 mb-1">{pageData.seoTitle || pageData.title}</p>
                <p className="text-xs text-green-700 mb-2">mecatronicspro.com{pageData.route}</p>
                <p className="text-sm text-gray-600">{pageData.seoDescription}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900">CSS Personalizado</h3>
                <button
                  onClick={() => setShowCSSEditor(!showCSSEditor)}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  {showCSSEditor ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              {showCSSEditor && (
                <textarea
                  value={pageData.customCSS}
                  onChange={(e) => onCSSChange(e.target.value)}
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-xs font-mono"
                  placeholder="/* Agrega CSS personalizado aquí */"
                />
              )}
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Publicación</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Estado</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
                    <option value="draft">Borrador</option>
                    <option value="published">Publicada</option>
                    <option value="scheduled">Programada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Fecha de Publicación</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Historial de Revisiones</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-gray-900">Versión Actual</p>
                  <p className="text-xs text-gray-600 mt-1">{new Date(pageData.lastSaved).toLocaleString('es-ES')}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}