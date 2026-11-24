import React from 'react';
import type { QuizState } from '../../types/quiz.js';
import { Plane, Ticket, ShieldCheck, Sparkles, Cpu } from 'lucide-react';

interface LiveTicketProps {
  quizState: QuizState;
}

export const LiveTicket: React.FC<LiveTicketProps> = ({ quizState }) => {
  return (
    <div className="h-full bg-white/50 dark:bg-dash-card/70 backdrop-blur-xl p-6 font-mono text-xs text-slate-900 dark:text-dash-text flex flex-col justify-between select-none relative overflow-hidden border-r border-white/20 dark:border-white/10">
      {/* Top Pass Header */}
      <div>
        <div className="flex items-center justify-between pb-3.5 border-b border-white/20 dark:border-white/10 mb-4">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-dash-magenta" />
            <span className="font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-white">
              SPEC TICKET // СПЕЦИФИКАЦИЯ
            </span>
          </div>
          <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-dash-cyan/15 text-dash-cyan border border-dash-cyan/30">
            NODE A-37
          </span>
        </div>

        {/* Flight & Spec ID */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-dash-muted mb-5">
          <span>СИСТЕМА: AI.ENGINE-2026</span>
          <span className="text-dash-magenta font-bold">{quizState.leadCode || 'AI-PROD-SPEC'}</span>
        </div>

        {/* Live Parameters */}
        <div className="space-y-3.5">
          <div className="p-3 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/30 dark:border-white/10">
            <div className="text-slate-500 dark:text-dash-muted text-[10px] uppercase font-bold">[01 / ВЫБРАННЫЙ УЗЕЛ]:</div>
            <div className="font-bold text-slate-900 dark:text-white text-xs mt-0.5 line-clamp-2">
              {quizState.primaryService || '— Ожидание выбора в квизе...'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/30 dark:border-white/10">
            <div className="text-slate-500 dark:text-dash-muted text-[10px] uppercase font-bold">[02 / ПАРАМЕТРЫ ЗАДАЧИ]:</div>
            <div className="text-dash-cyan font-bold text-xs mt-0.5 line-clamp-2">
              {quizState.serviceDetails.length > 0
                ? quizState.serviceDetails.join(', ')
                : '— На этапе конфигурации'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/30 dark:border-white/10">
            <div className="text-slate-500 dark:text-dash-muted text-[10px] uppercase font-bold">[03 / ОТРАСЛЬ И НИША]:</div>
            <div className="text-slate-900 dark:text-white text-xs mt-0.5">
              {quizState.industry || '— Не выбрана'}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/30 dark:border-white/10">
            <div className="text-slate-500 dark:text-dash-muted text-[10px] uppercase font-bold">[04 / СРОК И БЮДЖЕТ]:</div>
            <div className="text-dash-lime font-bold text-xs mt-0.5">
              {quizState.budget || '— Формируется расчет'}
            </div>
          </div>

          {quizState.cityInput && (
            <div className="p-3 rounded-xl bg-dash-track border border-white/5">
              <div className="text-dash-muted text-[10px] uppercase font-bold">[05 / ЛОКАЦИЯ]:</div>
              <div className="text-dash-magenta font-semibold text-xs mt-0.5">
                {quizState.cityInput}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Perforated Divider */}
      <div className="my-4 relative">
        <div className="border-b-2 border-dashed border-white/10" />
      </div>

      {/* Barcode & Guarantee Summary */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[10px] text-dash-muted">
          <span>PRIORITY SLA</span>
          <span className="text-dash-lime font-bold">ONLINE 99.9%</span>
        </div>

        {/* Pseudo Barcode */}
        <div className="text-center font-mono tracking-widest text-dash-subtle text-[11px] select-none py-1">
          ||| | | |||| || | ||| |||| | || | |||
        </div>

        <div className="text-[10px] text-dash-muted space-y-1">
          <div>✓ Фиксированная смета до старта</div>
          <div>✓ NDA и защита коммерческой тайны</div>
          <div>✓ Прямой чат с инженером в Telegram</div>
        </div>
      </div>
    </div>
  );
};
