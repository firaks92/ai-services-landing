import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-primary/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-surface border border-border-subtle rounded-card max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blueprint" />
            <h3 className="text-lg font-bold text-ink-primary">Политика конфиденциальности</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ink-muted hover:text-ink-primary border border-border-subtle rounded-sharp"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-ink-secondary leading-relaxed">
          <p className="font-semibold text-ink-primary">
            Дата вступления в силу: 19 ноября 2026 года
          </p>
          <p>
            Настоящая Политика конфиденциальности устанавливает порядок обработки и защиты персональных данных посетителей и клиентов (жителей) сервиса AI.STUDIO.
          </p>

          <h4 className="font-bold text-ink-primary pt-2">1. Сбор и состав персональных данных</h4>
          <p>
            Мы собираем только те данные, которые необходимы для расчета сметы и связи по выбранным ИИ-услугам:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Имя клиента;</li>
            <li>Город или район проживания (для корректного часового пояса и подбора локального менеджера);</li>
            <li>Номер телефона и никнейм в Telegram (@username);</li>
            <li>Технические метаданные (IP-адрес, тип устройства, источник перехода).</li>
          </ul>

          <h4 className="font-bold text-ink-primary pt-2">2. Цели обработки данных</h4>
          <p>
            Данные используются исключительно для:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Предоставления персонального коммерческого предложения и расчета стоимости ИИ-услуг;</li>
            <li>Оперативной коммуникации через указанный канал связи (Telegram, телефон, WhatsApp);</li>
            <li>Защиты формы от спама и автоматизированных ботов.</li>
          </ul>

          <h4 className="font-bold text-ink-primary pt-2">3. Безопасность и нераспространение</h4>
          <p>
            Мы гарантируем, что собранные персональные данные не передаются третьим лицам, не продаются брокерам данных и не используются для рассылки спама. Передача в Telegram-бот осуществляется по защищенному протоколу HTTPS с шифрованием TLS 1.3.
          </p>

          <h4 className="font-bold text-ink-primary pt-2">4. Ваши права</h4>
          <p>
            Вы имеете право в любой момент запросить удаление ваших контактных данных из базы, написав нашему администратору в Telegram: @YourAiServicesBot.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-subtle bg-canvas flex justify-end">
          <button
            onClick={onClose}
            className="bg-ink-primary hover:bg-signal text-surface px-5 py-2 text-xs font-semibold rounded-sharp transition-mechanical"
          >
            Понятно, закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
