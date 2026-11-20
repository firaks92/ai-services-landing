import React from 'react';
import type { QuizState } from '../../types/quiz.js';
import { Terminal } from 'lucide-react';

interface LiveTicketProps {
  quizState: QuizState;
}

export const LiveTicket: React.FC<LiveTicketProps> = ({ quizState }) => {
  return (
    <div className="h-full bg-canvas border-r border-border-subtle p-5 font-mono text-xs text-ink-primary flex flex-col justify-between select-none">
      <div>
        {/* Header */}
        <div className="flex items-center gap-2 pb-3 border-b border-border-subtle mb-4 text-ink-muted">
          <Terminal className="w-3.5 h-3.5 text-signal" />
          <span className="font-semibold uppercase tracking-wider text-[11px]">
            СПЕЦИФИКАЦИЯ ЗАЯВКИ
          </span>
        </div>

        <div className="text-[11px] text-ink-muted mb-4">
          ID: {quizState.leadCode || 'AI-СБОРКА...'}
        </div>

        {/* Live Parameters */}
        <div className="space-y-3">
          <div>
            <div className="text-ink-muted text-[10px] uppercase">[01 / УСЛУГА]:</div>
            <div className="font-semibold text-ink-primary text-xs mt-0.5 line-clamp-2">
              {quizState.primaryService || '— Ожидание выбора...'}
            </div>
          </div>

          <div>
            <div className="text-ink-muted text-[10px] uppercase">[02 / ПАРАМЕТРЫ]:</div>
            <div className="text-ink-secondary text-xs mt-0.5 line-clamp-3">
              {quizState.serviceDetails.length > 0
                ? quizState.serviceDetails.join(', ')
                : '— На этапе уточнения'}
            </div>
          </div>

          <div>
            <div className="text-ink-muted text-[10px] uppercase">[03 / СФЕРА]:</div>
            <div className="text-ink-secondary text-xs mt-0.5">
              {quizState.industry || '— Не выбрана'}
            </div>
          </div>

          <div>
            <div className="text-ink-muted text-[10px] uppercase">[04 / СРОК И БЮДЖЕТ]:</div>
            <div className="text-ink-secondary text-xs mt-0.5">
              {quizState.budget
                ? `${quizState.budget}`
                : '— Ожидание расчета'}
            </div>
          </div>

          {quizState.cityInput && (
            <div>
              <div className="text-ink-muted text-[10px] uppercase">[05 / ЛОКАЦИЯ]:</div>
              <div className="text-blueprint text-xs mt-0.5">
                {quizState.cityInput}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Value statement at bottom */}
      <div className="pt-4 border-t border-border-subtle text-[11px] text-ink-secondary space-y-1">
        <div className="font-semibold text-ink-primary text-[10px] uppercase mb-1">
          ЧТО ВЫ ПОЛУЧИТЕ:
        </div>
        <div>• Ориентировочный расчет сметы</div>
        <div>• Архитектурную схему под вашу нишу</div>
        <div>• Прямой контакт инженера в Telegram</div>
      </div>
    </div>
  );
};
