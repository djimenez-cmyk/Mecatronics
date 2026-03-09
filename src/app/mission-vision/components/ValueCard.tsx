'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ValueCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

export default function ValueCard({
  icon,
  title,
  description,
  index,
}: ValueCardProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [isHydrated, index]);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-brand">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-primary/20 rounded" />
        </div>
        <div className="h-6 bg-muted rounded w-32 mb-3" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-5/6" />
          <div className="h-3 bg-muted rounded w-4/5" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-card rounded-lg p-6 shadow-brand hover:shadow-brand-lg transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        <Icon name={icon as any} size={32} className="text-primary" />
      </div>
      <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
        {title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
}