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

  // Toggle single item in multi-select array
  const toggleItem = (item: string) => {
    if (selectedDetails.includes(item)) {
      onChangeDetails(selectedDetails.filter((d) => d !== item));
    } else {
      onChangeDetails([...selectedDetails, item]);
    }
  };

  // Set single selection in a group
  const setSingleInGroup = (item: string, groupOptions: string[]) => {
    const withoutGroup = selectedDetails.filter((d) => !groupOptions.includes(d));
    onChangeDetails([...withoutGroup, item]);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block font-mono text-[11px] text-blueprint font-semibold px-2 py-0.5 bg-blueprint-soft rounded-sharp mb-2">
          {config.badgeTitle}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-ink-primary mb-1">
          {config.question}
        </h3>
        {config.subtitle && (
          <p className="font-mono text-xs text-ink-muted">{config.subtitle}</p>
        )}
      </div>

      {/* Case 1: Two-tier layout (Chatbot) */}
      {config.isTwoTier && config.tierA && config.tierB && (
        <div className="space-y-6">
          {/* Tier A: Channels (multi-select chips) */}
          <div>
            <div className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider mb-2.5">
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
                    className={`px-3.5 py-2 text-xs font-medium rounded-sharp border transition-mechanical flex items-center gap-1.5 ${
                      isSelected
                        ? 'border-signal bg-signal text-surface'
                        : 'border-border-subtle bg-surface hover:border-border-strong text-ink-primary'
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
            <div className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider mb-2.5">
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
                    className={`w-full text-left p-3 rounded-sharp border transition-mechanical flex items-center justify-between ${
                      isSelected
                        ? 'border-border-strong bg-surface-hover border-l-4 border-l-signal'
                        : 'border-border-subtle bg-surface hover:border-border-strong'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium text-ink-primary">{goal}</span>
                    <div
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-signal bg-signal' : 'border-border-subtle'
                      }`}
                    >
                      {isSelected && <span className="w-1 h-1 bg-surface rounded-full"></span>}
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
                className={`w-full text-left p-3.5 rounded-sharp border transition-mechanical flex items-center justify-between group ${
                  isSelected
                    ? 'border-border-strong bg-surface-hover border-l-4 border-l-signal'
                    : 'border-border-subtle bg-surface hover:border-border-strong hover:bg-canvas'
                }`}
              >
                <span className="text-xs sm:text-sm font-medium text-ink-primary">{opt}</span>

                {config.singleTier?.multiSelect ? (
                  <div
                    className={`w-4 h-4 rounded-sharp border flex items-center justify-center transition-colors ${
                      isSelected ? 'border-signal bg-signal text-surface' : 'border-border-subtle group-hover:border-ink-primary'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                ) : (
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-signal bg-signal' : 'border-border-subtle group-hover:border-ink-primary'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-surface"></span>}
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
