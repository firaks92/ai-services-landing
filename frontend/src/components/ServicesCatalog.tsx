import React, { useState } from 'react';
import { ArrowRight, Bot, Workflow, Sparkles, Database, Compass, Check, Layers } from 'lucide-react';
import type { ServiceCode } from '../types/quiz.js';

interface ServicesCatalogProps {
  onSelectService: (serviceCode: ServiceCode) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ onSelectService }) => {
  // Card mode switcher: 'effect' (Бизнес-эффект) vs 'stack' (Стек и архитектура)
  const [viewMode, setViewMode] = useState<'effect' | 'stack'>('effect');

  return (
    <section id="services" className="py-20 md:py-28 border-b border-clay-border dark:border-clay-dark-border">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 gap-6 border-b border-clay-border dark:border-clay-dark-border">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full clay-inset mb-3 font-mono text-xs font-bold text-clay-pine dark:text-clay-sage-soft uppercase tracking-wider">
              [ 01 // ИНЖЕНЕРНЫЕ УЗЛЫ СИСТЕМЫ ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-clay-pine dark:text-clay-dark-pine">
              Модульная архитектура для вашего бизнеса
            </h2>
          </div>

          {/* Interactive Perspective Switcher (Pinterest inspired toggle) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-mono text-xs text-slate-500 uppercase">Режим отображения:</span>
            <div className="p-1 rounded-full clay-inset flex items-center">
              <button
                onClick={() => setViewMode('effect')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'effect'
                    ? 'clay-card text-clay-pine dark:text-clay-mint shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Бизнес-эффект & ROI
              </button>
              <button
                onClick={() => setViewMode('stack')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  viewMode === 'stack'
                    ? 'clay-card text-clay-pine dark:text-clay-mint shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Стек & Интеграции
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Node 01: AI Chatbots (Flagship 7 cols) */}
          <div className="lg:col-span-7 clay-card p-7 sm:p-9 flex flex-col justify-between hover:shadow-clay-card-hover transition-all group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-clay-mint/50 dark:bg-clay-sage/20 text-clay-emerald dark:text-clay-mint">
                    NODE-01 // ФЛАГМАН
                  </span>
                  <span className="font-mono text-xs text-slate-400">ВНЕДРЕНИЕ ЗА 7–14 ДНЕЙ</span>
                </div>
                <div className="w-10 h-10 rounded-squircle clay-inset flex items-center justify-center text-clay-pine dark:text-clay-mint group-hover:scale-105 transition-transform">
                  <Bot className="w-5 h-5 text-clay-emerald" />
                </div>
              </div>

              {/* Schematic mini-track */}
              <div className="p-3 mb-6 rounded-squircle-sm clay-inset flex items-center justify-between font-mono text-[11px] text-slate-600 dark:text-slate-300">
                <span className="font-semibold">Клиент (TG / WhatsApp)</span>
                <span className="text-clay-coral font-bold">⟶ [LLM Продавец] ⟶</span>
                <span className="font-semibold">Сделка в CRM (0.6с)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-clay-pine dark:text-clay-dark-pine mb-3">
                ИИ-чат-боты и голосовые ассистенты
              </h3>

              {viewMode === 'effect' ? (
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Консультируют по каталогу без галлюцинаций, квалифицируют лидов, отрабатывают 90% возражений и автоматически создают сделку в CRM. Отвечают за 0.8 сек даже в 3 часа ночи.
                </p>
              ) : (
                <div className="p-4 mb-6 rounded-squircle-sm bg-clay-card-muted dark:bg-clay-dark-muted font-mono text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  <div>• Архитектура: Llama 3.3 / Claude 3.5 Sonnet / OpenAI GPT-4o</div>
                  <div>• Каналы: Telegram Bot API, WhatsApp Business API, Web Widget</div>
                  <div>• Интеграции: amoCRM, Bitrix24, МойСклад, Google Таблицы</div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Telegram', 'WhatsApp', 'Instagram Direct', 'Сайт-виджет', 'Телефония'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 rounded-full clay-inset text-slate-700 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService('chatbot')}
              className="flex items-center justify-between w-full pt-5 border-t border-clay-border dark:border-clay-dark-border text-xs font-bold uppercase tracking-wider text-clay-pine dark:text-clay-dark-pine group-hover:text-clay-coral transition-colors"
            >
              <span>Сконфигурировать узел чат-бота</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Node 02: Process Automation (Flagship 5 cols) */}
          <div className="lg:col-span-5 clay-card p-7 sm:p-9 flex flex-col justify-between hover:shadow-clay-card-hover transition-all group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-clay-peach/60 dark:bg-clay-coral/20 text-clay-coral">
                  NODE-02 // ПРОЦЕССЫ
                </span>
                <div className="w-10 h-10 rounded-squircle clay-inset flex items-center justify-center text-clay-pine dark:text-clay-mint group-hover:scale-105 transition-transform">
                  <Workflow className="w-5 h-5 text-clay-coral" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-clay-pine dark:text-clay-dark-pine mb-3">
                Автоматизация рутины и CRM
              </h3>

              {viewMode === 'effect' ? (
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  Автоматический разбор счетов, договоров, накладных и актов сверки. ИИ считывает сканы документов, извлекает реквизиты и отправляет данные в 1С или ERP без ошибок оператора.
                </p>
              ) : (
                <div className="p-4 mb-6 rounded-squircle-sm bg-clay-card-muted dark:bg-clay-dark-muted font-mono text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  <div>• Движок автоматизации: n8n self-hosted / Make</div>
                  <div>• Распознавание: OCR + Vision LLM мультимодальные модели</div>
                  <div>• Выгрузка: 1С:Предприятие, Bitrix24, Postgres, Webhooks</div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {['amoCRM', 'Bitrix24', '1С / ERP', 'n8n', 'Google Docs'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 rounded-full clay-inset text-slate-700 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService('automation')}
              className="flex items-center justify-between w-full pt-5 border-t border-clay-border dark:border-clay-dark-border text-xs font-bold uppercase tracking-wider text-clay-pine dark:text-clay-dark-pine group-hover:text-clay-coral transition-colors"
            >
              <span>Сконфигурировать автоматизацию</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Node 03: RAG Knowledge Bases (4 cols) */}
          <div className="lg:col-span-4 clay-card p-6 sm:p-7 flex flex-col justify-between hover:shadow-clay-card-hover transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full clay-inset text-clay-pine dark:text-clay-mint">
                  NODE-03 // RAG
                </span>
                <Database className="w-5 h-5 text-clay-sage" />
              </div>
              <h3 className="text-lg font-bold text-clay-pine dark:text-clay-dark-pine mb-2">
                Базы знаний и RAG-поиск
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Поиск по регламентам, PDF, ГОСТам и внутренней документации компании. Ассистент находит точный пункт регламента за 0.5 секунды с указанием первоисточника.
              </p>
            </div>
            <button
              onClick={() => onSelectService('rag_analytics')}
              className="flex items-center justify-between w-full pt-4 border-t border-clay-border dark:border-clay-dark-border text-xs font-bold uppercase tracking-wider text-clay-pine dark:text-clay-dark-pine group-hover:text-clay-coral transition-colors"
            >
              <span>Выбрать RAG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Node 04: AI Content & Marketing (4 cols) */}
          <div className="lg:col-span-4 clay-card p-6 sm:p-7 flex flex-col justify-between hover:shadow-clay-card-hover transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full clay-inset text-clay-pine dark:text-clay-mint">
                  NODE-04 // КОНТЕНТ
                </span>
                <Sparkles className="w-5 h-5 text-clay-coral" />
              </div>
              <h3 className="text-lg font-bold text-clay-pine dark:text-clay-dark-pine mb-2">
                ИИ-маркетинг и контент
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Массовая генерация сотен карточек товаров для Wildberries/Uzum/Ozon, рекламные сценарии, фотореалистичные генерации и видео-аватары по брендбуку.
              </p>
            </div>
            <button
              onClick={() => onSelectService('content')}
              className="flex items-center justify-between w-full pt-4 border-t border-clay-border dark:border-clay-dark-border text-xs font-bold uppercase tracking-wider text-clay-pine dark:text-clay-dark-pine group-hover:text-clay-coral transition-colors"
            >
              <span>Выбрать контент</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Node 05: Custom Audit & Enterprise (4 cols) */}
          <div className="lg:col-span-4 clay-card p-6 sm:p-7 flex flex-col justify-between hover:shadow-clay-card-hover transition-all group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full clay-inset text-clay-pine dark:text-clay-mint">
                  NODE-05 // АУДИТ
                </span>
                <Compass className="w-5 h-5 text-clay-pine dark:text-clay-mint" />
              </div>
              <h3 className="text-lg font-bold text-clay-pine dark:text-clay-dark-pine mb-2">
                ИИ-аудит и кастомное R&D
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Полный аудит бизнес-процессов компании с выявлением узких мест. Составляем расчет окупаемости (ROI), подбираем архитектуру и внедряем под ключ.
              </p>
            </div>
            <button
              onClick={() => onSelectService('custom_audit')}
              className="flex items-center justify-between w-full pt-4 border-t border-clay-border dark:border-clay-dark-border text-xs font-bold uppercase tracking-wider text-clay-pine dark:text-clay-dark-pine group-hover:text-clay-coral transition-colors"
            >
              <span>Заказать аудит</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
