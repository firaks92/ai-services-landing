import React from 'react';
import { TIMELINES, BUDGETS } from '../../config/quizConfig.js';

interface Step4TimelineBudgetProps {
  selectedTimeline: string;
  selectedBudget: string;
  onSelectTimeline: (t: string) => void;
  onSelectBudget: (b: string) => void;
}

export const Step4TimelineBudget: React.FC<Step4TimelineBudgetProps> = ({
  selectedTimeline,
  selectedBudget,
  onSelectTimeline,
  onSelectBudget,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-clay-pine dark:text-clay-dark-pine mb-1">
          Сроки запуска и ориентир по бюджету
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Помогает подобрать подходящую глубину решения: быстрый MVP или масштабную автоматизацию.
        </p>
      </div>

      {/* 4.1 Timeline */}
      <div>
        <div className="font-mono text-xs font-semibold text-clay-pine dark:text-clay-sage-soft uppercase tracking-wider mb-2.5">
          4.1 / ЖЕЛАЕМЫЕ СРОКИ ВНЕДРЕНИЯ
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {TIMELINES.map((t) => {
            const isSelected = selectedTimeline === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onSelectTimeline(t)}
                className={`p-3.5 text-left border rounded-squircle-sm transition-all text-xs font-semibold flex items-center justify-between select-none ${
                  isSelected
                    ? 'clay-card border-clay-emerald bg-clay-card-muted/80 dark:bg-clay-dark-muted shadow-sm text-clay-pine dark:text-clay-dark-pine'
                    : 'border-clay-border dark:border-clay-dark-border bg-white dark:bg-clay-dark-card hover:border-clay-sage text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{t}</span>
                <div
                  className={`w-4 h-4 rounded-full clay-knob shrink-0 ml-2 flex items-center justify-center ${
                    isSelected ? 'bg-clay-emerald text-white' : 'opacity-40'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full block" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4.2 Budget */}
      <div>
        <div className="font-mono text-xs font-semibold text-clay-pine dark:text-clay-sage-soft uppercase tracking-wider mb-2.5">
          4.2 / ПЛАНИРУЕМЫЙ БЮДЖЕТ
        </div>
        <div className="space-y-2">
          {BUDGETS.map((b) => {
            const isSelected = selectedBudget === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => onSelectBudget(b)}
                className={`w-full p-3.5 text-left border rounded-squircle-sm transition-all text-xs sm:text-sm font-semibold flex items-center justify-between select-none ${
                  isSelected
                    ? 'clay-card border-clay-emerald bg-clay-card-muted/80 dark:bg-clay-dark-muted shadow-sm text-clay-pine dark:text-clay-dark-pine'
                    : 'border-clay-border dark:border-clay-dark-border bg-white dark:bg-clay-dark-card hover:border-clay-sage text-slate-700 dark:text-slate-300'
                }`}
              >
                <span>{b}</span>
                <div
                  className={`w-4 h-4 rounded-full clay-knob shrink-0 flex items-center justify-center ${
                    isSelected ? 'bg-clay-emerald text-white' : 'opacity-40'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full block" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
