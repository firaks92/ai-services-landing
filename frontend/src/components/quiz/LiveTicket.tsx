import React from 'react';
import type { QuizState } from '../../types/quiz.js';
import { Plane, Ticket, ShieldCheck, Sparkles } from 'lucide-react';

interface LiveTicketProps {
  quizState: QuizState;
}

export const LiveTicket: React.FC<LiveTicketProps> = ({ quizState }) => {
  return (
    <div className="h-full bg-clay-card dark:bg-clay-dark-card p-6 font-mono text-xs text-clay-pine dark:text-clay-dark-pine flex flex-col justify-between select-none relative overflow-hidden border-r border-clay-border dark:border-clay-dark-border">
      {/* Top Pass Header */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-clay-border dark:border-clay-dark-border mb-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-clay-coral" />
            <span className="font-bold uppercase tracking-wider text-[11px]">
              BOARDING PASS // СПЕЦИФИКАЦИЯ
            </span>
          </div>
          <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-clay-mint/50 dark:bg-clay-sage/20 text-clay-emerald dark:text-clay-mint">
            GATE A-37
          </span>
        </div>

        {/* Flight & Spec ID */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-5">
          <span>СИСТЕМА: AI.FLIGHT-2026</span>
          <span className="text-clay-coral font-bold">{quizState.leadCode || 'AI-PROD-SPEC'}</span>
        </div>

        {/* Live Parameters */}
        <div className="space-y-3.5">
          <div className="p-2.5 rounded-squircle-sm clay-inset">
            <div className="text-slate-500 text-[10px] uppercase font-bold">[01 / ВЫБРАННЫЙ УЗЕЛ]:</div>
            <div className="font-semibold text-clay-pine dark:text-clay-dark-pine text-xs mt-0.5 line-clamp-2">
              {quizState.primaryService || '— Ожидание выбора в квизе...'}
            </div>
          </div>

          <div className="p-2.5 rounded-squircle-sm clay-inset">
            <div className="text-slate-500 text-[10px] uppercase font-bold">[02 / ПАРАМЕТРЫ ЗАДАЧИ]:</div>
            <div className="text-slate-700 dark:text-slate-300 text-xs mt-0.5 line-clamp-2">
              {quizState.serviceDetails.length > 0
                ? quizState.serviceDetails.join(', ')
                : '— На этапе конфигурации'}
            </div>
          </div>

          <div className="p-2.5 rounded-squircle-sm clay-inset">
            <div className="text-slate-500 text-[10px] uppercase font-bold">[03 / ОТРАСЛЬ И НИША]:</div>
            <div className="text-slate-700 dark:text-slate-300 text-xs mt-0.5">
              {quizState.industry || '— Не выбрана'}
            </div>
          </div>

          <div className="p-2.5 rounded-squircle-sm clay-inset">
            <div className="text-slate-500 text-[10px] uppercase font-bold">[04 / СРОК И БЮДЖЕТ]:</div>
            <div className="text-clay-emerald font-bold text-xs mt-0.5">
              {quizState.budget || '— Формируется расчет'}
            </div>
          </div>

          {quizState.cityInput && (
            <div className="p-2.5 rounded-squircle-sm clay-inset">
              <div className="text-slate-500 text-[10px] uppercase font-bold">[05 / ЛОКАЦИЯ]:</div>
              <div className="text-clay-pine dark:text-clay-mint font-semibold text-xs mt-0.5">
                {quizState.cityInput}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Perforated Divider (Tear-off notch effect) */}
      <div className="my-4 relative">
        <div className="border-b-2 border-dashed border-clay-border dark:border-clay-dark-border" />
      </div>

      {/* Barcode & Guarantee Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>PRIORITY PASS</span>
          <span>SLA: 99.8%</span>
        </div>

        {/* Pseudo Barcode */}
        <div className="text-center font-mono tracking-widest text-slate-400 dark:text-slate-500 text-[11px] select-none py-1">
          ||| | | |||| || | ||| |||| | || | |||
        </div>

        <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-1">
          <div>✓ Фиксированная смета до старта</div>
          <div>✓ NDA и защита коммерческой тайны</div>
          <div>✓ Прямой чат с инженером в Telegram</div>
        </div>
      </div>
    </div>
  );
};
