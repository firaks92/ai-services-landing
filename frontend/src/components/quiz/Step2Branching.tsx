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
        <div className="inline-block font-mono text-[11px] text-dash-cyan font-bold px-3 py-0.5 rounded-full bg-dash-track border border-dash-cyan/30 mb-2">
          {config.badgeTitle}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          {config.question}
        </h3>
        {config.subtitle && (
          <p className="font-mono text-xs text-dash-muted">{config.subtitle}</p>
        )}
      </div>

      {/* Case 1: Two-tier layout (Chatbot) */}
      {config.isTwoTier && config.tierA && config.tierB && (
        <div className="space-y-6">
          {/* Tier A: Channels (multi-select chips) */}
          <div>
            <div className="font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider mb-2.5">
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
                        ? 'bg-gradient-to-r from-dash-magenta to-dash-purple text-white border-dash-magenta shadow-neon-magenta'
                        : 'border-white/10 bg-dash-track text-dash-muted hover:border-dash-cyan/40 hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{channel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tier B: Main Objective */}
          <div>
            <div className="font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider mb-2.5">
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
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between select-none ${
                      isSelected
                        ? 'bg-gradient-to-r from-dash-card-hover to-dash-surface border-dash-cyan text-white shadow-neon-cyan'
                        : 'border-white/10 bg-dash-track/60 text-dash-muted hover:border-dash-purple/40 hover:text-white'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold">{goal}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-dash-cyan bg-dash-cyan' : 'border-white/20'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 bg-dash-bg rounded-full block" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Case 2: Single tier */}
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
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-dash-card-hover to-dash-surface border-dash-cyan text-white shadow-neon-cyan'
                    : 'border-white/10 bg-dash-track/60 text-dash-muted hover:border-dash-purple/40 hover:text-white'
                }`}
              >
                <span className="text-xs sm:text-sm font-semibold">{opt}</span>

                {config.singleTier?.multiSelect ? (
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-dash-magenta text-white shadow-neon-magenta' : 'border border-white/20'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-dash-cyan bg-dash-cyan' : 'border-white/20'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-dash-bg block" />}
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
