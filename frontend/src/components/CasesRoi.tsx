import React, { useState } from 'react';
import { TrendingUp, Clock, ShieldCheck, Zap, Sliders, CheckCircle2 } from 'lucide-react';

export const CasesRoi: React.FC = () => {
  const [operatorCount, setOperatorCount] = useState(3);
  const [salaryPerOperator, setSalaryPerOperator] = useState(65000);

  // Dynamic ROI calculation
  const totalFotMonth = operatorCount * salaryPerOperator;
  const estimatedSavingsMonth = Math.round(totalFotMonth * 0.65);
  const estimatedSavingsYear = estimatedSavingsMonth * 12;

  const protocols = [
    {
      id: '01',
      niche: 'ИНТЕРНЕТ-МАГАЗИН ЭЛЕКТРОНИКИ',
      location: 'ТАШКЕНТ // E-COM',
      before: '38 мин среднее время ответа в Telegram и Instagram, до 35% ночных лидов уходили к конкурентам.',
      solution: 'ИИ-консультант со знанием 2 400 позиций, расчет доставки и оформление заказа прямо в чате.',
      metric1: { label: 'ВРЕМЯ ОТВЕТА', value: '0.8 сек', highlight: true },
      metric2: { label: 'РОСТ КОНВЕРСИИ В ЗАКАЗ', value: '+34%' },
      payback: 'Окупаемость внедрения: 5 недель',
    },
    {
      id: '02',
      niche: 'B2B-ДИСТРИБУЦИЯ И ЛОГИСТИКА',
      location: 'РЕГИОНАЛЬНЫЙ ХАБ // B2B',
      before: '3 оператора вручную перебивали входящие PDF-счета и накладные в 1С (до 40 ошибок в месяц).',
      solution: 'Конвейер парсинга на базе LLM + n8n: сверка позиций, автоформирование счетов и отправка в 1С.',
      metric1: { label: 'СОКРАЩЕНИЕ РУТИНЫ', value: '-140 ч/мес', highlight: true },
      metric2: { label: 'ОШИБОК В ДОКУМЕНТАХ', value: '0%' },
      payback: 'Экономия фонда оплаты труда: ~$1 800/мес',
    },
    {
      id: '03',
      niche: 'СЕТЬ СТОМАТОЛОГИЧЕСКИХ КЛИНИК',
      location: 'СЕТЬ ИЗ 4 ФИЛИАЛОВ // МЕДИЦИНА',
      before: 'Ресепшн перегружен звонками в часы пик, потеря 25% повторных обращений на профгигиену.',
      solution: 'Голосовой ассистент напоминаний + умный бот записи по свободным слотам врачей через МИС.',
      metric1: { label: 'НОЧНЫЕ ЗАПИСИ', value: '+42%', highlight: true },
      metric2: { label: 'РАЗГРУЗКА РЕСЕПШН', value: '70%' },
      payback: 'Окупаемость внедрения: 3 недели',
    },
    {
      id: '04',
      niche: 'ОНЛАЙН-АКАДЕМИЯ (EDTECH)',
      location: '12 000 СТУДЕНТОВ // ОБРАЗОВАНИЕ',
      before: 'Кураторы отвечали на типовые вопросы по домашним заданиям с задержкой до 6 часов.',
      solution: 'Корпоративная база RAG по 800 урокам: контекстный поиск формул и проверка кода студентов.',
      metric1: { label: 'ЗАКРЫТИЕ ВОПРОСОВ БОТОМ', value: '85%', highlight: true },
      metric2: { label: 'СКОРОСТЬ ОТВЕТА', value: '1.2 сек' },
      payback: 'Сокращение затрат на кураторский отдел: в 2.5 раза',
    },
  ];

  return (
    <section id="cases" className="py-20 md:py-28 border-b border-white/10 bg-dash-bg">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 gap-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-dash-track border border-white/10 mb-3 font-mono text-xs font-bold text-dash-magenta uppercase tracking-wider">
              [ 02 // ПРОТОКОЛЫ ВНЕДРЕНИЙ И ОКУПАЕМОСТЬ ]
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Реальные цифры окупаемости в бизнесе
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-dash-lime">
            <CheckCircle2 className="w-4 h-4 text-dash-lime" />
            <span>ДАННЫЕ ЗАФИКСИРОВАНЫ ПО РЕЗУЛЬТАТАМ 30–90 ДНЕЙ РАБОТЫ</span>
          </div>
        </div>

        {/* Interactive ROI Calculator with Neon Dashboard Style */}
        <div className="neon-card p-6 sm:p-8 mb-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <span className="font-mono text-xs font-bold text-dash-cyan uppercase tracking-wider">
                ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР ВАШЕЙ ВЫГОДЫ
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
                Сколько ваш бизнес сэкономит на рутине?
              </h3>
              <p className="text-xs sm:text-sm text-dash-muted">
                Передвиньте ползунок количества сотрудников в поддержке или продажах, чтобы увидеть расчет сохраненного фонда оплаты труда.
              </p>
            </div>

            {/* Controls */}
            <div className="w-full lg:w-auto flex-1 max-w-lg p-5 rounded-2xl bg-dash-track border border-white/10 space-y-4">
              <div>
                <div className="flex justify-between font-mono text-xs font-semibold mb-2 text-white">
                  <span>Сотрудников на первой линии:</span>
                  <span className="text-dash-magenta font-bold">{operatorCount} чел</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={operatorCount}
                  onChange={(e) => setOperatorCount(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-dash-surface accent-dash-magenta cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs font-semibold mb-2 text-white">
                  <span>Средний ФОТ на сотрудника:</span>
                  <span className="text-dash-cyan font-bold">{salaryPerOperator.toLocaleString('ru-RU')} ₽</span>
                </div>
                <input
                  type="range"
                  min="30000"
                  max="150000"
                  step="5000"
                  value={salaryPerOperator}
                  onChange={(e) => setSalaryPerOperator(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-dash-surface accent-dash-cyan cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Output Badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-dash-card-hover to-dash-surface border border-dash-cyan/30 text-center min-w-[240px] shadow-neon-cyan">
              <span className="font-mono text-[10px] text-dash-muted uppercase tracking-widest block mb-1">
                ЭКОНОМИЯ ФОТ В ГОД
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-dash-cyan tabular-nums block mb-1">
                ~{estimatedSavingsYear.toLocaleString('ru-RU')} ₽
              </span>
              <span className="text-[11px] font-mono text-dash-muted">
                или ~{estimatedSavingsMonth.toLocaleString('ru-RU')} ₽ / месяц
              </span>
            </div>
          </div>
        </div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {protocols.map((p) => (
            <div
              key={p.id}
              className="neon-card p-7 rounded-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <span className="font-mono text-xs font-bold text-dash-magenta">
                    КЕЙС #{p.id} // {p.niche}
                  </span>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-dash-track border border-white/10 text-dash-muted">
                    {p.location}
                  </span>
                </div>

                {/* Problem vs Solution */}
                <div className="space-y-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/20">
                    <span className="font-mono text-[10px] uppercase font-bold text-red-400 block mb-1">
                      БЫЛО ДО ВНЕДРЕНИЯ ИИ:
                    </span>
                    <p className="text-xs sm:text-sm text-dash-muted">{p.before}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-dash-cyan/10 border border-dash-cyan/30">
                    <span className="font-mono text-[10px] uppercase font-bold text-dash-cyan block mb-1">
                      РЕШЕНИЕ И АРХИТЕКТУРА:
                    </span>
                    <p className="text-xs sm:text-sm text-white">{p.solution}</p>
                  </div>
                </div>
              </div>

              {/* Metrics & Payback Row */}
              <div className="pt-4 border-t border-white/10">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-dash-track border border-white/5">
                    <span className="font-mono text-[10px] text-dash-muted block">{p.metric1.label}</span>
                    <span className="text-base font-mono font-bold text-dash-magenta">
                      {p.metric1.value}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-dash-track border border-white/5">
                    <span className="font-mono text-[10px] text-dash-muted block">{p.metric2.label}</span>
                    <span className="text-base font-mono font-bold text-dash-lime">
                      {p.metric2.value}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-dash-muted block">
                  ✓ {p.payback}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
