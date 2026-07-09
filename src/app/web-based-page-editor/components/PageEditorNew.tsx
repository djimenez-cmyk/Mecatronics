'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import BlockEditor from './BlockEditor';
import type { DynamicPage, PageBlock } from '@/types/page-blocks';
import BlockRenderer from '@/components/blocks/BlockRenderer';

export default function PageEditorNew() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageId = searchParams.get('pageId');
  const { session, loading: authLoading } = useAuth();

  const [isHydrated, setIsHydrated] = useState(false);
  const [page, setPage] = useState<DynamicPage | null>(null);
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    setIsHydrated(true);
    if (!authLoading) {
      loadPageData();
    }
  }, [pageId, authLoading]);

  const loadPageData = async () => {
    if (!pageId) {
      setIsLoading(false);
      return;
    }

    if (!session) {
      setSaveMessage('⚠ Debes iniciar sesión para editar páginas');
      setIsLoading(false);
      return;
    }

    try {
      // Load page
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('id', pageId)
        .single();

      if (pageError) {
        console.error('Error loading page:', pageError);
        if ((pageError as any).code === 'PGRST116') {
          // Page not found
          setSaveMessage('✗ Página no encontrada en la base de datos');
        } else {
          // Other database error
          setSaveMessage(`✗ Error al cargar la página: ${(pageError as any).message}`);
        }
        setIsLoading(false);
        return;
      }

      setPage(pageData as DynamicPage);

      // Load blocks
      const { data: blocksData, error: blocksError } = await supabase
        .from('page_blocks')
        .select('*')
        .eq('page_id', pageId)
        .order('order_index', { ascending: true });

      if (blocksError) {
        console.error('Error loading blocks:', blocksError);
        // Page exists but blocks failed to load - still allow editing
        setSaveMessage('⚠ Error al cargar bloques, pero puedes agregar nuevos');
        setBlocks([]);
      } else {
        setBlocks((blocksData || []) as PageBlock[]);
      }
    } catch (error) {
      console.error('Unexpected error loading page:', error);
      setSaveMessage('✗ Error inesperado al cargar la página');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!page) return;

    if (!session) {
      setSaveMessage('✗ Debes iniciar sesión para guardar cambios');
      setTimeout(() => setSaveMessage(''), 5000);
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      // Update page updated_at
      const { error: pageError } = await supabase
        .from('pages')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', page.id);

      if (pageError) throw pageError;

      // Delete existing blocks
      const { error: deleteError } = await supabase
        .from('page_blocks')
        .delete()
        .eq('page_id', page.id);

      if (deleteError) throw deleteError;

      // Insert new blocks
      if (blocks.length > 0) {
        const blocksToInsert = blocks.map((block, index) => ({
          page_id: page.id,
          type: block.type,
          content: block.content,
          order_index: index,
        }));

        const { error: insertError } = await supabase
          .from('page_blocks')
          .insert(blocksToInsert);

        if (insertError) {
          console.error('Error saving:', insertError);
          throw insertError;
        }
      }

      setSaveMessage('✓ Cambios guardados correctamente');
      setTimeout(() => setSaveMessage(''), 3000);
      
      // Reload to get updated IDs
      await loadPageData();
    } catch (error: any) {
      console.error('Error saving:', error);
      setSaveMessage(`✗ Error al guardar: ${error?.message || 'Error desconocido'}`);
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: 'published' | 'draft') => {
    if (!page) return;

    if (!session) {
      setSaveMessage('✗ Debes iniciar sesión para cambiar el estado');
      setTimeout(() => setSaveMessage(''), 5000);
      return;
    }

    try {
      const { error } = await supabase
        .from('pages')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', page.id);

      if (error) throw error;

      setPage({ ...page, status: newStatus });
      setSaveMessage(`✓ Estado cambiado a ${newStatus === 'published' ? 'publicado' : 'borrador'}`);
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error updating status:', error);
      setSaveMessage('✗ Error al cambiar el estado');
      setTimeout(() => setSaveMessage(''), 5000);
    }
  };

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando editor...</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando página...</div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="ExclamationTriangleIcon" className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Página no encontrada</h2>
          <p className="text-gray-600 mb-6">No se pudo cargar la página solicitada.</p>
          <button
            onClick={() => router.push('/page-management-dashboard')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Volver al panel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/page-management-dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Volver"
            >
              <Icon name="ArrowLeftIcon" className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{page.title}</h1>
              <p className="text-sm text-gray-500">{page.route}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveMessage && (
              <span
                className={`text-sm font-medium px-3 py-1 rounded-lg ${
                  saveMessage.startsWith('✓') 
                    ? 'text-green-700 bg-green-50 border border-green-200' :'text-red-700 bg-red-50 border border-red-200'
                }`}
              >
                {saveMessage}
              </span>
            )}

            <select
              value={page.status}
              onChange={(e) => handleStatusChange(e.target.value as 'published' | 'draft')}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>

            <button
              onClick={handlePreviewToggle}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <Icon name="EyeIcon" className="w-4 h-4" />
              {showPreview ? 'Editar' : 'Vista previa'}
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Icon name="ArrowPathIcon" className="w-4 h-4 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Icon name="CheckIcon" className="w-4 h-4" />
                  Guardar cambios
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Editor or Preview */}
      <div className="flex-1 overflow-hidden">
        {showPreview ? (
          <div className="h-full overflow-y-auto bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm text-gray-500 mb-2">Vista previa de la página</p>
                <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
              </div>
              {blocks.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No hay bloques para mostrar</p>
                </div>
              ) : (
                blocks.map((block) => (
                  <BlockRenderer key={block.id} block={block} isPreview={true} />
                ))
              )}
            </div>
          </div>
        ) : (
          <BlockEditor blocks={blocks} onBlocksChange={setBlocks} />
        )}
      </div>
    </div>
  );
}