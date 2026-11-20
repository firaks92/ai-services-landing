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
    <div className="py-4 space-y-6 animate-fadeIn">
      {/* Acceptance Status Stamp */}
      <div className="border border-status-success/30 bg-status-success/5 p-4 rounded-sharp flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-status-success flex-shrink-0" />
        <div>
          <div className="font-mono text-xs font-bold text-status-success uppercase tracking-wider">
            ЗАЯВКА ПРИНЯТА И ПЕРЕДАНА В РАБОТУ
          </div>
          <div className="text-xs text-ink-secondary">
            Уведомление доставлено инженеру в Telegram-чат
          </div>
        </div>
      </div>

      {/* Greeting & Lead ID */}
      <div>
        <h3 className="text-2xl font-bold text-ink-primary mb-2">
          Спасибо, {quizState.residentName || 'клиент'}!
        </h3>
        <p className="text-sm text-ink-secondary leading-relaxed mb-4">
          Мы зафиксировали вашу спецификацию. Инженер изучит параметры задачи и свяжется с вами в течение 15 минут в выбранном канале ({quizState.preferredChannel}).
        </p>

        {/* Lead Code Block with Copy */}
        <div className="flex items-center justify-between p-3 bg-canvas border border-border-subtle rounded-sharp font-mono text-xs">
          <span className="text-ink-muted">НОМЕР ЗАЯВКИ:</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-ink-primary">#{quizState.leadCode}</span>
            <button
              onClick={copyLeadCode}
              className="p-1 hover:text-signal text-ink-muted transition-colors"
              title="Скопировать номер заявки"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-status-success" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 bg-surface border border-border-subtle rounded-sharp text-xs space-y-2">
        <div className="font-mono text-[10px] text-ink-muted uppercase">РЕЗЮМЕ СПЕЦИФИКАЦИИ:</div>
        <div className="text-ink-primary">
          <span className="font-semibold">Услуга:</span> {quizState.primaryService}
        </div>
        {quizState.serviceDetails.length > 0 && (
          <div className="text-ink-secondary">
            <span className="font-semibold text-ink-primary">Детали:</span> {quizState.serviceDetails.join(', ')}
          </div>
        )}
        <div className="text-ink-secondary">
          <span className="font-semibold text-ink-primary">Локация:</span> {quizState.cityInput}
        </div>
        {quizState.budget && (
          <div className="text-ink-secondary">
            <span className="font-semibold text-ink-primary">Бюджет:</span> {quizState.budget}
          </div>
        )}
      </div>

      {/* Direct Telegram Bridge Button */}
      <div className="space-y-3 pt-2">
        <div className="text-xs text-ink-secondary leading-relaxed">
          Перейдите в наш Telegram-бот, чтобы получить мгновенное персональное подтверждение и при необходимости отправить ТЗ или файлы:
        </div>

        <a
          href={quizState.botDeepLink || `https://t.me/YourAiServicesBot?start=lead_${quizState.leadCode}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-12 bg-blueprint hover:bg-blueprint-hover text-surface font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-sharp flex items-center justify-center gap-2 transition-mechanical shadow-sm"
        >
          <Send className="w-4 h-4" />
          <span>ОТКРЫТЬ ДИАЛОГ В TELEGRAM-БОТЕ</span>
        </a>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-border-subtle flex items-center justify-between text-xs">
        <button
          onClick={onReset}
          className="text-ink-secondary hover:text-ink-primary font-medium"
        >
          Вернуться на сайт
        </button>

        <button
          onClick={onEditContacts}
          className="text-blueprint hover:underline flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Исправить номер или комментарий</span>
        </button>
      </div>
    </div>
  );
};
