'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface FilterBarProps {
  industries: FilterOption[];
  solutions: FilterOption[];
  onFilterChange: (filters: { industry: string; solution: string; search: string }) => void;
}

const FilterBar = ({ industries, solutions, onFilterChange }: FilterBarProps) => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedSolution, setSelectedSolution] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);

  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value);
    setIsIndustryOpen(false);
    onFilterChange({ industry: value, solution: selectedSolution, search: searchQuery });
  };

  const handleSolutionChange = (value: string) => {
    setSelectedSolution(value);
    setIsSolutionOpen(false);
    onFilterChange({ industry: selectedIndustry, solution: value, search: searchQuery });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onFilterChange({ industry: selectedIndustry, solution: selectedSolution, search: value });
  };

  const handleClearFilters = () => {
    setSelectedIndustry('all');
    setSelectedSolution('all');
    setSearchQuery('');
    onFilterChange({ industry: 'all', solution: 'all', search: '' });
  };

  const activeFiltersCount = 
    (selectedIndustry !== 'all' ? 1 : 0) + 
    (selectedSolution !== 'all' ? 1 : 0) + 
    (searchQuery ? 1 : 0);

  return (
    <div className="bg-card rounded-lg shadow-brand p-6 border border-border">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Industry Filter */}
        <div className="relative w-full lg:w-64">
          <button
            onClick={() => {
              setIsIndustryOpen(!isIndustryOpen);
              setIsSolutionOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-3 bg-input border border-border rounded-md text-foreground hover:bg-surface transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <Icon name="BuildingOfficeIcon" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">
                {industries.find(i => i.id === selectedIndustry)?.label || 'Industria'}
              </span>
            </span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`text-muted-foreground transition-transform duration-200 ${
                isIndustryOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isIndustryOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-md shadow-brand-lg border border-border overflow-hidden z-10">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleIndustryChange(industry.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors duration-200 ${
                    selectedIndustry === industry.id
                      ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-surface'
                  }`}
                >
                  <span>{industry.label}</span>
                  <span className="text-xs text-muted-foreground">({industry.count})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Solution Filter */}
        <div className="relative w-full lg:w-64">
          <button
            onClick={() => {
              setIsSolutionOpen(!isSolutionOpen);
              setIsIndustryOpen(false);
            }}
            className="w-full flex items-center justify-between px-4 py-3 bg-input border border-border rounded-md text-foreground hover:bg-surface transition-colors duration-200"
          >
            <span className="flex items-center gap-2">
              <Icon name="CogIcon" size={20} className="text-muted-foreground" />
              <span className="text-sm font-medium">
                {solutions.find(s => s.id === selectedSolution)?.label || 'Solución'}
              </span>
            </span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`text-muted-foreground transition-transform duration-200 ${
                isSolutionOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isSolutionOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-md shadow-brand-lg border border-border overflow-hidden z-10">
              {solutions.map((solution) => (
                <button
                  key={solution.id}
                  onClick={() => handleSolutionChange(solution.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors duration-200 ${
                    selectedSolution === solution.id
                      ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-surface'
                  }`}
                >
                  <span>{solution.label}</span>
                  <span className="text-xs text-muted-foreground">({solution.count})</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Clear Filters Button */}
        {activeFiltersCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-heading font-semibold rounded-md hover:bg-secondary/90 transition-colors duration-300 whitespace-nowrap"
          >
            <Icon name="XMarkIcon" size={20} />
            <span>Limpiar ({activeFiltersCount})</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;