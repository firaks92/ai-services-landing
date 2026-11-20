import React from 'react';
import type { QuizState, ServiceCode } from '../../types/quiz.js';
import { StepIndicator } from './StepIndicator.js';
import { LiveTicket } from './LiveTicket.js';
import { Step1Services } from './Step1Services.js';
import { Step2Branching } from './Step2Branching.js';
import { Step3Industry } from './Step3Industry.js';
import { Step4TimelineBudget } from './Step4TimelineBudget.js';
import { Step5ResidentForm } from './Step5ResidentForm.js';
import { ThankYouScreen } from './ThankYouScreen.js';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface InlineQuizProps {
  quizState: QuizState;
  onUpdateState: (updates: Partial<QuizState>) => void;
  onSubmit: () => void;
  onOpenPrivacy: () => void;
}

export const InlineQuiz: React.FC<InlineQuizProps> = ({
  quizState,
  onUpdateState,
  onSubmit,
  onOpenPrivacy,
}) => {
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
    <section id="quiz-block" className="py-20 md:py-28 border-b border-border-subtle bg-canvas">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="font-mono text-xs font-semibold text-signal uppercase tracking-wider mb-2">
            [КОНФИГУРАТОР ПРОЕКТА ОНЛАЙН]
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-ink-primary mb-3">
            Подберите ИИ-решение под ваши задачи
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Ответьте на 5 коротких вопросов, чтобы получить индивидуальный расчет стоимости и архитектурную схему внедрения.
          </p>
        </div>

        {/* Main Quiz Frame */}
        <div className="border border-border-subtle rounded-card bg-surface shadow-sm overflow-hidden flex flex-col lg:flex-row max-w-5xl mx-auto">
          {/* Left Column (Desktop only): Live Ticket */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <LiveTicket quizState={quizState} />
          </div>

          {/* Right Area: Quiz Flow */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="p-6 sm:p-8 border-b border-border-subtle">
              {currentStep <= 5 && <StepIndicator currentStep={currentStep} />}
            </div>

            <div className="p-6 sm:p-8 flex-1 min-h-[360px]">
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
                  onReset={() => onUpdateState({ step: 1 })}
                  onEditContacts={() => onUpdateState({ step: 5 })}
                />
              )}
            </div>

            {/* Bottom Controls */}
            {currentStep >= 1 && currentStep <= 4 && (
              <div className="p-4 sm:p-6 border-t border-border-subtle bg-canvas flex items-center justify-between">
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
    </section>
  );
};
