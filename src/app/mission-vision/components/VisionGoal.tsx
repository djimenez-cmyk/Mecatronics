'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface VisionGoalProps {
  icon: string;
  title: string;
  description: string;
  metric: string;
  index: number;
}

export default function VisionGoal({
  icon,
  title,
  description,
  metric,
  index,
}: VisionGoalProps) {
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
      <div className="bg-card rounded-lg p-6 shadow-brand border-l-4 border-accent">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="w-6 h-6 bg-accent/20 rounded" />
          </div>
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-40 mb-2" />
            <div className="space-y-2 mb-3">
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
            </div>
            <div className="h-6 bg-accent/10 rounded w-24" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-card rounded-lg p-6 shadow-brand hover:shadow-brand-lg border-l-4 border-accent transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name={icon as any} size={24} className="text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-heading font-bold text-text-primary mb-2">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            {description}
          </p>
          <div className="inline-flex items-center px-3 py-1 bg-accent/10 rounded-full">
            <span className="text-sm font-heading font-semibold text-accent">
              {metric}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}