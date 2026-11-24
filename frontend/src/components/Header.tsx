import React, { useState } from 'react';
import { Menu, X, ArrowRight, Sparkles, Cpu } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle.js';

interface HeaderProps {
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-dash-bg/85 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo with Neon Glow */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-dash-violet via-dash-purple to-dash-cyan p-0.5 shadow-neon-purple group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-dash-bg rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-dash-cyan" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-sm font-extrabold tracking-tight text-white">
                AI.STUDIO
              </span>
              <span className="font-mono text-xs text-dash-magenta font-bold">//</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-dash-track border border-white/10 text-dash-cyan font-bold">
                2026
              </span>
            </div>
            <span className="font-mono text-[10px] text-dash-muted uppercase tracking-widest">
              Прикладные ИИ-системы
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Pill Style) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-dash-track border border-white/10">
          <a
            href="#services"
            className="px-4 py-2 rounded-full text-xs font-semibold text-dash-muted hover:text-white hover:bg-white/5 transition-all"
          >
            Каталог узлов
          </a>
          <a
            href="#cases"
            className="px-4 py-2 rounded-full text-xs font-semibold text-dash-muted hover:text-white hover:bg-white/5 transition-all"
          >
            Кейсы и ROI
          </a>
          <a
            href="#process"
            className="px-4 py-2 rounded-full text-xs font-semibold text-dash-muted hover:text-white hover:bg-white/5 transition-all"
          >
            Процесс запуска
          </a>
          <a
            href="#faq"
            className="px-4 py-2 rounded-full text-xs font-semibold text-dash-muted hover:text-white hover:bg-white/5 transition-all"
          >
            FAQ
          </a>
        </nav>

        {/* Right Action Cluster: Live Status + Theme Toggle + Fast CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />

          {/* Live Status indicator */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-dash-lime px-3 py-1.5 rounded-full bg-dash-track border border-dash-lime/30">
            <span className="w-2 h-2 rounded-full bg-dash-lime animate-pulse" />
            <span className="font-bold">DESK ONLINE</span>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-2.5 bg-gradient-to-r from-dash-magenta to-dash-purple hover:opacity-95 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-neon-magenta transition-all active:scale-95 group"
          >
            <span>Подобрать узел</span>
            <span className="font-mono text-[10px] text-white/80">~60с</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2.5">
          <ThemeToggle />
          <button
            onClick={onOpenQuiz}
            className="bg-gradient-to-r from-dash-magenta to-dash-purple text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-neon-magenta"
          >
            Подобрать
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full bg-dash-track border border-white/10 flex items-center justify-center text-white focus:outline-none"
            aria-label="Меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-dash-bg px-4 py-4 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-white"
          >
            Каталог узлов
          </a>
          <a
            href="#cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-white"
          >
            Кейсы и ROI
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-white"
          >
            Процесс запуска
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-white"
          >
            FAQ
          </a>
        </div>
      )}
    </header>
  );
};
