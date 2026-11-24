import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import type { ServiceCode } from '../types/quiz.js';
import { BusinessTierSwitcher, type BusinessTier } from './BusinessTierSwitcher.js';
import { HeroSimulator } from './HeroSimulator.js';

interface HeroProps {
  onOpenQuiz: () => void;
  onSelectService: (serviceCode: ServiceCode) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onSelectService }) => {
  const [businessTier, setBusinessTier] = useState<BusinessTier>('growth');

  const tierContent = {
    startup: {
      tagline: 'СТАРТАПЫ И БЫСТРЫЙ РОСТ // 3–7 ДНЕЙ',
      titleHighlight: 'заменяют 2 операторов',
      titlePost: 'и запускаются за 3–7 дней',
      desc: 'Быстрый запуск умных ботов в Telegram/WhatsApp с интеграцией в amoCRM. Без раздувания ФОТ и потери ночных клиентов.',
      badge1: 'Окупаемость от 1 месяца',
      badge2: 'Без абонентской платы за платформу',
    },
    growth: {
      tagline: 'ПРОМЫШЛЕННЫЙ СТАНДАРТ ВНЕДРЕНИЯ // E-COMMERCE & B2B',
      titleHighlight: 'сокращают рутину на 60%',
      titlePost: 'и продают 24/7 без выходных',
      desc: 'Без шаблонных ботов и абстрактных обещаний. Проектируем и интегрируем прикладные нейросети с вашей CRM, базой знаний и регламентами за 1–3 недели.',
      badge1: 'Гарантия по договору',
      badge2: 'Фиксированная смета и сроки',
    },
    enterprise: {
      tagline: 'ENTERPRISE & ДАТА-КОНТУРЫ // ЛОКАЛЬНЫЙ RAG',
      titleHighlight: 'интегрируются в закрытый контур',
      titlePost: 'с защитой коммерческой тайны',
      desc: 'Автономные RAG-базы данных, кастомные пайплайны и приватные ИИ-агенты на ваших серверах с соблюдением требований ИБ и NDA.',
      badge1: 'Локальные LLM без утечек данных',
      badge2: 'Поддержка 1C, Bitrix24 Enterprise, SQL',
    },
  };

  const current = tierContent[businessTier];

  const quickPills: { code: ServiceCode; label: string; icon: string }[] = [
    { code: 'chatbot', label: 'Умные чат-боты', icon: '🤖' },
    { code: 'rag_analytics', label: 'RAG-базы знаний', icon: '🧠' },
    { code: 'automation', label: 'Автоматизация CRM', icon: '⚡' },
    { code: 'content', label: 'Генерация контента', icon: '✨' },
    { code: 'custom_audit', label: 'ИИ-аудит под ключ', icon: '🔍' },
  ];

  return (
    <section className="relative pt-10 pb-18 md:pt-14 md:pb-24 border-b border-clay-border dark:border-clay-dark-border overflow-hidden">
      {/* Decorative ambient blur spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-clay-mint/30 dark:bg-clay-sage/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Index & Mode Switcher Row */}
        <div className="mb-8">
          <BusinessTierSwitcher
            currentTier={businessTier}
            onChangeTier={setBusinessTier}
            className="max-w-2xl"
          />
        </div>

        {/* 2-Column Hero Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-14">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full clay-inset w-fit mb-5">
              <Sparkles className="w-3.5 h-3.5 text-clay-coral" />
              <span className="font-mono text-[11px] font-bold text-clay-pine dark:text-clay-sage-soft tracking-wider uppercase">
                {current.tagline}
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-clay-pine dark:text-clay-dark-pine leading-[1.1] mb-6">
              Внедряем ИИ-системы, которые{' '}
              <span className="font-serif italic font-normal text-clay-coral underline decoration-clay-coral/30 decoration-wavy decoration-2">
                {current.titleHighlight}
              </span>{' '}
              {current.titlePost}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              {current.desc}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onOpenQuiz}
                className="flex items-center gap-3 bg-clay-coral hover:bg-clay-coral-hover text-white px-7 py-4 text-sm font-bold uppercase tracking-wider rounded-full shadow-clay-btn transition-all active:scale-95 group"
              >
                <span>Подобрать ИИ-узел за 60 секунд</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#cases"
                className="flex items-center gap-2 px-6 py-4 text-sm font-semibold text-clay-pine dark:text-clay-dark-pine clay-card hover:bg-clay-card-muted transition-colors rounded-full"
              >
                <span>Смотреть расчет ROI</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-clay-border dark:border-clay-dark-border font-mono text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-clay-emerald" />
                <span>{current.badge1}</span>
              </div>
              <span className="opacity-40">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-clay-emerald" />
                <span>{current.badge2}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Flight Deck Simulator (Pinterest Inspiration) */}
          <div className="lg:col-span-5">
            <HeroSimulator
              currentTier={businessTier}
              onLaunchConfigured={(code) => onSelectService(code)}
            />
          </div>
        </div>

        {/* Quick Launch Strip (Pill Bento Grid) */}
        <div className="pt-8 border-t border-clay-border dark:border-clay-dark-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-clay-pine dark:text-clay-sage-soft">
              БЫСТРЫЙ ВЫБОР УЗЛА // НАЖМИТЕ ДЛЯ ПЕРЕХОДА К ПАРАМЕТРАМ:
            </span>
            <span className="font-mono text-[11px] text-slate-400">ВЫБЕРИТЕ ВАШУ ЗАДАЧУ</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickPills.map((pill) => (
              <button
                key={pill.code}
                onClick={() => onSelectService(pill.code)}
                className="clay-card p-3.5 rounded-squircle flex items-center justify-between hover:scale-[1.02] hover:border-clay-emerald/40 active:scale-95 transition-all text-left group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-lg">{pill.icon}</span>
                  <span className="text-xs font-bold text-clay-pine dark:text-clay-dark-pine truncate">
                    {pill.label}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-clay-coral group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
