import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ClientHeader from '@/components/common/ClientHeader';
import MediaUploadInteractive from './components/MediaUploadInteractive';

export const metadata: Metadata = {
  title: 'Upload Media - Mecatronics Pro',
  description: 'Upload and manage media files including images, videos, and PDFs.',
};

export default async function MediaUploadPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin-login');
  }

  return (
    <>
      <ClientHeader />
      <main className="pt-16">
        <MediaUploadInteractive userId={user.id} />
      </main>
    </>
  );
}