import React, { useState } from 'react';
import type { PreferredChannel } from '../../types/quiz.js';
import { Send, MapPin, MessageCircle, Phone, Smartphone, AlertCircle, Loader2 } from 'lucide-react';

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
  onUpdate: (fields: Partial<{
    name: string;
    cityInput: string;
    preferredChannel: PreferredChannel;
    phone: string;
    telegramUsername: string;
    comment: string;
    consentAccepted: boolean;
  }>) => void;
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
  const [showComment, setShowComment] = useState(Boolean(comment));
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name || name.trim().length < 2) {
      errors.name = 'Укажите ваше имя (минимум 2 символа)';
    }
    if (!cityInput || cityInput.trim().length < 2) {
      errors.cityInput = 'Укажите ваш город или регион';
    }
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!cleanPhone || !/^\+?[0-9]{9,15}$/.test(cleanPhone)) {
      errors.phone = 'Укажите корректный номер телефона с кодом страны';
    }
    if (preferredChannel === 'Telegram') {
      const cleanUsername = telegramUsername.replace(/^@/, '').trim();
      if (!cleanUsername || cleanUsername.length < 4) {
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
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
          Спецификация по услуге «{primaryService || 'ИИ-решение'}» готова!
        </h3>
        <p className="text-xs text-dash-muted">
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
        <label className="block font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider mb-1">
          ВАШЕ ИМЯ *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          onBlur={() => handleBlur('name')}
          placeholder="Например: Алишер Каримов"
          className={`w-full h-11 px-4 text-xs sm:text-sm bg-dash-track border rounded-xl text-white focus:outline-none ${
            touched.name && errors.name
              ? 'border-red-500'
              : 'border-white/10 focus:border-dash-cyan'
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
          <label className="font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider">
            ГОРОД / РЕГИОН *
          </label>
          {cityAutofilled && (
            <span className="font-mono text-[10px] text-dash-lime px-2 py-0.5 rounded-full bg-dash-track border border-dash-lime/30 flex items-center gap-1">
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
          className={`w-full h-11 px-4 text-xs sm:text-sm bg-dash-track border rounded-xl text-white focus:outline-none ${
            touched.cityInput && errors.cityInput
              ? 'border-red-500'
              : 'border-white/10 focus:border-dash-cyan'
          }`}
          autoComplete="address-level2"
        />
        {touched.cityInput && errors.cityInput && (
          <p className="text-red-400 text-[11px] mt-1">{errors.cityInput}</p>
        )}
      </div>

      {/* 3. Preferred Channel */}
      <div>
        <label className="block font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider mb-1.5">
          УДОБНЫЙ КАНАЛ СВЯЗИ
        </label>
        <div className="p-1 rounded-2xl bg-dash-track border border-white/10 grid grid-cols-3 gap-1.5">
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
                    ? 'bg-gradient-to-r from-dash-magenta to-dash-purple text-white shadow-neon-magenta'
                    : 'text-dash-muted hover:text-white'
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
          <label className="block font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider mb-1">
            НОМЕР ТЕЛЕФОНА *
          </label>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            onBlur={() => handleBlur('phone')}
            placeholder="+998 90 123-45-67"
            className={`w-full h-11 px-4 text-xs sm:text-sm bg-dash-track border rounded-xl text-white focus:outline-none ${
              touched.phone && errors.phone
                ? 'border-red-500'
                : 'border-white/10 focus:border-dash-cyan'
            }`}
          />
          {touched.phone && errors.phone && (
            <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider mb-1">
            TELEGRAM {preferredChannel === 'Telegram' ? '*' : '(ОПЦИЯ)'}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-dash-subtle text-sm font-mono">@</span>
            <input
              type="text"
              value={telegramUsername.replace(/^@/, '')}
              onChange={(e) => onUpdate({ telegramUsername: `@${e.target.value.replace(/^@/, '')}` })}
              onBlur={() => handleBlur('telegramUsername')}
              placeholder="username"
              className={`w-full h-11 pl-7 pr-3 text-xs sm:text-sm bg-dash-track border rounded-xl text-white focus:outline-none ${
                touched.telegramUsername && errors.telegramUsername
                  ? 'border-red-500'
                  : 'border-white/10 focus:border-dash-cyan'
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
            className="text-xs text-dash-magenta hover:underline font-semibold"
          >
            + Добавить комментарий к задаче (необязательно)
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-mono text-xs font-semibold text-dash-cyan uppercase tracking-wider">
                КОММЕНТАРИЙ К ЗАДАЧЕ
              </label>
              <span className="font-mono text-[10px] text-dash-subtle">
                {comment.length} / 500
              </span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => onUpdate({ comment: e.target.value.slice(0, 500) })}
              placeholder="Опишите ваши системы, объем обращений или специфику проекта..."
              rows={3}
              className="w-full p-3 text-xs bg-dash-track border border-white/10 rounded-xl text-white focus:outline-none resize-none"
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
            className="w-4 h-4 mt-0.5 rounded accent-dash-magenta cursor-pointer"
          />
          <span className="text-[11px] text-dash-muted leading-tight">
            Согласен(на) на обработку персональных данных согласно{' '}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-dash-cyan underline font-medium"
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
          className="w-full h-12 bg-gradient-to-r from-dash-magenta via-dash-purple to-dash-violet hover:opacity-95 disabled:opacity-50 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-neon-magenta transition-all active:scale-98"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
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
