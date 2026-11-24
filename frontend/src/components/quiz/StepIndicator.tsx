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
    <div className="w-full pb-4 border-b border-clay-border dark:border-clay-dark-border">
      <div className="flex items-center justify-between text-xs font-mono mb-2 text-slate-500">
        <span className="font-bold text-clay-pine dark:text-clay-dark-pine">
          КОНФИГУРАТОР // ШАГ 0{currentStep} ИЗ 0{totalSteps}
        </span>
        <span className="text-[11px] text-clay-coral font-bold px-2 py-0.5 rounded-full clay-inset">
          {timeLeft}
        </span>
      </div>

      {/* Segmented Tactile Progress Bar */}
      <div className="grid grid-cols-5 gap-2 h-2 w-full p-0.5 rounded-full clay-inset">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={idx}
              className={`h-full rounded-full transition-all duration-300 ${
                isCompleted
                  ? 'bg-clay-pine dark:bg-clay-mint'
                  : isCurrent
                  ? 'bg-clay-coral shadow-sm'
                  : 'bg-transparent'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
