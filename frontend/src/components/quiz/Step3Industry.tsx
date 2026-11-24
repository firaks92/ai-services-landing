import React from 'react';
import { INDUSTRIES } from '../../config/quizConfig.js';

interface Step3IndustryProps {
  selectedIndustry: string;
  customIndustry: string;
  onSelectIndustry: (ind: string) => void;
  onChangeCustom: (val: string) => void;
}

export const Step3Industry: React.FC<Step3IndustryProps> = ({
  selectedIndustry,
  customIndustry,
  onSelectIndustry,
  onChangeCustom,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-clay-pine dark:text-clay-dark-pine mb-1">
          В какой сфере работает ваш бизнес?
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Это поможет архитектору сразу подобрать готовые кейсы и структуру интеграций под вашу специфику.
        </p>
      </div>

      <div className="space-y-2 pt-2">
        {INDUSTRIES.map((ind) => {
          const isSelected = selectedIndustry === ind;
          return (
            <div key={ind}>
              <button
                type="button"
                onClick={() => onSelectIndustry(ind)}
                className={`w-full text-left p-3.5 rounded-squircle-sm border transition-all flex items-center justify-between select-none ${
                  isSelected
                    ? 'clay-card border-clay-emerald bg-clay-card-muted/80 dark:bg-clay-dark-muted shadow-sm'
                    : 'border-clay-border dark:border-clay-dark-border bg-white dark:bg-clay-dark-card hover:border-clay-sage'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold text-clay-pine dark:text-clay-dark-pine">{ind}</span>
                <div
                  className={`w-4 h-4 rounded-full clay-knob flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-clay-emerald text-white' : 'opacity-40'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full block" />}
                </div>
              </button>

              {/* Expandable custom input for "Другое" */}
              {ind === 'Другое' && isSelected && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={customIndustry}
                    onChange={(e) => onChangeCustom(e.target.value)}
                    placeholder="Укажите вашу сферу (например: Автосервис, Юриспруденция)..."
                    className="w-full h-11 px-4 text-xs sm:text-sm bg-white dark:bg-clay-dark-card border border-clay-border dark:border-clay-dark-border rounded-squircle-sm focus:outline-none focus:border-clay-emerald text-clay-pine dark:text-clay-dark-pine placeholder:text-slate-400"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
