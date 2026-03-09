'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/locales/translations';

interface CounterData {
  value: number;
  label: string;
  suffix: string;
}

const HeroSection = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const { language } = useLanguage();
  const [counters, setCounters] = useState<CounterData[]>([
    { value: 0, label: getTranslation(language, 'homepage.projectsCompleted'), suffix: '+' },
    { value: 0, label: getTranslation(language, 'homepage.yearsExperience'), suffix: '+' },
    { value: 0, label: getTranslation(language, 'homepage.clientsSatisfied'), suffix: '%' },
    { value: 0, label: getTranslation(language, 'homepage.solutionsImplemented'), suffix: '+' },
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const targetValues = [250, 15, 98, 500];
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters([
        { value: Math.floor(targetValues[0] * progress), label: getTranslation(language, 'homepage.projectsCompleted'), suffix: '+' },
        { value: Math.floor(targetValues[1] * progress), label: getTranslation(language, 'homepage.yearsExperience'), suffix: '+' },
        { value: Math.floor(targetValues[2] * progress), label: getTranslation(language, 'homepage.clientsSatisfied'), suffix: '%' },
        { value: Math.floor(targetValues[3] * progress), label: getTranslation(language, 'homepage.solutionsImplemented'), suffix: '+' },
      ]);

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters([
          { value: targetValues[0], label: getTranslation(language, 'homepage.projectsCompleted'), suffix: '+' },
          { value: targetValues[1], label: getTranslation(language, 'homepage.yearsExperience'), suffix: '+' },
          { value: targetValues[2], label: getTranslation(language, 'homepage.clientsSatisfied'), suffix: '%' },
          { value: targetValues[3], label: getTranslation(language, 'homepage.solutionsImplemented'), suffix: '+' },
        ]);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isHydrated, language]);

  if (!isHydrated) {
    return (
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-brand-secondary min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              {getTranslation(language, 'homepage.heroTitle')}
              <br />
              <span className="text-accent">{getTranslation(language, 'homepage.heroTitleAccent')}</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
              {getTranslation(language, 'homepage.heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-cta text-conversion-foreground text-base font-heading font-semibold rounded-md hover:bg-cta/90 transition-all duration-300 hover:-translate-y-1 shadow-brand hover:shadow-brand-lg"
              >
                {getTranslation(language, 'homepage.requestConsultation')}
                <Icon name="ArrowRightIcon" size={20} className="ml-2" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white text-base font-heading font-semibold rounded-md hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
              >
                {getTranslation(language, 'homepage.exploreServices')}
                <Icon name="ChevronRightIcon" size={20} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: 250, label: getTranslation(language, 'homepage.projectsCompleted'), suffix: '+' },
                { value: 15, label: getTranslation(language, 'homepage.yearsExperience'), suffix: '+' },
                { value: 98, label: getTranslation(language, 'homepage.clientsSatisfied'), suffix: '%' },
                { value: 500, label: getTranslation(language, 'homepage.solutionsImplemented'), suffix: '+' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-sm text-white/80 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-brand-secondary min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            {getTranslation(language, 'homepage.heroTitle')}
            <br />
            <span className="text-accent">{getTranslation(language, 'homepage.heroTitleAccent')}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            {getTranslation(language, 'homepage.heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-cta text-white text-base font-heading font-semibold rounded-md hover:bg-cta/90 transition-all duration-300 hover:-translate-y-1 shadow-brand hover:shadow-brand-lg"
            >
              {getTranslation(language, 'homepage.requestConsultation')}
              <Icon name="ArrowRightIcon" size={20} className="ml-2" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white text-base font-heading font-semibold rounded-md hover:bg-white/20 transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              {getTranslation(language, 'homepage.exploreServices')}
              <Icon name="ChevronRightIcon" size={20} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {counters.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-white/80 font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;