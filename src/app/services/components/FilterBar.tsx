'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterBarProps {
  selectedCategory: string;
  selectedIndustry: string;
  selectedComplexity: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onIndustryChange: (industry: string) => void;
  onComplexityChange: (complexity: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

const FilterBar = ({
  selectedCategory,
  selectedIndustry,
  selectedComplexity,
  searchQuery,
  onCategoryChange,
  onIndustryChange,
  onComplexityChange,
  onSearchChange,
  onClearFilters,
}: FilterBarProps) => {
  const categories = [
    'Todos',
    'Automatización Industrial',
    'Robótica',
    'Control de Procesos',
    'Sistemas Mecatrónicos',
    'Mantenimiento',
  ];

  const industries = [
    'Todas',
    'Manufactura',
    'Automotriz',
    'Alimentaria',
    'Farmacéutica',
    'Química',
  ];

  const complexities = ['Todas', 'Básica', 'Intermedia', 'Avanzada'];

  const hasActiveFilters =
    selectedCategory !== 'Todos' ||
    selectedIndustry !== 'Todas' ||
    selectedComplexity !== 'Todas' ||
    searchQuery !== '';

  return (
    <div className="bg-card rounded-lg shadow-brand p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-xl font-heading font-bold text-text-primary">
          Filtrar Servicios
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-heading font-semibold text-error hover:text-error/80 transition-colors duration-200"
          >
            <Icon name="XMarkIcon" size={16} />
            <span>Limpiar Filtros</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-4">
          <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
            Búsqueda
          </label>
          <div className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar servicios, productos o especificaciones..."
              className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-md text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
            Categoría
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Industry Filter */}
        <div>
          <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
            Industria
          </label>
          <select
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          >
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Complexity Filter */}
        <div>
          <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
            Complejidad
          </label>
          <select
            value={selectedComplexity}
            onChange={(e) => onComplexityChange(e.target.value)}
            className="w-full px-4 py-2.5 bg-input border border-border rounded-md text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          >
            {complexities.map((complexity) => (
              <option key={complexity} value={complexity}>
                {complexity}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        {/*
        <div className="flex items-end">
          <div className="w-full px-4 py-2.5 bg-primary/10 border border-primary/20 rounded-md">
            <p className="text-sm font-heading font-semibold text-primary">
              Resultados encontrados
            </p>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default FilterBar;