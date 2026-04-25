'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const Footer = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setIsHydrated(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  const footerLinks = {
    company: [
      { label: 'Quiénes Somos', href: '/about' },
      { label: 'Misión y Visión', href: '/mission-vision' },
    ],
    services: [
      { label: 'Servicios y Productos', href: '/services' },
      //{ label: 'Automatización Industrial', href: '/services' },
      //{ label: 'Ingeniería Mecatrónica', href: '/services' },
      //{ label: 'Mantenimiento Predictivo', href: '/services' },
      { label: 'Experiencia (Galería)', href: '/experience' },
    ],
    resources: [
      { label: 'Descargas', href: '/downloads' },
      //{ label: 'Catálogos Técnicos', href: '/downloads' },
      //{ label: 'Documentación', href: '/downloads' },
      { label: 'Contacto', href: '/contact' },
    ],
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: 'LinkIcon', href: '#' },
    { name: 'Twitter', icon: 'AtSymbolIcon', href: '#' },
    { name: 'Facebook', icon: 'UserGroupIcon', href: '#' },
    { name: 'YouTube', icon: 'VideoCameraIcon', href: '#' },
  ];

  return (
    <footer className="bg-trust text-trust-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link href="/homepage" className="flex items-center space-x-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                >
                  <path
                    d="M20 8L8 14V26L20 32L32 26V14L20 8Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 20L8 14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 20V32"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 20L32 14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="20" cy="20" r="2" fill="white" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-white leading-tight">
                  Mecatronics
                </span>
                <span className="text-xs font-heading font-semibold text-brand-secondary leading-tight">
                  Pro
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/80 mb-4 max-w-md leading-relaxed">
              Soluciones integrales de automatización y mecatrónica para transformar la industria a través de la innovación tecnológica y la excelencia en ingeniería.
            </p>
            {/*
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={18} />
                </a>
              ))}
            </div>
            */}
          </div>

          <div>
            <h3 className="text-base font-heading font-bold text-white mb-4">
              Empresa
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link,index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-heading font-bold text-white mb-4">
              Servicios
            </h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link,index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-heading font-bold text-white mb-4">
              Recursos
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link,index) => (
                <li key={`${link.href}-${index}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60 text-center md:text-left">
              {isHydrated ? `© ${currentYear}` : '© 2026'} Mecatronics Pro. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <Link
                href="#"
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;