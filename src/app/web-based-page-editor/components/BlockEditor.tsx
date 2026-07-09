'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import type { PageBlock, BlockType, BlockContent, HeadingContent, ParagraphContent, BlockStyles, VideoContent, PDFContent, ImageContent } from '@/types/page-blocks';
import MediaSelector from '@/app/web-based-page-editor/components/MediaSelector';


interface BlockEditorProps {
  blocks: PageBlock[];
  onBlocksChange: (blocks: PageBlock[]) => void;
}

export default function BlockEditor({ blocks, onBlocksChange }: BlockEditorProps) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const blockTypes: { type: BlockType; label: string; icon: string }[] = [
    { type: 'heading', label: 'Encabezado', icon: 'Bars3Icon' },
    { type: 'paragraph', label: 'Párrafo', icon: 'DocumentTextIcon' },
    { type: 'image', label: 'Imagen', icon: 'PhotoIcon' },
    { type: 'pdf', label: 'Imprimir PDF', icon: 'DocumentTextIcon' },
    { type: 'video', label: 'Video', icon: 'VideoCameraIcon' },
    { type: 'html', label: 'Código HTML', icon: 'CodeBracketIcon' },
    { type: 'columns', label: 'Columnas', icon: 'Squares2X2Icon' },
    //{ type: 'cta', label: 'CTA', icon: 'CursorArrowRaysIcon' },
  ];

  const getDefaultContent = (type: BlockType): BlockContent => {
    switch (type) {
      case 'heading':
        return { 
          text: 'Nuevo encabezado', 
          level: 2,
          styles: {
            textColor: '#111827',
            backgroundColor: 'transparent',
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'left'
          }
        };
      case 'paragraph':
        return { 
          text: 'Nuevo párrafo de texto.',
          styles: {
            textColor: '#374151',
            backgroundColor: 'transparent',
            fontSize: '1rem',
            fontWeight: 'normal',
            textAlign: 'left'
          }
        };
      case 'image':
        return { url: 'https://via.placeholder.com/1200x600', alt: 'Imagen de ejemplo' };
      case 'video':
        return { url: '', title: 'Nuevo video', source: 'url' };
      case 'pdf':
        return { url: '', title: 'Descargar PDF', storageId: '' };
      case 'html':
        return { html: '<div class="p-4 bg-gray-100 rounded"><p>Código HTML personalizado</p></div>' };
      case 'columns':
        return { left: '<p>Contenido columna izquierda</p>', right: '<p>Contenido columna derecha</p>' };
    }
  };

  const addBlock = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: `temp-${Date.now()}`,
      page_id: '',
      type,
      content: getDefaultContent(type),
      order_index: blocks.length,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    onBlocksChange([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    setShowAddMenu(false);
  };

  const deleteBlock = (blockId: string) => {
    onBlocksChange(blocks.filter((b) => b.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex((b) => b.id === blockId);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    
    // Update order_index
    newBlocks.forEach((block, idx) => {
      block.order_index = idx;
    });
    
    onBlocksChange(newBlocks);
  };

  const updateBlockContent = (blockId: string, content: BlockContent) => {
    onBlocksChange(
      blocks.map((b) => (b.id === blockId ? { ...b, content, updated_at: new Date().toISOString() } : b))
    );
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  // Get inline styles for preview
  const getBlockPreviewStyle = (block: PageBlock): React.CSSProperties => {
    if (block.type === 'heading' || block.type === 'paragraph') {
      const content = block.content as HeadingContent | ParagraphContent;
      if (content.styles) {
        return {
          color: content.styles.textColor,
          backgroundColor: content.styles.backgroundColor,
          fontSize: content.styles.fontSize,
          fontWeight: content.styles.fontWeight,
          textAlign: content.styles.textAlign,
        };
      }
    }
    return {};
  };

  return (
    <div className="flex gap-4 h-full">
      {/* Canvas */}
      <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 min-h-[600px]">
          {blocks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Icon name="PlusCircleIcon" className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>No hay bloques. Haz clic en &quot;Agregar bloque&quot; para comenzar.</p>
            </div>
          ) : (
            blocks.map((block, index) => (
              <div
                key={block.id}
                className={`mb-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedBlockId === block.id ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedBlockId(block.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 uppercase">{block.type}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(block.id, 'up');
                      }}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <Icon name="ChevronUpIcon" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveBlock(block.id, 'down');
                      }}
                      disabled={index === blocks.length - 1}
                      className="p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <Icon name="ChevronDownIcon" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBlock(block.id);
                      }}
                      className="p-1 hover:bg-red-100 text-red-600 rounded"
                    >
                      <Icon name="TrashIcon" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-700" style={getBlockPreviewStyle(block)}>
                  {block.type === 'heading' && <div className="font-bold">{(block.content as any).text}</div>}
                  {block.type === 'paragraph' && <div>{(block.content as any).text}</div>}
                  {block.type === 'image' && <div className="text-gray-500">Imagen: {(block.content as any).alt}</div>}
                  {block.type === 'video' && <div className="text-gray-500">Video: {(block.content as VideoContent).title}</div>}
                  {block.type === 'pdf' && <div className="text-gray-500">PDF: {(block.content as PDFContent).title}</div>}
                  {block.type === 'html' && <div className="text-gray-500 font-mono text-xs">Código HTML</div>}
                  {block.type === 'columns' && <div className="text-gray-500">Columnas (2)</div>}
                </div>
              </div>
            ))
          )}

          {/* Add Block Button */}
          <div className="relative">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="PlusIcon" className="w-5 h-5" />
              Agregar bloque
            </button>

            {showAddMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {blockTypes.map((blockType) => (
                  <button
                    key={blockType.type}
                    onClick={() => addBlock(blockType.type)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 border-b last:border-b-0"
                  >
                    <Icon name={blockType.icon as any} className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">{blockType.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
        {selectedBlock ? (
          <BlockContentEditor block={selectedBlock} onUpdate={updateBlockContent} />
        ) : (
          <div className="text-center text-gray-500 py-12">
            <Icon name="CursorArrowRaysIcon" className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>Selecciona un bloque para editarlo</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BlockContentEditor({
  block,
  onUpdate,
}: {
  block: PageBlock;
  onUpdate: (blockId: string, content: BlockContent) => void;
}) {
  const [showMediaSelector, setShowMediaSelector] = useState(false);
  const [mediaSelectorType, setMediaSelectorType] = useState<'image' | 'video' | 'pdf'>('image');

  const handleChange = (field: string, value: any) => {
    onUpdate(block.id, { ...block.content, [field]: value });
  };

  const handleStyleChange = (styleField: keyof BlockStyles, value: any) => {
    const content = block.content as HeadingContent | ParagraphContent;
    const currentStyles = content.styles || {};
    onUpdate(block.id, { 
      ...block.content, 
      styles: { ...currentStyles, [styleField]: value } 
    });
  };

  const hasStyles = block.type === 'heading' || block.type === 'paragraph';
  const content = block.content as HeadingContent | ParagraphContent;
  const styles = content.styles || {};

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Editar {block.type}</h3>

      {block.type === 'heading' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto</label>
            <input
              type="text"
              value={(block.content as any).text}
              onChange={(e) => handleChange('text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          {/*
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel (1-6)</label>
            <select
              value={(block.content as any).level}
              onChange={(e) => handleChange('level', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <option key={level} value={level}>
                  H{level}
                </option>
              ))}
            </select>
          </div>
          */}
        </>
      )}

      {block.type === 'paragraph' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Texto</label>
          <textarea
            value={(block.content as any).text}
            onChange={(e) => handleChange('text', e.target.value)}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      )}

      {/* Styling Controls for Heading and Paragraph */}
      {hasStyles && (
        <>
          <div className="border-t pt-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Estilos</h4>
            
            <div className="space-y-3">
              {/* Text Color */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Color de texto</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.textColor || '#111827'}
                    onChange={(e) => handleStyleChange('textColor', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.textColor || '#111827'}
                    onChange={(e) => handleStyleChange('textColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="#000000"
                  />
                </div>
              </div>

              {/* Background Color */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Color de fondo</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={styles.backgroundColor === 'transparent' ? '#ffffff' : (styles.backgroundColor || '#ffffff')}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={styles.backgroundColor || 'transparent'}
                    onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="transparent"
                  />
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Tamaño de texto</label>
                <select
                  value={styles.fontSize || '1rem'}
                  onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="0.75rem">Muy pequeño (0.75rem)</option>
                  <option value="0.875rem">Pequeño (0.875rem)</option>
                  <option value="1rem">Normal (1rem)</option>
                  <option value="1.125rem">Mediano (1.125rem)</option>
                  <option value="1.25rem">Grande (1.25rem)</option>
                  <option value="1.5rem">Muy grande (1.5rem)</option>
                  <option value="2rem">Extra grande (2rem)</option>
                  <option value="2.5rem">Enorme (2.5rem)</option>
                  <option value="3rem">Gigante (3rem)</option>
                </select>
              </div>

              {/* Font Weight 
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Peso de fuente</label>
                <select
                  value={styles.fontWeight || 'normal'}
                  onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="normal">Normal</option>
                  <option value="500">Medio</option>
                  <option value="600">Semibold</option>
                  <option value="bold">Bold</option>
                  <option value="800">Extra Bold</option>
                </select>
              </div> */}

              {/* Text Align */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Alineación</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStyleChange('textAlign', 'left')}
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                      (styles.textAlign || 'left') === 'left' 
                        ? 'bg-primary text-white border-primary' :'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Izquierda
                  </button>
                  <button
                    onClick={() => handleStyleChange('textAlign', 'center')}
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                      styles.textAlign === 'center' ?'bg-primary text-white border-primary' :'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Centro
                  </button>
                  <button
                    onClick={() => handleStyleChange('textAlign', 'right')}
                    className={`flex-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                      styles.textAlign === 'right' ?'bg-primary text-white border-primary' :'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Derecha
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {block.type === 'image' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuente de imagen</label>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => handleChange('source', 'url')}
                className={`flex-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                  ((block.content as ImageContent).source || 'url') === 'url'
                    ? 'bg-primary text-white border-primary' :'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                URL
              </button>
              <button
                onClick={() => {
                  handleChange('source', 'storage');
                  setMediaSelectorType('image');
                  setShowMediaSelector(true);
                }}
                className={`flex-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                  (block.content as ImageContent).source === 'storage' ?'bg-primary text-white border-primary' :'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Almacenamiento
              </button>
            </div>
          </div>
          
          {((block.content as ImageContent).source || 'url') === 'url' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL de imagen</label>
              <input
                type="text"
                value={(block.content as ImageContent).url}
                onChange={(e) => handleChange('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagen seleccionada</label>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                {(block.content as ImageContent).url && (block.content as ImageContent).source === 'storage' ? (
                  <div>
                    <p className="font-medium">{(block.content as ImageContent).alt}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{(block.content as ImageContent).url}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">No se ha seleccionado ninguna imagen</p>
                )}
              </div>
              <button
                onClick={() => {
                  setMediaSelectorType('image');
                  setShowMediaSelector(true);
                }}
                className="mt-2 w-full px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Seleccionar imagen
              </button>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Texto alternativo</label>
            <input
              type="text"
              value={(block.content as ImageContent).alt}
              onChange={(e) => handleChange('alt', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ancho (px)</label>
              <input
                type="number"
                value={(block.content as ImageContent).width || ''}
                onChange={(e) => handleChange('width', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Auto"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alto (px)</label>
              <input
                type="number"
                value={(block.content as ImageContent).height || ''}
                onChange={(e) => handleChange('height', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Auto"
                min="1"
              />
            </div>
          </div>
        </>
      )}

      {block.type === 'html' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Código HTML</label>
          <textarea
            value={(block.content as any).html}
            onChange={(e) => handleChange('html', e.target.value)}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
            placeholder="<div>Tu código HTML aquí</div>"
          />
          <p className="mt-2 text-xs text-gray-500">
            Puedes agregar cualquier código HTML válido. Se renderizará directamente en la página.
          </p>
        </div>
      )}

      {block.type === 'columns' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Columna izquierda (HTML)</label>
            <textarea
              value={(block.content as any).left}
              onChange={(e) => handleChange('left', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Columna derecha (HTML)</label>
            <textarea
              value={(block.content as any).right}
              onChange={(e) => handleChange('right', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
            />
          </div>
        </>
      )}

      {block.type === 'video' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuente de video</label>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => handleChange('source', 'url')}
                className={`flex-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                  ((block.content as VideoContent).source || 'url') === 'url'
                    ? 'bg-primary text-white border-primary' :'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                URL
              </button>
              <button
                onClick={() => {
                  handleChange('source', 'storage');
                  setMediaSelectorType('video');
                  setShowMediaSelector(true);
                }}
                className={`flex-1 px-3 py-2 border rounded-lg text-sm transition-colors ${
                  (block.content as VideoContent).source === 'storage' ?'bg-primary text-white border-primary' :'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Almacenamiento
              </button>
            </div>
          </div>
          
          {((block.content as VideoContent).source || 'url') === 'url' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL de video</label>
              <input
                type="text"
                value={(block.content as VideoContent).url}
                onChange={(e) => handleChange('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://www.youtube.com/embed/..."
              />
              <p className="mt-1 text-xs text-gray-500">
                Para YouTube, usa el formato: https://www.youtube.com/embed/VIDEO_ID
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video seleccionado</label>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                {(block.content as VideoContent).url && (block.content as VideoContent).source === 'storage' ? (
                  <div>
                    <p className="font-medium">{(block.content as VideoContent).title}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{(block.content as VideoContent).url}</p>
                  </div>
                ) : (
                  <p className="text-gray-500">No se ha seleccionado ningún video</p>
                )}
              </div>
              <button
                onClick={() => {
                  setMediaSelectorType('video');
                  setShowMediaSelector(true);
                }}
                className="mt-2 w-full px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Seleccionar video
              </button>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título del video</label>
            <input
              type="text"
              value={(block.content as VideoContent).title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ancho (px)</label>
              <input
                type="number"
                value={(block.content as VideoContent).width || ''}
                onChange={(e) => handleChange('width', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Auto"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alto (px)</label>
              <input
                type="number"
                value={(block.content as VideoContent).height || ''}
                onChange={(e) => handleChange('height', e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Auto"
                min="1"
              />
            </div>
          </div>
        </>
      )}

      {block.type === 'pdf' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">PDF seleccionado</label>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
              {(block.content as PDFContent).url ? (
                <div>
                  <p className="font-medium">{(block.content as PDFContent).title}</p>
                  <p className="text-xs text-gray-500 mt-1 truncate">{(block.content as PDFContent).url}</p>
                </div>
              ) : (
                <p className="text-gray-500">No se ha seleccionado ningún PDF</p>
              )}
            </div>
            <button
              onClick={() => {
                setMediaSelectorType('pdf');
                setShowMediaSelector(true);
              }}
              className="mt-2 w-full px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Seleccionar PDF
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título del botón de descarga</label>
            <input
              type="text"
              value={(block.content as PDFContent).title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Descargar documento"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color del botón</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={(block.content as PDFContent).buttonColor || '#3b82f6'}
                onChange={(e) => handleChange('buttonColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={(block.content as PDFContent).buttonColor || '#3b82f6'}
                onChange={(e) => handleChange('buttonColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="#3b82f6"
              />
            </div>
          </div>
        </>
      )}

      {showMediaSelector && (
        <MediaSelector
          fileType={mediaSelectorType}
          onSelect={(file) => {
            // Update all fields at once to avoid race conditions
            const updatedContent = {
              ...block.content,
              url: file.public_url,
              storageId: file.id,
              source: 'storage'
            };
            
            // Add type-specific fields
            if (block.type === 'image') {
              updatedContent.alt = file.file_name;
            } else if (block.type === 'video' || block.type === 'pdf') {
              updatedContent.title = file.file_name;
            }
            
            onUpdate(block.id, updatedContent);
            setShowMediaSelector(false);
          }}
          onClose={() => setShowMediaSelector(false)}
        />
      )}
    </div>
  );
}