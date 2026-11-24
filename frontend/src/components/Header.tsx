import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle.js';

interface HeaderProps {
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-clay-bg/85 dark:bg-clay-dark-bg/85 backdrop-blur-md border-b border-clay-border dark:border-clay-dark-border transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo (Flight Deck Inspiration) */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-squircle clay-knob flex items-center justify-center bg-clay-pine dark:bg-clay-card text-clay-mint dark:text-clay-mint group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-clay-mint" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm font-bold tracking-tight text-clay-pine dark:text-clay-dark-pine">
                AI.STUDIO
              </span>
              <span className="font-mono text-xs text-clay-coral font-bold">//</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full clay-inset text-clay-pine/80 dark:text-clay-sage">
                2026
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Прикладные ИИ-системы
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Pill Style) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full clay-inset">
          <a
            href="#services"
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-clay-pine dark:hover:text-white transition-colors"
          >
            Каталог узлов
          </a>
          <a
            href="#cases"
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-clay-pine dark:hover:text-white transition-colors"
          >
            Кейсы и ROI
          </a>
          <a
            href="#process"
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-clay-pine dark:hover:text-white transition-colors"
          >
            Процесс запуска
          </a>
          <a
            href="#faq"
            className="px-4 py-2 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-clay-pine dark:hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right Action Cluster: Live Status + Theme Toggle + Quiz CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Theme Switcher Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>

          {/* Live Status indicator */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-clay-pine dark:text-clay-dark-pine px-3 py-1.5 rounded-full clay-inset">
            <span className="w-2 h-2 rounded-full bg-clay-emerald animate-pulse" />
            <span className="font-medium">DESK ONLINE</span>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-2.5 bg-clay-coral hover:bg-clay-coral-hover text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-clay-btn transition-all active:scale-95 group"
          >
            <span>Подобрать узел</span>
            <span className="font-mono text-[10px] text-white/80">~60с</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2.5">
          <ThemeToggle />
          <button
            onClick={onOpenQuiz}
            className="bg-clay-coral text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-clay-btn"
          >
            Подобрать
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full clay-inset flex items-center justify-center text-clay-pine dark:text-clay-dark-pine focus:outline-none"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-clay-border dark:border-clay-dark-border bg-clay-bg dark:bg-clay-dark-bg px-4 py-4 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Каталог узлов
          </a>
          <a
            href="#cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Кейсы и ROI
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Процесс запуска
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            FAQ
          </a>
        </div>
      )}
    </header>
  );
};
