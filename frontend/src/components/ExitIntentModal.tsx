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
      className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4 animate-slideInRight"
    >
      <div className="bg-surface border-2 border-signal rounded-card p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-ink-muted hover:text-ink-primary"
          title="Закрыть подсказку"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="font-mono text-[11px] text-signal font-semibold uppercase mb-1.5 flex items-center gap-1.5">
          <span className="w-2 h-2 bg-signal rounded-full"></span>
          <span>НЕ НАШЛИ НУЖНУЮ ИИ-УСЛУГУ?</span>
        </div>

        <h4 className="text-base font-bold text-ink-primary mb-2">
          Подберем архитектуру под ваши процессы бесплатно
        </h4>

        <p className="text-xs text-ink-secondary leading-relaxed mb-4">
          Ответьте на 3 быстрых вопроса, и наш главный инженер подготовит персональный разбор точек окупаемости и смету.
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onStartQuiz();
            }}
            className="flex-1 h-10 bg-signal hover:bg-signal-hover text-surface text-xs font-semibold uppercase tracking-wider rounded-sharp flex items-center justify-center gap-1.5 transition-mechanical"
          >
            <span>Пройти экспресс-подбор</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="text-xs text-ink-muted hover:text-ink-primary font-medium px-2 py-2"
          >
            Не сейчас
          </button>
        </div>
      </div>
    </div>
  );
};
