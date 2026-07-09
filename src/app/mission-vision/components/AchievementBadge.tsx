'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AchievementBadgeProps {
  icon: string;
  title: string;
  value: string;
  description: string;
  index: number;
}

export default function AchievementBadge({
  icon,
  title,
  value,
  description,
  index,
}: AchievementBadgeProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [isHydrated, index]);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg p-6 shadow-brand text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 bg-success/20 rounded-full" />
        </div>
        <div className="h-8 bg-muted rounded w-20 mx-auto mb-2" />
        <div className="h-4 bg-muted rounded w-32 mx-auto mb-2" />
        <div className="h-3 bg-muted rounded w-full" />
      </div>
    );
  }

  return (
    <div
      className={`bg-card rounded-lg p-6 shadow-brand hover:shadow-brand-lg text-center transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name={icon as any} size={32} className="text-success" />
      </div>
      <div className="text-3xl font-heading font-bold text-primary mb-2">
        {value}
      </div>
      <h4 className="text-base font-heading font-semibold text-text-primary mb-2">
        {title}
      </h4>
      <p className="text-sm text-text-secondary">
        {description}
      </p>
    </div>
  );
}