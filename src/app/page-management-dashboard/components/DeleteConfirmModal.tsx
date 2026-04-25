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

interface DeleteConfirmModalProps {
  page: Page;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ page, onClose, onConfirm }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-error/10 rounded-lg">
              <Icon name="ExclamationTriangleIcon" className="w-6 h-6 text-error" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Confirmar Eliminación</h2>
              <p className="text-sm text-gray-600 mt-1">Esta acción no se puede deshacer</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            ¿Estás seguro de que deseas eliminar la página <strong>{page.title}</strong>?
          </p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Ruta:</span>
              <code className="text-gray-900 bg-white px-2 py-1 rounded">{page.route}</code>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Estado:</span>
              <span className="text-gray-900">{page.status}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Plantilla:</span>
              <span className="text-gray-900">{page.template}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-error text-white rounded-lg hover:bg-error/90 transition-colors"
          >
            Eliminar Página
          </button>
        </div>
      </div>
    </div>
  );
}