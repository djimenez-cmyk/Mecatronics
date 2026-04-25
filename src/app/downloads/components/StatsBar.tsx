'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stat {
  icon: string;
  label: string;
  value: string;
}

interface StatsBarProps {
  stats: Stat[];
}

const StatsBar = ({ stats }: StatsBarProps) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-primary/5 border-y border-primary/10 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-8 bg-muted rounded w-16 mx-auto mb-2"></div>
                <div className="h-4 bg-muted rounded w-24 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary/5 border-y border-primary/10 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={stat.icon as any} size={20} className="text-primary" />
                </div>
              </div>
              <div className="text-2xl font-heading font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary font-heading font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;