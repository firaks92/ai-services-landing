import React, { useState } from 'react';
import { Plus, MessageSquare } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Насколько конфиденциальны данные нашей компании и клиентов?',
      a: 'Мы подписываем строгий договор о конфиденциальности (NDA) до начала работы. Все базы знаний и диалоги обрабатываются через изолированные корпоративные API. Ваши корпоративные данные никогда не используются для публичного дообучения сторонних моделей и хранятся на защищенных серверах.',
    },
    {
      q: 'Что если ИИ «галлюцинирует» и пообещает клиенту несуществующую скидку?',
      a: 'Мы используем архитектуру с жесткими системными ограничениями (Strict Prompt Guards & Grounded RAG). ИИ опирается исключительно на вашу актуальную базу знаний и прайс-лист. Если вопрос выходит за рамки регламента или уверенность модели ниже 95%, бот вежливо сообщает, что уточнит деталь у менеджера, и мгновенно переводит диалог.',
    },
    {
      q: 'Сколько времени занимает внедрение типового решения?',
      a: 'Базовый прототип в Telegram-песочнице собирается за 3–5 дней. Полное внедрение со всеми интеграциями (amoCRM/Bitrix24, мессенджеры, телефония и регламенты) занимает от 7 до 14 рабочих дней.',
    },
    {
      q: 'Из чего складывается стоимость проекта и дальнейшие расходы?',
      a: 'Стоимость состоит из двух понятных частей: 1) Фиксированная стоимость проектирования и интеграции решения под ключ; 2) Прямые расходы на вычислительные мощности (токены LLM / сервер). В среднем для малого и среднего бизнеса поддержка и токены обходятся всего в $20–$60 в месяц.',
    },
    {
      q: 'С какими системами и мессенджерами вы интегрируете ИИ?',
      a: 'Мы подключаем ИИ к Telegram, WhatsApp Business API, Instagram Direct, виджетам на сайте, IP-телефонии, amoCRM, Bitrix24, 1С, МойСклад, Google Таблицам, почте и любым кастомным базам данных через вебхуки и REST API.',
    },
    {
      q: 'Нужно ли обучать наших менеджеров работе с новой системой?',
      a: 'Нет. Менеджерам не нужно учиться сложным техническим инструментам: они просто получают чистые, структурированные карточки лидов с историей диалога в привычный рабочий Telegram-чат или карточку сделки в CRM.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 border-b border-border-subtle bg-canvas">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (Sticky info) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 h-fit">
            <div className="font-mono text-xs font-medium text-ink-muted uppercase tracking-wider mb-2">
              [04 / ЧАСТЫЕ ВОПРОСЫ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink-primary mb-6">
              Ответы на главные вопросы и сомнения
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed mb-8">
              Если у вас есть специфическая задача, нестандартная база данных или закрытый контур — задайте вопрос напрямую нашему архитектору.
            </p>

            <a
              href="https://t.me/YourAiServicesBot?start=direct_site_faq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border-strong hover:bg-blueprint hover:border-blueprint hover:text-surface text-ink-primary px-4 py-2.5 text-xs font-semibold rounded-sharp transition-mechanical group"
            >
              <MessageSquare className="w-4 h-4 text-blueprint group-hover:text-surface transition-colors" />
              <span>Задать вопрос инженеру в Telegram</span>
            </a>
          </div>

          {/* Right Column (Accordion) */}
          <div className="lg:col-span-7 border-t border-border-subtle">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="border-b border-border-subtle">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex items-center justify-between w-full py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-semibold text-ink-primary group-hover:text-signal transition-colors pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`w-6 h-6 flex items-center justify-center border border-border-subtle rounded-sharp transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-45 border-signal text-signal' : 'text-ink-secondary'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-6 pr-8 text-sm text-ink-secondary leading-relaxed animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
