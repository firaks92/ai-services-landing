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
        <h3 className="text-xl sm:text-2xl font-bold text-ink-primary mb-1">
          Какие ИИ-услуги вас интересуют в первую очередь?
        </h3>
        <p className="text-xs text-ink-secondary">
          Выберите ключевое направление — вопросы следующего шага автоматически адаптируются под вашу задачу.
        </p>
      </div>

      <div className="space-y-2.5 pt-2">
        {AI_SERVICES.map((srv, idx) => {
          const isSelected = selectedCode === srv.code;
          return (
            <button
              key={srv.code}
              type="button"
              onClick={() => onSelect(srv.code, srv.title)}
              className={`w-full text-left p-4 rounded-sharp border transition-mechanical flex items-start justify-between group ${
                isSelected
                  ? 'border-border-strong bg-surface-hover border-l-4 border-l-signal'
                  : 'border-border-subtle bg-surface hover:border-border-strong hover:bg-canvas'
              }`}
            >
              <div className="pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-signal">[{srv.index}]</span>
                  <span className="text-sm sm:text-base font-semibold text-ink-primary group-hover:text-signal transition-colors">
                    {srv.title}
                  </span>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed">{srv.description}</p>
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-4 h-4 rounded-full border mt-1 flex items-center justify-center flex-shrink-0 transition-colors ${
                  isSelected ? 'border-signal bg-signal' : 'border-border-subtle group-hover:border-ink-primary'
                }`}
              >
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-surface"></span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
