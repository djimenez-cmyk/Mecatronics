'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

interface DownloadCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  fileSize: string;
  thumbnail: string;
  thumbnailAlt: string;
  downloadCount: number;
  file: string;
  isGated: boolean;
  onDownload: (id: string) => void;
}

const DownloadCard = ({
  id,
  title,
  description,
  category,
  fileType,
  fileSize,
  thumbnail,
  thumbnailAlt,
  downloadCount,
  file,
  onDownload,
}: DownloadCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Boletín': 'bg-primary/10 text-primary',
      'Información Corporativa': 'bg-brand-secondary/10 text-brand-secondary',
    };
    return colors[cat] || 'bg-muted text-muted-foreground';
  };

  return (
    <div
      className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-brand transition-all duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <AppImage
          src={thumbnail}
          alt={thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-heading font-semibold ${getCategoryColor(
              category
            )}`}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          {description}
        </p>

        {/* File Info */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="DocumentTextIcon" size={16} />
              <span className="font-heading font-semibold">{fileType}</span>
            </div>
            {/*
            <div className="flex items-center space-x-1">
              <Icon name="ArrowDownTrayIcon" size={16} />
              <span>{downloadCount}</span>
            </div>
            */}
            <span>{fileSize}</span>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={() => onDownload(file)}
          className={`w-full py-3 rounded-md font-heading font-semibold text-sm transition-all duration-300 flex items-center justify-center space-x-2 bg-cta text-primary-foreground hover:bg-primary/90 ${
            isHovered ? 'shadow-brand' : ''
          }`}
        >
          <Icon name="ArrowDownTrayIcon" size={18} />
          <span>Descargar PDF</span>
        </button>
      </div>
    </div>
  );
};

export default DownloadCard;