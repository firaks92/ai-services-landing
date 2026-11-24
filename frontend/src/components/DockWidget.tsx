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
    <div className="fixed bottom-5 right-5 z-30 animate-fadeIn">
      <button
        onClick={onOpenQuiz}
        className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-dash-magenta via-dash-purple to-dash-violet hover:opacity-95 text-white text-xs font-bold rounded-full shadow-neon-magenta transition-all active:scale-95 group"
      >
        <span className="w-2 h-2 rounded-full bg-dash-lime animate-pulse" />
        <span className="font-mono text-[11px] uppercase tracking-wider">
          {t('btn_select_node')} · {t('approx_time')}
        </span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
