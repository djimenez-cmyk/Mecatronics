'use client';

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

interface PreviewModalProps {
  pageData: PageData;
  onClose: () => void;
}

export default function PreviewModal({ pageData, onClose }: PreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Vista Previa: {pageData.title}</h2>
            <p className="text-sm text-gray-600">Cómo se verá tu página publicada</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon name="XMarkIcon" className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            {pageData.customCSS && (
              <style dangerouslySetInnerHTML={{ __html: pageData.customCSS }} />
            )}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cerrar Vista Previa
          </button>
        </div>
      </div>
    </div>
  );
}