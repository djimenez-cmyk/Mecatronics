'use client';

import AppImage from '@/components/ui/AppImage';
import Link from 'next/link';
import type { PageBlock, HeadingContent, ParagraphContent, ImageContent, VideoContent, PDFContent } from '@/types/page-blocks';
import type React from 'react';

interface BlockRendererProps {
  block: PageBlock;
  isPreview?: boolean;
}

export default function BlockRenderer({ block, isPreview = false }: BlockRendererProps) {
  // Helper to get inline styles from block content
  const getInlineStyles = (content: HeadingContent | ParagraphContent): React.CSSProperties => {
    if (!content.styles) return {};
    return {
      color: content.styles.textColor,
      backgroundColor: content.styles.backgroundColor,
      fontSize: content.styles.fontSize,
      fontWeight: content.styles.fontWeight,
      textAlign: content.styles.textAlign,
    };
  };

  switch (block.type) {
    case 'heading': {
      const content = block.content as HeadingContent;
      const HeadingTag = `h${content.level}` as keyof JSX.IntrinsicElements;
      const baseClasses = {
        1: 'text-4xl md:text-5xl font-bold mb-6',
        2: 'text-3xl md:text-4xl font-bold mb-5',
        3: 'text-2xl md:text-3xl font-semibold mb-4',
        4: 'text-xl md:text-2xl font-semibold mb-3',
        5: 'text-lg md:text-xl font-medium mb-3',
        6: 'text-base md:text-lg font-medium mb-2',
      };
      
      const inlineStyles = getInlineStyles(content);
      
      return (
        <HeadingTag 
          className={baseClasses[content.level as keyof typeof baseClasses]}
          style={inlineStyles}
        >
          {content.text}
        </HeadingTag>
      );
    }

    case 'paragraph': {
      const content = block.content as ParagraphContent;
      const inlineStyles = getInlineStyles(content);
      
      return (
        <p 
          className="text-base md:text-lg leading-relaxed mb-4"
          style={inlineStyles}
        >
          {content.text}
        </p>
      );
    }

    case 'image': {
      const content = block.content as ImageContent;
      
      // Don't render if no URL is provided
      if (!content.url) {
        return (
          <div className="my-8 p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            <p>Imagen no configurada</p>
          </div>
        );
      }
      
      // Build custom style object for width/height
      const imageStyle: React.CSSProperties = {};
      if (content.width) {
        imageStyle.width = `${content.width}px`;
      }
      if (content.height) {
        imageStyle.height = `${content.height}px`;
      }
      
      return (
        <div className="my-8">
          <AppImage
            src={content.url}
            alt={content.alt}
            width={content.width || 1200}
            height={content.height || 600}
            className="block mx-auto h-auto rounded-lg shadow-md "
            style={imageStyle}
          />
        </div>
      );
    }

    case 'html': {
      const content = block.content as { html: string };
      return (
        <div className="my-8">
          <div dangerouslySetInnerHTML={{ __html: content.html }} />
        </div>
      );
    }

    case 'columns': {
      const content = block.content as { left: string; right: string };
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.left }} />
          </div>
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: content.right }} />
          </div>
        </div>
      );
    }

    case 'video': {
      const content = block.content as VideoContent;
      
      // Don't render if no URL is provided
      if (!content.url) {
        return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            <p>Video no configurado</p>
          </div>
        </div>
        );
      }
      
      // Build custom style object for width/height
      const videoStyle: React.CSSProperties = {};
      if (content.width) {
        videoStyle.width = `${content.width}px`;
      }
      if (content.height) {
        videoStyle.height = `${content.height}px`;
      }
      
      // Determine if it's a YouTube/Vimeo embed URL or a direct video file
      const isEmbedUrl = content.url.includes('youtube.com') || 
                         content.url.includes('youtu.be') || 
                         content.url.includes('vimeo.com') ||
                         content.source === 'url';
      
      return (
        <div className="my-8">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md mx-auto" style={videoStyle}>
            {isEmbedUrl && content.source === 'url' ? (
              <iframe
                src={content.url}
                title={content.title}
                className="block mx-auto h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={content.url}
                controls
                className="block mx-auto h-full"
              >
                Tu navegador no soporta el elemento de video.
              </video>
            )}
          </div>
          {content.title && (
            <p className="text-sm text-gray-600 mt-2 text-center">{content.title}</p>
          )}
        </div>
      );
    }

    case 'pdf': {
      const content = block.content as PDFContent;
      
      // Don't render if no URL is provided
      if (!content.url) {
        return (
          <div className="my-8 p-4 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
            <p>PDF no configurado</p>
          </div>
        );
      }
      
      const handleDownload = (e: React.MouseEvent) => {
        if (isPreview) {
          e.preventDefault();
        }
      };
      
      const buttonColor = content.buttonColor || '#3b82f6';
      
      return (
        <div className="my-8 p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-1">{content.title}</h4>
              <p className="text-sm text-gray-600">Documento PDF disponible para descarga</p>
            </div>
            <a
              href={content.url}
              download
              onClick={handleDownload}
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              style={{ backgroundColor: buttonColor }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar PDF
            </a>
          </div>
        </div>
      );
    }

    case 'cta': {
      const content = block.content as { title: string; buttonText: string; buttonLink: string };
      
      // In preview mode, prevent navigation
      const handleClick = (e: React.MouseEvent) => {
        if (isPreview) {
          e.preventDefault();
        }
      };
      
      return (
        <div className="bg-primary/10 rounded-lg p-8 my-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {content.title}
          </h3>
          <Link
            href={content.buttonLink}
            onClick={handleClick}
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {content.buttonText}
          </Link>
        </div>
      );
    }

    default:
      return null;
  }
}