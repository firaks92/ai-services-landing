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
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Сроки запуска и ориентир по бюджету
        </h3>
        <p className="text-xs text-dash-muted">
          Помогает подобрать подходящую глубину решения: быстрый MVP или масштабную автоматизацию.
        </p>
      </div>

      {/* 4.1 Timeline */}
      <div>
        <div className="font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider mb-2.5">
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
                className={`p-3.5 text-left border rounded-xl transition-all text-xs font-semibold flex items-center justify-between select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-dash-card-hover to-dash-surface border-dash-cyan text-white shadow-neon-cyan'
                    : 'border-white/10 bg-dash-track/60 text-dash-muted hover:border-dash-purple/40 hover:text-white'
                }`}
              >
                <span>{t}</span>
                <div
                  className={`w-4 h-4 rounded-full border shrink-0 ml-2 flex items-center justify-center ${
                    isSelected ? 'border-dash-cyan bg-dash-cyan' : 'border-white/20'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-dash-bg rounded-full block" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4.2 Budget */}
      <div>
        <div className="font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider mb-2.5">
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
                className={`w-full p-3.5 text-left border rounded-xl transition-all text-xs sm:text-sm font-semibold flex items-center justify-between select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-dash-card-hover to-dash-surface border-dash-cyan text-white shadow-neon-cyan'
                    : 'border-white/10 bg-dash-track/60 text-dash-muted hover:border-dash-purple/40 hover:text-white'
                }`}
              >
                <span>{b}</span>
                <div
                  className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                    isSelected ? 'border-dash-cyan bg-dash-cyan' : 'border-white/20'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-dash-bg rounded-full block" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
