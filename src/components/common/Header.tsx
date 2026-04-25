'use client';


import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/locales/translations';
import { createClient } from '@/lib/supabase/client';

interface HeaderProps {
  className?: string;
}

interface NavItem {
  label: string;
  href: string;
  isPrimary: boolean;
}

const Header = ({ className = '' }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [dynamicPages, setDynamicPages] = useState<any[]>([]);

  const navigationItems: NavItem[] = [
    { label: getTranslation(language, 'nav.home'), href: '/homepage', isPrimary: true },
    { label: getTranslation(language, 'nav.about'), href: '/about', isPrimary: true },
    { label: getTranslation(language, 'nav.services'), href: '/services', isPrimary: true },
    { label: getTranslation(language, 'nav.experience'), href: '/experience', isPrimary: true },
    { label: getTranslation(language, 'nav.missionVision'), href: '/mission-vision', isPrimary: false },
    { label: getTranslation(language, 'nav.downloads'), href: '/downloads', isPrimary: false },
    { label: getTranslation(language, 'nav.contact'), href: '/contact', isPrimary: false },
    { label: getTranslation(language, 'nav.adminLogin'), href: '/admin-login', isPrimary: false },
  ];

  const supabase = createClient();

  const loadPages = async () => {
      try {
        const { data, error } = await supabase
          .from('pages')
          .select('*')
          
          .order('created_at', { ascending: false });
  
        if (error) throw error;
  
        // Filter only dynamic pages (exclude hardcoded pages)
        const hardcodedRoutes = ['/homepage', '/services', '/about', '/contact', '/experience', '/mission-vision', '/downloads', '/admin-login', '/admin-dashboard', '/page-management-dashboard', '/web-based-page-editor'];
        const filteredDynamicPages = (data || []).filter((page: any) => !hardcodedRoutes.includes(page.route) && page.status == 'published' );
        setDynamicPages(filteredDynamicPages);
        //console.log(filteredDynamicPages);
      } catch (error) {
        console.error('Error loading pages:', error);
      } 
  };

  const dynamicNavItems: NavItem[] = dynamicPages.map((page) => ({
    label: page.title,
    href: page.route,
    isPrimary: false,
  }));
  
  const adminLogin = navigationItems.filter(item => !item.isPrimary && item.href == '/admin-login');

  const primaryNavItems = navigationItems.filter(item => item.isPrimary);

  //const secondaryNavItems = navigationItems.filter(item => !item.isPrimary);
  const secondaryNavItems = useMemo(() => {
    return [
      ...navigationItems.filter(item => !item.isPrimary && item.href != '/admin-login'),
      ...dynamicNavItems,
      ...adminLogin
    ];
  }, [navigationItems, dynamicNavItems]);


  useEffect(() => {
    loadPages();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  }, [pathname]);

  const isActiveLink = (href: string) => {
    return pathname === href;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <>
      <header
        
        //className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        //  isScrolled ? 'bg-card shadow-brand' : 'bg-card'
        //} ${className}`}
        
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-gradient-to-b from-gray-200 to-white shadow-brand`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-18 px-4 lg:px-8 bg-white/0">
            {/* Logo */}
            <Link 
              href="/homepage" 
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
            >
              <div className="flex items-center justify-center w-64 h-32">
                <AppImage
                  src="/assets/images/logo_mecatronics.png"
                  alt="C & S Mecatronics Logo"
                  className="w-full h-full object-contain bg-white/0"
                />
              </div>
              {/*
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-primary leading-tight">
                  Mecatronics
                </span>
                <span className="text-xs font-heading font-semibold text-brand-secondary leading-tight">
                  Pro
                </span>
              </div>
              */}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-6 py-3 text-md font-heading font-semibold rounded-md transition-all duration-300 ${
                    isActiveLink(item.href)
                      ? 'text-primary bg-primary/10' :'text-text-primary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* More Menu */}
              <div className="relative">
                <button
                  onClick={toggleMoreMenu}
                  className={`flex items-center space-x-1 px-4 py-2 text-lg font-heading font-semibold rounded-md transition-all duration-300 ${
                    isMoreMenuOpen
                      ? 'text-primary bg-primary/10' :'text-text-primary hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  <span>{getTranslation(language, 'nav.more')}</span>
                  <Icon
                    name="ChevronDownIcon"
                    size={16}
                    className={`transition-transform duration-300 ${
                      isMoreMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isMoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-card rounded-md shadow-brand-lg border border-border overflow-hidden">
                    {secondaryNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3 text-sm font-heading font-medium transition-colors duration-200 ${
                          isActiveLink(item.href)
                            ? 'text-primary bg-primary/10' :'text-text-primary hover:text-primary hover:bg-primary/5'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-conversion text-white text-sm font-heading font-semibold rounded-md hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand"
              >
                {getTranslation(language, 'nav.requestConsultation')}
              </Link>
              
              {/* Language Switcher 
              <div className="flex items-center space-x-1 bg-background/50 rounded-md p-1">
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1.5 text-xs font-heading font-semibold rounded transition-all duration-200 ${
                    language === 'es' ?'bg-primary text-white' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 text-xs font-heading font-semibold rounded transition-all duration-200 ${
                    language === 'en' ?'bg-primary text-white' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  EN
                </button>
              </div>
              */}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-text-primary hover:text-primary transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <Icon
                name={isMobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'}
                size={24}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background z-40 lg:hidden"
          style={{ top: '64px' }}
        >
          <nav className="flex flex-col h-full overflow-y-auto">
            <div className="flex-1 px-4 py-6 space-y-1">
              {primaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-heading font-semibold rounded-md transition-colors duration-200 ${
                      isActiveLink(item.href)
                        ? 'text-primary bg-primary/10' :'text-text-primary hover:text-primary hover:bg-primary/5'
                    }`}>
                    {item.label}
                  </Link>
                  )
                )
              }
              {secondaryNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 text-base font-heading font-semibold rounded-md transition-colors duration-200 ${
                      isActiveLink(item.href)
                        ? 'text-primary bg-primary/10' :'text-text-primary hover:text-primary hover:bg-primary/5'
                    }`}>
                    {item.label}
                  </Link>
                  )
                )
              }
            </div>

            {/* Mobile CTA */}
            <div className="p-4 border-t border-border">
              <Link
                href="/contact"
                className="block w-full px-6 py-3 bg-conversion text-conversion-foreground text-center text-base font-heading font-semibold rounded-md hover:bg-conversion/90 transition-colors duration-300"
              >
                {getTranslation(language, 'nav.requestConsultation')}
              </Link>
              
              {/* Mobile Language Switcher 
              <div className="flex items-center justify-center space-x-2 pt-4">
                <button
                  onClick={() => setLanguage('es')}
                  className={`flex-1 px-4 py-2 text-sm font-heading font-semibold rounded transition-all duration-200 ${
                    language === 'es' ?'bg-primary text-white' :'bg-background text-text-secondary border border-border'
                  }`}
                >
                  Español
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 px-4 py-2 text-sm font-heading font-semibold rounded transition-all duration-200 ${
                    language === 'en' ?'bg-primary text-white' :'bg-background text-text-secondary border border-border'
                  }`}
                >
                  English
                </button>
              </div>
              */}
            </div>
          </nav>
        </div>
      )}

      {/* Backdrop for More Menu */}
      {isMoreMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;