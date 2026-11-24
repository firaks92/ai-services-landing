import React, { useState, useMemo } from 'react';
import { Sliders, Zap, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';
import type { BusinessTier } from './BusinessTierSwitcher.js';
import type { ServiceCode } from '../types/quiz.js';

interface HeroSimulatorProps {
  currentTier: BusinessTier;
  onLaunchConfigured: (serviceCode: ServiceCode) => void;
}

export const HeroSimulator: React.FC<HeroSimulatorProps> = ({ currentTier, onLaunchConfigured }) => {
  // Modules state
  const [salesBot, setSalesBot] = useState(true);
  const [ragBase, setRagBase] = useState(true);
  const [crmSync, setCrmSync] = useState(true);
  const [voiceVoice, setVoiceVoice] = useState(currentTier === 'enterprise');

  // Traffic volume scale: 0 = 30/day, 1 = 120/day, 2 = 450/day, 3 = 1500/day
  const [volumeIndex, setVolumeIndex] = useState(currentTier === 'startup' ? 0 : currentTier === 'growth' ? 1 : 2);

  const volumes = [
    { label: '30 диалогов/день', multiplier: 1, baseHours: 65, baseSave: 95000 },
    { label: '150 диалогов/день', multiplier: 2.2, baseHours: 145, baseSave: 210000 },
    { label: '500 диалогов/день', multiplier: 4.5, baseHours: 320, baseSave: 460000 },
    { label: '1500+ диалогов/день', multiplier: 9.0, baseHours: 720, baseSave: 980000 },
  ];

  // Dynamic calculations based on state
  const metrics = useMemo(() => {
    const vol = volumes[volumeIndex] || volumes[1];
    let moduleFactor = 0.4;
    if (salesBot) moduleFactor += 0.35;
    if (ragBase) moduleFactor += 0.25;
    if (crmSync) moduleFactor += 0.15;
    if (voiceVoice) moduleFactor += 0.25;

    const savedHours = Math.round(vol.baseHours * moduleFactor);
    const savedRubles = Math.round(vol.baseSave * moduleFactor);
    const speedSec = crmSync ? '0.4c' : '1.2c';

    return {
      savedHours,
      savedRubles: savedRubles.toLocaleString('ru-RU'),
      speedSec,
      targetService: ragBase ? ('rag_analytics' as ServiceCode) : ('chatbot' as ServiceCode),
    };
  }, [salesBot, ragBase, crmSync, voiceVoice, volumeIndex]);

  return (
    <div className="clay-card p-6 sm:p-7 relative overflow-hidden">
      {/* Decorative background grid and organic gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-clay-mint/20 dark:bg-clay-sage/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Header bar */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-clay-border dark:border-clay-dark-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-squircle-sm clay-inset flex items-center justify-center text-clay-pine dark:text-clay-mint">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-clay-pine dark:text-clay-dark-pine uppercase">
              Flight Deck // Интерактивный симулятор
            </h3>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
              ЩЕЛКАЙТЕ ТУМБЛЕРАМИ ДЛЯ РАСЧЕТА ЭКОНОМИИ
            </span>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full clay-inset font-mono text-[10px] text-clay-emerald font-semibold">
          <span className="w-2 h-2 rounded-full bg-clay-emerald animate-pulse" />
          <span>SLA 99.8%</span>
        </div>
      </div>

      {/* Switches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {/* Switch 1: Sales Bot */}
        <div
          onClick={() => setSalesBot(!salesBot)}
          className={`p-3 rounded-squircle-sm border cursor-pointer select-none transition-all flex items-center justify-between ${
            salesBot
              ? 'bg-clay-card-muted/70 dark:bg-clay-dark-muted/80 border-clay-emerald/40'
              : 'bg-transparent border-dashed border-slate-300 dark:border-slate-700 opacity-60'
          }`}
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-clay-pine dark:text-clay-dark-pine">
              LLM Продавец 24/7
            </span>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
              Квалификация и дожим лидов
            </span>
          </div>
          {/* Tactile Pill Toggle */}
          <div
            className={`w-11 h-6 rounded-full clay-inset p-0.5 transition-colors ${
              salesBot ? 'bg-clay-sage/40' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full clay-knob transition-transform ${
                salesBot ? 'translate-x-5 bg-clay-emerald' : 'translate-x-0 bg-white dark:bg-slate-500'
              }`}
            />
          </div>
        </div>

        {/* Switch 2: RAG Base */}
        <div
          onClick={() => setRagBase(!ragBase)}
          className={`p-3 rounded-squircle-sm border cursor-pointer select-none transition-all flex items-center justify-between ${
            ragBase
              ? 'bg-clay-card-muted/70 dark:bg-clay-dark-muted/80 border-clay-emerald/40'
              : 'bg-transparent border-dashed border-slate-300 dark:border-slate-700 opacity-60'
          }`}
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-clay-pine dark:text-clay-dark-pine">
              RAG-база регламентов
            </span>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
              Ответы по вашим прайсам без ошибок
            </span>
          </div>
          <div
            className={`w-11 h-6 rounded-full clay-inset p-0.5 transition-colors ${
              ragBase ? 'bg-clay-sage/40' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full clay-knob transition-transform ${
                ragBase ? 'translate-x-5 bg-clay-emerald' : 'translate-x-0 bg-white dark:bg-slate-500'
              }`}
            />
          </div>
        </div>

        {/* Switch 3: CRM Auto-sync */}
        <div
          onClick={() => setCrmSync(!crmSync)}
          className={`p-3 rounded-squircle-sm border cursor-pointer select-none transition-all flex items-center justify-between ${
            crmSync
              ? 'bg-clay-card-muted/70 dark:bg-clay-dark-muted/80 border-clay-emerald/40'
              : 'bg-transparent border-dashed border-slate-300 dark:border-slate-700 opacity-60'
          }`}
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-clay-pine dark:text-clay-dark-pine">
              CRM-синхронизация
            </span>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
              Создание сделки и запись диалога
            </span>
          </div>
          <div
            className={`w-11 h-6 rounded-full clay-inset p-0.5 transition-colors ${
              crmSync ? 'bg-clay-sage/40' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full clay-knob transition-transform ${
                crmSync ? 'translate-x-5 bg-clay-emerald' : 'translate-x-0 bg-white dark:bg-slate-500'
              }`}
            />
          </div>
        </div>

        {/* Switch 4: Voice & Omnichannel */}
        <div
          onClick={() => setVoiceVoice(!voiceVoice)}
          className={`p-3 rounded-squircle-sm border cursor-pointer select-none transition-all flex items-center justify-between ${
            voiceVoice
              ? 'bg-clay-card-muted/70 dark:bg-clay-dark-muted/80 border-clay-emerald/40'
              : 'bg-transparent border-dashed border-slate-300 dark:border-slate-700 opacity-60'
          }`}
        >
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-clay-pine dark:text-clay-dark-pine">
              Голос и WhatsApp
            </span>
            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">
              Распознавание речи и омниканал
            </span>
          </div>
          <div
            className={`w-11 h-6 rounded-full clay-inset p-0.5 transition-colors ${
              voiceVoice ? 'bg-clay-sage/40' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full clay-knob transition-transform ${
                voiceVoice ? 'translate-x-5 bg-clay-emerald' : 'translate-x-0 bg-white dark:bg-slate-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Rotary / Stepper Dial for Traffic Volume */}
      <div className="mb-6 p-3.5 rounded-squircle clay-inset">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs font-semibold uppercase text-clay-pine dark:text-clay-sage-soft">
            Входящая нагрузка (обращений / день)
          </span>
          <span className="font-mono text-xs font-bold text-clay-coral">
            {volumes[volumeIndex].label}
          </span>
        </div>
        {/* Step Selector Buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {volumes.map((v, idx) => (
            <button
              key={v.label}
              onClick={() => setVolumeIndex(idx)}
              className={`py-1.5 px-2 rounded-squircle-sm font-mono text-[11px] font-semibold transition-all select-none ${
                volumeIndex === idx
                  ? 'clay-card text-clay-pine dark:text-clay-mint scale-[1.02] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Real-time Dynamic Metrics Display (Boarding Pass Mini Style) */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-squircle bg-clay-card-muted/80 dark:bg-clay-dark-muted/80 border border-clay-border dark:border-clay-dark-border mb-5">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400">
            Экономия ФОТ
          </span>
          <span className="text-sm sm:text-base font-bold font-mono tabular-nums text-clay-emerald">
            ~{metrics.savedRubles} ₽
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">в месяц</span>
        </div>

        <div className="flex flex-col border-l border-clay-border dark:border-clay-dark-border pl-3">
          <span className="font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400">
            Сэкономлено времени
          </span>
          <span className="text-sm sm:text-base font-bold font-mono tabular-nums text-clay-pine dark:text-clay-dark-pine">
            {metrics.savedHours} ч
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">рутины команды</span>
        </div>

        <div className="flex flex-col border-l border-clay-border dark:border-clay-dark-border pl-3">
          <span className="font-mono text-[10px] uppercase text-slate-500 dark:text-slate-400">
            Отклик на лид
          </span>
          <span className="text-sm sm:text-base font-bold font-mono tabular-nums text-clay-coral">
            {metrics.speedSec}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">мгновенно</span>
        </div>
      </div>

      {/* Action CTA */}
      <button
        onClick={() => onLaunchConfigured(metrics.targetService)}
        className="w-full flex items-center justify-center gap-3 bg-clay-coral hover:bg-clay-coral-hover text-white py-3.5 px-5 rounded-squircle font-semibold text-xs uppercase tracking-wider shadow-clay-btn active:scale-[0.98] transition-all group"
      >
        <span>Зафиксировать эту конфигурацию в ТЗ</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
