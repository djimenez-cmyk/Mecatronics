import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const CTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-brand-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
            ¿Listo para Transformar su Industria?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubra cómo nuestras soluciones de automatización pueden optimizar sus procesos, reducir costos y aumentar la competitividad de su empresa.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-cta text-conversion-foreground text-white font-heading font-semibold rounded-md hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-1 shadow-brand-lg hover:shadow-xl"
            >
              Solicitar Consultoría Gratuita
              <Icon name="ArrowRightIcon" size={20} className="ml-2" />
            </Link>
            <Link
              href="/downloads"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white text-base font-heading font-semibold rounded-md hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              Descargar Catálogo
              <Icon name="ArrowDownTrayIcon" size={20} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mx-auto mb-3 backdrop-blur-sm">
                <Icon name="PhoneIcon" size={24} className="text-white" />
              </div>
              <div className="text-sm text-white/80 mb-1">Llámenos</div>
              <div className="text-base font-heading font-semibold text-white">
                01(81) 8383-9460 <br />
                01(81) 8330-0717
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mx-auto mb-3 backdrop-blur-sm">
                <Icon name="EnvelopeIcon" size={24} className="text-white" />
              </div>
              <div className="text-sm text-white/80 mb-1">Escríbanos</div>
              <div className="text-base font-heading font-semibold text-white">
                informes@mecatronics.com.mx <br />
                www.mecatronics.com.mx
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mx-auto mb-3 backdrop-blur-sm">
                <Icon name="PrinterIcon" size={24} className="text-white" />
              </div>
              <div className="text-sm text-white/80 mb-1">Fax</div>
              <div className="text-base font-heading font-semibold text-white">
                01(81) 8330-0717
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;