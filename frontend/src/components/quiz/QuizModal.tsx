import React, { useEffect, useState } from 'react';
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
  // Prevent body scroll when modal is open
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

  // Handle ESC key
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
      serviceDetails: [], // Reset details when service changes
    });
    // Auto-advance with 240ms delay per DESIGN.md
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
      className="fixed inset-0 z-50 flex justify-end bg-ink-primary/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      {/* Side Sheet Drawer */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-2xl lg:max-w-4xl h-full bg-surface flex flex-col md:flex-row shadow-drawer border-l border-border-subtle animate-slideInRight"
      >
        {/* Left Column (Desktop only): Live Engineer Ticket */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <LiveTicket quizState={quizState} />
        </div>

        {/* Right Main Working Area */}
        <div className="flex-1 flex flex-col justify-between h-full overflow-hidden bg-surface">
          {/* Top Bar: Progress & Close */}
          <div className="p-4 sm:p-6 border-b border-border-subtle flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider">
                ИНЖЕНЕРНЫЙ КОНФИГУРАТОР ИИ-УСЛУГ
              </span>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 font-mono text-xs text-ink-muted hover:text-ink-primary px-2 py-1 border border-border-subtle hover:border-border-strong rounded-sharp transition-colors"
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
                onSelectTimeline={(timeline) => onUpdateState({ timeline })}
                onSelectBudget={(budget) => onUpdateState({ budget })}
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
                  const updates: Partial<QuizState> = {};
                  if (fields.name !== undefined) updates.residentName = fields.name;
                  if (fields.cityInput !== undefined) updates.cityInput = fields.cityInput;
                  if (fields.preferredChannel !== undefined) updates.preferredChannel = fields.preferredChannel;
                  if (fields.phone !== undefined) updates.phone = fields.phone;
                  if (fields.telegramUsername !== undefined) updates.telegramUsername = fields.telegramUsername;
                  if (fields.comment !== undefined) updates.comment = fields.comment;
                  if (fields.consentAccepted !== undefined) updates.consentAccepted = fields.consentAccepted;
                  onUpdateState(updates);
                }}
                onSubmit={onSubmit}
                onOpenPrivacy={onOpenPrivacy}
              />
            )}

            {currentStep === 6 && (
              <ThankYouScreen
                quizState={quizState}
                onReset={() => {
                  onClose();
                  onUpdateState({ step: 1 });
                }}
                onEditContacts={() => onUpdateState({ step: 5 })}
              />
            )}
          </div>

          {/* Bottom Bar: Navigation controls (Steps 1 to 4) */}
          {currentStep >= 1 && currentStep <= 4 && (
            <div className="p-4 sm:p-6 border-t border-border-subtle bg-canvas flex items-center justify-between flex-shrink-0">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-ink-secondary hover:text-ink-primary disabled:opacity-30 disabled:pointer-events-none rounded-sharp border border-border-subtle bg-surface transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Назад</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext()}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-ink-primary hover:bg-signal disabled:bg-border-subtle disabled:text-ink-muted text-surface rounded-sharp transition-mechanical shadow-sm"
              >
                <span>Далее</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
