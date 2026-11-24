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
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

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
    <section id="quiz-block" className="py-20 md:py-28 border-b border-clay-border dark:border-clay-dark-border">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-inset mb-3 font-mono text-xs font-bold text-clay-coral uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            [ 03 // ИНТЕРАКТИВНЫЙ КОНФИГУРАТОР ТЗ ]
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-clay-pine dark:text-clay-dark-pine mb-3">
            Сконфигурируйте ИИ-систему за 60 секунд
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Пройдите 4 коротких шага. Вы мгновенно получите посадочный билет со сметой, а инженер свяжется с вами для демонстрации прототипа.
          </p>
        </div>

        {/* Big Dual-Pane Clay Card */}
        <div className="clay-card rounded-squircle-lg overflow-hidden flex flex-col lg:flex-row shadow-clay-card dark:shadow-clay-dark">
          {/* Left Column: Live Ticket / Boarding Pass */}
          <div className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-clay-border dark:border-clay-dark-border">
            <LiveTicket quizState={quizState} />
          </div>

          {/* Right Column: Steps Canvas */}
          <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 bg-white dark:bg-clay-dark-card">
            <div>
              {currentStep <= 5 && <StepIndicator currentStep={currentStep} />}

              <div className="pt-6 min-h-[360px]">
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
            </div>

            {/* Bottom Controls */}
            {currentStep < 5 && (
              <div className="pt-6 border-t border-clay-border dark:border-clay-dark-border flex items-center justify-between">
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
                  className="flex items-center gap-2 bg-clay-coral hover:bg-clay-coral-hover disabled:opacity-40 text-white px-7 py-3 text-xs font-bold uppercase tracking-wider rounded-full shadow-clay-btn transition-all select-none"
                >
                  <span>ДАЛЕЕ</span>
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
