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
    <div className="w-full pb-4 border-b border-border-subtle">
      <div className="flex items-center justify-between text-xs font-mono mb-2 text-ink-muted">
        <span className="font-semibold text-ink-primary">
          ШАГ 0{currentStep} / 0{totalSteps}
        </span>
        <span className="text-[11px] text-ink-secondary">
          ОСТАЛОСЬ {timeLeft}
        </span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="grid grid-cols-5 gap-1.5 h-1.5 w-full">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={idx}
              className={`h-full rounded-sharp transition-all duration-300 ${
                isCompleted
                  ? 'bg-ink-primary'
                  : isCurrent
                  ? 'bg-signal'
                  : 'bg-border-subtle'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
