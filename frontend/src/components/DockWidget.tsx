import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.js';

interface DockWidgetProps {
  onOpenQuiz: () => void;
  isVisible: boolean;
}

export const DockWidget: React.FC<DockWidgetProps> = ({ onOpenQuiz, isVisible }) => {
  const { t } = useLocale();
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-30 animate-fadeIn">
      <button
        onClick={onOpenQuiz}
        className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-dash-mint via-dash-emerald to-dash-cyan hover:opacity-95 text-dash-dark text-xs font-extrabold rounded-full shadow-mint border border-dash-mint/40 transition-all active:scale-95 group select-none"
      >
        <span className="w-2 h-2 rounded-full bg-dash-dark animate-pulse" />
        <span className="font-mono text-[11px] uppercase tracking-wider font-extrabold">
          {t('btn_select_node')} · {t('approx_time')}
        </span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
