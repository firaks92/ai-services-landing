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
        <h3 className="text-xl sm:text-2xl font-bold text-clay-pine dark:text-clay-dark-pine mb-1">
          Какие ИИ-услуги вас интересуют в первую очередь?
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
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
              className={`w-full text-left p-4 rounded-squircle-sm border transition-all flex items-start justify-between select-none group ${
                isSelected
                  ? 'clay-card border-clay-emerald bg-clay-card-muted/80 dark:bg-clay-dark-muted shadow-sm'
                  : 'border-clay-border dark:border-clay-dark-border bg-white dark:bg-clay-dark-card hover:border-clay-sage'
              }`}
            >
              <div className="pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-clay-coral">[{srv.index}]</span>
                  <span className="text-sm sm:text-base font-semibold text-clay-pine dark:text-clay-dark-pine group-hover:text-clay-coral transition-colors">
                    {srv.title}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{srv.description}</p>
              </div>

              {/* Tactile Rotary Dial Radio Indicator */}
              <div
                className={`w-5 h-5 rounded-full clay-knob flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isSelected ? 'border-2 border-clay-emerald bg-clay-emerald text-white' : 'opacity-50'
                }`}
              >
                {isSelected && <span className="w-2 h-2 rounded-full bg-white block" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
