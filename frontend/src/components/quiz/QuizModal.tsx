import React, { useEffect } from 'react';
import type { QuizState, ServiceCode } from '../../types/quiz.js';
import { StepIndicator } from './StepIndicator.js';
import { LiveTicket } from './LiveTicket.js';
import { Step1Services } from './Step1Services.js';
import { Step2Branching } from './Step2Branching.js';
import { Step3Industry } from './Step3Industry.js';
import { Step4TimelineBudget } from './Step4TimelineBudget.js';
import { Step5ResidentForm } from './Step5ResidentForm.js';
import { ThankYouScreen } from './ThankYouScreen.js';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizState: QuizState;
  onUpdateState: (updates: Partial<QuizState>) => void;
  onSubmit: () => void;
  onOpenPrivacy: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  quizState,
  onUpdateState,
  onSubmit,
  onOpenPrivacy,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentStep = quizState.step;

  const handleNext = () => {
    if (currentStep < 5) {
      onUpdateState({ step: currentStep + 1 });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      onUpdateState({ step: currentStep - 1 });
    }
  };

  const handleSelectService = (code: ServiceCode, title: string) => {
    onUpdateState({
      serviceCode: code,
      primaryService: title,
      serviceDetails: [],
    });
    setTimeout(() => {
      onUpdateState({ step: 2 });
    }, 240);
  };

  const canGoNext = () => {
    if (currentStep === 1) return Boolean(quizState.serviceCode);
    if (currentStep === 2) return quizState.serviceDetails.length > 0;
    if (currentStep === 3) return Boolean(quizState.industry);
    if (currentStep === 4) return Boolean(quizState.timeline && quizState.budget);
    return true;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Side Sheet Drawer with Squircle Styling */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl lg:max-w-4xl h-full bg-clay-bg dark:bg-clay-dark-bg flex flex-col md:flex-row shadow-2xl border-l border-clay-border dark:border-clay-dark-border"
      >
        {/* Left Column (Desktop only): Live Engineer Boarding Pass */}
        <div className="hidden lg:block w-72 shrink-0">
          <LiveTicket quizState={quizState} />
        </div>

        {/* Right Main Working Area */}
        <div className="flex-1 flex flex-col justify-between h-full overflow-hidden bg-clay-bg dark:bg-clay-dark-bg">
          {/* Top Bar: Progress & Close */}
          <div className="p-4 sm:p-6 border-b border-clay-border dark:border-clay-dark-border shrink-0">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold text-clay-pine dark:text-clay-sage-soft uppercase tracking-wider">
                FLIGHT DECK // КОНФИГУРАТОР ИИ
              </span>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-clay-coral px-3 py-1 rounded-full clay-inset transition-colors"
                title="Закрыть окно (Esc)"
              >
                <span>ESC / Закрыть</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {currentStep <= 5 && <StepIndicator currentStep={currentStep} />}
          </div>

          {/* Middle: Step Content */}
          <div className="flex-1 p-4 sm:p-8 overflow-y-auto min-h-[380px]">
            {currentStep === 1 && (
              <Step1Services
                selectedCode={quizState.serviceCode}
                onSelect={handleSelectService}
              />
            )}

            {currentStep === 2 && quizState.serviceCode && (
              <Step2Branching
                serviceCode={quizState.serviceCode}
                selectedDetails={quizState.serviceDetails}
                onChangeDetails={(details) => onUpdateState({ serviceDetails: details })}
              />
            )}

            {currentStep === 3 && (
              <Step3Industry
                selectedIndustry={quizState.industry}
                customIndustry={quizState.customIndustry}
                onSelectIndustry={(ind) => {
                  onUpdateState({ industry: ind });
                  if (ind !== 'Другое') {
                    setTimeout(() => onUpdateState({ step: 4 }), 240);
                  }
                }}
                onChangeCustom={(val) => onUpdateState({ customIndustry: val, industry: val })}
              />
            )}

            {currentStep === 4 && (
              <Step4TimelineBudget
                selectedTimeline={quizState.timeline}
                selectedBudget={quizState.budget}
                onSelectTimeline={(t) => onUpdateState({ timeline: t })}
                onSelectBudget={(b) => {
                  onUpdateState({ budget: b });
                  setTimeout(() => onUpdateState({ step: 5 }), 240);
                }}
              />
            )}

            {currentStep === 5 && (
              <Step5ResidentForm
                primaryService={quizState.primaryService}
                name={quizState.residentName}
                cityInput={quizState.cityInput}
                cityAutofilled={quizState.cityAutofilled}
                preferredChannel={quizState.preferredChannel}
                phone={quizState.phone}
                telegramUsername={quizState.telegramUsername}
                comment={quizState.comment}
                consentAccepted={quizState.consentAccepted}
                isSubmitting={quizState.isSubmitting}
                submitError={quizState.submitError}
                onUpdate={(fields) => {
                  const mapped: Partial<QuizState> = {};
                  if (fields.name !== undefined) mapped.residentName = fields.name;
                  if (fields.cityInput !== undefined) mapped.cityInput = fields.cityInput;
                  if (fields.preferredChannel !== undefined) mapped.preferredChannel = fields.preferredChannel;
                  if (fields.phone !== undefined) mapped.phone = fields.phone;
                  if (fields.telegramUsername !== undefined) mapped.telegramUsername = fields.telegramUsername;
                  if (fields.comment !== undefined) mapped.comment = fields.comment;
                  if (fields.consentAccepted !== undefined) mapped.consentAccepted = fields.consentAccepted;
                  onUpdateState(mapped);
                }}
                onSubmit={onSubmit}
                onOpenPrivacy={onOpenPrivacy}
              />
            )}

            {currentStep === 6 && (
              <ThankYouScreen
                quizState={quizState}
                onReset={() => onUpdateState({ step: 1, serviceCode: null, primaryService: '', serviceDetails: [] })}
                onEditContacts={() => onUpdateState({ step: 5 })}
              />
            )}
          </div>

          {/* Bottom Bar: Back & Next Buttons */}
          {currentStep < 5 && (
            <div className="p-4 sm:p-6 border-t border-clay-border dark:border-clay-dark-border flex items-center justify-between shrink-0 bg-clay-bg dark:bg-clay-dark-bg">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-500 hover:text-clay-pine dark:hover:text-white px-4 py-2 rounded-full clay-inset transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>НАЗАД</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext()}
                className="flex items-center gap-2 bg-clay-coral hover:bg-clay-coral-hover disabled:opacity-40 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-clay-btn transition-all select-none"
              >
                <span>ДАЛЕЕ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
