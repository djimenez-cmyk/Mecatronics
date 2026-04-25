'use client';

import Icon from '@/components/ui/AppIcon';

export default function EditorToolbar() {
  const toolGroups = [
    {
      name: 'Formato',
      tools: [
        { icon: 'BoldIcon', label: 'Negrita', action: 'bold' },
        { icon: 'ItalicIcon', label: 'Itálica', action: 'italic' },
        { icon: 'UnderlineIcon', label: 'Subrayado', action: 'underline' },
      ],
    },
    {
      name: 'Alineación',
      tools: [
        { icon: 'AlignLeftIcon', label: 'Izquierda', action: 'alignLeft' },
        { icon: 'AlignCenterIcon', label: 'Centro', action: 'alignCenter' },
        { icon: 'AlignRightIcon', label: 'Derecha', action: 'alignRight' },
      ],
    },
    {
      name: 'Insertar',
      tools: [
        { icon: 'PhotoIcon', label: 'Imagen', action: 'insertImage' },
        { icon: 'LinkIcon', label: 'Enlace', action: 'insertLink' },
        { icon: 'TableCellsIcon', label: 'Tabla', action: 'insertTable' },
      ],
    },
  ];

  const handleToolClick = (action: string) => {
    // Tool action handlers would be implemented here
    console.log('Tool action:', action);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center gap-6">
        {toolGroups.map((group, idx) => (
          <div key={idx} className="flex items-center gap-1">
            {group.tools.map((tool) => (
              <button
                key={tool.action}
                onClick={() => handleToolClick(tool.action)}
                className="p-2 hover:bg-gray-100 rounded transition-colors"
                title={tool.label}
              >
                <Icon name={tool.icon as any} className="w-4 h-4 text-gray-700" />
              </button>
            ))}
            {idx < toolGroups.length - 1 && (
              <div className="w-px h-6 bg-gray-300 mx-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}