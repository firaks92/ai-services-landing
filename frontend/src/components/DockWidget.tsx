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
        className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-dash-magenta/90 via-dash-purple/90 to-dash-violet/90 hover:opacity-100 text-white text-xs font-bold rounded-full shadow-[0_12px_36px_rgba(255,42,133,0.4)] backdrop-blur-xl border border-white/40 transition-all active:scale-95 group"
      >
        <span className="w-2 h-2 rounded-full bg-dash-lime animate-pulse ring-2 ring-white/40" />
        <span className="font-mono text-[11px] uppercase tracking-wider font-extrabold">
          {t('btn_select_node')} · {t('approx_time')}
        </span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
