import React from 'react';

export type BusinessTier = 'startup' | 'growth' | 'enterprise';

interface BusinessTierSwitcherProps {
  currentTier: BusinessTier;
  onChangeTier: (tier: BusinessTier) => void;
  className?: string;
}

export const BusinessTierSwitcher: React.FC<BusinessTierSwitcherProps> = ({
  currentTier,
  onChangeTier,
  className = '',
}) => {
  const tiers: { id: BusinessTier; label: string; sub: string; knobColor: string; activeColor: string }[] = [
    {
      id: 'startup',
      label: 'Стартап & Экспресс',
      sub: 'Запуск за 3–7 дней',
      knobColor: 'bg-clay-pine dark:bg-clay-mint',
      activeColor: 'text-clay-pine dark:text-clay-mint border-clay-pine/20',
    },
    {
      id: 'growth',
      label: 'E-com & Продажи',
      sub: 'Запуск за 1–2 недели',
      knobColor: 'bg-clay-coral dark:bg-clay-coral',
      activeColor: 'text-clay-coral dark:text-clay-coral border-clay-coral/20',
    },
    {
      id: 'enterprise',
      label: 'Enterprise & RAG',
      sub: 'Запуск за 2–4 недели',
      knobColor: 'bg-clay-sage dark:bg-clay-sage',
      activeColor: 'text-clay-pine dark:text-clay-dark-pine border-clay-sage/30',
    },
  ];

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {/* Label and Live Status */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-clay-pine/70 dark:text-clay-sage-soft">
          [ РЕЖИМ МАСШТАБА СИСТЕМЫ // 3-KNOB FLIGHT CONTROLLER ]
        </span>
        <span className="font-mono text-[11px] text-clay-coral font-medium">
          ● АВТОМАТИЧЕСКАЯ ПОДСТРОЙКА АРХИТЕКТУРЫ
        </span>
      </div>

      {/* Recessed Pill Track with 3 Knobs */}
      <div className="p-1.5 sm:p-2 rounded-squircle clay-inset grid grid-cols-1 sm:grid-cols-3 gap-2">
        {tiers.map((t) => {
          const isActive = currentTier === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChangeTier(t.id)}
              className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-squircle-sm text-left transition-all duration-200 select-none ${
                isActive
                  ? 'clay-card scale-[1.01] shadow-clay-card dark:shadow-clay-dark'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100'
              }`}
            >
              {/* Distinctive Pinterest-style 3D Rotary Knob */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 clay-knob transition-transform ${
                  isActive ? 'scale-105 ring-2 ring-clay-emerald/30' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-colors ${
                    isActive ? t.knobColor : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              </div>

              {/* Text Meta */}
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-xs sm:text-sm font-semibold truncate ${
                    isActive ? 'text-clay-pine dark:text-clay-dark-pine' : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t.label}
                </span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {t.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
