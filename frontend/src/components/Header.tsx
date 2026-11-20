import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenQuiz: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuiz }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border-subtle">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-5 h-5 bg-ink-primary flex items-center justify-center rounded-sharp group-hover:bg-signal transition-colors">
            <span className="w-2 h-2 bg-surface block"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-semibold tracking-wider text-ink-primary">
              AI.STUDIO <span className="text-ink-muted">//</span> СИСТЕМЫ
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#services"
            className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
          >
            Услуги
          </a>
          <a
            href="#cases"
            className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
          >
            Кейсы и ROI
          </a>
          <a
            href="#process"
            className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
          >
            Процесс
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-ink-secondary hover:text-ink-primary transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Live Status + Fast CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 font-mono text-xs text-ink-secondary border border-border-subtle px-2.5 py-1 rounded-sharp bg-canvas">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
            <span>ПРИНИМАЕМ ЗАЯВКИ</span>
          </div>

          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-2 bg-signal hover:bg-signal-hover text-surface px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sharp transition-mechanical shadow-sm group"
          >
            <span>Подобрать</span>
            <span className="font-mono text-[10px] text-surface/80">~60с</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenQuiz}
            className="bg-signal text-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sharp"
          >
            Подобрать
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-ink-primary border border-border-subtle rounded-sharp"
            aria-label="Переключить меню"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-subtle bg-surface px-4 py-4 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-ink-primary py-1"
          >
            Услуги
          </a>
          <a
            href="#cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-ink-primary py-1"
          >
            Кейсы и ROI
          </a>
          <a
            href="#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-ink-primary py-1"
          >
            Процесс
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-ink-primary py-1"
          >
            FAQ
          </a>
        </div>
      )}
    </header>
  );
};
