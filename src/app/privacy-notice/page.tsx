import type { Metadata } from 'next';
import ClientHeader from '@/components/common/ClientHeader';
import Footer from '@/app/homepage/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad - C&S Mecatronics Technologies',
  description: 'Aviso de privacidad de C&S Mecatronics Technologies. Conozca cómo tratamos sus datos personales conforme a la Ley Federal de Protección de Datos Personales.',
};

const sections = [
  {
    id: 1,
    title: 'Datos personales que se recaban',
    content: null,
    list: [
      'Nombre completo',
      'Correo electrónico',
      'Número telefónico',
      'Información relacionada con solicitudes de servicios o cotizaciones',
    ],
    intro: 'Los datos personales que podemos recabar a través de nuestro sitio web incluyen:',
  },
  {
    id: 2,
    title: 'Finalidades del tratamiento de datos',
    content: null,
    list: [
      'Atender solicitudes de información, soporte o cotizaciones',
      'Proveer los servicios ofrecidos por C&S MECATRONICS TECHNOLOGIES',
      'Dar seguimiento a proyectos o servicios contratados',
      'Enviar información técnica, comercial o promocional (previa autorización del titular)',
      'Mejorar la calidad de nuestros servicios y experiencia del usuario',
    ],
    intro: 'Sus datos personales serán utilizados para las siguientes finalidades:',
  },
  {
    id: 3,
    title: 'Uso de cookies y tecnologías de rastreo',
    content:
      'Nuestro sitio web puede utilizar cookies y otras tecnologías para monitorear su comportamiento como usuario de internet, con la finalidad de brindarle un mejor servicio y experiencia de navegación.',
    list: null,
    intro: null,
  },
  {
    id: 4,
    title: 'Protección de datos personales',
    content:
      'C&S MECATRONICS TECHNOLOGIES implementa medidas de seguridad administrativas, técnicas y físicas necesarias para proteger sus datos personales contra daño, pérdida, alteración, destrucción o uso no autorizado.',
    list: null,
    intro: null,
  },
  {
    id: 5,
    title: 'Transferencia de datos',
    content:
      'Sus datos personales no serán compartidos con terceros sin su consentimiento, salvo en los casos previstos por la legislación aplicable.',
    list: null,
    intro: null,
  },
  {
    id: 6,
    title: 'Derechos ARCO',
    content: null,
    list: [
      'Acceder a sus datos personales',
      'Rectificarlos en caso de ser inexactos o incompletos',
      'Cancelarlos cuando considere que no se requieren para alguna de las finalidades señaladas',
      'Oponerse al tratamiento de los mismos',
    ],
    intro: 'Usted tiene derecho a:',
    footer:
      'Para ejercer cualquiera de los derechos ARCO, deberá enviar una solicitud al correo electrónico: informes@mecatronics.com.mx, incluyendo su nombre completo, descripción de la solicitud y medio para comunicarle la respuesta.',
    footerEmail: 'informes@mecatronics.com.mx',
  },
  {
    id: 7,
    title: 'Cambios al aviso de privacidad',
    content:
      'C&S MECATRONICS TECHNOLOGIES se reserva el derecho de modificar o actualizar el presente aviso de privacidad en cualquier momento, derivado de cambios en disposiciones legales o en nuestras prácticas. Las modificaciones estarán disponibles en nuestro sitio web.',
    list: null,
    intro: null,
  },
  {
    id: 8,
    title: 'Consentimiento del titular',
    content:
      'Al utilizar nuestro sitio web, usted consiente el tratamiento de sus datos personales conforme a los términos y condiciones de este aviso de privacidad.',
    list: null,
    intro: null,
  },
  {
    id: 9,
    title: 'Contacto',
    content: null,
    list: null,
    intro:
      'Si tiene dudas o comentarios sobre este aviso de privacidad, puede comunicarse a través del correo:',
    contactEmail: 'informes@mecatronics.com.mx',
  },
];

