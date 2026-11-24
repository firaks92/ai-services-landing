import React, { useState, useEffect, useCallback } from 'react';
import type { QuizState, ServiceCode, QuizSource } from './types/quiz.js';
import { AI_SERVICES } from './config/quizConfig.js';
import { captureUtm, getStoredUtm } from './utils/utm.js';
import { fetchClientGeo } from './utils/geo.js';
import { submitLead } from './api/leadsApi.js';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { ServicesCatalog } from './components/ServicesCatalog.js';
import { CasesRoi } from './components/CasesRoi.js';
import { InlineQuiz } from './components/quiz/InlineQuiz.js';
import { ProcessSteps } from './components/ProcessSteps.js';
import { FaqSection } from './components/FaqSection.js';
import { Footer } from './components/Footer.js';
import { QuizModal } from './components/quiz/QuizModal.js';
import { DockWidget } from './components/DockWidget.js';
import { ExitIntentModal } from './components/ExitIntentModal.js';
import { PrivacyModal } from './components/PrivacyModal.js';

const DISMISSED_KEY = 'ai_quiz_dismissed_until';

export const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExitIntentOpen, setIsExitIntentOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [hasInteractedWithQuiz, setHasInteractedWithQuiz] = useState(false);

  // Central Quiz State
  const [quizState, setQuizState] = useState<QuizState>({
    step: 1,
    source: 'entry_popup',
    serviceCode: null,
    primaryService: '',
    serviceDetails: [],
    industry: '',
    customIndustry: '',
    timeline: '',
    budget: '',
    residentName: '',
    cityInput: '',
    cityAutofilled: false,
    preferredChannel: 'Telegram',
    phone: '',
    telegramUsername: '',
    comment: '',
    consentAccepted: true,
    isSubmitting: false,
    submitError: null,
  });

  const updateQuizState = useCallback((updates: Partial<QuizState>) => {
    setQuizState((prev) => ({ ...prev, ...updates }));
    setHasInteractedWithQuiz(true);
  }, []);

  // 1. Initial UTM and Geo-IP resolution on mount
  useEffect(() => {
    captureUtm();

    fetchClientGeo().then((geo) => {
      if (geo.suggested_location) {
        setQuizState((prev) => {
          if (!prev.cityInput) {
            return {
              ...prev,
              cityInput: geo.suggested_location || '',
              cityAutofilled: true,
            };
          }
          return prev;
        });
      }
    });
  }, []);

  // 2. Entry Popup Timer (4 seconds delay with 24h frequency capping)
  useEffect(() => {
    const dismissedUntil = localStorage.getItem(DISMISSED_KEY);
    const now = Date.now();

    if (dismissedUntil && Number(dismissedUntil) > now) {
      // Frequency capped: don't auto-open
      return;
    }

    const timer = setTimeout(() => {
      if (!isModalOpen && !hasInteractedWithQuiz) {
        setIsModalOpen(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [hasInteractedWithQuiz, isModalOpen]);

  // 3. Desktop Exit-Intent trigger
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !isModalOpen && !hasInteractedWithQuiz) {
        const exitShown = sessionStorage.getItem('ai_exit_intent_shown');
        if (!exitShown) {
          setIsExitIntentOpen(true);
          sessionStorage.setItem('ai_exit_intent_shown', 'true');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasInteractedWithQuiz, isModalOpen]);

  // Modal Close with 24h frequency cap
  const handleCloseModal = () => {
    setIsModalOpen(false);
    const expireTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem(DISMISSED_KEY, String(expireTime));
  };

  // Open Quiz Modal directly
  const handleOpenQuiz = (opts?: { presetService?: ServiceCode; step?: number; source?: QuizSource }) => {
    let title = quizState.primaryService;
    if (opts?.presetService) {
      const match = AI_SERVICES.find((s) => s.code === opts.presetService);
      title = match ? match.title : '';
    }

    setQuizState((prev) => ({
      ...prev,
      step: opts?.step ?? 1,
      source: opts?.source ?? 'service_card',
      serviceCode: opts?.presetService ?? prev.serviceCode,
      primaryService: title || prev.primaryService,
      serviceDetails: opts?.presetService ? [] : prev.serviceDetails,
    }));

    setIsModalOpen(true);
    setHasInteractedWithQuiz(true);
  };

  // Submit Lead
  const handleSubmitLead = async () => {
    if (!quizState.serviceCode) return;

    updateQuizState({ isSubmitting: true, submitError: null });

    try {
      const utm = getStoredUtm();

      const response = await submitLead({
        quiz_source: quizState.source,
        service_focus: {
          service_code: quizState.serviceCode,
          primary_service: quizState.primaryService,
          service_details: quizState.serviceDetails,
          industry: quizState.industry,
          timeline: quizState.timeline,
          budget: quizState.budget,
        },
        resident_info: {
          name: quizState.residentName,
          city_input: quizState.cityInput,
          preferred_channel: quizState.preferredChannel,
          phone: quizState.phone,
          telegram_username: quizState.telegramUsername || null,
          comment: quizState.comment || null,
        },
        client_meta: {
          language: navigator.language,
          pageUrl: window.location.href,
          referrer: document.referrer,
          utm: utm as any,
        },
        consent_accepted: true,
        security: {
          honeypot: '',
        },
      });

      updateQuizState({
        isSubmitting: false,
        leadCode: response.lead_id,
        botDeepLink: response.bot_deep_link,
        step: 6, // Advance to Thank You state
      });
    } catch (err: any) {
      updateQuizState({
        isSubmitting: false,
        submitError: err.message || 'Ошибка отправки заявки. Попробуйте еще раз или напишите нам в Telegram.',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-dash-bg text-slate-900 dark:text-dash-text selection:bg-dash-mint selection:text-dash-dark transition-colors relative">
      {/* Luxury Obsidian & Emerald Atmospheric Mesh (Pinterest #1114007657841652106) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Top center diffuse emerald bloom */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-dash-emerald/15 via-dash-mint/5 to-transparent rounded-full blur-[140px]" />
        {/* Subtle right-side ambient mint beam */}
        <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] bg-dash-mint/8 rounded-full blur-[130px]" />
        {/* Subtle left-side dark emerald aura */}
        <div className="absolute top-2/3 -left-32 w-[600px] h-[600px] bg-dash-emerald/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Header */}
        <Header onOpenQuiz={() => handleOpenQuiz({ step: 1, source: 'entry_popup' })} />

        {/* 2. Hero */}
        <Hero
          onOpenQuiz={() => handleOpenQuiz({ step: 1, source: 'entry_popup' })}
          onSelectService={(code) => handleOpenQuiz({ presetService: code, step: 2, source: 'service_card' })}
        />

        {/* 3. Catalog of Services */}
        <ServicesCatalog
          onSelectService={(code) => handleOpenQuiz({ presetService: code, step: 2, source: 'service_card' })}
        />

        {/* 4. Cases and ROI */}
        <CasesRoi />

        {/* 5. Inline Quiz on Page */}
        <InlineQuiz
          quizState={quizState}
          onUpdateState={updateQuizState}
          onSubmit={handleSubmitLead}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />

        {/* 6. Stages of Work */}
        <ProcessSteps />

        {/* 7. FAQ */}
        <FaqSection />

        {/* 8. Footer */}
        <Footer
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
          onOpenQuiz={() => handleOpenQuiz({ step: 1, source: 'entry_popup' })}
        />

        {/* Entry / On-Demand Modal Drawer */}
        <QuizModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          quizState={quizState}
          onUpdateState={updateQuizState}
          onSubmit={handleSubmitLead}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />

        {/* Persistent Dock Widget */}
        <DockWidget
          isVisible={!isModalOpen}
          onOpenQuiz={() => handleOpenQuiz({ step: quizState.step === 6 ? 1 : quizState.step, source: 'entry_popup' })}
        />

        {/* Exit Intent */}
        <ExitIntentModal
          isOpen={isExitIntentOpen}
          onClose={() => setIsExitIntentOpen(false)}
          onStartQuiz={() => handleOpenQuiz({ step: 1, source: 'exit_intent' })}
        />

        {/* Privacy Policy Modal */}
        <PrivacyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />
      </div>
    </div>
  );
};
