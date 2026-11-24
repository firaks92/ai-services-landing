import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import type { ServiceCode } from '../types/quiz.js';
import { BusinessTierSwitcher, type BusinessTier } from './BusinessTierSwitcher.js';
import { NeonDashboard } from './NeonDashboard.js';
import { useLocale } from '../context/LocaleContext.js';

interface HeroProps {
  onOpenQuiz: () => void;
  onSelectService: (serviceCode: ServiceCode) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onSelectService }) => {
  const [businessTier, setBusinessTier] = useState<BusinessTier>('growth');
  const { t, language } = useLocale();

  const tierContent = {
    startup: {
      tagline: language === 'uz' ? 'STARTAPLAR VA TEZKOR O‘SISH // 3–7 KUN' : language === 'en' ? 'STARTUPS & RAPID SCALE // 3–7 DAYS' : 'СТАРТАПЫ И БЫСТРЫЙ РОСТ // 3–7 ДНЕЙ',
      titleHighlight: language === 'uz' ? '2 ta xodim o‘rnini bosuvchi' : language === 'en' ? 'replace 2 full-time reps' : 'заменяют 2 операторов',
      titlePost: language === 'uz' ? 'va 3–7 kunda ishga tushuvchi' : language === 'en' ? 'and deploy in 3–7 days' : 'и запускаются за 3–7 дней',
      desc: language === 'uz' ? 'Telegram/WhatsApp va amoCRM integratsiyasi bilan aqlli botlarni tez ishga tushirish. Oylik xarajatlarni oshirmasdan mijozlarni saqlab qolish.' : language === 'en' ? 'Rapid deployment of intelligent Telegram/WhatsApp bots with CRM sync. Eliminate routine overhead without recurring platform markups.' : 'Быстрый запуск умных ботов в Telegram/WhatsApp с интеграцией в amoCRM. Без раздувания ФОТ и потери ночных клиентов.',
      badge1: language === 'uz' ? '1 oydan boshlab qoplanadi' : language === 'en' ? 'ROI within 1 month' : 'Окупаемость от 1 месяца',
      badge2: language === 'uz' ? 'Oylik platforma to‘lovisiz' : language === 'en' ? 'Zero platform subscription fees' : 'Без абонентской платы за платформу',
    },
    growth: {
      tagline: language === 'uz' ? 'SANOAT DARAJASIDAGI JORIY QILISH // E-COMMERCE & B2B' : language === 'en' ? 'INDUSTRIAL INTEGRATION STANDARD // E-COMMERCE & B2B' : 'ПРОМЫШЛЕННЫЙ СТАНДАРТ ВНЕДРЕНИЯ // E-COMMERCE & B2B',
      titleHighlight: t('hero_title_highlight_growth'),
      titlePost: t('hero_title_post_growth'),
      desc: t('hero_desc_growth'),
      badge1: t('badge_guarantee'),
      badge2: t('badge_fixed_quote'),
    },
    enterprise: {
      tagline: language === 'uz' ? 'ENTERPRISE & MAXFIY DATA-KONTUR // LOKAL RAG' : language === 'en' ? 'ENTERPRISE & PRIVATE DATA // AIR-GAPPED RAG' : 'ENTERPRISE & ДАТА-КОНТУРЫ // ЛОКАЛЬНЫЙ RAG',
      titleHighlight: language === 'uz' ? 'yopiq serverlarga o‘rnatiluvchi' : language === 'en' ? 'integrate into private air-gaps' : 'интегрируются в закрытый контур',
      titlePost: language === 'uz' ? 'tijorat siri himoyalangan' : language === 'en' ? 'with enterprise NDA security' : 'с защитой коммерческой тайны',
      desc: language === 'uz' ? 'Xavfsizlik va NDA talablariga muvofiq, serverlaringizda avtonom RAG bilimlar bazalari va maxsus AI-agentlar.' : language === 'en' ? 'Autonomous on-prem RAG knowledge pipelines and private AI agents compliant with corporate data protection standards.' : 'Автономные RAG-базы данных, кастомные пайплайны и приватные ИИ-агенты на ваших серверах с соблюдением требований ИБ и NDA.',
      badge1: language === 'uz' ? 'Maʼlumotlar sizib chiqmasdan lokal LLM' : language === 'en' ? 'Local LLMs with zero data leakage' : 'Локальные LLM без утечек данных',
      badge2: language === 'uz' ? '1C, Bitrix24 Enterprise, SQL bilan mos' : language === 'en' ? 'Supports 1C, Bitrix24, SQL, ERP' : 'Поддержка 1C, Bitrix24 Enterprise, SQL',
    },
  };

  const current = tierContent[businessTier];

  const quickPills: { code: ServiceCode; label: string; icon: string }[] = [
    { code: 'chatbot', label: t('node_chatbots'), icon: '🤖' },
    { code: 'rag_analytics', label: t('node_rag'), icon: '🧠' },
    { code: 'automation', label: t('node_automation'), icon: '⚡' },
    { code: 'content', label: t('node_content'), icon: '✨' },
    { code: 'custom_audit', label: t('node_audit'), icon: '🔍' },
  ];

  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 border-b border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-dash-bg transition-colors">
      {/* Decorative ambient glowing backdrops */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-r from-dash-violet/10 via-dash-purple/15 to-dash-cyan/15 dark:from-dash-violet/20 dark:via-dash-purple/25 dark:to-dash-cyan/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-dash-magenta/10 dark:bg-dash-magenta/15 rounded-full blur-[120px] pointer-events-none" />

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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-dash-track border border-slate-200 dark:border-white/10 mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-dash-magenta dark:text-dash-cyan animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-dash-magenta dark:text-dash-cyan tracking-wider uppercase">
              {current.tagline}
            </span>
          </div>

          {/* Heading with Neon Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12] mb-6">
            {t('hero_title_pre')}{' '}
            <span className="gradient-text-neon font-serif italic font-normal">
              {current.titleHighlight}
            </span>{' '}
            {current.titlePost}
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-dash-muted leading-relaxed max-w-2xl mx-auto mb-8">
            {current.desc}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-3 bg-gradient-to-r from-dash-magenta via-dash-purple to-dash-violet hover:opacity-95 text-white px-8 py-4 text-sm font-bold uppercase tracking-wider rounded-full shadow-neon-magenta transition-all active:scale-95 group"
            >
              <span>{t('hero_cta_quiz')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#cases"
              className="flex items-center gap-2 px-6 py-4 text-sm font-semibold text-slate-800 dark:text-white bg-slate-100 dark:bg-dash-card hover:bg-slate-200 dark:hover:bg-dash-card-hover border border-slate-200 dark:border-white/10 rounded-full transition-colors"
            >
              <span>{t('hero_cta_roi')}</span>
              <ChevronDown className="w-4 h-4 text-dash-cyan" />
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-slate-500 dark:text-dash-muted">
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

        {/* Centerpiece Showcase: Stunning Futuristic AI Dashboard */}
        <div className="mb-14">
          <NeonDashboard onOpenQuiz={onOpenQuiz} />
        </div>

        {/* Quick Service Launch Strip */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-dash-magenta dark:text-dash-cyan">
              {t('quick_choice_label')}
            </span>
            <span className="font-mono text-[11px] text-slate-400 dark:text-dash-subtle">
              {t('quick_choice_sub')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quickPills.map((pill) => (
              <button
                key={pill.code}
                onClick={() => onSelectService(pill.code)}
                className="p-3.5 rounded-2xl bg-white dark:bg-dash-card hover:bg-slate-50 dark:hover:bg-dash-card-hover border border-slate-200 dark:border-white/10 hover:border-dash-cyan/40 shadow-sm transition-all flex items-center justify-between group text-left select-none"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-xl">{pill.icon}</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-white group-hover:text-dash-magenta dark:group-hover:text-dash-cyan transition-colors truncate">
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
