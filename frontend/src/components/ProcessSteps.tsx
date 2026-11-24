import React from 'react';
import { useLocale } from '../context/LocaleContext.js';

export const ProcessSteps: React.FC = () => {
  const { language } = useLocale();

  const steps = [
    {
      num: '01',
      title: language === 'uz' ? 'Audit va arxitektura' : language === 'en' ? 'Audit & Architecture' : 'Аудит и архитектура',
      duration: language === 'uz' ? '1–2 kun' : language === 'en' ? 'Day 1–2' : 'День 1–2',
      desc: language === 'uz' ? 'Hozirgi jarayonlar va savdo voronkasini tahlil qilamiz. AI eng tez moliyaviy natija beradigan nuqtalarni aniqlaymiz.' : language === 'en' ? 'We analyze current workflows and sales funnels, spotting high-impact bottlenecks for immediate AI ROI.' : 'Анализируем ваши текущие процессы, переписки менеджеров и воронку продаж. Определяем узкие места, где ИИ даст мгновенный финансовый результат.',
      artifact: language === 'uz' ? 'Arxitektura xaritasi va aniq smeta' : language === 'en' ? 'System architecture blueprint & fixed pricing' : 'Инженерная карта архитектуры и фиксированная смета',
    },
    {
      num: '02',
      title: language === 'uz' ? 'Interaktiv prototip' : language === 'en' ? 'Interactive Prototype' : 'Интерактивный прототип',
      duration: language === 'uz' ? '3–5 kun' : language === 'en' ? 'Day 3–5' : 'День 3–5',
      desc: language === 'uz' ? 'Telegram-sandbox ichida birinchi ishchi prototipni yig‘amiz. Bilimlar bazasini yuklab, test qilamiz.' : language === 'en' ? 'We assemble a live AI prototype in a sandbox sandbox, testing knowledge retrieval under edge cases.' : 'Собираем первый рабочий прототип ИИ-ассистента в закрытой Telegram-песочнице. Загружаем базу знаний и проводим стресс-тесты на каверзных вопросах.',
      artifact: language === 'uz' ? 'Mijoz uchun ishchi prototipga kirish' : language === 'en' ? 'Live sandbox access for logic verification' : 'Клиентский доступ к живому прототипу для согласования логики',
    },
    {
      num: '03',
      title: language === 'uz' ? 'Tizimli integratsiya' : language === 'en' ? 'Production Integration' : 'Боевая интеграция',
      duration: language === 'uz' ? '7–14 kun' : language === 'en' ? 'Day 7–14' : 'День 7–14',
      desc: language === 'uz' ? 'AIni CRM (amoCRM / Bitrix24), messenjerlar, telefoniya va 1C bazasiga ulaymiz. Xavfsiz loglashni yo‘lga qo‘yamiz.' : language === 'en' ? 'We hook AI into your CRM, telephony, messengers, and ERP, establishing fault tolerance and alerts.' : 'Подключаем ИИ к вашей CRM (amoCRM / Bitrix24), мессенджерам, телефонии и базе 1С. Настраиваем логирование, защиту от сбоев и уведомления менеджерам.',
      artifact: language === 'uz' ? 'Jangovar reliz va CRM/Telegramga lidlar uzatish' : language === 'en' ? 'Production deployment & instant Telegram alerts' : 'Боевой релиз, сквозная передача лидов в CRM и Telegram-бот',
    },
    {
      num: '04',
      title: language === 'uz' ? 'Monitoring va SLA' : language === 'en' ? 'Monitoring & SLA' : 'Мониторинг и SLA',
      duration: language === 'uz' ? 'Doimiy' : language === 'en' ? 'Ongoing' : 'Постоянно',
      desc: language === 'uz' ? 'Har bir muloqot sifatini nazorat qilamiz, yangi mahsulotlar bo‘yicha modelni yangilab boramiz.' : language === 'en' ? 'We monitor conversation quality, maintain 99.9% uptime, and continuously update vector knowledge.' : 'Отслеживаем каждый диалог, анализируем процент успешных закрытий, дообучаем модель новым товарам и обновляем базу знаний по мере изменения цен.',
      artifact: language === 'uz' ? 'Haftalik hisobot, 99.9% uptime va muhandislik yordami' : language === 'en' ? 'Weekly precision reports, 99.9% uptime SLA' : 'Еженедельный отчет точности, аптайм 99.9% и инженерный саппорт',
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 border-b border-slate-200 dark:border-white/10 bg-transparent transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 gap-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill mb-3 font-mono text-xs font-bold text-dash-mint uppercase tracking-wider">
              {language === 'uz' ? '[ 04 // AMALGA OSHIRISH BOSQICHLARI ]' : language === 'en' ? '[ 04 // DEPLOYMENT ROADMAP ]' : '[ 04 // ТЕХНОЛОГИЧЕСКИЙ МАРШРУТ ]'}
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {language === 'uz' ? 'Birinchi TZdan boshlab prodgacha' : language === 'en' ? 'From Blueprint to Live Production' : 'От первого ТЗ до боевого запуска в прод'}
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-dash-muted max-w-md">
            {language === 'uz'
              ? 'Hech qanday oylarga cho‘ziladigan noaniq loyihalar yo‘q. Shartnoma bo‘yicha kafolatlangan bosqichma-bosqich natija.'
              : language === 'en'
              ? 'No vague six-month delays. Phased sprint deliverables with contractual uptime and tangible ROI.'
              : 'Никаких затяжных проектов на полгода. Поэтапная сдача с осязаемыми результатами на каждом шаге и гарантией по договору.'}
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
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
                  <span className="font-mono text-base font-extrabold text-dash-mint">
                    {s.num} // ЭТАП
                  </span>
                  <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-dash-emerald/15 text-dash-mint border border-dash-emerald/30">
                    {s.duration}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-dash-mint transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-dash-muted leading-relaxed mb-6">
                  {s.desc}
                </p>
              </div>

              {/* Artifact badge */}
              <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                <span className="font-mono text-[10px] text-slate-400 dark:text-dash-subtle block mb-1">
                  {language === 'uz' ? 'BOSQICH NATIJASI:' : language === 'en' ? 'STAGE ARTIFACT:' : 'РЕЗУЛЬТАТ ЭТАПА:'}
                </span>
                <span className="text-xs font-semibold text-dash-mint block">
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
