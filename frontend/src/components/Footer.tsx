import React from 'react';
import { Send, ArrowUpRight, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenQuiz }) => {
  return (
    <footer className="bg-clay-pine text-white pt-16 pb-12 transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-squircle clay-knob flex items-center justify-center bg-white text-clay-pine">
                <Sparkles className="w-5 h-5 text-clay-coral" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold tracking-tight text-white">
                  AI.STUDIO // 2026
                </span>
                <span className="font-mono text-[10px] text-white/60 uppercase tracking-widest">
                  Прикладные ИИ-системы
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              Инженерное бюро по разработке и внедрению прикладных решений на базе нейросетей, RAG-баз данных и автоматизации CRM для бизнеса.
            </p>
            <div className="font-mono text-xs text-clay-mint flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-clay-mint animate-pulse" />
              <span>Дежурный инженер на связи в Telegram</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs font-semibold text-white/50 uppercase tracking-wider">
              РАЗДЕЛЫ СИСТЕМЫ
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Каталог ИИ-узлов
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-white transition-colors">
                  Кейсы и расчет ROI
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Этапы запуска в прод
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Частые вопросы (FAQ)
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="text-clay-coral hover:text-white transition-colors font-semibold"
                >
                  Интерактивный конфигуратор ТЗ
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Telegram Channel */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-mono text-xs font-semibold text-white/50 uppercase tracking-wider">
              ПРЯМОЙ КОНТАКТ
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              Хотите задать вопрос напрямую инженеру или отправить файл ТЗ? Напишите нам в Telegram-бот:
            </p>

            <a
              href="https://t.me/frxaiagentbot?start=footer_direct"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-clay-coral hover:bg-clay-coral-hover text-white px-5 py-3 text-xs font-bold uppercase tracking-wider rounded-full shadow-clay-btn transition-all group"
            >
              <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              <span>@frxaiagentbot в Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/50">
          <div>© 2026 AI.STUDIO. Все права защищены. Инженерия ИИ для бизнеса.</div>
          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-white underline transition-colors">
              Политика конфиденциальности
            </button>
            <span>v2.4.0 // CLAY EDITION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
