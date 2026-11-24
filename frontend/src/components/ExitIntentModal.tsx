import React from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartQuiz: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({
  isOpen,
  onClose,
  onStartQuiz,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4 animate-fadeIn"
    >
      <div className="neon-card rounded-3xl p-6 shadow-2xl relative border-2 border-dash-magenta/60">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-dash-track border border-white/10 text-dash-muted hover:text-white transition-colors"
          title="Закрыть подсказку"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="font-mono text-[11px] text-dash-magenta font-bold uppercase mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-dash-magenta rounded-full animate-ping" />
          <span>НЕ НАШЛИ НУЖНЫЙ УЗЕЛ?</span>
        </div>

        <h4 className="text-base font-bold text-white mb-2">
          Подберем архитектуру под ваши процессы бесплатно
        </h4>

        <p className="text-xs text-dash-muted leading-relaxed mb-5">
          Ответьте на 3 быстрых вопроса, и наш главный инженер подготовит персональный разбор точек окупаемости и смету.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onStartQuiz();
            }}
            className="flex-1 h-11 bg-gradient-to-r from-dash-magenta via-dash-purple to-dash-violet hover:opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-neon-magenta flex items-center justify-center gap-1.5 transition-all select-none"
          >
            <span>Пройти экспресс-подбор</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="text-xs text-dash-muted hover:text-white font-semibold px-2 py-2"
          >
            Позже
          </button>
        </div>
      </div>
    </div>
  );
};
