'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';
import type { DynamicPage } from '@/types/page-blocks';

export default function PageManagementNew() {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [pages, setPages] = useState<DynamicPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const supabase = createClient();

  useEffect(() => {
    setIsHydrated(true);
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Filter only dynamic pages (exclude hardcoded pages)
      const hardcodedRoutes = ['/homepage', '/services', '/about', '/contact', '/experience', '/mission-vision', '/downloads', '/admin-login', '/admin-dashboard', '/page-management-dashboard', '/web-based-page-editor'];
      const dynamicPages = (data || []).filter((page: any) => !hardcodedRoutes.includes(page.route));
      
      setPages(dynamicPages as DynamicPage[]);
    } catch (error) {
      console.error('Error loading pages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePage = async () => {
    if (!newPageTitle.trim() || !newPageSlug.trim()) {
      setErrorMessage('Por favor completa todos los campos');
      return;
    }

    // Validate slug format
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(newPageSlug)) {
      setErrorMessage('El slug solo puede contener letras minúsculas, números y guiones');
      return;
    }

    setIsCreating(true);
    setErrorMessage('');

    try {
      const route = `/${newPageSlug}`;
      
      // Check if route already exists
      const { data: existing } = await supabase
        .from('pages')
        .select('id')
        .eq('route', route)
        .single();

      if (existing) {
        setErrorMessage('Ya existe una página con este slug');
        setIsCreating(false);
        return;
      }

      // Create new page
      const { data, error } = await supabase
        .from('pages')
        .insert({
          title: newPageTitle,
          route,
          status: 'draft',
          template: 'Dynamic',
          author: 'Admin',
        })
        .select()
        .single();

      if (error) throw error;

      // Navigate to editor
      router.push(`/web-based-page-editor?pageId=${data.id}`);
    } catch (error) {
      console.error('Error creating page:', error);
      setErrorMessage('Error al crear la página');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta página? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      // Blocks will be deleted automatically due to CASCADE
      const { error } = await supabase
        .from('pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;

      await loadPages();
    } catch (error) {
      console.error('Error deleting page:', error);
      alert('Error al eliminar la página');
    }
  };

  const handleToggleStatus = async (pageId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';

    try {
      const { error } = await supabase
        .from('pages')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', pageId);

      if (error) throw error;

      await loadPages();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error al cambiar el estado');
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin-dashboard')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Volver al Dashboard"
            >
              <Icon name="ArrowLeftIcon" className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Páginas Dinámicas</h1>
              <p className="text-gray-600">Gestiona las páginas creadas con el editor de bloques</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Icon name="PlusIcon" className="w-5 h-5" />
            Crear Nueva Página
          </button>
        </div>

        {/* Pages List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-gray-500">Cargando páginas...</div>
          </div>
        ) : pages.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Icon name="DocumentTextIcon" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay páginas dinámicas</h3>
            <p className="text-gray-600 mb-6">Crea tu primera página dinámica con el editor de bloques</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Crear Primera Página
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ruta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última actualización
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{page.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{page.route}</code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(page.id, page.status)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          page.status === 'published' ?'bg-green-100 text-green-800' :'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {page.status === 'published' ? 'Publicado' : 'Borrador'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(page.updated_at).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => router.push(`/web-based-page-editor?pageId=${page.id}`)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Icon name="PencilIcon" className="w-4 h-4" />
                        </button>
                        {page.status === 'published' && (
                          <button
                            onClick={() => window.open(page.route, '_blank')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Ver página"
                          >
                            <Icon name="EyeIcon" className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeletePage(page.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar"
                        >
                          <Icon name="TrashIcon" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Crear Nueva Página</h2>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewPageTitle('');
                  setNewPageSlug('');
                  setErrorMessage('');
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icon name="XMarkIcon" className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Título de la página</label>
                <input
                  type="text"
                  value={newPageTitle}
                  onChange={(e) => setNewPageTitle(e.target.value)}
                  placeholder="Ej: Acerca de Nosotros"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug (URL)</label>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm mr-1">/</span>
                  <input
                    type="text"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="acerca-de-nosotros"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Solo letras minúsculas, números y guiones</p>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewPageTitle('');
                    setNewPageSlug('');
                    setErrorMessage('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCreatePage}
                  disabled={isCreating}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isCreating ? 'Creando...' : 'Crear Página'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}