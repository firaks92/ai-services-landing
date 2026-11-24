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
  const tiers: { id: BusinessTier; label: string; sub: string; glowColor: string }[] = [
    {
      id: 'startup',
      label: 'Стартап & Экспресс',
      sub: 'Запуск за 3–7 дней',
      glowColor: 'bg-dash-mint shadow-mint',
    },
    {
      id: 'growth',
      label: 'E-com & Продажи',
      sub: 'Запуск за 1–2 недели',
      glowColor: 'bg-dash-emerald shadow-emerald',
    },
    {
      id: 'enterprise',
      label: 'Enterprise & RAG',
      sub: 'Запуск за 2–4 недели',
      glowColor: 'bg-dash-cyan shadow-mint',
    },
  ];

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {/* Label and Live Status */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-dash-mint">
          [ РЕЖИМ МАСШТАБА СИСТЕМЫ // FLIGHT CONTROLLER ]
        </span>
        <span className="font-mono text-[11px] text-dash-emerald font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-dash-mint animate-pulse" />
          АВТОМАТИЧЕСКАЯ ПОДСТРОЙКА
        </span>
      </div>

      {/* Recessed Track with 3 Knobs */}
      <div className="p-1.5 sm:p-2 rounded-2xl glass-pill grid grid-cols-1 sm:grid-cols-3 gap-2">
        {tiers.map((t) => {
          const isActive = currentTier === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChangeTier(t.id)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all select-none ${
                isActive
                  ? 'bg-white dark:bg-dash-card border border-dash-mint/30 shadow-sm scale-[1.01]'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-65 hover:opacity-100'
              }`}
            >
              {/* Distinctive Pinterest-style Rotary Knob with Mint Glow */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 bg-slate-200 dark:bg-dash-track border border-slate-300 dark:border-white/10 transition-transform ${
                  isActive ? 'scale-110' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all ${
                    isActive ? t.glowColor : 'bg-slate-400 dark:bg-white/20'
                  }`}
                />
              </div>

              {/* Text Meta */}
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-xs sm:text-sm font-bold truncate ${
                    isActive ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-dash-muted'
                  }`}
                >
                  {t.label}
                </span>
                <span className="font-mono text-[10px] text-slate-400 dark:text-dash-subtle truncate">
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
