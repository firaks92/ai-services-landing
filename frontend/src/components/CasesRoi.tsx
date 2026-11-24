import React, { useState } from 'react';
import { TrendingUp, Clock, ShieldCheck, Zap, Sliders, CheckCircle2 } from 'lucide-react';
import { useLocale } from '../context/LocaleContext.js';

export const CasesRoi: React.FC = () => {
  const { t, formatMoney, currency, language } = useLocale();
  const [operatorCount, setOperatorCount] = useState(3);
  const [salaryPerOperatorUsd, setSalaryPerOperatorUsd] = useState(750);

  // Dynamic ROI calculation
  const totalFotMonthUsd = operatorCount * salaryPerOperatorUsd;
  const estimatedSavingsMonthUsd = Math.round(totalFotMonthUsd * 0.65);
  const estimatedSavingsYearUsd = estimatedSavingsMonthUsd * 12;

  const protocols = [
    {
      id: '01',
      niche: language === 'uz' ? 'ELEKTRONIKA ONLAYN DO‘KONI' : language === 'en' ? 'E-COMMERCE & CONSUMER TECH' : 'ИНТЕРНЕТ-МАГАЗИН ЭЛЕКТРОНИКИ',
      location: 'ТАШКЕНТ // E-COM',
      before: language === 'uz' ? 'Telegram va Instagramda o‘rtacha javob vaqti 38 daqiqa, tungi lidlarning 35% raqobatchilarga ketardi.' : language === 'en' ? '38 min average response time on Telegram and Instagram; up to 35% of off-hours leads lost to competitors.' : '38 мин среднее время ответа в Telegram и Instagram, до 35% ночных лидов уходили к конкурентам.',
      solution: language === 'uz' ? '2 400 ta mahsulotni biluvchi AI-konsultant: yetkazib berishni hisoblaydi va buyurtmani to‘g‘ridan-to‘g‘ri chatda rasmiylashtiradi.' : language === 'en' ? 'AI sales specialist trained on 2,400 catalog SKUs, instant delivery quote, and seamless in-chat checkout.' : 'ИИ-консультант со знанием 2 400 позиций, расчет доставки и оформление заказа прямо в чате.',
      metric1: { label: language === 'uz' ? 'JAVOB VAQTI' : language === 'en' ? 'RESPONSE TIME' : 'ВРЕМЯ ОТВЕТА', value: '0.8 сек' },
      metric2: { label: language === 'uz' ? 'BUYURTMA KONVERSIYASI' : language === 'en' ? 'ORDER CONVERSION' : 'РОСТ КОНВЕРСИИ В ЗАКАЗ', value: '+34%' },
      payback: language === 'uz' ? 'Xarajat qoplanishi: 5 hafta' : language === 'en' ? 'Payback period: 5 weeks' : 'Окупаемость внедрения: 5 недель',
    },
    {
      id: '02',
      niche: language === 'uz' ? 'B2B-LOGISTIKA VA DISTRIBUTSIYA' : language === 'en' ? 'B2B WHOLESALE & LOGISTICS' : 'B2B-ДИСТРИБУЦИЯ И ЛОГИСТИКА',
      location: 'РЕГИОНАЛЬНЫЙ ХАБ // B2B',
      before: language === 'uz' ? '3 ta operator kiruvchi PDF-hisobvaraqlar va yuk xatlarini 1C ga qo‘lda kiritardi (oyiga 40 tagacha xato).' : language === 'en' ? '3 clerks manually re-typed incoming PDF invoices into ERP (up to 40 reconciliation errors monthly).' : '3 оператора вручную перебивали входящие PDF-счета и накладные в 1С (до 40 ошибок в месяц).',
      solution: language === 'uz' ? 'LLM + n8n asosidagi konveyer: tovarlarni tekshirish, hisoblarni avtomatik tuzish va 1C ga yuborish.' : language === 'en' ? 'Automated LLM + n8n pipeline: line-item reconciliation, automated ledger generation, and ERP posting.' : 'Конвейер парсинга на базе LLM + n8n: сверка позиций, автоформирование счетов и отправка в 1С.',
      metric1: { label: language === 'uz' ? 'RUTINANI QISQARTIRISH' : language === 'en' ? 'ROUTINE REDUCTION' : 'СОКРАЩЕНИЕ РУТИНЫ', value: '-140 ч/мес' },
      metric2: { label: language === 'uz' ? 'HUJJATLARDA XATOLIK' : language === 'en' ? 'INVOICE ERRORS' : 'ОШИБОК В ДОКУМЕНТАХ', value: '0%' },
      payback: language === 'uz' ? `Maosh fondidan tejamkorlik: ~${formatMoney(1800)}/oy` : language === 'en' ? `Payroll saved: ~${formatMoney(1800)}/mo` : `Экономия фонда оплаты труда: ~${formatMoney(1800)}/мес`,
    },
    {
      id: '03',
      niche: language === 'uz' ? 'STOMATOLOGIYA KLINIKALARI TARMOG‘I' : language === 'en' ? 'DENTAL CLINIC NETWORK' : 'СЕТЬ СТОМАТОЛОГИЧЕСКИХ КЛИНИК',
      location: 'СЕТЬ ИЗ 4 ФИЛИАЛОВ // МЕДИЦИНА',
      before: language === 'uz' ? 'Tig‘iz paytlarda resepshn qo‘ng‘iroqlarga ulgurmasdi, takroriy murojaatlarning 25% yo‘qotilardi.' : language === 'en' ? 'Front desk overwhelmed during peak hours, losing 25% of patient recall appointments.' : 'Ресепшн перегружен звонками в часы пик, потеря 25% повторных обращений на профгигиену.',
      solution: language === 'uz' ? 'Ovozli eslatuvchi assistent + shifokorlarning bo‘sh vaqtlariga qarab avtomat yozuvchi bot.' : language === 'en' ? 'Voice outbound recall assistant + calendar booking bot integrated with clinic EHR system.' : 'Голосовой ассистент напоминаний + умный бот записи по свободным слотам врачей через МИС.',
      metric1: { label: language === 'uz' ? 'TUNGI YOZILISHLAR' : language === 'en' ? 'NIGHT BOOKINGS' : 'НОЧНЫЕ ЗАПИСИ', value: '+42%' },
      metric2: { label: language === 'uz' ? 'RESEPSHN YENGILLASHTIRILISHI' : language === 'en' ? 'DESK WORKLOAD OFF' : 'РАЗГРУЗКА РЕСЕПШН', value: '70%' },
      payback: language === 'uz' ? 'Xarajat qoplanishi: 3 hafta' : language === 'en' ? 'Payback period: 3 weeks' : 'Окупаемость внедрения: 3 недели',
    },
    {
      id: '04',
      niche: language === 'uz' ? 'ONLAYN-AKADEMIYA (EDTECH)' : language === 'en' ? 'EDTECH LEARNING PLATFORM' : 'ОНЛАЙН-АКАДЕМИЯ (EDTECH)',
      location: '12 000 СТУДЕНТОВ // ОБРАЗОВАНИЕ',
      before: language === 'uz' ? 'Kuratorlar talabalarning uy vazifalari bo‘yicha savollariga 6 soatgacha kechikish bilan javob berardi.' : language === 'en' ? 'Teaching assistants took up to 6 hours to respond to homework inquiries.' : 'Кураторы отвечали на типовые вопросы по домашним заданиям с задержкой до 6 часов.',
      solution: language === 'uz' ? '800 ta dars asosidagi RAG korporativ bazasi: formulalarni kontekstli qidirish va kodni tekshirish.' : language === 'en' ? 'RAG knowledge base across 800 lessons with automated code evaluation and context retrieval.' : 'Корпоративная база RAG по 800 урокам: контекстный поиск формул и проверка кода студентов.',
      metric1: { label: language === 'uz' ? 'BOT YOPGAN SAVOLLAR' : language === 'en' ? 'TICKETS RESOLVED' : 'ЗАКРЫТИЕ ВОПРОСОВ БОТОМ', value: '85%' },
      metric2: { label: language === 'uz' ? 'JAVOB TEZLIGI' : language === 'en' ? 'RESPONSE LATENCY' : 'СКОРОСТЬ ОТВЕТА', value: '1.2 сек' },
      payback: language === 'uz' ? 'Xarajatlar 2.5 baravarga qisqardi' : language === 'en' ? 'TA department expenses reduced by 2.5x' : 'Сокращение затрат на кураторский отдел: в 2.5 раза',
    },
  ];

  return (
    <section id="cases" className="py-20 md:py-28 border-b border-white/20 dark:border-white/10 bg-transparent transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 gap-6 border-b border-white/20 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-3 font-mono text-xs font-bold text-dash-mint uppercase tracking-wider">
              {t('cases_tag')}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {t('cases_title')}
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-dash-mint">
            <CheckCircle2 className="w-4 h-4 text-dash-mint" />
            <span>{t('cases_verified_note')}</span>
          </div>
        </div>

        {/* Interactive ROI Calculator with Dynamic Currency */}
        <div className="neon-card p-6 sm:p-8 mb-12 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <span className="font-mono text-xs font-bold text-dash-mint uppercase tracking-wider">
                {t('calc_badge')}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 mb-2">
                {t('calc_title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-dash-muted">
                {t('calc_desc')}
              </p>
            </div>

            {/* Controls */}
            <div className="w-full lg:w-auto flex-1 max-w-lg p-5 rounded-2xl bg-white/70 dark:bg-dash-card border border-slate-200 dark:border-white/8 space-y-4 shadow-sm">
              <div>
                <div className="flex justify-between font-mono text-xs font-semibold mb-2 text-slate-800 dark:text-white">
                  <span>{t('calc_operators_label')}</span>
                  <span className="text-dash-mint font-bold">{operatorCount} {language === 'uz' ? 'kishi' : language === 'en' ? 'reps' : 'чел'}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="1"
                  value={operatorCount}
                  onChange={(e) => setOperatorCount(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-slate-200 dark:bg-dash-surface accent-dash-mint cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs font-semibold mb-2 text-slate-800 dark:text-white">
                  <span>{t('calc_salary_label')}</span>
                  <span className="text-dash-mint font-bold">{formatMoney(salaryPerOperatorUsd)}</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="2500"
                  step="50"
                  value={salaryPerOperatorUsd}
                  onChange={(e) => setSalaryPerOperatorUsd(Number(e.target.value))}
                  className="w-full h-2 rounded-full bg-slate-200 dark:bg-dash-surface accent-dash-emerald cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Output Badge */}
            <div className="glass-obsidian p-6 rounded-2xl text-center min-w-[260px] shadow-sm">
              <span className="font-mono text-[10px] text-slate-500 dark:text-dash-muted uppercase tracking-widest block mb-1">
                {t('calc_annual_savings')}
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-extrabold text-dash-mint tabular-nums block mb-1">
                ~{formatMoney(estimatedSavingsYearUsd)}
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-dash-muted">
                ~{formatMoney(estimatedSavingsMonthUsd)} {t('calc_month_suffix')}
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
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
                  <span className="font-mono text-xs font-bold text-dash-mint">
                    КЕЙС #{p.id} // {p.niche}
                  </span>
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full glass-pill text-slate-600 dark:text-dash-muted">
                    {p.location}
                  </span>
                </div>

                {/* Problem vs Solution */}
                <div className="space-y-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-md">
                    <span className="font-mono text-[10px] uppercase font-bold text-red-600 dark:text-red-400 block mb-1">
                      {language === 'uz' ? 'AI JORIY QILISHDAN OLDIN:' : language === 'en' ? 'BEFORE AI DEPLOYMENT:' : 'БЫЛО ДО ВНЕДРЕНИЯ ИИ:'}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-dash-muted">{p.before}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-dash-emerald/10 border border-dash-emerald/30 backdrop-blur-md">
                    <span className="font-mono text-[10px] uppercase font-bold text-dash-mint block mb-1">
                      {language === 'uz' ? 'YECHIM VA ARXITEKTURA:' : language === 'en' ? 'AI SOLUTION ARCHITECTURE:' : 'РЕШЕНИЕ И АРХИТЕКТУРА:'}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-900 dark:text-white">{p.solution}</p>
                  </div>
                </div>
              </div>

              {/* Metrics & Payback Row */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-dash-card border border-slate-200 dark:border-white/5">
                    <span className="font-mono text-[10px] text-slate-500 dark:text-dash-muted block">{p.metric1.label}</span>
                    <span className="text-base font-mono font-bold text-dash-mint">
                      {p.metric1.value}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/70 dark:bg-dash-card border border-slate-200 dark:border-white/5">
                    <span className="font-mono text-[10px] text-slate-500 dark:text-dash-muted block">{p.metric2.label}</span>
                    <span className="text-base font-mono font-bold text-dash-emerald">
                      {p.metric2.value}
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[11px] text-slate-600 dark:text-dash-muted block">
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
