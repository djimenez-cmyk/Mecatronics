'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Icon from '@/components/ui/AppIcon';

interface MediaFile {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  created_at: string;
}

interface UploadProgress {
  fileName: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

interface MediaUploadInteractiveProps {
  userId: string;
}

export default function MediaUploadInteractive({ userId }: MediaUploadInteractiveProps) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'pdf'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMediaFiles();
  }, []);

  const fetchMediaFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('media_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      console.error('Error fetching media files:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    for (const file of selectedFiles) {
      await uploadFile(file);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFile = async (file: File) => {
    const fileName = `${Date.now()}_${file.name}`;
    const fileType = getFileType(file.type);
    const filePath = `${fileType}/${fileName}`;

    // Add to upload progress
    setUploadProgress(prev => [
      ...prev,
      { fileName: file.name, progress: 0, status: 'uploading' }
    ]);

    try {
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Update progress
      setUploadProgress(prev =>
        prev.map(p =>
          p.fileName === file.name
            ? { ...p, progress: 50, status: 'uploading' }
            : p
        )
      );

      // Save metadata to database
      const { error: dbError } = await supabase
        .from('media_files')
        .insert({
          file_name: file.name,
          file_path: filePath,
          file_type: fileType,
          file_size: file.size,
          mime_type: file.type,
          uploaded_by: userId
        });

      if (dbError) throw dbError;

      // Update progress to success
      setUploadProgress(prev =>
        prev.map(p =>
          p.fileName === file.name
            ? { ...p, progress: 100, status: 'success' }
            : p
        )
      );

      // Refresh file list
      await fetchMediaFiles();

      // Remove from progress after 2 seconds
      setTimeout(() => {
        setUploadProgress(prev => prev.filter(p => p.fileName !== file.name));
      }, 2000);
    } catch (error: any) {
      console.error('Upload error:', error.message);
      setUploadProgress(prev =>
        prev.map(p =>
          p.fileName === file.name
            ? { ...p, status: 'error', error: error.message }
            : p
        )
      );
    }
  };

  const getFileType = (mimeType: string): string => {
    if (mimeType.startsWith('image/')) return 'image';
    if (mimeType.startsWith('video/')) return 'video';
    if (mimeType === 'application/pdf') return 'pdf';
    return 'other';
  };

  const handleDelete = async (file: MediaFile) => {
    if (!confirm(`¿Eliminar ${file.file_name}?`)) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('media')
        .remove([file.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_files')
        .delete()
        .eq('id', file.id);

      if (dbError) throw dbError;

      // Refresh list
      await fetchMediaFiles();
    } catch (error: any) {
      console.error('Delete error:', error.message);
      alert('Error al eliminar archivo');
    }
  };

  const handleView = async (file: MediaFile) => {
    try {
      const { data, error } = await supabase.storage
        .from('media')
        .createSignedUrl(file.file_path, 60 * 5); // 5 minutos

      if (error) throw error;

      window.open(data.signedUrl, '_blank');
    } catch (error: any) {
      console.error('View error:', error.message);
      alert('No se pudo abrir el archivo');
    }
  };


  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'image':
        return 'PhotoIcon';
      case 'video':
        return 'VideoCameraIcon';
      case 'pdf':
        return 'DocumentTextIcon';
      default:
        return 'DocumentIcon';
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesType = filterType === 'all' || file.file_type === filterType;
    const matchesSearch = file.file_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin-dashboard')}
              className="flex items-center justify-center w-10 h-10 bg-card rounded-lg hover:bg-card/80 transition-colors"
            >
              <Icon name="ArrowLeftIcon" size={20} className="text-text-primary" />
            </button>
            <div>
              <h1 className="text-3xl font-heading font-bold text-text-primary">
                Media Library
              </h1>
              <p className="text-text-secondary mt-1">
                Upload and manage images, videos, and PDFs
              </p>
            </div>
          </div>
          <button
            onClick={handleFileSelect}
            className="flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-heading font-semibold"
          >
            <Icon name="ArrowUpTrayIcon" size={20} />
            <span>Upload Files</span>
          </button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload Progress */}
        {uploadProgress.length > 0 && (
          <div className="mb-6 space-y-2">
            {uploadProgress.map((progress, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-4 border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">
                    {progress.fileName}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {progress.status === 'uploading' && `${progress.progress}%`}
                    {progress.status === 'success' && '✓ Complete'}
                    {progress.status === 'error' && '✗ Error'}
                  </span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      progress.status === 'success' ?'bg-success'
                        : progress.status === 'error' ?'bg-error' :'bg-primary'
                    }`}
                    style={{ width: `${progress.progress}%` }}
                  />
                </div>
                {progress.error && (
                  <p className="text-xs text-error mt-1">{progress.error}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Icon
                name="MagnifyingGlassIcon"
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            {(['all', 'image', 'video', 'pdf'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterType === type
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card text-text-secondary hover:bg-card/80'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* File Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <Icon
              name="PhotoIcon"
              size={48}
              className="mx-auto text-text-secondary mb-4"
            />
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              No files found
            </h3>
            <p className="text-text-secondary">
              {searchQuery || filterType !== 'all' ?'Try adjusting your filters' :'Upload your first file to get started'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.id}
                className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-border/50 flex items-center justify-center">
                  <Icon
                    name={getFileIcon(file.file_type) as any}
                    size={48}
                    className="text-text-secondary"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-text-primary truncate mb-1">
                    {file.file_name}
                  </h3>
                  <p className="text-xs text-text-secondary mb-3">
                    {formatFileSize(file.file_size)} • {file.file_type.toUpperCase()}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(file)}
                      className="flex-1 px-3 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors text-sm font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(file)}
                      className="px-3 py-2 bg-error/10 text-error rounded-md hover:bg-error/20 transition-colors"
                    >
                      <Icon name="TrashIcon" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}