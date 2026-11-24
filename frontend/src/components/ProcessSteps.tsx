import React from 'react';
import { CheckSquare, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Аудит и архитектура',
      duration: 'День 1–2',
      desc: 'Анализируем ваши текущие процессы, переписки менеджеров и воронку продаж. Определяем узкие места, где ИИ даст мгновенный финансовый результат.',
      artifact: 'Инженерная карта архитектуры и фиксированная смета',
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
      title: 'Боевая интеграция',
      duration: 'День 7–14',
      desc: 'Подключаем ИИ к вашей CRM (amoCRM / Bitrix24), мессенджерам, телефонии и базе 1С. Настраиваем логирование, защиту от сбоев и уведомления менеджерам.',
      artifact: 'Боевой релиз, сквозная передача лидов в CRM и Telegram-бот',
    },
    {
      num: '04',
      title: 'Мониторинг и SLA',
      duration: 'Постоянно',
      desc: 'Отслеживаем каждый диалог, анализируем процент успешных закрытий, дообучаем модель новым товарам и обновляем базу знаний по мере изменения цен.',
      artifact: 'Еженедельный отчет точности, аптайм 99.9% и инженерный саппорт',
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 border-b border-white/20 dark:border-white/10 bg-transparent transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 gap-6 border-b border-white/20 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-3 font-mono text-xs font-bold text-dash-cyan uppercase tracking-wider">
              [ 04 // ТЕХНОЛОГИЧЕСКИЙ МАРШРУТ ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              От первого ТЗ до боевого запуска в прод
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-dash-muted max-w-md">
            Никаких затяжных проектов на полгода. Поэтапная сдача с осязаемыми результатами на каждом шаге и гарантией по договору.
          </p>
        </div>

        {/* Steps Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className="neon-card p-7 rounded-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/20 dark:border-white/10">
                  <span className="font-mono text-base font-extrabold text-dash-magenta">
                    0{s.num} // ЭТАП
                  </span>
                  <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full glass-pill border border-dash-lime/30 text-dash-lime">
                    {s.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-dash-cyan transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-dash-muted leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              {/* Artifact badge */}
              <div className="pt-4 border-t border-white/20 dark:border-white/10">
                <span className="font-mono text-[10px] text-slate-400 dark:text-dash-subtle block mb-1">
                  РЕЗУЛЬТАТ ЭТАПА:
                </span>
                <span className="text-xs font-semibold text-dash-cyan block">
                  ✓ {s.artifact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
