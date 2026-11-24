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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="clay-card rounded-squircle-lg max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-clay-border dark:border-clay-dark-border overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-clay-border dark:border-clay-dark-border">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-clay-coral" />
            <h3 className="text-lg font-bold text-clay-pine dark:text-clay-dark-pine">Политика конфиденциальности</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full clay-inset text-slate-400 hover:text-clay-coral transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="font-semibold text-clay-pine dark:text-clay-dark-pine">
            Дата вступления в силу: 24 ноября 2026 года
          </p>
          <p>
            Настоящая Политика конфиденциальности устанавливает порядок обработки и защиты персональных данных посетителей и клиентов сервиса AI.STUDIO.
          </p>

          <h4 className="font-bold text-clay-pine dark:text-clay-dark-pine pt-2">1. Сбор и состав персональных данных</h4>
          <p>
            Мы собираем только те данные, которые необходимы для расчета сметы и связи по выбранным ИИ-услугам:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Имя клиента;</li>
            <li>Город или регион (для определения часового пояса);</li>
            <li>Номер телефона и никнейм в Telegram (@username);</li>
            <li>Технические метаданные (IP-адрес, тип устройства, источник перехода).</li>
          </ul>

          <h4 className="font-bold text-clay-pine dark:text-clay-dark-pine pt-2">2. Цели обработки данных</h4>
          <p>
            Данные используются исключительно для:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Подготовки технической спецификации и расчета окупаемости (ROI);</li>
            <li>Связи дежурного инженера по указанному каналу (Telegram/телефон);</li>
            <li>Заключения соглашения о неразглашении (NDA) и договора на внедрение.</li>
          </ul>

          <h4 className="font-bold text-clay-pine dark:text-clay-dark-pine pt-2">3. Защита и нераспространение</h4>
          <p>
            Мы никогда не передаем ваши контактные данные третьим лицам или рекламным сетям. Все данные передаются по зашифрованному протоколу TLS 1.3 и хранятся в изолированном контуре.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-clay-border dark:border-clay-dark-border flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full clay-card text-xs font-bold uppercase text-clay-pine dark:text-clay-dark-pine hover:text-clay-coral transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
