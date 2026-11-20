import React from 'react';
import { TrendingUp, Clock, ShieldCheck, Zap } from 'lucide-react';

export const CasesRoi: React.FC = () => {
  const protocols = [
    {
      id: '01',
      niche: 'ИНТЕРНЕТ-МАГАЗИН ЭЛЕКТРОНИКИ',
      location: 'ТАШКЕНТ',
      before: '38 мин среднее время ответа в Telegram и Instagram, до 35% ночных лидов уходили к конкурентам.',
      solution: 'ИИ-консультант с знанием 2 400 позиций, расчет доставки и оформление чека прямо в диалоге.',
      metric1: { label: 'ВРЕМЯ ОТВЕТА', value: '11 сек', highlight: true },
      metric2: { label: 'РОСТ КОНВЕРСИИ В ЗАКАЗ', value: '+34%' },
      payback: 'Окупаемость внедрения: 5 недель',
    },
    {
      id: '02',
      niche: 'B2B-ДИСТРИБУЦИЯ И ЛОГИСТИКА',
      location: 'РЕГИОНАЛЬНЫЙ ХАБ',
      before: '3 оператора вручную перебивали входящие PDF-счета и накладные в 1С (до 40 ошибок в месяц).',
      solution: 'Конвейер парсинга на базе LLM + n8n: сверка позиций, автоформирование счетов и отправка в 1С.',
      metric1: { label: 'СОКРАЩЕНИЕ РУТИНЫ', value: '-140 ч/мес', highlight: true },
      metric2: { label: 'ОШИБОК В ДОКУМЕНТАХ', value: '0%' },
      payback: 'Экономия фонда оплаты труда: ~$1 800/мес',
    },
    {
      id: '03',
      niche: 'СЕТЬ СТОМАТОЛОГИЧЕСКИХ КЛИНИК',
      location: 'СЕТЬ ИЗ 4 ФИЛИАЛОВ',
      before: 'Ресепшн перегружен звонками в часы пик, потеря 25% повторных обращений на профгигиену.',
      solution: 'Голосовой ассистент напоминаний + умный бот записи по слотам врачей через МИС.',
      metric1: { label: 'НОЧНЫЕ ЗАПИСИ', value: '+42%', highlight: true },
      metric2: { label: 'РАЗГРУЗКА РЕСЕПШН', value: '70%' },
      payback: 'Окупаемость внедрения: 3 недели',
    },
    {
      id: '04',
      niche: 'ОНЛАЙН-АКАДЕМИЯ (EDTECH)',
      location: '12 000 СТУДЕНТОВ',
      before: 'Кураторы отвечали на типовые вопросы по домашним заданиям с задержкой до 6 часов.',
      solution: 'Корпоративная база RAG по 800 урокам: контекстный поиск формул и проверка кода студентов.',
      metric1: { label: 'ЗАКРЫТИЕ ВОПРОСОВ БОТОМ', value: '85%', highlight: true },
      metric2: { label: 'СКОРОСТЬ ОТВЕТА', value: '3 сек' },
      payback: 'Сокращение затрат на кураторский отдел: в 2.5 раза',
    },
  ];

  return (
    <section id="cases" className="py-20 md:py-28 bg-dark-panel text-ink-on-dark border-b border-border-subtle">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-dark-border mb-12 gap-4">
          <div>
            <div className="font-mono text-xs font-semibold text-signal uppercase tracking-wider mb-2">
              [02 / ПРОТОКОЛЫ ВНЕДРЕНИЙ И ROI]
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink-on-dark">
              Реальные цифры окупаемости после запуска
            </h2>
          </div>
          <p className="text-sm text-ink-on-dark-muted max-w-md font-mono">
            ДАННЫЕ ЗАФИКСИРОВАНЫ ПО РЕЗУЛЬТАТАМ 30–90 ДНЕЙ ЭКСПЛУАТАЦИИ РЕШЕНИЙ
          </p>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {protocols.map((p) => (
            <div
              key={p.id}
              className="border border-dark-border bg-ink-primary p-6 sm:p-8 rounded-card flex flex-col justify-between"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between pb-4 border-b border-dark-border mb-6">
                  <span className="font-mono text-xs text-ink-on-dark-muted">
                    ПРОТОКОЛ #{p.id} · {p.niche}
                  </span>
                  <span className="font-mono text-[11px] text-blueprint-soft px-2 py-0.5 border border-blueprint/30 rounded-sharp">
                    {p.location}
                  </span>
                </div>

                {/* Problem vs Solution */}
                <div className="space-y-4 mb-8 text-sm">
                  <div>
                    <div className="font-mono text-[11px] text-ink-on-dark-muted uppercase mb-1">
                      [БЫЛО]:
                    </div>
                    <p className="text-ink-on-dark-muted leading-relaxed">{p.before}</p>
                  </div>
                  <div>
                    <div className="font-mono text-[11px] text-signal uppercase mb-1">
                      [ВНЕДРИЛИ]:
                    </div>
                    <p className="text-ink-on-dark leading-relaxed font-medium">{p.solution}</p>
                  </div>
                </div>
              </div>

              {/* Metrics Bar */}
              <div className="pt-6 border-t border-dark-border">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="border border-dark-border p-3 rounded-sharp bg-dark-panel">
                    <div className="font-mono text-[10px] text-ink-on-dark-muted uppercase mb-1">
                      {p.metric1.label}
                    </div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-signal tabular-nums">
                      {p.metric1.value}
                    </div>
                  </div>
                  <div className="border border-dark-border p-3 rounded-sharp bg-dark-panel">
                    <div className="font-mono text-[10px] text-ink-on-dark-muted uppercase mb-1">
                      {p.metric2.label}
                    </div>
                    <div className="font-mono text-2xl sm:text-3xl font-bold text-ink-on-dark tabular-nums">
                      {p.metric2.value}
                    </div>
                  </div>
                </div>

                <div className="font-mono text-xs text-status-success flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-status-success rounded-full"></span>
                  <span>{p.payback}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
