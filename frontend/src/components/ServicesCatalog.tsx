import React, { useState } from 'react';
import { ArrowRight, Bot, Workflow, Sparkles, Database, Compass } from 'lucide-react';
import type { ServiceCode } from '../types/quiz.js';
import { useLocale } from '../context/LocaleContext.js';

interface ServicesCatalogProps {
  onSelectService: (serviceCode: ServiceCode) => void;
}

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ onSelectService }) => {
  const [viewMode, setViewMode] = useState<'effect' | 'stack'>('effect');
  const { language } = useLocale();

  return (
    <section id="services" className="py-20 md:py-28 border-b border-slate-200 dark:border-white/10 bg-transparent transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 gap-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-3 font-mono text-xs font-bold text-dash-mint uppercase tracking-wider">
              {language === 'uz' ? '[ 01 // TIZIM MODULLARI ]' : language === 'en' ? '[ 01 // SYSTEM MODULES ]' : '[ 01 // ИНЖЕНЕРНЫЕ УЗЛЫ СИСТЕМЫ ]'}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {language === 'uz' ? 'Biznesingiz uchun modulli AI arxitekturasi' : language === 'en' ? 'Modular AI Architecture for Enterprise' : 'Модульная архитектура для вашего бизнеса'}
            </h2>
          </div>

          {/* Interactive Perspective Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="font-mono text-xs text-slate-500 dark:text-dash-muted uppercase">
              {language === 'uz' ? 'Ko‘rish rejimi:' : language === 'en' ? 'View mode:' : 'Режим отображения:'}
            </span>
            <div className="p-1 rounded-full glass-pill flex items-center">
              <button
                onClick={() => setViewMode('effect')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'effect'
                    ? 'bg-gradient-to-r from-dash-mint to-dash-emerald text-dash-dark shadow-mint font-extrabold'
                    : 'text-slate-500 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {language === 'uz' ? 'Biznes-effekt & ROI' : language === 'en' ? 'Business ROI' : 'Бизнес-эффект & ROI'}
              </button>
              <button
                onClick={() => setViewMode('stack')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  viewMode === 'stack'
                    ? 'bg-gradient-to-r from-dash-mint to-dash-emerald text-dash-dark shadow-mint font-extrabold'
                    : 'text-slate-500 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {language === 'uz' ? 'Texnik stek & Integratsiyalar' : language === 'en' ? 'Tech Stack & Integrations' : 'Стек & Интеграции'}
              </button>
            </div>
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Node 01: AI Chatbots (Flagship 7 cols) */}
          <div className="lg:col-span-7 neon-card p-7 sm:p-9 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-dash-emerald/15 text-dash-mint border border-dash-emerald/30">
                    NODE-01 // ФЛАГМАН
                  </span>
                  <span className="font-mono text-xs text-dash-subtle">ЗАПУСК ЗА 7–14 ДНЕЙ</span>
                </div>
                <div className="w-11 h-11 rounded-2xl glass-pill flex items-center justify-center text-dash-mint group-hover:scale-105 transition-transform shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
              </div>

              {/* Schematic mini-track */}
              <div className="p-3 mb-6 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/30 dark:border-white/10 flex items-center justify-between font-mono text-xs text-slate-600 dark:text-dash-muted">
                <span className="font-semibold text-slate-900 dark:text-white">Клиент (TG / WhatsApp)</span>
                <span className="text-dash-mint font-bold">⟶ [LLM Продавец] ⟶</span>
                <span className="font-semibold text-dash-emerald">Сделка в CRM (0.6с)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-3">
                ИИ-чат-боты и голосовые ассистенты
              </h3>

              {viewMode === 'effect' ? (
                <p className="text-sm sm:text-base text-slate-600 dark:text-dash-muted leading-relaxed mb-6">
                  Консультируют по каталогу без галлюцинаций, квалифицируют лидов, отрабатывают 90% возражений и автоматически создают сделку в CRM. Отвечают за 0.8 сек даже в 3 часа ночи.
                </p>
              ) : (
                <div className="p-4 mb-6 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/30 dark:border-white/10 font-mono text-xs space-y-1.5 text-slate-900 dark:text-dash-text">
                  <div>• Архитектура: Llama 3.3 / Claude 3.5 Sonnet / OpenAI GPT-4o</div>
                  <div>• Каналы: Telegram Bot API, WhatsApp Business API, Web Widget</div>
                  <div>• Интеграции: amoCRM, Bitrix24, МойСклад, Google Таблицы</div>
                </div>
              )}

              {/* Colorful Pill Grid */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { name: 'Telegram', color: 'border-dash-emerald/40 text-dash-mint bg-dash-emerald/10' },
                  { name: 'WhatsApp', color: 'border-dash-emerald/40 text-dash-mint bg-dash-emerald/10' },
                  { name: 'Instagram Direct', color: 'border-dash-emerald/40 text-dash-mint bg-dash-emerald/10' },
                  { name: 'amoCRM', color: 'border-dash-emerald/40 text-dash-mint bg-dash-emerald/10' },
                  { name: 'Телефония', color: 'border-dash-emerald/40 text-dash-mint bg-dash-emerald/10' },
                ].map((tag) => (
                  <span
                    key={tag.name}
                    className={`font-mono text-xs px-3 py-1 rounded-full border backdrop-blur-md ${tag.color}`}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService('chatbot')}
              className="flex items-center justify-between w-full pt-5 border-t border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-dash-mint hover:text-white transition-colors"
            >
              <span>Сконфигурировать узел чат-бота</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Node 02: Process Automation (Flagship 5 cols) */}
          <div className="lg:col-span-5 neon-card p-7 sm:p-9 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-dash-emerald/15 text-dash-mint border border-dash-emerald/30">
                  NODE-02 // АВТОМАТИЗАЦИЯ
                </span>
                <div className="w-11 h-11 rounded-2xl glass-pill flex items-center justify-center text-dash-mint group-hover:scale-105 transition-transform shadow-sm">
                  <Workflow className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
                Автоматизация рутины и CRM
              </h3>

              {viewMode === 'effect' ? (
                <p className="text-sm text-slate-600 dark:text-dash-muted leading-relaxed mb-6">
                  Автоматический разбор счетов, договоров, накладных и актов сверки. ИИ считывает сканы документов, извлекает реквизиты и отправляет данные в 1С или ERP без ошибок оператора.
                </p>
              ) : (
                <div className="p-4 mb-6 rounded-xl bg-white/60 dark:bg-white/[0.04] backdrop-blur-md border border-white/30 dark:border-white/10 font-mono text-xs space-y-1.5 text-slate-900 dark:text-dash-text">
                  <div>• Движок автоматизации: n8n self-hosted / Make</div>
                  <div>• Распознавание: OCR + Vision LLM мультимодальные модели</div>
                  <div>• Выгрузка: 1С:Предприятие, Bitrix24, Postgres, Webhooks</div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {['Bitrix24', '1С / ERP', 'n8n Flow', 'Google Docs'].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 rounded-full glass-pill text-slate-700 dark:text-dash-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectService('automation')}
              className="flex items-center justify-between w-full pt-5 border-t border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-dash-mint hover:text-white transition-colors"
            >
              <span>Сконфигурировать автоматизацию</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Node 03: RAG Knowledge Bases (4 cols) */}
          <div className="lg:col-span-4 neon-card p-6 sm:p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-dash-emerald/15 text-dash-mint border border-dash-emerald/30">
                  NODE-03 // RAG
                </span>
                <Database className="w-5 h-5 text-dash-mint" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                Базы знаний и RAG-поиск
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dash-muted leading-relaxed mb-6">
                Поиск по регламентам, PDF, ГОСТам и внутренней документации компании. Ассистент находит точный пункт регламента за 0.5 секунды с указанием первоисточника.
              </p>
            </div>
            <button
              onClick={() => onSelectService('rag_analytics')}
              className="flex items-center justify-between w-full pt-4 border-t border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-dash-mint hover:text-white transition-colors"
            >
              <span>Выбрать RAG</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Node 04: AI Content & Marketing (4 cols) */}
          <div className="lg:col-span-4 neon-card p-6 sm:p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-dash-emerald/15 text-dash-mint border border-dash-emerald/30">
                  NODE-04 // КОНТЕНТ
                </span>
                <Sparkles className="w-5 h-5 text-dash-mint" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                ИИ-маркетинг и контент
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dash-muted leading-relaxed mb-6">
                Массовая генерация сотен карточек товаров для маркетплейсов, рекламные сценарии, фотореалистичные генерации и видео-аватары по брендбуку.
              </p>
            </div>
            <button
              onClick={() => onSelectService('content')}
              className="flex items-center justify-between w-full pt-4 border-t border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-dash-mint hover:text-white transition-colors"
            >
              <span>Выбрать контент</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Node 05: Custom Audit & Enterprise (4 cols) */}
          <div className="lg:col-span-4 neon-card p-6 sm:p-7 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-dash-emerald/15 text-dash-mint border border-dash-emerald/30">
                  NODE-05 // АУДИТ
                </span>
                <Compass className="w-5 h-5 text-dash-mint" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                ИИ-аудит и кастомное R&D
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dash-muted leading-relaxed mb-6">
                Полный аудит бизнес-процессов компании с выявлением узких мест. Составляем расчет окупаемости (ROI), подбираем архитектуру и внедряем под ключ.
              </p>
            </div>
            <button
              onClick={() => onSelectService('custom_audit')}
              className="flex items-center justify-between w-full pt-4 border-t border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-dash-mint hover:text-white transition-colors"
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
