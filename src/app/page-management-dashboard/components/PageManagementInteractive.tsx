'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import PageListItem from './PageListItem';
import CreatePageModal from './CreatePageModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface Page {
  id: string;
  title: string;
  route: string;
  status: 'published' | 'draft' | 'scheduled';
  createdAt: string;
  updatedAt: string;
  template: string;
  author: string;
}

export default function PageManagementInteractive() {
  const router = useRouter();
  const { t } = useLanguage();
  const [isHydrated, setIsHydrated] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'scheduled'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  useEffect(() => {
    setIsHydrated(true);
    // Load existing pages - Updated to reflect actual Mecatronics website pages
    const existingPages: Page[] = [
      {
        id: '1',
        title: 'Homepage',
        route: '/homepage',
        status: 'published',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-20',
        template: 'Homepage',
        author: 'Admin User',
      },
      {
        id: '2',
        title: 'Services',
        route: '/services',
        status: 'published',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-22',
        template: 'Services',
        author: 'Admin User',
      },
      {
        id: '3',
        title: 'About',
        route: '/about',
        status: 'published',
        createdAt: '2024-01-17',
        updatedAt: '2024-01-23',
        template: 'About',
        author: 'Admin User',
      },
      {
        id: '4',
        title: 'Contact',
        route: '/contact',
        status: 'published',
        createdAt: '2024-01-18',
        updatedAt: '2024-01-24',
        template: 'Contact',
        author: 'Admin User',
      },
      {
        id: '5',
        title: 'Experience',
        route: '/experience',
        status: 'published',
        createdAt: '2024-01-20',
        updatedAt: '2024-01-26',
        template: 'Experience',
        author: 'Content Manager',
      },
      {
        id: '6',
        title: 'Mission & Vision',
        route: '/mission-vision',
        status: 'published',
        createdAt: '2024-01-21',
        updatedAt: '2024-01-27',
        template: 'Mission Vision',
        author: 'Admin User',
      },
      {
        id: '7',
        title: 'Downloads',
        route: '/downloads',
        status: 'published',
        createdAt: '2024-01-22',
        updatedAt: '2024-01-28',
        template: 'Downloads',
        author: 'Content Manager',
      },
    ];
    setPages(existingPages);
  }, []);

  // Filter out administrative pages from display
  const adminRoutes = ['/admin-dashboard', '/admin-login', '/page-management-dashboard', '/web-based-page-editor'];
  const displayPages = pages.filter((page) => !adminRoutes.includes(page.route));

  const filteredPages = displayPages.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         page.route.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || page.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreatePage = (pageData: { title: string; route: string; template: string }) => {
    const newPage: Page = {
      id: Date.now().toString(),
      title: pageData.title,
      route: pageData.route,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      template: pageData.template,
      author: 'Admin User',
    };
    setPages([...pages, newPage]);
    setShowCreateModal(false);
  };

  const handleEditPage = (pageId: string) => {
    const page = pages.find((p) => p.id === pageId);
    if (page) {
      // Store page data in localStorage for the editor to access
      localStorage.setItem('editingPage', JSON.stringify(page));
    }
    router.push(`/web-based-page-editor?pageId=${pageId}`);
  };

  const handleDeletePage = (page: Page) => {
    setSelectedPage(page);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedPage) {
      setPages(pages.filter((p) => p.id !== selectedPage.id));
      setSelectedPage(null);
      setShowDeleteModal(false);
    }
  };

  const handleDuplicatePage = (page: Page) => {
    const duplicatedPage: Page = {
      ...page,
      id: Date.now().toString(),
      title: `${page.title} (Copy)`,
      route: `${page.route}-copy`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setPages([...pages, duplicatedPage]);
  };

  const handleToggleSelect = (pageId: string) => {
    setSelectedPages((prev) =>
      prev.includes(pageId) ? prev.filter((id) => id !== pageId) : [...prev, pageId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPages.length === filteredPages.length) {
      setSelectedPages([]);
    } else {
      setSelectedPages(filteredPages.map((p) => p.id));
    }
  };

  const handleBulkDelete = () => {
    setPages(pages.filter((p) => !selectedPages.includes(p.id)));
    setSelectedPages([]);
  };

  const handleBulkPublish = () => {
    setPages(pages.map((p) => 
      selectedPages.includes(p.id) ? { ...p, status: 'published' as const } : p
    ));
    setSelectedPages([]);
  };

  const handleTogglePublish = (page: Page) => {
    setPages(pages.map((p) => 
      p.id === page.id 
        ? { ...p, status: p.status === 'published' ? 'draft' : 'published', updatedAt: new Date().toISOString().split('T')[0] } 
        : p
    ));
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Páginas</h1>
              <p className="mt-2 text-gray-600">Crear, editar y administrar todas las páginas del sitio web</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Icon name="PlusIcon" className="w-5 h-5" />
              <span>Crear Nueva Página</span>
            </button>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button onClick={() => router.push('/admin-dashboard')} className="hover:text-primary">
              Dashboard
            </button>
            <Icon name="ChevronRightIcon" className="w-4 h-4" />
            <span className="text-gray-900">Gestión de Páginas</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Páginas</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{pages.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="DocumentTextIcon" className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Publicadas</p>
                <p className="text-2xl font-bold text-success mt-1">
                  {pages.filter((p) => p.status === 'published').length}
                </p>
              </div>
              <div className="p-3 bg-success/10 rounded-lg">
                <Icon name="CheckCircleIcon" className="w-6 h-6 text-success" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Borradores</p>
                <p className="text-2xl font-bold text-warning mt-1">
                  {pages.filter((p) => p.status === 'draft').length}
                </p>
              </div>
              <div className="p-3 bg-warning/10 rounded-lg">
                <Icon name="PencilIcon" className="w-6 h-6 text-warning" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Programadas</p>
                <p className="text-2xl font-bold text-accent mt-1">
                  {pages.filter((p) => p.status === 'scheduled').length}
                </p>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <Icon name="ClockIcon" className="w-6 h-6 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Icon name="MagnifyingGlassIcon" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar páginas por título o ruta..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'all' ?'bg-primary text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilterStatus('published')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'published' ?'bg-success text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Publicadas
              </button>
              <button
                onClick={() => setFilterStatus('draft')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'draft' ?'bg-warning text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Borradores
              </button>
              <button
                onClick={() => setFilterStatus('scheduled')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterStatus === 'scheduled' ?'bg-accent text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Programadas
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedPages.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedPages.length} página(s) seleccionada(s)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkPublish}
                  className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors"
                >
                  Publicar Seleccionadas
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
                >
                  Eliminar Seleccionadas
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pages List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPages.length === filteredPages.length && filteredPages.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </th>
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
                    Plantilla
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actualizado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPages.map((page) => (
                  <PageListItem
                    key={page.id}
                    page={page}
                    isSelected={selectedPages.includes(page.id)}
                    onToggleSelect={handleToggleSelect}
                    onEdit={handleEditPage}
                    onDelete={handleDeletePage}
                    onDuplicate={handleDuplicatePage}
                    onTogglePublish={handleTogglePublish}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {filteredPages.length === 0 && (
            <div className="text-center py-12">
              <Icon name="DocumentTextIcon" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No se encontraron páginas</p>
              <p className="text-sm text-gray-500 mt-1">Intenta ajustar los filtros de búsqueda</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreatePageModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreatePage}
        />
      )}

      {showDeleteModal && selectedPage && (
        <DeleteConfirmModal
          page={selectedPage}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}