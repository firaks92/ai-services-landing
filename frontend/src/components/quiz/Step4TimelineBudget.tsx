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
        <h3 className="text-xl sm:text-2xl font-bold text-ink-primary mb-1">
          Сроки запуска и ориентир по бюджету
        </h3>
        <p className="text-xs text-ink-secondary">
          Помогает подобрать подходящую глубину решения: быстрый MVP или масштабную автоматизацию.
        </p>
      </div>

      {/* 4.1 Timeline */}
      <div>
        <div className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider mb-2.5">
          4.1 / ЖЕЛАЕМЫЕ СРОКИ ВНЕДРЕНИЯ
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {TIMELINES.map((t) => {
            const isSelected = selectedTimeline === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => onSelectTimeline(t)}
                className={`p-3 text-left border rounded-sharp transition-mechanical text-xs font-medium flex items-center justify-between ${
                  isSelected
                    ? 'border-border-strong bg-surface-hover border-l-4 border-l-signal text-ink-primary'
                    : 'border-border-subtle bg-surface hover:border-border-strong text-ink-secondary'
                }`}
              >
                <span>{t}</span>
                <div
                  className={`w-3 h-3 rounded-full border flex-shrink-0 ml-2 flex items-center justify-center ${
                    isSelected ? 'border-signal bg-signal' : 'border-border-subtle'
                  }`}
                >
                  {isSelected && <span className="w-1 h-1 bg-surface rounded-full"></span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4.2 Budget */}
      <div>
        <div className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider mb-2.5">
          4.2 / ОРИЕНТИРОВОЧНЫЙ БЮДЖЕТ ПРОЕКТА
        </div>
        <div className="space-y-2">
          {BUDGETS.map((b) => {
            const isSelected = selectedBudget === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => onSelectBudget(b)}
                className={`w-full p-3 text-left border rounded-sharp transition-mechanical text-xs sm:text-sm font-medium flex items-center justify-between ${
                  isSelected
                    ? 'border-border-strong bg-surface-hover border-l-4 border-l-signal text-ink-primary'
                    : 'border-border-subtle bg-surface hover:border-border-strong text-ink-secondary'
                }`}
              >
                <span>{b}</span>
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 ml-2 flex items-center justify-center ${
                    isSelected ? 'border-signal bg-signal' : 'border-border-subtle'
                  }`}
                >
                  {isSelected && <span className="w-1 h-1 bg-surface rounded-full"></span>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
