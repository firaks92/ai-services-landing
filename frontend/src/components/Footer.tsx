import React from 'react';
import { Send, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.js';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenQuiz }) => {
  const { t } = useLocale();

  return (
    <footer className="bg-slate-100 dark:bg-dash-bg text-slate-800 dark:text-white pt-16 pb-12 border-t border-slate-200 dark:border-white/10 transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-slate-200 dark:border-white/10">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-dash-violet via-dash-purple to-dash-cyan p-0.5 shadow-neon-purple flex items-center justify-center">
                <div className="w-full h-full bg-white dark:bg-dash-bg rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-dash-magenta dark:text-dash-cyan" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                  AI.STUDIO // 2026
                </span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-dash-muted uppercase tracking-widest">
                  Applied AI Systems
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-dash-muted max-w-sm leading-relaxed">
              {t('footer_desc')}
            </p>
            <div className="font-mono text-xs text-dash-lime flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-dash-lime animate-pulse" />
              <span>{t('footer_engineer_online')}</span>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-mono text-xs font-semibold text-slate-500 dark:text-dash-muted uppercase tracking-wider">
              {t('footer_sections')}
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-dash-muted">
              <li>
                <a href="#services" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {t('nav_services')}
                </a>
              </li>
              <li>
                <a href="#cases" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {t('nav_cases')}
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {t('nav_process')}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  {t('nav_faq')}
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenQuiz}
                  className="text-dash-magenta dark:text-dash-cyan hover:underline transition-colors font-bold"
                >
                  {t('btn_select_node')}
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Telegram Channel */}
          <div className="md:col-span-4 space-y-4">
            <div className="font-mono text-xs font-semibold text-slate-500 dark:text-dash-muted uppercase tracking-wider">
              {t('footer_direct_contact')}
            </div>
            <p className="text-xs text-slate-600 dark:text-dash-muted leading-relaxed">
              {t('footer_contact_desc')}
            </p>

            <a
              href="https://t.me/frxaiagentbot?start=footer_direct"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-dash-magenta via-dash-purple to-dash-violet hover:opacity-95 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-neon-magenta transition-all group"
            >
              <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              <span>@frxaiagentbot в Telegram</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500 dark:text-dash-subtle">
          <div>{t('footer_rights')}</div>
          <div className="flex items-center gap-6">
            <button onClick={onOpenPrivacy} className="hover:text-slate-900 dark:hover:text-white underline transition-colors">
              {t('footer_privacy')}
            </button>
            <span className="text-dash-magenta dark:text-dash-cyan font-bold">i18n & MULTI-CURRENCY EDITION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
