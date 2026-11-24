import React, { useState } from 'react';
import type { QuizState } from '../../types/quiz.js';
import { CheckCircle2, Copy, Check, Send, RotateCcw } from 'lucide-react';

interface ThankYouScreenProps {
  quizState: QuizState;
  onReset: () => void;
  onEditContacts: () => void;
}

export const ThankYouScreen: React.FC<ThankYouScreenProps> = ({
  quizState,
  onReset,
  onEditContacts,
}) => {
  const [copied, setCopied] = useState(false);

  const copyLeadCode = () => {
    if (quizState.leadCode) {
      navigator.clipboard.writeText(quizState.leadCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-4 space-y-5 text-slate-900 dark:text-white">
      {/* Acceptance Status Stamp */}
      <div className="p-4 rounded-2xl bg-dash-emerald/10 border border-dash-emerald/40 flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-dash-mint shrink-0" />
        <div>
          <div className="font-mono text-xs font-bold text-dash-mint uppercase tracking-wider">
            СПЕЦИФИКАЦИЯ ПРИНЯТА // ТЗ ПЕРЕДАНО В РАБОТУ
          </div>
          <div className="text-xs text-slate-600 dark:text-dash-muted">
            Уведомление доставлено инженеру в Telegram
          </div>
        </div>
      </div>

      {/* Greeting & Lead ID */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Спасибо, {quizState.residentName || 'клиент'}!
        </h3>
        <p className="text-sm text-slate-600 dark:text-dash-muted leading-relaxed mb-4">
          Мы зафиксировали вашу спецификацию. Инженер изучит параметры задачи и свяжется с вами в течение 15 минут в выбранном канале ({quizState.preferredChannel}).
        </p>

        {/* Lead Code Block with Copy */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-dash-track border border-slate-200 dark:border-white/10 font-mono text-xs mb-4">
          <span className="text-slate-500 dark:text-dash-muted">НОМЕР СПЕЦИФИКАЦИИ:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-dash-mint">#{quizState.leadCode}</span>
            <button
              onClick={copyLeadCode}
              className="p-1 hover:text-dash-mint text-slate-400 dark:text-dash-subtle transition-colors"
              title="Скопировать номер"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-dash-emerald" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Telegram Bot Link Button */}
        {quizState.botDeepLink && (
          <a
            href={quizState.botDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 bg-gradient-to-r from-dash-mint to-dash-emerald hover:opacity-95 text-dash-dark font-extrabold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-mint transition-all mb-3 select-none"
          >
            <Send className="w-4 h-4" />
            <span>ОТКРЫТЬ СПЕЦИФИКАЦИЮ В TELEGRAM-БОТЕ</span>
          </a>
        )}
      </div>

      {/* Actions */}
      <div className="pt-2 flex items-center justify-between text-xs font-mono">
        <button
          onClick={onEditContacts}
          className="text-dash-mint hover:underline font-semibold"
        >
          ← Изменить контакты
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-slate-500 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Рассчитать другую услугу</span>
        </button>
      </div>
    </div>
  );
};
