'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface ROICalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROICalculator = ({ isOpen, onClose }: ROICalculatorProps) => {
  const [currentCost, setCurrentCost] = useState<string>('');
  const [laborHours, setLaborHours] = useState<string>('');
  const [errorRate, setErrorRate] = useState<string>('');
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  if (!isOpen) return null;

  const calculateROI = () => {
    const cost = parseFloat(currentCost) || 0;
    const hours = parseFloat(laborHours) || 0;
    const errors = parseFloat(errorRate) || 0;
    const investment = parseFloat(investmentAmount) || 0;

    const annualSavings = cost * 12 + hours * 25 * 12 + errors * 500 * 12;
    const roi = ((annualSavings - investment) / investment) * 100;
    const paybackMonths = (investment / (annualSavings / 12)).toFixed(1);

    return {
      annualSavings: annualSavings.toFixed(0),
      roi: roi.toFixed(1),
      paybackMonths,
    };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setCurrentCost('');
    setLaborHours('');
    setErrorRate('');
    setInvestmentAmount('');
    setShowResults(false);
  };

  const results = showResults ? calculateROI() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-card rounded-lg shadow-brand-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            Calculadora de ROI
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-text-secondary mb-6">
            Calcule el retorno de inversión estimado para su proyecto de
            automatización. Complete los campos con sus datos actuales.
          </p>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                Costo Operativo Mensual Actual (€)
              </label>
              <input
                type="number"
                value={currentCost}
                onChange={(e) => setCurrentCost(e.target.value)}
                placeholder="5000"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-md text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                Horas de Trabajo Manual Mensuales
              </label>
              <input
                type="number"
                value={laborHours}
                onChange={(e) => setLaborHours(e.target.value)}
                placeholder="160"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-md text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                Tasa de Error Mensual (%)
              </label>
              <input
                type="number"
                value={errorRate}
                onChange={(e) => setErrorRate(e.target.value)}
                placeholder="5"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-md text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-heading font-semibold text-text-primary mb-2">
                Inversión en Automatización (€)
              </label>
              <input
                type="number"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value)}
                placeholder="50000"
                className="w-full px-4 py-2.5 bg-input border border-border rounded-md text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {showResults && results && (
            <div className="bg-success/10 border border-success/20 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-heading font-bold text-success mb-4">
                Resultados del Análisis
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name="CurrencyEuroIcon"
                      size={20}
                      className="text-success"
                      variant="solid"
                    />
                    <span className="text-xs font-heading font-semibold text-text-secondary">
                      Ahorro Anual
                    </span>
                  </div>
                  <p className="text-2xl font-heading font-bold text-success">
                    €{parseInt(results.annualSavings).toLocaleString()}
                  </p>
                </div>

                <div className="bg-card rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name="ChartBarIcon"
                      size={20}
                      className="text-primary"
                      variant="solid"
                    />
                    <span className="text-xs font-heading font-semibold text-text-secondary">
                      ROI
                    </span>
                  </div>
                  <p className="text-2xl font-heading font-bold text-primary">
                    {results.roi}%
                  </p>
                </div>

                <div className="bg-card rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon
                      name="ClockIcon"
                      size={20}
                      className="text-accent"
                      variant="solid"
                    />
                    <span className="text-xs font-heading font-semibold text-text-secondary">
                      Recuperación
                    </span>
                  </div>
                  <p className="text-2xl font-heading font-bold text-accent">
                    {results.paybackMonths} meses
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-card rounded-lg">
                <p className="text-sm text-text-secondary">
                  <strong className="text-text-primary">Nota:</strong> Estos
                  cálculos son estimaciones basadas en promedios de la industria.
                  Los resultados reales pueden variar según las condiciones
                  específicas de su operación.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {!showResults ? (
              <button
                onClick={handleCalculate}
                className="flex-1 px-6 py-3 bg-primary text-primary-foreground text-sm font-heading font-semibold rounded-md hover:bg-primary/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand"
              >
                Calcular ROI
              </button>
            ) : (
              <>
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 bg-surface text-text-primary border border-border text-sm font-heading font-semibold rounded-md hover:bg-muted transition-colors duration-300"
                >
                  Nuevo Cálculo
                </button>
                <button className="flex-1 px-6 py-3 bg-conversion text-conversion-foreground text-sm font-heading font-semibold rounded-md hover:bg-conversion/90 transition-all duration-300 hover:-translate-y-0.5 shadow-brand-sm hover:shadow-brand">
                  Solicitar Consulta Personalizada
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;