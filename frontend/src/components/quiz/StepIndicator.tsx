import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps = 5 }) => {
  const timeRemainingMap: Record<number, string> = {
    1: '~60 СЕК',
    2: '~45 СЕК',
    3: '~30 СЕК',
    4: '~20 СЕК',
    5: '~10 СЕК',
  };

  const timeLeft = timeRemainingMap[currentStep] || '~10 СЕК';

  return (
    <div className="w-full pb-4 border-b border-slate-200 dark:border-white/10">
      <div className="flex items-center justify-between text-xs font-mono mb-2 text-slate-500 dark:text-dash-muted">
        <span className="font-bold text-slate-900 dark:text-white">
          КОНФИГУРАТОР // ШАГ 0{currentStep} ИЗ 0{totalSteps}
        </span>
        <span className="text-[11px] text-dash-mint font-bold px-2.5 py-0.5 rounded-full bg-dash-emerald/10 border border-dash-emerald/30">
          {timeLeft}
        </span>
      </div>

      {/* Segmented Glowing Progress Bar */}
      <div className="grid grid-cols-5 gap-2 h-2.5 w-full p-0.5 rounded-full bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-slate-200 dark:border-white/10">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={idx}
              className={`h-full rounded-full transition-all duration-300 ${
                isCompleted
                  ? 'bg-dash-emerald shadow-emerald'
                  : isCurrent
                  ? 'bg-gradient-to-r from-dash-mint to-dash-emerald shadow-mint'
                  : 'bg-black/10 dark:bg-white/10'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
