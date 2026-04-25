import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageEditorNew from './components/PageEditorNew';

export const metadata: Metadata = {
  title: 'Editor de Páginas - Mecatronics Pro',
  description: 'Editor visual avanzado para modificar contenido de páginas con vista previa en tiempo real.',
};

export default function WebBasedPageEditorPage() {
  return (
    <>
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Cargando editor...</div>
        </div>
      }>
        <PageEditorNew />
      </Suspense>
    </>
  );
}