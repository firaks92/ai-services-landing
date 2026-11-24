import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles, CheckCircle2, ShieldCheck, Zap, Activity, Users } from 'lucide-react';
import type { ServiceCode } from '../types/quiz.js';
import { BusinessTierSwitcher, type BusinessTier } from './BusinessTierSwitcher.js';
import { NeonDashboard } from './NeonDashboard.js';

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
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 border-b border-white/10 overflow-hidden bg-dash-bg">
      {/* Decorative ambient glowing backdrops (Pinterest Neon Aesthetic) */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-r from-dash-violet/20 via-dash-purple/25 to-dash-cyan/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-dash-magenta/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 3-Knob Mode Switcher */}
        <div className="mb-8 max-w-2xl mx-auto">
          <BusinessTierSwitcher
            currentTier={businessTier}
            onChangeTier={setBusinessTier}
          />
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-dash-track border border-white/10 mb-5 shadow-neon-purple">
            <Sparkles className="w-3.5 h-3.5 text-dash-cyan animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-dash-cyan tracking-wider uppercase">
              {current.tagline}
            </span>
          </div>

          {/* Heading with Neon Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
            Внедряем ИИ-системы, которые{' '}
            <span className="gradient-text-neon font-serif italic font-normal">
              {current.titleHighlight}
            </span>{' '}
            {current.titlePost}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-dash-muted leading-relaxed max-w-2xl mx-auto mb-8">
            {current.desc}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-3 bg-gradient-to-r from-dash-magenta via-dash-purple to-dash-violet hover:opacity-95 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-full shadow-neon-magenta transition-all active:scale-95 group"
            >
              <span>Подобрать ИИ-систему за 60 секунд</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#cases"
              className="flex items-center gap-2 px-6 py-4 text-sm font-semibold text-white bg-dash-card hover:bg-dash-card-hover border border-white/10 rounded-full transition-colors"
            >
              <span>Смотреть расчет ROI</span>
              <ChevronDown className="w-4 h-4 text-dash-cyan" />
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-dash-muted">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-dash-lime" />
              <span>{current.badge1}</span>
            </div>
            <span className="opacity-40">•</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-dash-cyan" />
              <span>{current.badge2}</span>
            </div>
          </div>
        </div>

        {/* Centerpiece Showcase: Stunning Futuristic AI Dashboard (Pinterest Pin 1123437069575794848) */}
        <div className="mb-14">
          <NeonDashboard onOpenQuiz={onOpenQuiz} />
        </div>

        {/* Quick Service Launch Strip */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-dash-cyan">
              БЫСТРЫЙ ВЫБОР УЗЛА // НАЖМИТЕ ДЛЯ ПЕРЕХОДА К ПАРАМЕТРАМ:
            </span>
            <span className="font-mono text-[11px] text-dash-subtle">
              ВЫБЕРИТЕ ВАШУ ЗАДАЧУ
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickPills.map((pill) => (
              <button
                key={pill.code}
                onClick={() => onSelectService(pill.code)}
                className="p-3.5 rounded-2xl bg-dash-card hover:bg-dash-card-hover border border-white/10 hover:border-dash-cyan/40 transition-all flex items-center justify-between group text-left select-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl">{pill.icon}</span>
                  <span className="text-xs font-bold text-white group-hover:text-dash-cyan transition-colors truncate">
                    {pill.label}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-dash-magenta group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
