'use client';

import { useState, useEffect } from 'react';
import DownloadCard from './DownloadCard';

interface Download {
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
}

const DownloadsInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const downloads: Download[] = [
  {
    id: '1',
    title: 'Boletín de Mecatrónics',
    description: 'Boletín empresarial.',
    category: 'Boletín',
    fileType: 'PDF',
    fileSize: '781 KB',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1d7cd9980-1770748877436.png",
    thumbnailAlt: 'Boletín de mecatrónica con información técnica y novedades del sector',
    downloadCount: 1523,
    file:"assets/pdf/boletin_2009_mecatronics.pdf",
    isGated: false
  },
  {
    id: '2',
    title: 'Resumen de la Empresa',
    description: 'Documento completo con información sobre nuestra empresa, servicios, trayectoria, valores y capacidades en soluciones mecatrónicas.',
    category: 'Información Corporativa',
    fileType: 'PDF',
    fileSize: '17,691 KB',
    thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_1f635793d-1766066190291.png",
    thumbnailAlt: 'Resumen corporativo de la empresa con información institucional',
    downloadCount: 2341,
    file:"assets/pdf/cv_cys_mecatronics_technologies_2008.pdf",
    isGated: false
  }];

  /*
  const handleDownload = (id: string) => {
    // Simulate download
    console.log(`Downloading document ${id}`);
    // In a real implementation, this would trigger the actual file download
  };
  */

  const handleDownload = (file: string) => {
    console.log(file);
    const link = document.createElement('a');
    link.href = `${file}`;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-brand-secondary/5 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              Recursos y Descargas
            </h1>
            <p className="text-lg text-text-secondary">Acceda a nuestros documentos informativos sobre Mecatronics Technologies y soluciones industriales

            </p>
          </div>
        </div>
      </section>

      {/* Downloads Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {downloads.map((download) =>
              <DownloadCard
                key={download.id}
                {...download}
                onDownload={handleDownload} />

              )}
            </div>
          </div>
        </div>
      </section>
    </div>);

};

export default DownloadsInteractive;