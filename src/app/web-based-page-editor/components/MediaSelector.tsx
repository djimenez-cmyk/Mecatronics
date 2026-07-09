'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface MediaFile {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  mime_type: string;
  public_url: string;
  created_at: string;
}

interface MediaSelectorProps {
  fileType: 'image' | 'video' | 'pdf';
  onSelect: (file: MediaFile) => void;
  onClose: () => void;
}

export default function MediaSelector({ fileType, onSelect, onClose }: MediaSelectorProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const supabase = createClient();

  useEffect(() => {
    loadFiles();
  }, [fileType]);

  const loadFiles = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('media_files')
        .select('*')
        .order('created_at', { ascending: false });

      // Filter by file type
      if (fileType === 'image') {
        query = query.ilike('mime_type', 'image/%');
      } else if (fileType === 'video') {
        query = query.ilike('mime_type', 'video/%');
      } else if (fileType === 'pdf') {
        query = query.eq('mime_type', 'application/pdf');
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Generate public URLs for each file
      const filesWithUrls = (data || []).map(file => {
        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(file.file_path);
        
        return {
          ...file,
          public_url: urlData.publicUrl
        };
      });
      
      setFiles(filesWithUrls);
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = () => {
    if (selectedFile) {
      onSelect(selectedFile);
      onClose();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileTypeLabel = () => {
    if (fileType === 'image') return 'Imágenes';
    if (fileType === 'video') return 'Videos';
    return 'PDFs';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Seleccionar {getFileTypeLabel()}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Icon name="XMarkIcon" className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Icon name="FolderOpenIcon" className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>No hay {getFileTypeLabel().toLowerCase()} disponibles</p>
              <p className="text-sm mt-2">Sube archivos desde el panel de administración</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={`border-2 rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                    selectedFile?.id === file.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Preview */}
                  <div className="aspect-square bg-gray-100 rounded-lg mb-2 overflow-hidden flex items-center justify-center">
                    {fileType === 'image' ? (
                      <AppImage
                        src={file.public_url}
                        alt={file.file_name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : fileType === 'video' ? (
                      <Icon name="VideoCameraIcon" className="w-12 h-12 text-gray-400" />
                    ) : (
                      <Icon name="DocumentIcon" className="w-12 h-12 text-red-500" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="text-xs">
                    <p className="font-medium text-gray-900 truncate" title={file.file_name}>
                      {file.file_name}
                    </p>
                    <p className="text-gray-500 mt-1">{formatFileSize(file.file_size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <p className="text-sm text-gray-600">
            {selectedFile ? `Seleccionado: ${selectedFile.file_name}` : 'Selecciona un archivo'}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSelect}
              disabled={!selectedFile}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Seleccionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}