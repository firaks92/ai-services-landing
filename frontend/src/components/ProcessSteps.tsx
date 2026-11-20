import React from 'react';
import { CheckSquare } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Экспресс-аудит и архитектура',
      duration: 'День 1–2',
      desc: 'Анализируем ваши текущие процессы, переписки менеджеров и воронку продаж. Определяем узкие места, где ИИ даст мгновенный финансовый результат.',
      artifact: 'Инженерная карта архитектуры решения и фиксированная смета',
    },
    {
      num: '02',
      title: 'Интерактивный прототип',
      duration: 'День 3–5',
      desc: 'Собираем первый рабочий прототип ИИ-ассистента в закрытой Telegram-песочнице. Загружаем базу знаний и проводим стресс-тесты на каверзных вопросах.',
      artifact: 'Клиентский доступ к живому прототипу для согласования логики',
    },
    {
      num: '03',
      title: 'Боевая интеграция и запуск',
      duration: 'День 7–14',
      desc: 'Подключаем ИИ к вашей CRM (amoCRM / Bitrix24), мессенджерам, телефонии и базе 1С. Настраиваем логирование, защиту от сбоев и уведомления менеджерам.',
      artifact: 'Боевой релиз, сквозная передача лидов в CRM и Telegram-бот',
    },
    {
      num: '04',
      title: 'Мониторинг, дообучение и SLA',
      duration: 'Постоянно',
      desc: 'Отслеживаем каждый диалог, анализируем процент успешных закрытий, дообучаем модель новым товарам и обновляем базу знаний по мере изменения цен.',
      artifact: 'Еженедельный отчет точности, аптайм 99.9% и инженерный саппорт',
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 border-b border-border-subtle bg-canvas">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-border-subtle mb-12 gap-4">
          <div>
            <div className="font-mono text-xs font-medium text-ink-muted uppercase tracking-wider mb-2">
              [03 / ТЕХНОЛОГИЧЕСКИЙ МАРШРУТ]
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink-primary">
              Как устроен процесс: от ТЗ до боевого запуска
            </h2>
          </div>
          <p className="text-sm text-ink-secondary max-w-md">
            Никаких затяжных проектов на полгода. Поэтапная сдача с осязаемыми результатами на каждом шаге.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border-subtle bg-surface">
          {steps.map((s) => (
            <div
              key={s.num}
              className="border-r border-b border-border-subtle p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-border-subtle mb-6">
                  <span className="font-mono text-xl font-bold text-signal">[{s.num}]</span>
                  <span className="font-mono text-xs text-blueprint font-medium px-2 py-0.5 bg-blueprint-soft rounded-sharp">
                    {s.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-ink-primary mb-3">{s.title}</h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-6">{s.desc}</p>
              </div>

              <div className="pt-4 border-t border-border-subtle">
                <div className="flex items-start gap-2">
                  <CheckSquare className="w-3.5 h-3.5 text-status-success mt-0.5 flex-shrink-0" />
                  <div className="text-[11px] font-mono text-ink-muted leading-tight">
                    <span className="font-semibold text-ink-primary">Результат:</span> {s.artifact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
