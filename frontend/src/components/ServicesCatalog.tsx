import React from 'react';
import { ArrowRight, Bot, Workflow, Sparkles, FileText, Compass } from 'lucide-react';
import type { ServiceCode } from '../types/quiz.js';

interface ServicesCatalogProps {
  onSelectService: (serviceCode: ServiceCode) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 md:py-28 border-b border-border-subtle bg-canvas">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-border-subtle mb-12 gap-4">
          <div>
            <div className="font-mono text-xs font-medium text-ink-muted uppercase tracking-wider mb-2">
              [01 / КАТАЛОГ УСЛУГ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink-primary">
              Конкретные инженерные узлы под задачи бизнеса
            </h2>
          </div>
          <p className="text-sm text-ink-secondary max-w-md">
            Никаких абстрактных обещаний. Вы получаете автономный модуль, протестированный на ваших данных и интегрированный в существующую IT-инфраструктуру.
          </p>
        </div>

        {/* 6-Column Asymmetric Swiss Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 border-t border-l border-border-subtle bg-surface">
          {/* 01: Flagship 1 - AI Chatbots (3 cols) */}
          <div className="md:col-span-3 border-r border-b border-border-subtle p-6 sm:p-8 flex flex-col justify-between hover:bg-surface-hover transition-mechanical group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-signal tracking-wider">
                  01 // ФЛАГМАНСКОЕ РЕШЕНИЕ
                </span>
                <Bot className="w-5 h-5 text-ink-primary group-hover:text-signal transition-colors" />
              </div>

              {/* Vector circuit schematic */}
              <div className="h-14 mb-6 border border-border-subtle rounded-sharp p-2 flex items-center justify-between font-mono text-[10px] text-ink-muted bg-canvas">
                <span>TG/WhatsApp/Сайт</span>
                <span className="text-signal">⟶ [LLM Продавец] ⟶</span>
                <span>Сделка в CRM (0.8с)</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-ink-primary mb-3">
                ИИ-чат-боты и голосовые ассистенты
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed mb-6">
                Мгновенно консультируют по всему прайсу и каталогу, отвечают на сложные возражения клиентов, квалифицируют лидов и автоматически записывают в CRM или онлайн-календарь 24 часа в сутки.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {['Telegram', 'WhatsApp', 'Instagram Direct', 'Виджет сайта', 'Телефония'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-0.5 border border-border-subtle bg-surface rounded-sharp text-ink-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService('chatbot')}
              className="flex items-center justify-between w-full pt-4 border-t border-border-subtle group-hover:border-ink-primary text-xs font-semibold uppercase tracking-wider text-ink-primary group-hover:text-signal transition-colors"
            >
              <span>Подобрать и рассчитать решение</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 02: Flagship 2 - Automation (3 cols) */}
          <div className="md:col-span-3 border-r border-b border-border-subtle p-6 sm:p-8 flex flex-col justify-between hover:bg-surface-hover transition-mechanical group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold text-signal tracking-wider">
                  02 // ФЛАГМАНСКОЕ РЕШЕНИЕ
                </span>
                <Workflow className="w-5 h-5 text-ink-primary group-hover:text-signal transition-colors" />
              </div>

              {/* Vector circuit schematic */}
              <div className="h-14 mb-6 border border-border-subtle rounded-sharp p-2 flex items-center justify-between font-mono text-[10px] text-ink-muted bg-canvas">
                <span>Входящая почта/счета</span>
                <span className="text-signal">⟶ [n8n + AI] ⟶</span>
                <span>Запись в 1C / Таблицы</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-ink-primary mb-3">
                Автоматизация бизнес-процессов
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed mb-6">
                Интеграция ИИ с amoCRM, Bitrix24, Google Таблицами, 1С и ERP. Автоматический разбор договоров, счетов, клиентских писем, отправка закрывающих документов и формирование отчетов без участия человека.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {['amoCRM', 'Bitrix24', '1С / ERP', 'n8n', 'Google Таблицы'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[11px] px-2 py-0.5 border border-border-subtle bg-surface rounded-sharp text-ink-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService('automation')}
              className="flex items-center justify-between w-full pt-4 border-t border-border-subtle group-hover:border-ink-primary text-xs font-semibold uppercase tracking-wider text-ink-primary group-hover:text-signal transition-colors"
            >
              <span>Подобрать и рассчитать решение</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* 03: Marketing & Content (2 cols) */}
          <div className="md:col-span-2 border-r border-b border-border-subtle p-6 flex flex-col justify-between hover:bg-surface-hover transition-mechanical group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold text-ink-muted tracking-wider">
                  03 // МАРКЕТИНГ
                </span>
                <Sparkles className="w-4 h-4 text-ink-secondary group-hover:text-signal transition-colors" />
              </div>

              <h3 className="text-lg font-bold text-ink-primary mb-2">
                ИИ для контента и маркетинга
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                Генерация сотен карточек товаров для Wildberries/Uzum, создание сценариев, рекламных креативов, видео-аватаров и SEO-статей по вашим гайдлайнам.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Маркетплейсы', 'ИИ-аватары', 'Реклама'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-1.5 py-0.5 border border-border-subtle bg-surface rounded-sharp text-ink-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService('content')}
              className="flex items-center justify-between w-full pt-3 border-t border-border-subtle text-xs font-semibold uppercase tracking-wider text-ink-primary group-hover:text-signal transition-colors"
            >
              <span>Выбрать услугу</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 04: Data & RAG (2 cols) */}
          <div className="md:col-span-2 border-r border-b border-border-subtle p-6 flex flex-col justify-between hover:bg-surface-hover transition-mechanical group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold text-ink-muted tracking-wider">
                  04 // ДАННЫЕ И RAG
                </span>
                <FileText className="w-4 h-4 text-ink-secondary group-hover:text-signal transition-colors" />
              </div>

              <h3 className="text-lg font-bold text-ink-primary mb-2">
                Базы знаний и аналитика (RAG)
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                Умный поиск по регламентам и архивам PDF для сотрудников. Автоматическая расшифровка звонков отдела продаж, оценка чек-листов и выявление узких мест воронки.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {['RAG-базы', 'Скоринг звонков', 'Поиск по PDF'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-1.5 py-0.5 border border-border-subtle bg-surface rounded-sharp text-ink-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService('rag_analytics')}
              className="flex items-center justify-between w-full pt-3 border-t border-border-subtle text-xs font-semibold uppercase tracking-wider text-ink-primary group-hover:text-signal transition-colors"
            >
              <span>Выбрать услугу</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* 05: Custom Audit (2 cols) */}
          <div className="md:col-span-2 border-r border-b border-border-subtle p-6 flex flex-col justify-between hover:bg-surface-hover transition-mechanical group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-semibold text-ink-muted tracking-wider">
                  05 // ИНДИВИДУАЛЬНО
                </span>
                <Compass className="w-4 h-4 text-ink-secondary group-hover:text-signal transition-colors" />
              </div>

              <h3 className="text-lg font-bold text-ink-primary mb-2">
                Аудит и кастомная разработка
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                Экспресс-аудит бизнес-процессов компании. Поиск точек с максимальной окупаемостью (ROI) внедрения ИИ, проектирование архитектуры и обучение вашей команды.
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {['Экспресс-аудит', 'Архитектура', 'Консалтинг'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-1.5 py-0.5 border border-border-subtle bg-surface rounded-sharp text-ink-secondary"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService('custom_audit')}
              className="flex items-center justify-between w-full pt-3 border-t border-border-subtle text-xs font-semibold uppercase tracking-wider text-ink-primary group-hover:text-signal transition-colors"
            >
              <span>Нужна консультация</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
