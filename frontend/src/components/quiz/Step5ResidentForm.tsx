import React, { useState } from 'react';
import type { PreferredChannel } from '../../types/quiz.js';
import { Send, Loader2, AlertCircle, MapPin, MessageCircle, Phone, Smartphone } from 'lucide-react';

interface Step5ResidentFormProps {
  primaryService: string;
  name: string;
  cityInput: string;
  cityAutofilled: boolean;
  preferredChannel: PreferredChannel;
  phone: string;
  telegramUsername: string;
  comment: string;
  consentAccepted: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  onUpdate: (fields: {
    name?: string;
    cityInput?: string;
    preferredChannel?: PreferredChannel;
    phone?: string;
    telegramUsername?: string;
    comment?: string;
    consentAccepted?: boolean;
  }) => void;
  onSubmit: () => void;
  onOpenPrivacy: () => void;
}

export const Step5ResidentForm: React.FC<Step5ResidentFormProps> = ({
  primaryService,
  name,
  cityInput,
  cityAutofilled,
  preferredChannel,
  phone,
  telegramUsername,
  comment,
  consentAccepted,
  isSubmitting,
  submitError,
  onUpdate,
  onSubmit,
  onOpenPrivacy,
}) => {
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showComment, setShowComment] = useState(Boolean(comment));

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errors.name = 'Укажите ваше имя (минимум 2 символа)';
    }
    if (!cityInput.trim()) {
      errors.cityInput = 'Укажите ваш город или регион';
    }
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    if (cleanPhone.length < 9) {
      errors.phone = 'Укажите корректный номер телефона с кодом страны';
    }
    if (preferredChannel === 'Telegram') {
      const cleanTg = telegramUsername.replace(/^@/, '').trim();
      if (!cleanTg) {
        errors.telegramUsername = 'Укажите ваш Telegram никнейм (например: @username)';
      }
    }
    if (!consentAccepted) {
      errors.consent = 'Необходимо подтвердить согласие на обработку данных';
    }
    return errors;
  };

  const errors = validate();

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      cityInput: true,
      phone: true,
      telegramUsername: true,
      consent: true,
    });

    if (Object.keys(errors).length === 0) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
          Спецификация по услуге «{primaryService || 'ИИ-решение'}» готова!
        </h3>
        <p className="text-xs text-slate-600 dark:text-dash-muted">
          Укажите контактные данные — дежурный инженер мгновенно получит техническое задание в Telegram и свяжется с вами.
        </p>
      </div>

      {submitError && (
        <div className="p-3 bg-red-950/40 border border-red-500 text-red-400 text-xs rounded-xl flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* 1. Name */}
      <div>
        <label className="block font-mono text-xs font-semibold text-dash-mint uppercase tracking-wider mb-1">
          ВАШЕ ИМЯ *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          onBlur={() => handleBlur('name')}
          placeholder="Например: Алишер Каримов"
          className={`w-full h-11 px-4 text-xs sm:text-sm bg-white/70 dark:bg-dash-track/70 backdrop-blur-md border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-dash-subtle focus:outline-none ${
            touched.name && errors.name
              ? 'border-red-500'
              : 'border-slate-300 dark:border-white/10 focus:border-dash-mint'
          }`}
          autoComplete="name"
        />
        {touched.name && errors.name && (
          <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>
        )}
      </div>

      {/* 2. City / District */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="font-mono text-xs font-semibold text-dash-mint uppercase tracking-wider">
            ГОРОД / РЕГИОН *
          </label>
          {cityAutofilled && (
            <span className="font-mono text-[10px] text-dash-emerald px-2 py-0.5 rounded-full bg-dash-track border border-dash-emerald/30 flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" /> Определено по IP
            </span>
          )}
        </div>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => onUpdate({ cityInput: e.target.value })}
          onBlur={() => handleBlur('cityInput')}
          placeholder="Например: Ташкент / Москва / Алматы"
          className={`w-full h-11 px-4 text-xs sm:text-sm bg-white/70 dark:bg-dash-track/70 backdrop-blur-md border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-dash-subtle focus:outline-none ${
            touched.cityInput && errors.cityInput
              ? 'border-red-500'
              : 'border-slate-300 dark:border-white/10 focus:border-dash-mint'
          }`}
          autoComplete="address-level2"
        />
        {touched.cityInput && errors.cityInput && (
          <p className="text-red-400 text-[11px] mt-1">{errors.cityInput}</p>
        )}
      </div>

      {/* 3. Preferred Channel */}
      <div>
        <label className="block font-mono text-xs font-semibold text-dash-mint uppercase tracking-wider mb-1.5">
          УДОБНЫЙ КАНАЛ СВЯЗИ
        </label>
        <div className="p-1 rounded-2xl bg-white/70 dark:bg-dash-track/70 backdrop-blur-md border border-slate-300 dark:border-white/10 grid grid-cols-3 gap-1.5">
          {[
            { id: 'Telegram', label: 'Telegram (бот)', icon: MessageCircle },
            { id: 'Phone', label: 'Телефон', icon: Phone },
            { id: 'WhatsApp', label: 'WhatsApp', icon: Smartphone },
          ].map((ch) => {
            const isSelected = preferredChannel === ch.id;
            const Icon = ch.icon;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => onUpdate({ preferredChannel: ch.id as PreferredChannel })}
                className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-dash-mint to-dash-emerald text-dash-dark font-extrabold shadow-mint'
                    : 'text-slate-600 dark:text-dash-muted hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{ch.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 & 5. Phone + Telegram Username */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block font-mono text-xs font-semibold text-dash-mint uppercase tracking-wider mb-1">
            НОМЕР ТЕЛЕФОНА *
          </label>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            onBlur={() => handleBlur('phone')}
            placeholder="+998 90 123-45-67"
            className={`w-full h-11 px-4 text-xs sm:text-sm bg-white/70 dark:bg-dash-track/70 backdrop-blur-md border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-dash-subtle focus:outline-none ${
              touched.phone && errors.phone
                ? 'border-red-500'
                : 'border-slate-300 dark:border-white/10 focus:border-dash-mint'
            }`}
          />
          {touched.phone && errors.phone && (
            <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-mono text-xs font-semibold text-dash-mint uppercase tracking-wider mb-1">
            TELEGRAM {preferredChannel === 'Telegram' ? '*' : '(ОПЦИЯ)'}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-slate-400 dark:text-dash-subtle text-sm font-mono">@</span>
            <input
              type="text"
              value={telegramUsername.replace(/^@/, '')}
              onChange={(e) => onUpdate({ telegramUsername: `@${e.target.value.replace(/^@/, '')}` })}
              onBlur={() => handleBlur('telegramUsername')}
              placeholder="username"
              className={`w-full h-11 pl-7 pr-3 text-xs sm:text-sm bg-white/70 dark:bg-dash-track/70 backdrop-blur-md border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-dash-subtle focus:outline-none ${
                touched.telegramUsername && errors.telegramUsername
                  ? 'border-red-500'
                  : 'border-slate-300 dark:border-white/10 focus:border-dash-mint'
              }`}
            />
          </div>
          {touched.telegramUsername && errors.telegramUsername && (
            <p className="text-red-400 text-[11px] mt-1">{errors.telegramUsername}</p>
          )}
        </div>
      </div>

      {/* 6. Comment Toggle */}
      <div>
        {!showComment ? (
          <button
            type="button"
            onClick={() => setShowComment(true)}
            className="text-xs text-dash-mint hover:underline font-semibold"
          >
            + Добавить комментарий к задаче (необязательно)
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-mono text-xs font-semibold text-dash-mint uppercase tracking-wider">
                КОММЕНТАРИЙ К ЗАДАЧЕ
              </label>
              <span className="font-mono text-[10px] text-slate-400 dark:text-dash-subtle">
                {comment.length} / 500
              </span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => onUpdate({ comment: e.target.value.slice(0, 500) })}
              placeholder="Опишите ваши системы, объем обращений или специфику проекта..."
              rows={3}
              className="w-full p-3 text-xs bg-white/70 dark:bg-dash-track/70 backdrop-blur-md border border-slate-300 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-dash-subtle focus:outline-none focus:border-dash-mint resize-none"
            />
          </div>
        )}
      </div>

      {/* 7. Consent Checkbox */}
      <div className="pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(e) => onUpdate({ consentAccepted: e.target.checked })}
            className="w-4 h-4 mt-0.5 rounded accent-dash-mint cursor-pointer"
          />
          <span className="text-[11px] text-slate-600 dark:text-dash-muted leading-tight">
            Согласен(на) на обработку персональных данных согласно{' '}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-dash-mint underline font-medium"
            >
              Политике конфиденциальности
            </button>
          </span>
        </label>
        {touched.consent && errors.consent && (
          <p className="text-red-400 text-[11px] mt-1">{errors.consent}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-gradient-to-r from-dash-mint to-dash-emerald hover:opacity-95 disabled:opacity-50 text-dash-dark font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-mint transition-all active:scale-98 select-none"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-dash-dark" />
              <span>ОТПРАВЛЯЕМ В TELEGRAM...</span>
            </>
          ) : (
            <>
              <span>ПОЛУЧИТЬ ПОДБОР ИИ-УЗЛА</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
