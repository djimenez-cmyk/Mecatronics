'use client';

import Icon from '@/components/ui/AppIcon';

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

interface PageListItemProps {
  page: Page;
  isSelected: boolean;
  onToggleSelect: (pageId: string) => void;
  onEdit: (pageId: string) => void;
  onDelete: (page: Page) => void;
  onDuplicate: (page: Page) => void;
  onTogglePublish: (page: Page) => void;
}

export default function PageListItem({
  page,
  isSelected,
  onToggleSelect,
  onEdit,
  onDelete,
  onDuplicate,
  onTogglePublish,
}: PageListItemProps) {
  const statusColors = {
    published: 'bg-success/10 text-success',
    draft: 'bg-warning/10 text-warning',
    scheduled: 'bg-accent/10 text-accent',
  };

  const statusLabels = {
    published: 'Publicada',
    draft: 'Borrador',
    scheduled: 'Programada',
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(page.id)}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="DocumentTextIcon" className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{page.title}</p>
            <p className="text-sm text-gray-500">Por {page.author}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <code className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">{page.route}</code>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[page.status]}`}>
          {statusLabels[page.status]}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">{page.template}</td>
      <td className="px-6 py-4 text-sm text-gray-600">{page.updatedAt}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onTogglePublish(page)}
            className={`p-2 rounded-lg transition-colors ${
              page.status === 'published' ?'text-success hover:bg-success/10' :'text-warning hover:bg-warning/10'
            }`}
            title={page.status === 'published' ? 'Despublicar' : 'Publicar'}
          >
            <Icon 
              name={page.status === 'published' ? 'CheckCircleIcon' : 'ClockIcon'} 
              className="w-4 h-4" 
            />
          </button>
          <button
            onClick={() => onEdit(page.id)}
            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            title="Editar"
          >
            <Icon name="PencilIcon" className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDuplicate(page)}
            className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
            title="Duplicar"
          >
            <Icon name="DocumentDuplicateIcon" className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(page)}
            className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
            title="Eliminar"
          >
            <Icon name="TrashIcon" className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}