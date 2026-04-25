'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOption {
  label: string;
  count: number;
}

interface FilterSidebarProps {
  categories: FilterOption[];
  fileTypes: FilterOption[];
  selectedCategory: string;
  selectedFileType: string;
  onCategoryChange: (category: string) => void;
  onFileTypeChange: (fileType: string) => void;
  onReset: () => void;
}

const FilterSidebar = ({
  categories,
  fileTypes,
  selectedCategory,
  selectedFileType,
  onCategoryChange,
  onFileTypeChange,
  onReset,
}: FilterSidebarProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="lg:w-80 bg-card rounded-lg border border-border p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-10 bg-muted rounded"></div>
            <div className="h-10 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  const hasActiveFilters = selectedCategory !== 'All' || selectedFileType !== 'All';

  return (
    <>
      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-brand-lg flex items-center justify-center"
      >
        <Icon name="FunnelIcon" size={24} />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Filter Sidebar */}
      <div
        className={`fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] lg:h-auto w-80 bg-card rounded-lg border border-border overflow-y-auto z-50 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-text-primary flex items-center space-x-2">
              <Icon name="FunnelIcon" size={24} />
              <span>Filters</span>
            </h2>
            {hasActiveFilters && (
              <button
                onClick={onReset}
                className="text-sm text-primary hover:text-primary/80 font-heading font-semibold transition-colors duration-200"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-heading font-bold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="TagIcon" size={18} />
              <span>Category</span>
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.label}
                  onClick={() => onCategoryChange(category.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-heading font-medium transition-all duration-200 ${
                    selectedCategory === category.label
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-text-primary hover:bg-muted/80'
                  }`}
                >
                  <span>{category.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-heading font-semibold ${
                      selectedCategory === category.label
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-background text-text-secondary'
                    }`}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* File Type Filter */}
          <div>
            <h3 className="text-sm font-heading font-bold text-text-primary mb-3 flex items-center space-x-2">
              <Icon name="DocumentTextIcon" size={18} />
              <span>File Type</span>
            </h3>
            <div className="space-y-2">
              {fileTypes.map((fileType) => (
                <button
                  key={fileType.label}
                  onClick={() => onFileTypeChange(fileType.label)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-heading font-medium transition-all duration-200 ${
                    selectedFileType === fileType.label
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-text-primary hover:bg-muted/80'
                  }`}
                >
                  <span>{fileType.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-heading font-semibold ${
                      selectedFileType === fileType.label
                        ? 'bg-primary-foreground/20 text-primary-foreground'
                        : 'bg-background text-text-secondary'
                    }`}
                  >
                    {fileType.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;