'use client';

import { useEffect, useRef } from 'react';

interface EditorCanvasProps {
  content: string;
  viewMode: 'desktop' | 'tablet' | 'mobile';
  customCSS: string;
  onChange: (content: string) => void;
}

export default function EditorCanvas({ content, viewMode, customCSS, onChange }: EditorCanvasProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  const viewModeStyles = {
    desktop: 'max-w-full',
    tablet: 'max-w-3xl',
    mobile: 'max-w-md',
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="flex justify-center">
      <div className={`${viewModeStyles[viewMode]} w-full transition-all duration-300`}>
        <div className="bg-white rounded-lg shadow-lg min-h-[600px]">
          {/* Custom CSS */}
          {customCSS && (
            <style dangerouslySetInnerHTML={{ __html: customCSS }} />
          )}

          {/* Editable Content */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="p-8 focus:outline-none prose prose-lg max-w-none"
            style={{
              minHeight: '600px',
            }}
          />
        </div>

        {/* View Mode Indicator */}
        <div className="text-center mt-4">
          <span className="inline-flex items-center px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
            Vista: {viewMode === 'desktop' ? 'Escritorio' : viewMode === 'tablet' ? 'Tablet' : 'Móvil'}
          </span>
        </div>
      </div>
    </div>
  );
}