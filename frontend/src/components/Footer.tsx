import React from 'react';
import { Send, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenQuiz }) => {
  return (
    <footer className="bg-dark-panel text-ink-on-dark pt-16 pb-12 border-t border-dark-border">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-dark-border">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-signal flex items-center justify-center rounded-sharp">
                <span className="w-2 h-2 bg-surface block"></span>
              </div>
              <span className="font-mono text-sm font-bold tracking-wider text-ink-on-dark">
                AI.STUDIO <span className="text-ink-on-dark-muted">//</span> СИСТЕМЫ
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink-on-dark-muted max-w-sm leading-relaxed">
              Инженерное бюро по разработке и интеграции прикладных решений на базе искусственного интеллекта для бизнеса.
            </p>
            <div className="font-mono text-xs text-status-success flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
              <span>Дежурный инженер на связи в Telegram</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs font-semibold text-ink-on-dark-muted uppercase tracking-wider">
              РАЗДЕЛЫ
            </div>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#services" className="text-ink-on-dark-muted hover:text-ink-on-dark transition-colors">
                  Каталог ИИ-услуг
                </a>
              </li>
              <li>
                <a href="#cases" className="text-ink-on-dark-muted hover:text-ink-on-dark transition-colors">
                  Протоколы кейсов и ROI
                </a>
              </li>
              <li>
                <a href="#process" className="text-ink-on-dark-muted hover:text-ink-on-dark transition-colors">
                  Этапы внедрения
                </a>
              </li>
              <li>
                <a href="#faq" className="text-ink-on-dark-muted hover:text-ink-on-dark transition-colors">
                  Частые вопросы (FAQ)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="text-signal hover:underline transition-colors font-medium text-left"
                >
                  Пройти подбор за 1 мин
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Telegram Communication */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-mono text-xs font-semibold text-ink-on-dark-muted uppercase tracking-wider">
              ПРЯМОЙ МОСТ В TELEGRAM
            </div>
            <p className="text-xs text-ink-on-dark-muted">
              Напишите нашему дежурному боту напрямую без заполнения форм:
            </p>
            <a
              href="https://t.me/YourAiServicesBot?start=direct_site"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-dark-panel hover:bg-blueprint border border-dark-border hover:border-blueprint text-ink-on-dark rounded-sharp transition-mechanical text-xs font-mono group"
            >
              <Send className="w-3.5 h-3.5 text-blueprint group-hover:text-surface transition-colors" />
              <span>@YourAiServicesBot</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ink-on-dark-muted group-hover:text-surface transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-ink-on-dark-muted">
          <div>
            © 2026 AI.STUDIO Engineering. Все права защищены.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-ink-on-dark underline transition-colors"
            >
              Политика конфиденциальности
            </button>
            <span>v1.0.0-blueprint</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
