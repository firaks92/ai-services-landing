import React from 'react';
import { BRANCH_CONFIGS } from '../../config/quizConfig.js';
import type { ServiceCode } from '../../types/quiz.js';
import { Check } from 'lucide-react';

interface Step2BranchingProps {
  serviceCode: ServiceCode;
  selectedDetails: string[];
  onChangeDetails: (details: string[]) => void;
}

export const Step2Branching: React.FC<Step2BranchingProps> = ({
  serviceCode,
  selectedDetails,
  onChangeDetails,
}) => {
  const config = BRANCH_CONFIGS[serviceCode] || BRANCH_CONFIGS.chatbot;

  const toggleItem = (item: string) => {
    if (selectedDetails.includes(item)) {
      onChangeDetails(selectedDetails.filter((d) => d !== item));
    } else {
      onChangeDetails([...selectedDetails, item]);
    }
  };

  const setSingleInGroup = (item: string, groupOptions: string[]) => {
    const withoutGroup = selectedDetails.filter((d) => !groupOptions.includes(d));
    onChangeDetails([...withoutGroup, item]);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block font-mono text-[11px] text-clay-coral font-bold px-2.5 py-0.5 rounded-full clay-inset mb-2">
          {config.badgeTitle}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-clay-pine dark:text-clay-dark-pine mb-1">
          {config.question}
        </h3>
        {config.subtitle && (
          <p className="font-mono text-xs text-slate-500 dark:text-slate-400">{config.subtitle}</p>
        )}
      </div>

      {/* Case 1: Two-tier layout (Chatbot) */}
      {config.isTwoTier && config.tierA && config.tierB && (
        <div className="space-y-6">
          {/* Tier A: Channels (multi-select chips) */}
          <div>
            <div className="font-mono text-xs font-semibold text-clay-pine dark:text-clay-sage-soft uppercase tracking-wider mb-2.5">
              {config.tierA.title}
            </div>
            <div className="flex flex-wrap gap-2">
              {config.tierA.options.map((channel) => {
                const isSelected = selectedDetails.includes(channel);
                return (
                  <button
                    key={channel}
                    type="button"
                    onClick={() => toggleItem(channel)}
                    className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all flex items-center gap-1.5 select-none ${
                      isSelected
                        ? 'bg-clay-coral text-white border-clay-coral shadow-sm'
                        : 'border-clay-border dark:border-clay-dark-border bg-white dark:bg-clay-dark-card text-clay-pine dark:text-clay-dark-pine hover:border-clay-sage'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{channel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tier B: Main Objective (single select list) */}
          <div>
            <div className="font-mono text-xs font-semibold text-clay-pine dark:text-clay-sage-soft uppercase tracking-wider mb-2.5">
              {config.tierB.title}
            </div>
            <div className="space-y-2">
              {config.tierB.options.map((goal) => {
                const isSelected = selectedDetails.includes(goal);
                return (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setSingleInGroup(goal, config.tierB!.options)}
                    className={`w-full text-left p-3.5 rounded-squircle-sm border transition-all flex items-center justify-between select-none ${
                      isSelected
                        ? 'clay-card border-clay-emerald bg-clay-card-muted/80 dark:bg-clay-dark-muted shadow-sm'
                        : 'border-clay-border dark:border-clay-dark-border bg-white dark:bg-clay-dark-card hover:border-clay-sage'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold text-clay-pine dark:text-clay-dark-pine">{goal}</span>
                    <div
                      className={`w-4 h-4 rounded-full clay-knob flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-clay-emerald text-white' : 'opacity-40'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full block" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Case 2: Single tier (Multi or Single select) */}
      {!config.isTwoTier && config.singleTier && (
        <div className="space-y-2.5">
          {config.singleTier.options.map((opt) => {
            const isSelected = selectedDetails.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  if (config.singleTier!.multiSelect) {
                    toggleItem(opt);
                  } else {
                    onChangeDetails([opt]);
                  }
                }}
                className={`w-full text-left p-3.5 rounded-squircle-sm border transition-all flex items-center justify-between group select-none ${
                  isSelected
                    ? 'clay-card border-clay-emerald bg-clay-card-muted/80 dark:bg-clay-dark-muted shadow-sm'
                    : 'border-clay-border dark:border-clay-dark-border bg-white dark:bg-clay-dark-card hover:border-clay-sage'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold text-clay-pine dark:text-clay-dark-pine">{opt}</span>

                {config.singleTier?.multiSelect ? (
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-clay-coral text-white' : 'border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full clay-knob flex items-center justify-center ${
                      isSelected ? 'bg-clay-emerald text-white' : 'opacity-40'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white block" />}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
