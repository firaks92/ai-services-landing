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
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          В какой сфере работает ваш бизнес?
        </h3>
        <p className="text-xs text-dash-muted">
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
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-dash-card-hover to-dash-surface border-dash-cyan text-white shadow-neon-cyan'
                    : 'border-white/10 bg-dash-track/60 text-dash-muted hover:border-dash-purple/40 hover:text-white'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold">{ind}</span>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-dash-cyan bg-dash-cyan' : 'border-white/20'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-dash-bg rounded-full block" />}
                </div>
              </button>

              {ind === 'Другое' && isSelected && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={customIndustry}
                    onChange={(e) => onChangeCustom(e.target.value)}
                    placeholder="Укажите вашу сферу (например: Автосервис, Юриспруденция)..."
                    className="w-full h-11 px-4 text-xs sm:text-sm bg-dash-track border border-white/20 rounded-xl focus:outline-none focus:border-dash-cyan text-white placeholder:text-dash-subtle"
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
