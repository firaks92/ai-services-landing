import React from 'react';
import { useLocale } from '../../context/LocaleContext.js';

interface Step4TimelineBudgetProps {
  selectedTimeline: string;
  selectedBudget: string;
  onSelectTimeline: (t: string) => void;
  onSelectBudget: (b: string) => void;
}

export const Step4TimelineBudget: React.FC<Step4TimelineBudgetProps> = ({
  selectedTimeline,
  selectedBudget,
  onSelectTimeline,
  onSelectBudget,
}) => {
  const { currency, language } = useLocale();

  const timelines = [
    {
      id: 'urgent',
      label: language === 'uz' ? 'Zudlik bilan (1–2 hafta ichida)' : language === 'en' ? 'Urgent (Within 1–2 weeks)' : 'Нужно «вчера» (в ближайшие 1–2 недели)',
    },
    {
      id: 'month',
      label: language === 'uz' ? '1 oy ichida' : language === 'en' ? 'Within 1 month' : 'В течение 1 месяца',
    },
    {
      id: 'quarter',
      label: language === 'uz' ? '2–3 oy ichida' : language === 'en' ? 'Within 2–3 months' : 'В ближайшие 2–3 месяца',
    },
    {
      id: 'explore',
      label: language === 'uz' ? 'Hozircha baholayapman va o‘rganayapman' : language === 'en' ? 'Just exploring options & pricing' : 'Пока просто прицениваюсь и изучаю варианты',
    },
  ];

  const budgets = [
    {
      id: 'b1',
      label: currency === 'uzs'
        ? `6 500 000 so'mgacha (${language === 'uz' ? 'MVP yechim' : 'базовый MVP'})`
        : `Up to $500 (${language === 'ru' ? 'базовое решение / MVP' : 'MVP deployment'})`,
    },
    {
      id: 'b2',
      label: currency === 'uzs'
        ? `6 500 000 – 19 000 000 so'm (${language === 'uz' ? 'to‘liq integratsiya' : 'полное внедрение'})`
        : `$500 – $1,500 (${language === 'ru' ? 'полноценное внедрение с CRM' : 'turnkey integration'})`,
    },
    {
      id: 'b3',
      label: currency === 'uzs'
        ? `19 000 000 – 65 000 000 so'm (${language === 'uz' ? 'kompleks tizim' : 'комплексная автоматизация'})`
        : `$1,500 – $5,000 (${language === 'ru' ? 'комплексная автоматизация' : 'complex enterprise workflow'})`,
    },
    {
      id: 'b4',
      label: currency === 'uzs'
        ? `65 000 000 so'mdan yuqori (${language === 'uz' ? 'Enterprise / Custom' : 'кастомная разработка'})`
        : `Over $5,000 (${language === 'ru' ? 'кастомная разработка / Enterprise' : 'custom LLM / air-gapped Enterprise'})`,
    },
    {
      id: 'b5',
      label: language === 'uz' ? 'Baholash qiyin, hisob-kitob kerak' : language === 'en' ? 'Need architectural calculation' : 'Затрудняюсь оценить, нужен расчет',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {language === 'uz' ? 'Ishga tushirish muddatlari va byudjet mo‘ljali' : language === 'en' ? 'Deployment Timeline & Budget Target' : 'Сроки запуска и ориентир по бюджету'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-dash-muted">
          {language === 'uz' ? 'Tizim chuqurligini aniqlashga yordam beradi: tezkor MVP yoki keng ko‘lamli avtomatlashtirish.' : language === 'en' ? 'Helps architect the optimal solution depth: rapid MVP or enterprise-grade automation.' : 'Помогает подобрать подходящую глубину решения: быстрый MVP или масштабную автоматизацию.'}
        </p>
      </div>

      {/* 4.1 Timeline */}
      <div>
        <div className="font-mono text-xs font-semibold text-dash-mint uppercase tracking-wider mb-2.5">
          {language === 'uz' ? '4.1 / KUTILAYOTGAN MUDDAT' : language === 'en' ? '4.1 / DESIRED TIMELINE' : '4.1 / ЖЕЛАЕМЫЕ СРОКИ ВНЕДРЕНИЯ'}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {timelines.map((t) => {
            const isSelected = selectedTimeline === t.label;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectTimeline(t.label)}
                className={`p-3.5 text-left border rounded-xl transition-all text-xs font-semibold flex items-center justify-between select-none ${
                  isSelected
                    ? 'bg-dash-emerald/10 border-dash-mint text-slate-900 dark:text-white shadow-mint'
                    : 'border-slate-200 dark:border-white/10 bg-white/60 dark:bg-dash-track/60 text-slate-600 dark:text-dash-muted hover:border-dash-mint/40 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{t.label}</span>
                <div
                  className={`w-4 h-4 rounded-full border shrink-0 ml-2 flex items-center justify-center ${
                    isSelected ? 'border-dash-mint bg-dash-mint' : 'border-slate-300 dark:border-white/20'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-dash-dark rounded-full block" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4.2 Budget */}
      <div>
        <div className="font-mono text-xs font-semibold text-dash-mint uppercase tracking-wider mb-2.5">
          {language === 'uz' ? '4.2 / REJALASHTIRILGAN BYUDJET' : language === 'en' ? '4.2 / TARGET BUDGET' : '4.2 / ПЛАНИРУЕМЫЙ БЮДЖЕТ'}
        </div>
        <div className="space-y-2">
          {budgets.map((b) => {
            const isSelected = selectedBudget === b.label;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => onSelectBudget(b.label)}
                className={`w-full p-3.5 text-left border rounded-xl transition-all text-xs sm:text-sm font-semibold flex items-center justify-between select-none ${
                  isSelected
                    ? 'bg-dash-emerald/10 border-dash-mint text-slate-900 dark:text-white shadow-mint'
                    : 'border-slate-200 dark:border-white/10 bg-white/60 dark:bg-dash-track/60 text-slate-600 dark:text-dash-muted hover:border-dash-mint/40 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{b.label}</span>
                <div
                  className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${
                    isSelected ? 'border-dash-mint bg-dash-mint' : 'border-slate-300 dark:border-white/20'
                  }`}
                >
                  {isSelected && <span className="w-1.5 h-1.5 bg-dash-dark rounded-full block" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
