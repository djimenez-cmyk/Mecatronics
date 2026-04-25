'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import EditorToolbar from './EditorToolbar';
import EditorCanvas from './EditorCanvas';
import EditorSidebar from './EditorSidebar';
import PreviewModal from './PreviewModal';

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

export default function PageEditorInteractive() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get('pageId');

  const [isHydrated, setIsHydrated] = useState(false);
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    // Load page data from localStorage
    if (pageId) {
      const storedPageData = localStorage.getItem('editingPage');
      if (storedPageData) {
        const page = JSON.parse(storedPageData);
        
        // Map the page data to editor format
        const editorPageData: PageData = {
          id: page.id,
          title: page.title,
          route: page.route,
          status: page.status,
          template: page.template,
          content: getDefaultContent(page.template, page.title),
          seoTitle: `${page.title} - Mecatronics Pro`,
          seoDescription: `Página de ${page.title} - Soluciones de automatización industrial`,
          seoKeywords: 'mecatronics, automatización, industrial',
          customCSS: '',
          lastSaved: page.updatedAt,
        };
        setPageData(editorPageData);
      }
    }
  }, [pageId]);

  // Helper function to get default content based on template
  const getDefaultContent = (template: string, title: string): string => {
    const contentMap: Record<string, string> = {
      'Homepage': '<h1>Bienvenido a Mecatronics Pro</h1><p>Soluciones de automatización industrial de vanguardia.</p>',
      'Services': '<h1>Nuestros Servicios</h1><p>Ofrecemos soluciones completas de automatización industrial.</p>',
      'About': '<h1>Sobre Nosotros</h1><p>Conoce más sobre Mecatronics Pro y nuestro equipo.</p>',
      'Contact': '<h1>Contáctanos</h1><p>Estamos aquí para ayudarte con tus proyectos de automatización.</p>',
      'Experience': '<h1>Nuestra Experiencia</h1><p>Proyectos exitosos en automatización industrial.</p>',
      'Mission Vision': '<h1>Misión y Visión</h1><p>Nuestros valores y objetivos como empresa.</p>',
      'Downloads': '<h1>Descargas</h1><p>Recursos y documentos disponibles para descarga.</p>',
    };
    return contentMap[template] || `<h1>${title}</h1><p>Contenido de la página ${title}.</p>`;
  };

  // Auto-save functionality
  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const autoSaveTimer = setTimeout(() => {
      handleSave(true);
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [hasUnsavedChanges, pageData]);

  const handleSave = async (isAutoSave = false) => {
    setIsSaving(true);
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (pageData) {
      setPageData({
        ...pageData,
        lastSaved: new Date().toISOString(),
      });
    }
    setHasUnsavedChanges(false);
    setIsSaving(false);
  };

  const handlePublish = async () => {
    if (!pageData) return;
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPageData({
      ...pageData,
      status: 'published',
      lastSaved: new Date().toISOString(),
    });
    setHasUnsavedChanges(false);
    setIsSaving(false);
  };

  const handleContentChange = (content: string) => {
    if (pageData) {
      setPageData({ ...pageData, content });
      setHasUnsavedChanges(true);
    }
  };

  const handleSEOChange = (field: string, value: string) => {
    if (pageData) {
      setPageData({ ...pageData, [field]: value });
      setHasUnsavedChanges(true);
    }
  };

  const handleCSSChange = (css: string) => {
    if (pageData) {
      setPageData({ ...pageData, customCSS: css });
      setHasUnsavedChanges(true);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Icon name="ExclamationTriangleIcon" className="w-16 h-16 text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h2>
          <p className="text-gray-600 mb-6">No se pudo cargar la página solicitada</p>
          <button
            onClick={() => router.push('/page-management-dashboard')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Volver a Gestión de Páginas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/page-management-dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Volver"
            >
              <Icon name="ArrowLeftIcon" className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{pageData.title}</h1>
              <p className="text-xs text-gray-500">
                {hasUnsavedChanges ? 'Cambios sin guardar' : `Último guardado: ${new Date(pageData.lastSaved).toLocaleTimeString('es-ES')}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Selector */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Vista Escritorio"
              >
                <Icon name="ComputerDesktopIcon" className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Vista Tablet"
              >
                <Icon name="DeviceTabletIcon" className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Vista Móvil"
              >
                <Icon name="DevicePhoneMobileIcon" className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Icon name="EyeIcon" className="w-4 h-4" />
              <span>Vista Previa</span>
            </button>

            <button
              onClick={() => handleSave(false)}
              disabled={isSaving || !hasUnsavedChanges}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="ArrowDownTrayIcon" className="w-4 h-4" />
              <span>{isSaving ? 'Guardando...' : 'Guardar'}</span>
            </button>

            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="CheckCircleIcon" className="w-4 h-4" />
              <span>{isSaving ? 'Publicando...' : 'Publicar'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <EditorToolbar />

          {/* Canvas */}
          <div className="flex-1 overflow-auto bg-gray-100 p-6">
            <EditorCanvas
              content={pageData.content}
              viewMode={viewMode}
              customCSS={pageData.customCSS}
              onChange={handleContentChange}
            />
          </div>
        </div>

        {/* Sidebar */}
        <EditorSidebar
          pageData={pageData}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSEOChange={handleSEOChange}
          onCSSChange={handleCSSChange}
        />
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          pageData={pageData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}