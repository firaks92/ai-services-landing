import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Cpu, MessageSquare, Database, CheckCircle2 } from 'lucide-react';
import type { ServiceCode } from '../types/quiz.js';

interface HeroProps {
  onOpenQuiz: () => void;
  onSelectService: (serviceCode: ServiceCode) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuiz, onSelectService }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const quickServices: { code: ServiceCode; label: string; index: string }[] = [
    { code: 'chatbot', label: 'Чат-боты', index: '01' },
    { code: 'automation', label: 'Автоматизация', index: '02' },
    { code: 'content', label: 'ИИ-контент', index: '03' },
    { code: 'rag_analytics', label: 'Базы RAG', index: '04' },
    { code: 'custom_audit', label: 'Аудит и кастом', index: '05' },
  ];

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 border-b border-border-subtle bg-canvas">
      {/* Swiss grid corner crosshairs */}
      <div className="absolute top-4 left-4 font-mono text-xs text-border-subtle select-none">+</div>
      <div className="absolute top-4 right-4 font-mono text-xs text-border-subtle select-none">+</div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Index */}
        <div className="flex items-center justify-between pb-6 border-b border-border-subtle mb-10">
          <span className="font-mono text-xs font-medium text-ink-muted uppercase tracking-wider">
            [00 / ИНЖЕНЕРИЯ ИИ ДЛЯ БИЗНЕСА]
          </span>
          <span className="hidden sm:inline-block font-mono text-xs text-ink-secondary">
            ПРОМЫШЛЕННЫЙ СТАНДАРТ ВНЕДРЕНИЯ
          </span>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="max-w-4xl mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink-primary leading-[1.08] mb-6">
            Внедряем ИИ-системы, которые{' '}
            <span className="font-serif italic font-normal text-signal">
              сокращают рутину на 60%
            </span>{' '}
            и продают 24/7
          </h1>
          <p className="text-lg sm:text-xl text-ink-secondary leading-relaxed max-w-2xl mb-8">
            Без шаблонных ботов и пустых презентаций. Интегрируем нейросети с вашей CRM, Telegram и внутренними регламентами за 1–3 недели с гарантией по договору.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenQuiz}
              className="flex items-center gap-3 bg-signal hover:bg-signal-hover text-surface px-6 py-3.5 text-sm font-semibold rounded-sharp transition-mechanical shadow-sm group"
            >
              <span>Подобрать ИИ-услугу за 1 мин</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#cases"
              className="flex items-center gap-2 border border-border-strong hover:bg-ink-primary hover:text-surface text-ink-primary px-5 py-3.5 text-sm font-medium rounded-sharp transition-mechanical"
            >
              <span>Смотреть кейсы и ROI</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Launch Strip */}
        <div className="pt-8 border-t border-border-subtle mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <span className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider">
              БЫСТРЫЙ СТАРТ ПО НАПРАВЛЕНИЮ (клик открывает квиз на шаге 2):
            </span>
            <span className="font-mono text-xs text-ink-muted">ВЫБЕРИТЕ ВАШУ ЗАДАЧУ</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {quickServices.map((srv) => (
              <button
                key={srv.code}
                onClick={() => onSelectService(srv.code)}
                className="flex items-center justify-between px-3.5 py-2.5 bg-surface hover:bg-surface-hover border border-border-subtle hover:border-border-strong rounded-sharp transition-mechanical group text-left"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-signal font-semibold">[{srv.index}]</span>
                  <span className="text-xs font-medium text-ink-primary group-hover:text-signal transition-colors">
                    {srv.label}
                  </span>
                </div>
                <ArrowRight className="w-3 h-3 text-ink-muted group-hover:text-signal group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Interactive SVG Pipeline Diagram */}
        <div className="border border-border-subtle bg-surface rounded-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-subtle mb-6 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blueprint rounded-full"></span>
              <span className="font-mono text-xs font-semibold uppercase text-ink-primary tracking-wider">
                АРХИТЕКТУРНЫЙ ПАЙПЛАЙН РЕШЕНИЯ
              </span>
            </div>
            <span className="font-mono text-xs text-ink-muted">
              СКВОЗНАЯ СВЯЗЬ: ВХОДНОЙ КАНАЛ → LLM → CRM И TELEGRAM
            </span>
          </div>

          {/* Diagram Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
            {/* Node 1 */}
            <div
              onMouseEnter={() => setActiveNode('input')}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-4 border rounded-sharp transition-mechanical cursor-pointer ${
                activeNode === 'input'
                  ? 'border-border-strong bg-canvas'
                  : 'border-border-subtle bg-surface'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-ink-muted">[01 / ВХОД]</span>
                <MessageSquare className="w-4 h-4 text-blueprint" />
              </div>
              <h4 className="text-sm font-semibold text-ink-primary mb-1">
                Клиент / Сайт / Мессенджер
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Заявка с сайта, обращение в Telegram, WhatsApp или звонок через телефонию.
              </p>
              <div className="mt-3 pt-2 border-t border-border-subtle/50 flex items-center justify-between font-mono text-[11px] text-ink-muted">
                <span>Задержка</span>
                <span className="text-ink-primary font-medium">&lt; 0.1 сек</span>
              </div>
            </div>

            {/* Node 2 */}
            <div
              onMouseEnter={() => setActiveNode('core')}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-4 border rounded-sharp transition-mechanical cursor-pointer ${
                activeNode === 'core'
                  ? 'border-signal bg-canvas'
                  : 'border-border-subtle bg-surface'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-signal font-semibold">[02 / ЯДРО]</span>
                <Cpu className="w-4 h-4 text-signal" />
              </div>
              <h4 className="text-sm font-semibold text-ink-primary mb-1">
                ИИ-Агент / LLM + RAG База
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Понимание намерения, поиск ответа по регламентам, квалификация бюджета и сбор контактов.
              </p>
              <div className="mt-3 pt-2 border-t border-border-subtle/50 flex items-center justify-between font-mono text-[11px] text-ink-muted">
                <span>Время инференса</span>
                <span className="text-signal font-medium tabular-nums">~0.8 – 1.4 сек</span>
              </div>
            </div>

            {/* Node 3 */}
            <div
              onMouseEnter={() => setActiveNode('output')}
              onMouseLeave={() => setActiveNode(null)}
              className={`p-4 border rounded-sharp transition-mechanical cursor-pointer ${
                activeNode === 'output'
                  ? 'border-border-strong bg-canvas'
                  : 'border-border-subtle bg-surface'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[11px] text-ink-muted">[03 / ДЕЙСТВИЕ]</span>
                <Database className="w-4 h-4 text-status-success" />
              </div>
              <h4 className="text-sm font-semibold text-ink-primary mb-1">
                amoCRM / 1C + Telegram-бот
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Сделка создана в CRM, менеджер получает пуш со структурированной заявкой и кнопками.
              </p>
              <div className="mt-3 pt-2 border-t border-border-subtle/50 flex items-center justify-between font-mono text-[11px] text-ink-muted">
                <span>Точность записи</span>
                <span className="text-status-success font-medium">99.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
