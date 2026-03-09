import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ClientHeader from '@/components/common/ClientHeader';
import Footer from '@/app/homepage/components/Footer';
import BlockRenderer from '@/components/blocks/BlockRenderer';
import { createClient } from '@/lib/supabase/client';
import type { DynamicPage, PageBlock } from '@/types/page-blocks';

interface PageProps {
  params: Promise<{ paginas_dinamicas_slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = createClient();
  
  const { data: page } = await supabase
    .from('pages')
    .select('title')
    .eq('route', `/${resolvedParams.paginas_dinamicas_slug}`)
    .eq('status', 'published')
    .single();

  return {
    title: page ? `${page.title} - Mecatronics Pro` : 'Página no encontrada',
    description: page ? `${page.title} - Mecatronics Pro` : 'La página solicitada no existe',
  };
}

export default async function DynamicPageRoute({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = createClient();

  // Fetch page data
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('*')
    .eq('route', `/${resolvedParams.paginas_dinamicas_slug}`)
    .eq('status', 'published')
    .single();

  if (pageError || !page) {
    notFound();
  }

  // Fetch page blocks
  const { data: blocks, error: blocksError } = await supabase
    .from('page_blocks')
    .select('*')
    .eq('page_id', page.id)
    .order('order_index', { ascending: true });

  if (blocksError) {
    console.error('Error fetching blocks:', blocksError);
  }

  const pageData = page as DynamicPage;
  const pageBlocks = (blocks || []) as PageBlock[];

  return (
    <>
      <ClientHeader />
      <main className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 lg:px-8 py-20">
          <article className="max-w-4xl mx-auto">
            {pageBlocks.length === 0 ? (
              <div className="text-center py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageData.title}</h1>
                <p className="text-gray-600">Esta página aún no tiene contenido.</p>
              </div>
            ) : (
              pageBlocks.map((block) => (
                <BlockRenderer key={block.id} block={block} />
              ))
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}