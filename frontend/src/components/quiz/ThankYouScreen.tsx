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
    <div className="py-4 space-y-5 text-white">
      {/* Acceptance Status Stamp */}
      <div className="p-4 rounded-2xl bg-dash-lime/10 border border-dash-lime/40 flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-dash-lime shrink-0" />
        <div>
          <div className="font-mono text-xs font-bold text-dash-lime uppercase tracking-wider">
            СПЕЦИФИКАЦИЯ ПРИНЯТА // ТЗ ПЕРЕДАНО В РАБОТУ
          </div>
          <div className="text-xs text-dash-muted">
            Уведомление доставлено инженеру в Telegram
          </div>
        </div>
      </div>

      {/* Greeting & Lead ID */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">
          Спасибо, {quizState.residentName || 'клиент'}!
        </h3>
        <p className="text-sm text-dash-muted leading-relaxed mb-4">
          Мы зафиксировали вашу спецификацию. Инженер изучит параметры задачи и свяжется с вами в течение 15 минут в выбранном канале ({quizState.preferredChannel}).
        </p>

        {/* Lead Code Block with Copy */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-dash-track border border-white/10 font-mono text-xs mb-4">
          <span className="text-dash-muted">НОМЕР СПЕЦИФИКАЦИИ:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-dash-cyan">#{quizState.leadCode}</span>
            <button
              onClick={copyLeadCode}
              className="p-1 hover:text-dash-magenta text-dash-subtle transition-colors"
              title="Скопировать номер"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-dash-lime" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Telegram Bot Link Button */}
        {quizState.botDeepLink && (
          <a
            href={quizState.botDeepLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 bg-gradient-to-r from-dash-magenta via-dash-purple to-dash-violet hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-neon-magenta transition-all mb-3 select-none"
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
          className="text-dash-magenta hover:underline font-semibold"
        >
          ← Изменить контакты
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-dash-muted hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Рассчитать другую услугу</span>
        </button>
      </div>
    </div>
  );
};