export default function AvisoDePrivacidadPage() {
  return (
    <>
      <ClientHeader />
      <main className="min-h-screen bg-background pt-[84px]">
        {/* Hero Banner */}
        <section className="bg-trust py-14 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-secondary rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <span className="w-2 h-2 rounded-full bg-brand-secondary" />
                <span className="text-xs font-heading font-semibold text-white/80 uppercase tracking-widest">
                  Transparencia y Privacidad
                </span>
              </div>
              <h1 className="text-3xl lg:text-5xl font-heading font-bold text-white leading-tight mb-4">
                Aviso de Privacidad
              </h1>
              <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-2xl">
                C&amp;S MECATRONICS TECHNOLOGIES, con domicilio en{' '}
                <span className="text-white font-medium">
                  C. Gonzalitos 410, Centro, 66400, San Nicolás de los Garza, Nuevo León, México
                </span>
                , es responsable del tratamiento de sus datos personales en cumplimiento con la Ley
                Federal de Protección de Datos Personales en Posesión de los Particulares.
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents + Content */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 max-w-6xl mx-auto">
              {/* Sticky TOC */}
              <aside className="lg:w-64 shrink-0">
                <div className="lg:sticky lg:top-28">
                  <div className="bg-card border border-border rounded-xl p-5 shadow-brand-sm">
                    <h2 className="text-xs font-heading font-bold text-text-secondary uppercase tracking-widest mb-4">
                      Contenido
                    </h2>
                    <nav className="space-y-1">
                      {sections.map((s) => (
                        <a
                          key={s.id}
                          href={`#seccion-${s.id}`}
                          className="flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors duration-200 group"
                        >
                          <span className="mt-0.5 w-5 h-5 shrink-0 flex items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                            {s.id}
                          </span>
                          <span className="leading-snug">{s.title}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="space-y-10">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      id={`seccion-${section.id}`}
                      className="scroll-mt-28 bg-card border border-border rounded-xl p-6 lg:p-8 shadow-brand-sm"
                    >
                      {/* Section Header */}
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-heading font-bold">
                          {section.id}
                        </div>
                        <h2 className="text-lg lg:text-xl font-heading font-bold text-text-primary">
                          {section.title}
                        </h2>
                      </div>

                      {/* Intro text */}
                      {section.intro && !section.contactEmail && (
                        <p className="text-text-secondary text-sm lg:text-base leading-relaxed mb-4">
                          {section.intro}
                        </p>
                      )}

                      {/* Contact section special */}
                      {section.contactEmail && section.intro && (
                        <p className="text-text-secondary text-sm lg:text-base leading-relaxed mb-3">
                          {section.intro}{' '}
                          <a
                            href={`mailto:${section.contactEmail}`}
                            className="text-primary font-semibold hover:underline"
                          >
                            {section.contactEmail}
                          </a>
                        </p>
                      )}

                      {/* Paragraph content */}
                      {section.content && (
                        <p className="text-text-secondary text-sm lg:text-base leading-relaxed">
                          {section.content}
                        </p>
                      )}

                      {/* List */}
                      {section.list && (
                        <ul className="space-y-2.5 mt-1">
                          {section.list.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-1.5 w-2 h-2 shrink-0 rounded-full bg-primary" />
                              <span className="text-text-secondary text-sm lg:text-base leading-relaxed">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* ARCO footer note */}
                      {section.footer && section.footerEmail && (
                        <div className="mt-5 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                          <p className="text-text-secondary text-sm leading-relaxed">
                            Para ejercer cualquiera de los derechos ARCO, deberá enviar una
                            solicitud al correo electrónico:{' '}
                            <a
                              href={`mailto:${section.footerEmail}`}
                              className="text-primary font-semibold hover:underline"
                            >
                              {section.footerEmail}
                            </a>
                            , incluyendo su nombre completo, descripción de la solicitud y medio
                            para comunicarle la respuesta.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Last Updated + Back */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
                    <p className="text-sm text-text-secondary">
                      <span className="font-semibold text-text-primary">Última actualización:</span>{' '}
                      02 de mayo de 2026
                    </p>
                    <Link
                      href="/homepage"
                      className="inline-flex items-center gap-2 text-sm font-heading font-semibold text-primary hover:text-primary/80 transition-colors duration-200"
                    >
                      ← Volver al inicio
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}