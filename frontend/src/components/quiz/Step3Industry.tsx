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
        <h3 className="text-xl sm:text-2xl font-bold text-ink-primary mb-1">
          В какой сфере работает ваш бизнес?
        </h3>
        <p className="text-xs text-ink-secondary">
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
                className={`w-full text-left p-3.5 rounded-sharp border transition-mechanical flex items-center justify-between group ${
                  isSelected
                    ? 'border-border-strong bg-surface-hover border-l-4 border-l-signal'
                    : 'border-border-subtle bg-surface hover:border-border-strong hover:bg-canvas'
                }`}
              >
                <span className="text-xs sm:text-sm font-medium text-ink-primary">{ind}</span>
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-signal bg-signal' : 'border-border-subtle group-hover:border-ink-primary'
                  }`}
                >
                  {isSelected && <span className="w-1 h-1 bg-surface rounded-full"></span>}
                </div>
              </button>

              {/* Expandable custom input for "Другое" */}
              {ind === 'Другое' && isSelected && (
                <div className="pt-2 pl-2">
                  <input
                    type="text"
                    value={customIndustry}
                    onChange={(e) => onChangeCustom(e.target.value)}
                    placeholder="Укажите вашу сферу (например: Автосервис, Юриспруденция)..."
                    className="w-full h-11 px-3 text-xs sm:text-sm bg-surface border border-border-strong rounded-sharp focus:outline-none focus:border-blueprint text-ink-primary placeholder:text-ink-muted"
                    autoFocus
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
