'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  icon: string;
  isLeft: boolean;
  index: number;
}

export default function TimelineItem({
  year,
  title,
  description,
  icon,
  isLeft,
  index,
}: TimelineItemProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 200);

    return () => clearTimeout(timer);
  }, [isHydrated, index]);

  if (!isHydrated) {
    return (
      <div className={`flex items-center mb-12 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="w-5/12 px-4">
          <div className="bg-card rounded-lg p-6 shadow-brand">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-primary/20 rounded" />
              </div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded w-16 mb-2" />
                <div className="h-5 bg-muted rounded w-32" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
            </div>
          </div>
        </div>
        <div className="w-2/12 flex justify-center">
          <div className="w-4 h-4 bg-primary rounded-full border-4 border-background" />
        </div>
        <div className="w-5/12" />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center mb-12 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className="w-5/12 px-4">
        <div className="bg-card rounded-lg p-6 shadow-brand hover:shadow-brand-lg transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name={icon as any} size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-heading font-semibold text-accent">
                {year}
              </p>
              <h3 className="text-lg font-heading font-bold text-text-primary">
                {title}
              </h3>
            </div>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="w-2/12 flex justify-center relative">
        <div className="absolute top-0 bottom-0 w-0.5 bg-border" />
        <div className="w-4 h-4 bg-primary rounded-full border-4 border-background relative z-10 shadow-brand-sm" />
      </div>

      <div className="w-5/12" />
    </div>
  );
}