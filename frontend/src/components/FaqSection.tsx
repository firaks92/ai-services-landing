import React, { useState } from 'react';
import { Plus, Minus, MessageSquare, Sparkles } from 'lucide-react';

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
    <section id="faq" className="py-20 md:py-28 border-b border-white/20 dark:border-white/10 bg-transparent transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column (Sticky info) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-3 font-mono text-xs font-bold text-dash-cyan uppercase tracking-wider">
              [ 05 // ЧАСТЫЕ ВОПРОСЫ И ОТВЕТЫ ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Ответы на главные вопросы и сомнения
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-dash-muted leading-relaxed mb-8">
              Если у вас есть специфическая задача, нестандартная база данных или закрытый контур — задайте вопрос напрямую нашему архитектору.
            </p>

            <a
              href="https://t.me/frxaiagentbot?start=direct_site_faq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-dash-magenta to-dash-purple hover:opacity-95 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-neon-magenta transition-all select-none group"
            >
              <MessageSquare className="w-4 h-4 text-dash-cyan group-hover:scale-110 transition-transform" />
              <span>Задать вопрос инженеру в Telegram</span>
            </a>
          </div>

          {/* Right Column (Accordion List) */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="neon-card rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 select-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full glass-pill shrink-0 flex items-center justify-center transition-transform ${
                        isOpen ? 'bg-dash-magenta text-white rotate-180 shadow-neon-magenta' : 'text-slate-500 dark:text-dash-muted'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-slate-600 dark:text-dash-muted leading-relaxed border-t border-white/20 dark:border-white/10 pt-4">
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
