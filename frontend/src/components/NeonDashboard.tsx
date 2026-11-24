import React, { useState } from 'react';
import {
  TrendingUp,
  Activity,
  Zap,
  ShieldCheck,
  Cpu,
  Bot,
  Users,
  CheckCircle2,
  ArrowUpRight,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { useLocale } from '../context/LocaleContext.js';

interface NeonDashboardProps {
  onOpenQuiz: () => void;
}

export const NeonDashboard: React.FC<NeonDashboardProps> = ({ onOpenQuiz }) => {
  const { t, formatMoney, currency, language } = useLocale();
  const [timeframe, setTimeframe] = useState<'1D' | '7D' | '1M' | '1Y'>('7D');
  const [activeMetric, setActiveMetric] = useState<'revenue' | 'hours' | 'speed'>('revenue');

  // Dynamic values based on selected metric & currency
  const metricData = {
    revenue: {
      headline: '+34.8%',
      subtitle: language === 'uz' ? '24/7 sotuvlarda konversiyaning o‘sishi' : language === 'en' ? 'Growth in 24/7 autonomous sales conversion' : 'Прирост конверсии в продажах 24/7',
      primaryStat: formatMoney(84200),
      primaryLabel: language === 'uz' ? 'AI-botlar orqali tushum' : language === 'en' ? 'Revenue generated via AI bots' : 'Выручка через ИИ-ботов',
      donutPercent: 88,
      donutLabel: language === 'uz' ? '88% bitimlar' : language === 'en' ? '88% of deals' : '88% сделок',
      donutSub: language === 'uz' ? 'operatorsiz yopildi' : language === 'en' ? 'closed without human reps' : 'закрыто без оператора',
      barValues: [45, 68, 52, 85, 94, 78, 92],
      wavePath: 'M0,110 C50,90 90,130 140,80 C190,30 240,95 290,50 C340,15 390,60 450,25 L450,150 L0,150 Z',
      waveStroke: 'M0,110 C50,90 90,130 140,80 C190,30 240,95 290,50 C340,15 390,60 450,25',
    },
    hours: {
      headline: '320 ч/мес',
      subtitle: language === 'uz' ? 'Jamoaning tejalgan ish vaqti' : language === 'en' ? 'Monthly team hours saved on routine' : 'Освобождено рабочего времени команды',
      primaryStat: '1,450+',
      primaryLabel: language === 'uz' ? 'Avtomatlashtirilgan hujjatlar' : language === 'en' ? 'Processed documents' : 'Автоматизировано документов',
      donutPercent: 94,
      donutLabel: language === 'uz' ? '94% aniqlik' : language === 'en' ? '94% accuracy' : '94% точность',
      donutSub: language === 'uz' ? '1C va hisob-fakturalarda' : language === 'en' ? 'in ERP/1C reconciliation' : 'в распознавании 1С и счетов',
      barValues: [60, 75, 88, 92, 80, 95, 98],
      wavePath: 'M0,120 C60,110 110,70 170,85 C230,100 270,40 330,45 C390,50 420,20 450,15 L450,150 L0,150 Z',
      waveStroke: 'M0,120 C60,110 110,70 170,85 C230,100 270,40 330,45 C390,50 420,20 450,15',
    },
    speed: {
      headline: '0.4 сек',
      subtitle: language === 'uz' ? 'Mijozga birinchi javob berish tezligi' : language === 'en' ? 'Average first response latency' : 'Среднее время первого ответа клиенту',
      primaryStat: '99.9%',
      primaryLabel: language === 'uz' ? 'Ishlash kafolati SLA' : language === 'en' ? 'Uptime and SLA availability' : 'Аптайм и доступность SLA',
      donutPercent: 99,
      donutLabel: '0.4s отклик',
      donutSub: language === 'uz' ? '45 daqiqalik kutish o‘rniga' : language === 'en' ? 'vs 45 min waiting time' : 'вместо 45 мин ожидания',
      barValues: [92, 95, 96, 94, 98, 97, 99],
      wavePath: 'M0,80 C70,60 120,95 180,50 C240,20 300,70 360,30 C410,10 430,25 450,10 L450,150 L0,150 Z',
      waveStroke: 'M0,80 C70,60 120,95 180,50 C240,20 300,70 360,30 C410,10 430,25 450,10',
    },
  };

  const curr = metricData[activeMetric];

  // Avatars with real high-resolution photos
  const teamActivities = [
    {
      name: language === 'uz' ? 'Elena V.' : 'Елена Васильева',
      role: 'Lead RAG Architect',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80',
      action: language === 'uz' ? 'B2B uchun maxfiy Llama-3.3 konturini ishga tushirdi' : language === 'en' ? 'Deployed private Llama-3.3 perimeter for B2B' : 'Запустила приватный контур Llama-3.3 для B2B',
      time: language === 'uz' ? '2 daqiqa oldin' : language === 'en' ? '2m ago' : '2 мин назад',
      tag: 'RAG ONLINE',
      tagColor: 'text-dash-cyan bg-dash-cyan/10 border-dash-cyan/30',
    },
    {
      name: language === 'uz' ? 'Alisher K.' : 'Алишер Каримов',
      role: 'Senior Bot Engineer',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80',
      action: language === 'uz' ? 'amoCRM va Telegram o‘rtasida integratsiyani uladi (0.4s)' : language === 'en' ? 'Connected amoCRM real-time sync (0.4s)' : 'Подключил синхронизацию amoCRM с Telegram (0.4с)',
      time: language === 'uz' ? '6 daqiqa oldin' : language === 'en' ? '6m ago' : '6 мин назад',
      tag: 'CRM 100%',
      tagColor: 'text-dash-lime bg-dash-lime/10 border-dash-lime/30',
    },
    {
      name: language === 'uz' ? 'Sofiya T.' : 'София Турсунова',
      role: 'ML Ops & QA Lead',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=140&q=80',
      action: language === 'uz' ? '12 000 ta tungi muloqotdan iborat test muvaffaqiyatli o‘tdi' : language === 'en' ? 'Stress-tested on 12k concurrent night sessions' : 'Стресс-тест на 12 000 ночных диалогов пройден',
      time: language === 'uz' ? '14 daqiqa oldin' : language === 'en' ? '14m ago' : '14 мин назад',
      tag: 'RAG ONLINE',
      tagColor: 'text-dash-mint bg-dash-emerald/10 border-dash-emerald/30',
    },
    {
      name: language === 'uz' ? 'Alisher K.' : 'Алишер Каримов',
      role: 'Senior Bot Engineer',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80',
      action: language === 'uz' ? 'amoCRM va Telegram o‘rtasida integratsiyani uladi (0.4s)' : language === 'en' ? 'Connected amoCRM real-time sync (0.4s)' : 'Подключил синхронизацию amoCRM с Telegram (0.4с)',
      time: language === 'uz' ? '6 daqiqa oldin' : language === 'en' ? '6m ago' : '6 мин назад',
      tag: 'CRM 100%',
      tagColor: 'text-dash-cyan bg-dash-cyan/10 border-dash-cyan/30',
    },
    {
      name: language === 'uz' ? 'Sofiya T.' : 'София Турсунова',
      role: 'ML Ops & QA Lead',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=140&q=80',
      action: language === 'uz' ? '12 000 ta tungi muloqotdan iborat test muvaffaqiyatli o‘tdi' : language === 'en' ? 'Stress-tested on 12k concurrent night sessions' : 'Стресс-тест на 12 000 ночных диалогов пройден',
      time: language === 'uz' ? '14 daqiqa oldin' : language === 'en' ? '14m ago' : '14 мин назад',
      tag: 'SLA 99.9%',
      tagColor: 'text-dash-amber bg-dash-amber/10 border-dash-amber/30',
    },
  ];

  return (
    <div className="neon-card p-5 sm:p-7 relative overflow-hidden text-slate-900 dark:text-dash-text">
      {/* Background radial gradient glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-dash-emerald/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-dash-mint/10 rounded-full blur-[90px] pointer-events-none" />

      {/* 1. Header Bar: Brand Glyph + Live Status + Timeframe Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-6 border-b border-slate-200 dark:border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-dash-emerald via-dash-mint to-dash-cyan p-0.5 shadow-mint flex items-center justify-center">
            <div className="w-full h-full bg-white dark:bg-dash-card rounded-[14px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-dash-mint animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white uppercase">
                {t('dash_title')}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-dash-emerald/15 text-dash-mint border border-dash-emerald/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-dash-mint animate-ping" />
                {t('dash_live')}
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-500 dark:text-dash-muted">
              {t('dash_subtitle')}
            </span>
          </div>
        </div>

        {/* Timeframe Pill Switcher */}
        <div className="flex items-center p-1 rounded-full glass-pill self-start sm:self-auto">
          {(['1D', '7D', '1M', '1Y'] as const).map((tVal) => (
            <button
              key={tVal}
              onClick={() => setTimeframe(tVal)}
              className={`px-3 py-1 rounded-full font-mono text-[11px] font-bold transition-all ${
                timeframe === tVal
                  ? 'bg-dash-mint text-dash-dark font-extrabold shadow-mint'
                  : 'text-slate-500 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tVal}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Metric Mode Switcher Pills */}
      <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl glass-pill mb-6 relative z-10">
        {[
          { id: 'revenue', label: t('dash_tab_revenue'), icon: TrendingUp },
          { id: 'hours', label: t('dash_tab_hours'), icon: Zap },
          { id: 'speed', label: t('dash_tab_speed'), icon: Activity },
        ].map((tab) => {
          const isActive = activeMetric === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMetric(tab.id as any)}
              className={`py-2 px-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-dash-mint via-dash-emerald to-dash-cyan text-dash-dark font-extrabold shadow-mint scale-[1.02]'
                  : 'text-slate-600 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Dashboard Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6 relative z-10">
        {/* Left Card: Glowing Neon Wave Chart (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white/70 dark:bg-dash-card border border-slate-200 dark:border-white/8 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-dash-muted">
                {t('dash_metric_dynamics')}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight gradient-text-neon">
                {curr.headline}
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm sm:text-base font-bold text-dash-mint">
                {curr.primaryStat}
              </span>
              <div className="font-mono text-[10px] text-slate-500 dark:text-dash-muted">
                {curr.primaryLabel}
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-dash-muted mb-4">{curr.subtitle}</p>

          {/* SVG Glowing Neon Spline Area Chart */}
          <div className="relative h-36 w-full">
            <svg viewBox="0 0 450 150" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="neonWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F5A0" stopOpacity="0.32" />
                  <stop offset="60%" stopColor="#10B981" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#06D6A0" stopOpacity="0.04" />
                </linearGradient>
                <linearGradient id="neonStrokeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00F5A0" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#05FF91" />
                </linearGradient>
                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Area Fill */}
              <path d={curr.wavePath} fill="url(#neonWaveGrad)" />

              {/* Glowing Line */}
              <path
                d={curr.waveStroke}
                fill="none"
                stroke="url(#neonStrokeGrad)"
                strokeWidth="3.5"
                filter="url(#neonGlow)"
              />

              {/* Highlight Dot */}
              <circle cx="290" cy="50" r="5" fill="#00F5A0" filter="url(#neonGlow)" />
              <circle cx="290" cy="50" r="2" fill="#FFFFFF" />
            </svg>

            {/* Floating Live Tooltip */}
            <div className="absolute top-2 right-12 bg-white/90 dark:bg-dash-track/90 backdrop-blur-md border border-dash-mint/40 px-2.5 py-1 rounded-lg font-mono text-[10px] text-dash-mint shadow-sm flex items-center gap-1.5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-dash-mint animate-pulse" />
              <span>+34.8% SLA</span>
            </div>
          </div>

          {/* Under-chart metrics strip */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-200 dark:border-white/5 font-mono text-[10px] text-center">
            <div className="p-1 rounded bg-black/5 dark:bg-white/5 text-slate-600 dark:text-dash-muted">ПН · 94%</div>
            <div className="p-1 rounded bg-black/5 dark:bg-white/5 text-slate-600 dark:text-dash-muted">СР · 98%</div>
            <div className="p-1 rounded bg-black/5 dark:bg-white/5 text-dash-mint font-bold">СБ · 100%</div>
            <div className="p-1 rounded bg-black/5 dark:bg-white/5 text-dash-emerald font-bold">ВС · 99.8%</div>
          </div>
        </div>

        {/* Right Card: Radial Donut + 3D Neon Bars (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white/70 dark:bg-dash-card border border-slate-200 dark:border-white/8 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-dash-muted">
              {t('dash_load_distribution')}
            </span>
            <span className="font-mono text-xs font-bold text-dash-mint">
              {curr.donutPercent}% KPI
            </span>
          </div>

          {/* Donut Radial Gauge + 3D Bar Columns */}
          <div className="flex items-center justify-around py-3">
            {/* Donut Gauge */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#E2E8F0" className="dark:stroke-[#151C1F]" strokeWidth="9" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#neonStrokeGrad)"
                  strokeWidth="9"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * curr.donutPercent) / 100}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">
                  {curr.donutPercent}%
                </span>
                <span className="text-[9px] font-mono text-slate-500 dark:text-dash-muted uppercase">
                  {t('dash_autonomous')}
                </span>
              </div>
            </div>

            {/* 3D Cylindrical Bar Columns */}
            <div className="flex items-end gap-2.5 h-28 px-2">
              {curr.barValues.slice(0, 5).map((val, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    style={{ height: `${val}%` }}
                    className={`w-3.5 rounded-full transition-all duration-300 ${
                      idx === 3 || idx === 4
                        ? 'bg-gradient-to-t from-dash-emerald to-dash-mint shadow-mint'
                        : 'bg-slate-300 dark:bg-dash-surface opacity-75'
                    }`}
                  />
                  <span className="font-mono text-[9px] text-slate-500 dark:text-dash-muted">#{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-dash-track/70 border border-slate-200 dark:border-white/5 font-mono text-[11px] text-center text-dash-mint font-bold">
            ✓ {curr.donutLabel} — {curr.donutSub}
          </div>
        </div>
      </div>

      {/* 4. Real Team & AI Copilot Live Stream */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/70 dark:bg-dash-card border border-slate-200 dark:border-white/8 mb-6 relative z-10">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-dash-mint" />
            <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {t('dash_team_activity')}
            </span>
          </div>
          <span className="font-mono text-[10px] text-dash-mint font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-dash-mint animate-pulse" />
            {t('dash_online_count')}
          </span>
        </div>

        {/* Live List with Real Avatars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {teamActivities.map((member) => (
            <div
              key={member.name}
              className="p-3 rounded-xl bg-slate-50 dark:bg-dash-track/90 border border-slate-200 dark:border-white/5 hover:border-dash-mint/30 transition-colors flex items-center gap-3"
            >
              {/* Photo Avatar with Ring */}
              <div className="relative shrink-0">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-dash-emerald/60 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-dash-mint ring-2 ring-white dark:ring-dash-bg" />
              </div>

              {/* Info */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{member.name}</span>
                  <span className={`font-mono text-[9px] px-1.5 py-0.2 rounded border ${member.tagColor}`}>
                    {member.tag}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-dash-muted truncate">{member.action}</span>
                <span className="font-mono text-[9px] text-slate-400 dark:text-dash-subtle">{member.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Primary Dashboard Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-dash-emerald/10 via-dash-mint/15 to-dash-cyan/10 dark:from-dash-emerald/20 dark:via-dash-mint/15 dark:to-dash-cyan/10 border border-slate-200 dark:border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white dark:bg-dash-track flex items-center justify-center text-dash-mint shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {t('dash_cta_title')}
            </div>
            <div className="font-mono text-xs text-slate-500 dark:text-dash-muted">
              {t('dash_cta_sub')}
            </div>
          </div>
        </div>

        <button
          onClick={onOpenQuiz}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-dash-mint via-dash-emerald to-dash-cyan hover:opacity-95 text-dash-dark font-extrabold text-xs uppercase tracking-wider shadow-mint flex items-center justify-center gap-2 select-none active:scale-95 transition-all shrink-0"
        >
          <span>{t('dash_cta_btn')}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
