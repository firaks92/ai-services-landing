import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles, Globe, DollarSign } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle.js';
import { useLocale } from '../context/LocaleContext.js';

interface HeaderProps {
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, currency, setCurrency, t } = useLocale();

  return (
    <header className="sticky top-0 z-40 bg-white/70 dark:bg-dash-bg/60 backdrop-blur-2xl border-b border-white/30 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)] transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-dash-violet via-dash-purple to-dash-cyan p-0.5 shadow-neon-purple group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-white/90 dark:bg-dash-bg/90 rounded-[14px] flex items-center justify-center backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-dash-magenta dark:text-dash-cyan" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm font-extrabold tracking-tight text-slate-900 dark:text-white">
                AI.STUDIO
              </span>
              <span className="font-mono text-xs text-dash-magenta font-bold">//</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-white/60 dark:bg-white/[0.08] border border-white/30 dark:border-white/10 text-dash-cyan font-bold backdrop-blur-md">
                2026
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 dark:text-dash-muted uppercase tracking-widest">
              Applied AI Systems
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full glass-pill">
          <a
            href="#services"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {t('nav_services')}
          </a>
          <a
            href="#cases"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {t('nav_cases')}
          </a>
          <a
            href="#process"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {t('nav_process')}
          </a>
          <a
            href="#faq"
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            {t('nav_faq')}
          </a>
        </nav>

        {/* Controls: Language + Currency + Theme + CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {/* Trilingual Switcher (RU / UZ / EN) */}
          <div className="flex items-center p-1 rounded-full glass-pill font-mono text-[11px] font-bold">
            <Globe className="w-3.5 h-3.5 ml-2 mr-1 text-slate-400 dark:text-dash-muted" />
            <button
              onClick={() => setLanguage('ru')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                language === 'ru'
                  ? 'bg-gradient-to-r from-dash-magenta to-dash-purple text-white shadow-sm'
                  : 'text-slate-500 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage('uz')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                language === 'uz'
                  ? 'bg-gradient-to-r from-dash-magenta to-dash-purple text-white shadow-sm'
                  : 'text-slate-500 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              UZ
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-gradient-to-r from-dash-magenta to-dash-purple text-white shadow-sm'
                  : 'text-slate-500 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Currency Switcher (USD / UZS) */}
          <div className="flex items-center p-1 rounded-full glass-pill font-mono text-[11px] font-bold">
            <button
              onClick={() => setCurrency('usd')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                currency === 'usd'
                  ? 'bg-dash-cyan text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-500 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              $ USD
            </button>
            <button
              onClick={() => setCurrency('uzs')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                currency === 'uzs'
                  ? 'bg-dash-cyan text-slate-950 font-extrabold shadow-sm'
                  : 'text-slate-500 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              UZS (so'm)
            </button>
          </div>

          {/* Theme Switcher Toggle */}
          <ThemeToggle />

          {/* Primary CTA */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-2 bg-gradient-to-r from-dash-magenta to-dash-purple hover:opacity-95 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full shadow-neon-magenta transition-all active:scale-95 group"
          >
            <span>{t('btn_select_node')}</span>
            <span className="font-mono text-[10px] text-white/80">{t('approx_time')}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={onOpenQuiz}
            className="bg-gradient-to-r from-dash-magenta to-dash-purple text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-neon-magenta"
          >
            {t('btn_select_node')}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full glass-pill flex items-center justify-center text-slate-900 dark:text-white focus:outline-none"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/20 dark:border-white/10 bg-white/90 dark:bg-dash-bg/90 backdrop-blur-2xl px-4 py-4 space-y-4">
          {/* Mobile Switchers */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-white/10">
            {/* Lang */}
            <div className="flex items-center p-1 rounded-full glass-pill font-mono text-[11px] font-bold">
              {(['ru', 'uz', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2 py-0.5 rounded-full uppercase ${
                    language === l ? 'bg-dash-magenta text-white' : 'text-slate-500 dark:text-dash-muted'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Currency */}
            <div className="flex items-center p-1 rounded-full glass-pill font-mono text-[11px] font-bold">
              <button
                onClick={() => setCurrency('usd')}
                className={`px-2 py-0.5 rounded-full ${
                  currency === 'usd' ? 'bg-dash-cyan text-slate-950 font-bold' : 'text-slate-500 dark:text-dash-muted'
                }`}
              >
                $ USD
              </button>
              <button
                onClick={() => setCurrency('uzs')}
                className={`px-2 py-0.5 rounded-full ${
                  currency === 'uzs' ? 'bg-dash-cyan text-slate-950 font-bold' : 'text-slate-500 dark:text-dash-muted'
                }`}
              >
                UZS
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              {t('nav_services')}
            </a>
            <a
              href="#cases"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              {t('nav_cases')}
            </a>
            <a
              href="#process"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              {t('nav_process')}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-slate-900 dark:text-white"
            >
              {t('nav_faq')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
