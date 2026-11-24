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
    <div className="py-4 space-y-5">
      {/* Acceptance Status Stamp */}
      <div className="clay-card border-clay-emerald/40 bg-clay-mint/30 dark:bg-clay-sage/10 p-4 rounded-squircle flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-clay-emerald shrink-0" />
        <div>
          <div className="font-mono text-xs font-bold text-clay-emerald uppercase tracking-wider">
            СПЕЦИФИКАЦИЯ ПРИНЯТА // ТЗ ПЕРЕДАНО В РАБОТУ
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300">
            Уведомление доставлено инженеру в Telegram
          </div>
        </div>
      </div>

      {/* Greeting & Lead ID */}
      <div>
        <h3 className="text-2xl font-bold text-clay-pine dark:text-clay-dark-pine mb-2">
          Спасибо, {quizState.residentName || 'клиент'}!
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          Мы зафиксировали вашу спецификацию. Инженер изучит параметры задачи и свяжется с вами в течение 15 минут в выбранном канале ({quizState.preferredChannel}).
        </p>

        {/* Lead Code Block with Copy */}
        <div className="flex items-center justify-between p-3.5 rounded-squircle clay-inset font-mono text-xs mb-4">
          <span className="text-slate-500">НОМЕР СПЕЦИФИКАЦИИ:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-clay-pine dark:text-clay-dark-pine">#{quizState.leadCode}</span>
            <button
              onClick={copyLeadCode}
              className="p-1 hover:text-clay-coral text-slate-400 transition-colors"
              title="Скопировать номер"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-clay-emerald" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Telegram Bot Link Button */}
        {quizState.botDeepLink && (
          <a
            href={quizState.botDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 bg-clay-pine hover:bg-clay-pine-light dark:bg-clay-mint dark:text-clay-pine text-white font-bold text-xs uppercase tracking-wider rounded-squircle flex items-center justify-center gap-2 shadow-clay-card transition-all mb-3 select-none"
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
          className="text-clay-coral hover:underline font-semibold"
        >
          ← Изменить контакты
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Рассчитать другую услугу</span>
        </button>
      </div>
    </div>
  );
};
