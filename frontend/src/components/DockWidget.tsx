import React from 'react';
import { ArrowRight, Bot } from 'lucide-react';

interface DockWidgetProps {
  onOpenQuiz: () => void;
  isVisible: boolean;
}

export const DockWidget: React.FC<DockWidgetProps> = ({ onOpenQuiz, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-30 animate-fadeIn">
      <button
        onClick={onOpenQuiz}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-ink-primary hover:bg-signal text-surface text-xs font-semibold rounded-sharp shadow-lg border border-border-strong transition-mechanical group"
      >
        <span className="w-2 h-2 rounded-full bg-status-success animate-pulse"></span>
        <span className="font-mono text-[11px] uppercase tracking-wider">
          ПОДОБРАТЬ ИИ-УСЛУГУ · 5 ШАГОВ
        </span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
