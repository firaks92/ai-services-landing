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
      glowColor: 'bg-dash-cyan shadow-neon-cyan',
    },
    {
      id: 'growth',
      label: 'E-com & Продажи',
      sub: 'Запуск за 1–2 недели',
      glowColor: 'bg-dash-magenta shadow-neon-magenta',
    },
    {
      id: 'enterprise',
      label: 'Enterprise & RAG',
      sub: 'Запуск за 2–4 недели',
      glowColor: 'bg-dash-purple shadow-neon-purple',
    },
  ];

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {/* Label and Live Status */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-dash-cyan">
          [ РЕЖИМ МАСШТАБА СИСТЕМЫ // FLIGHT CONTROLLER ]
        </span>
        <span className="font-mono text-[11px] text-dash-magenta font-semibold">
          ● АВТОМАТИЧЕСКАЯ ПОДСТРОЙКА АРХИТЕКТУРЫ
        </span>
      </div>

      {/* Recessed Track with 3 Knobs */}
      <div className="p-1.5 sm:p-2 rounded-2xl bg-dash-track border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
        {tiers.map((t) => {
          const isActive = currentTier === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChangeTier(t.id)}
              className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all select-none ${
                isActive
                  ? 'bg-gradient-to-r from-dash-card-hover to-dash-surface border border-white/20 shadow-neon-card scale-[1.01]'
                  : 'hover:bg-white/5 opacity-65 hover:opacity-100'
              }`}
            >
              {/* Distinctive Pinterest-style Rotary Knob with Neon Glow */}
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 bg-dash-track border border-white/15 transition-transform ${
                  isActive ? 'scale-110' : 'opacity-60'
                }`}
              >
                <div
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all ${
                    isActive ? t.glowColor : 'bg-white/20'
                  }`}
                />
              </div>

              {/* Text Meta */}
              <div className="flex flex-col min-w-0">
                <span
                  className={`text-xs sm:text-sm font-bold truncate ${
                    isActive ? 'text-white' : 'text-dash-muted'
                  }`}
                >
                  {t.label}
                </span>
                <span className="font-mono text-[10px] text-dash-subtle truncate">
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
