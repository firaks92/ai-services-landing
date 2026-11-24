import React from 'react';
import { AI_SERVICES } from '../../config/quizConfig.js';
import type { ServiceCode } from '../../types/quiz.js';

interface Step1ServicesProps {
  selectedCode: ServiceCode | null;
  onSelect: (code: ServiceCode, title: string) => void;
}

export const Step1Services: React.FC<Step1ServicesProps> = ({ selectedCode, onSelect }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
          Какие ИИ-услуги вас интересуют в первую очередь?
        </h3>
        <p className="text-xs text-slate-500 dark:text-dash-muted">
          Выберите ключевое направление — вопросы следующего шага автоматически адаптируются под вашу задачу.
        </p>
      </div>

      <div className="space-y-2.5 pt-2">
        {AI_SERVICES.map((srv) => {
          const isSelected = selectedCode === srv.code;
          return (
            <button
              key={srv.code}
              type="button"
              onClick={() => onSelect(srv.code, srv.title)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between select-none group ${
                isSelected
                  ? 'bg-dash-emerald/10 border-dash-mint shadow-mint'
                  : 'border-slate-200 dark:border-white/10 bg-white/60 dark:bg-dash-track/60 hover:border-dash-mint/50'
              }`}
            >
              <div className="pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-dash-mint">[{srv.index}]</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-dash-mint transition-colors">
                    {srv.title}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-dash-muted leading-relaxed">{srv.description}</p>
              </div>

              {/* Glowing Radio Indicator */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                  isSelected
                    ? 'border-dash-mint bg-dash-mint shadow-mint text-dash-dark'
                    : 'border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-dash-track'
                }`}
              >
                {isSelected && <span className="w-2 h-2 rounded-full bg-dash-dark block" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
